import os
from datetime import datetime, timedelta
from functools import wraps

import jwt
from flask import Flask, jsonify, request
from flask_cors import CORS
from models import Category, Transaction, User, db
from sqlalchemy import extract, func
from werkzeug.security import check_password_hash, generate_password_hash

app = Flask(__name__)
app.config["SECRET_KEY"] = "your-secret-key-change-in-production"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///antigravity.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

CORS(app)
db.init_app(app)


# Token required decorator
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get("Authorization")

        if not token:
            return jsonify({"message": "Token is missing"}), 401

        try:
            if token.startswith("Bearer "):
                token = token[7:]
            data = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
            current_user = User.query.get(data["user_id"])
            if not current_user:
                return jsonify({"message": "User not found"}), 401
        except jwt.ExpiredSignatureError:
            return jsonify({"message": "Token has expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"message": "Invalid token"}), 401

        return f(current_user, *args, **kwargs)

    return decorated


# Authentication endpoints
@app.route("/api/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")

        if not username or not password:
            return jsonify({"message": "Username and password are required"}), 400

        user = User.query.filter_by(username=username).first()

        if not user or not check_password_hash(user.password_hash, password):
            return jsonify({"message": "Invalid username or password"}), 401

        token = jwt.encode(
            {"user_id": user.id, "exp": datetime.utcnow() + timedelta(days=7)},
            app.config["SECRET_KEY"],
            algorithm="HS256",
        )

        return jsonify(
            {
                "token": token,
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "age": user.age,
                    "occupation": user.occupation,
                    "family_situation": user.family_situation,
                    "monthly_spending_threshold": float(user.monthly_spending_threshold)
                    if user.monthly_spending_threshold
                    else None,
                    "financial_goal": user.financial_goal,
                },
            }
        ), 200

    except Exception as e:
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500


@app.route("/api/register", methods=["POST"])
def register():
    try:
        data = request.get_json()
        username = data.get("username")
        email = data.get("email")
        password = data.get("password")
        age = data.get("age")
        occupation = data.get("occupation")
        family_situation = data.get("family_situation")
        monthly_spending_threshold = data.get("monthly_spending_threshold")
        financial_goal = data.get("financial_goal")

        if not username or not email or not password:
            return jsonify(
                {"message": "Username, email and password are required"}
            ), 400

        if User.query.filter_by(username=username).first():
            return jsonify({"message": "Username already exists"}), 400

        if User.query.filter_by(email=email).first():
            return jsonify({"message": "Email already exists"}), 400

        hashed_password = generate_password_hash(password)
        new_user = User(
            username=username,
            email=email,
            password_hash=hashed_password,
            age=age,
            occupation=occupation,
            family_situation=family_situation,
            monthly_spending_threshold=monthly_spending_threshold,
            financial_goal=financial_goal,
        )

        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "User created successfully"}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500


# Transaction endpoints
@app.route("/api/transactions", methods=["GET"])
@token_required
def get_transactions(current_user):
    try:
        # Get query parameters for filtering
        category_id = request.args.get("category_id", type=int)
        transaction_type = request.args.get("type")
        period = request.args.get("period")  # 'monthly' or 'yearly'
        month = request.args.get("month", type=int)
        year = request.args.get("year", type=int, default=datetime.now().year)

        query = Transaction.query.filter_by(user_id=current_user.id)

        # Apply filters
        if category_id:
            query = query.filter_by(category_id=category_id)

        if transaction_type:
            query = query.filter_by(type=transaction_type)

        if period == "monthly" and month:
            query = query.filter(
                extract("month", Transaction.date) == month,
                extract("year", Transaction.date) == year,
            )
        elif period == "yearly":
            query = query.filter(extract("year", Transaction.date) == year)

        transactions = query.order_by(Transaction.date.desc()).all()

        return jsonify(
            {
                "transactions": [
                    {
                        "id": t.id,
                        "date": t.date.strftime("%Y-%m-%d"),
                        "category_id": t.category_id,
                        "category_name": t.category.name,
                        "category_icon": t.category.icon,
                        "description": t.description,
                        "amount": float(t.amount),
                        "type": t.type,
                    }
                    for t in transactions
                ]
            }
        ), 200

    except Exception as e:
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500


@app.route("/api/transactions", methods=["POST"])
@token_required
def create_transaction(current_user):
    try:
        data = request.get_json()

        required_fields = ["date", "category_id", "description", "amount", "type"]
        if not all(field in data for field in required_fields):
            return jsonify({"message": "All fields are required"}), 400

        if data["type"] not in ["expense", "revenue"]:
            return jsonify({"message": "Type must be either expense or revenue"}), 400

        transaction_date = datetime.strptime(data["date"], "%Y-%m-%d")

        new_transaction = Transaction(
            user_id=current_user.id,
            date=transaction_date,
            category_id=data["category_id"],
            description=data["description"],
            amount=data["amount"],
            type=data["type"],
        )

        db.session.add(new_transaction)
        db.session.commit()

        return jsonify(
            {
                "message": "Transaction created successfully",
                "transaction": {
                    "id": new_transaction.id,
                    "date": new_transaction.date.strftime("%Y-%m-%d"),
                    "category_id": new_transaction.category_id,
                    "category_name": new_transaction.category.name,
                    "category_icon": new_transaction.category.icon,
                    "description": new_transaction.description,
                    "amount": float(new_transaction.amount),
                    "type": new_transaction.type,
                },
            }
        ), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500


@app.route("/api/transactions/<int:transaction_id>", methods=["PUT"])
@token_required
def update_transaction(current_user, transaction_id):
    try:
        transaction = Transaction.query.filter_by(
            id=transaction_id, user_id=current_user.id
        ).first()

        if not transaction:
            return jsonify({"message": "Transaction not found"}), 404

        data = request.get_json()

        if "date" in data:
            transaction.date = datetime.strptime(data["date"], "%Y-%m-%d")
        if "category_id" in data:
            transaction.category_id = data["category_id"]
        if "description" in data:
            transaction.description = data["description"]
        if "amount" in data:
            transaction.amount = data["amount"]
        if "type" in data:
            if data["type"] not in ["expense", "revenue"]:
                return jsonify(
                    {"message": "Type must be either expense or revenue"}
                ), 400
            transaction.type = data["type"]

        db.session.commit()

        return jsonify(
            {
                "message": "Transaction updated successfully",
                "transaction": {
                    "id": transaction.id,
                    "date": transaction.date.strftime("%Y-%m-%d"),
                    "category_id": transaction.category_id,
                    "category_name": transaction.category.name,
                    "category_icon": transaction.category.icon,
                    "description": transaction.description,
                    "amount": float(transaction.amount),
                    "type": transaction.type,
                },
            }
        ), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500


@app.route("/api/transactions/<int:transaction_id>", methods=["DELETE"])
@token_required
def delete_transaction(current_user, transaction_id):
    try:
        transaction = Transaction.query.filter_by(
            id=transaction_id, user_id=current_user.id
        ).first()

        if not transaction:
            return jsonify({"message": "Transaction not found"}), 404

        db.session.delete(transaction)
        db.session.commit()

        return jsonify({"message": "Transaction deleted successfully"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500


# Analytics endpoints
@app.route("/api/analytics/summary", methods=["GET"])
@token_required
def get_summary(current_user):
    try:
        period = request.args.get("period")
        month = request.args.get("month", type=int)
        year = request.args.get("year", type=int, default=datetime.now().year)

        query = Transaction.query.filter_by(user_id=current_user.id)

        if period == "monthly" and month:
            query = query.filter(
                extract("month", Transaction.date) == month,
                extract("year", Transaction.date) == year,
            )
        elif period == "yearly":
            query = query.filter(extract("year", Transaction.date) == year)

        expenses = query.filter_by(type="expense").all()
        revenues = query.filter_by(type="revenue").all()

        total_expenses = sum(t.amount for t in expenses)
        total_revenues = sum(t.amount for t in revenues)
        balance = total_revenues - total_expenses

        return jsonify(
            {
                "total_expenses": float(total_expenses),
                "total_revenues": float(total_revenues),
                "balance": float(balance),
            }
        ), 200

    except Exception as e:
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500


@app.route("/api/analytics/charts", methods=["GET"])
@token_required
def get_chart_data(current_user):
    try:
        period = request.args.get("period", "monthly")
        month = request.args.get("month", type=int)
        year = request.args.get("year", type=int, default=datetime.now().year)

        # Expenses by category
        query = Transaction.query.filter_by(user_id=current_user.id, type="expense")

        if period == "monthly" and month:
            query = query.filter(
                extract("month", Transaction.date) == month,
                extract("year", Transaction.date) == year,
            )
        elif period == "yearly":
            query = query.filter(extract("year", Transaction.date) == year)

        expenses_by_category = (
            db.session.query(
                Category.name,
                Category.icon,
                func.sum(Transaction.amount).label("total"),
            )
            .join(Transaction)
            .filter(Transaction.id.in_([t.id for t in query.all()]))
            .group_by(Category.id)
            .all()
        )

        category_data = [
            {"category": cat.name, "icon": cat.icon, "amount": float(cat.total)}
            for cat in expenses_by_category
        ]

        # Timeline data
        if period == "monthly" and month:
            # Daily data for the month
            timeline_query = (
                db.session.query(
                    extract("day", Transaction.date).label("day"),
                    Transaction.type,
                    func.sum(Transaction.amount).label("total"),
                )
                .filter(
                    Transaction.user_id == current_user.id,
                    extract("month", Transaction.date) == month,
                    extract("year", Transaction.date) == year,
                )
                .group_by(extract("day", Transaction.date), Transaction.type)
                .all()
            )

            timeline_data = []
            days_in_month = 31  # Simplified
            for day in range(1, days_in_month + 1):
                day_expenses = sum(
                    t.total
                    for t in timeline_query
                    if t.day == day and t.type == "expense"
                )
                day_revenues = sum(
                    t.total
                    for t in timeline_query
                    if t.day == day and t.type == "revenue"
                )
                timeline_data.append(
                    {
                        "period": str(day),
                        "expenses": float(day_expenses),
                        "revenues": float(day_revenues),
                    }
                )
        else:
            # Monthly data for the year
            timeline_query = (
                db.session.query(
                    extract("month", Transaction.date).label("month"),
                    Transaction.type,
                    func.sum(Transaction.amount).label("total"),
                )
                .filter(
                    Transaction.user_id == current_user.id,
                    extract("year", Transaction.date) == year,
                )
                .group_by(extract("month", Transaction.date), Transaction.type)
                .all()
            )

            month_names = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ]
            timeline_data = []
            for month_num in range(1, 13):
                month_expenses = sum(
                    t.total
                    for t in timeline_query
                    if t.month == month_num and t.type == "expense"
                )
                month_revenues = sum(
                    t.total
                    for t in timeline_query
                    if t.month == month_num and t.type == "revenue"
                )
                timeline_data.append(
                    {
                        "period": month_names[month_num - 1],
                        "expenses": float(month_expenses),
                        "revenues": float(month_revenues),
                    }
                )

        return jsonify(
            {"expenses_by_category": category_data, "timeline": timeline_data}
        ), 200

    except Exception as e:
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500


# Category endpoints
@app.route("/api/categories", methods=["GET"])
@token_required
def get_categories(current_user):
    try:
        category_type = request.args.get("type")

        query = Category.query
        if category_type:
            query = query.filter_by(type=category_type)

        categories = query.all()

        return jsonify(
            {
                "categories": [
                    {"id": c.id, "name": c.name, "type": c.type, "icon": c.icon}
                    for c in categories
                ]
            }
        ), 200

    except Exception as e:
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500


@app.route("/api/categories", methods=["POST"])
@token_required
def create_category(current_user):
    try:
        data = request.get_json()

        if not all(field in data for field in ["name", "type", "icon"]):
            return jsonify({"message": "Name, type, and icon are required"}), 400

        if data["type"] not in ["expense", "revenue"]:
            return jsonify({"message": "Type must be either expense or revenue"}), 400

        new_category = Category(name=data["name"], type=data["type"], icon=data["icon"])

        db.session.add(new_category)
        db.session.commit()

        return jsonify(
            {
                "message": "Category created successfully",
                "category": {
                    "id": new_category.id,
                    "name": new_category.name,
                    "type": new_category.type,
                    "icon": new_category.icon,
                },
            }
        ), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5000)
