import random
from datetime import datetime, timedelta

from app import app
from models import Category, Transaction, User, db
from werkzeug.security import generate_password_hash


def seed_database():
    with app.app_context():
        # Drop all tables and recreate
        db.drop_all()
        db.create_all()

        print("Creating demo user...")
        # Create demo user
        demo_user = User(
            username="demo",
            email="demo@antigravity.com",
            password_hash=generate_password_hash("demo123"),
        )
        db.session.add(demo_user)
        db.session.commit()

        print("Creating categories...")
        # Create expense categories
        expense_categories = [
            Category(name="Grocery", type="expense", icon=""),
            Category(name="Transport", type="expense", icon=""),
            Category(name="Utilities", type="expense", icon=""),
            Category(name="Entertainment", type="expense", icon=""),
            Category(name="Health", type="expense", icon=""),
            Category(name="Others", type="expense", icon=""),
        ]

        # Create revenue categories
        revenue_categories = [
            Category(name="Salary", type="revenue", icon=""),
            Category(name="Freelance", type="revenue", icon=""),
            Category(name="Investments", type="revenue", icon=""),
            Category(name="Others", type="revenue", icon=""),
        ]

        for category in expense_categories + revenue_categories:
            db.session.add(category)

        db.session.commit()

        print("Creating sample transactions...")
        # Create sample transactions for the last 6 months
        today = datetime.now()
        transactions = []

        # Expense descriptions by category
        expense_descriptions = {
            "Grocery": [
                "Weekly groceries",
                "Supermarket shopping",
                "Fresh produce",
                "Snacks and drinks",
            ],
            "Transport": [
                "Gas refill",
                "Uber ride",
                "Monthly metro pass",
                "Parking fee",
            ],
            "Utilities": [
                "Electricity bill",
                "Internet bill",
                "Water bill",
                "Phone bill",
            ],
            "Entertainment": [
                "Movie tickets",
                "Streaming subscription",
                "Concert tickets",
                "Restaurant dinner",
            ],
            "Health": ["Pharmacy", "Doctor visit", "Gym membership", "Vitamins"],
            "Others": ["Clothes shopping", "Home supplies", "Books", "Gifts"],
        }

        # Revenue descriptions by category
        revenue_descriptions = {
            "Salary": ["Monthly salary", "Bonus payment", "Overtime pay"],
            "Freelance": [
                "Web design project",
                "Consulting work",
                "Logo design",
                "Content writing",
            ],
            "Investments": ["Stock dividends", "Crypto gains", "Interest income"],
            "Others": ["Gift received", "Refund", "Cashback"],
        }

        # Generate expenses
        for i in range(150):
            days_ago = random.randint(0, 180)
            transaction_date = today - timedelta(days=days_ago)

            category = random.choice(expense_categories)
            description = random.choice(expense_descriptions[category.name])

            # Amount varies by category
            if category.name == "Grocery":
                amount = round(random.uniform(30, 150), 2)
            elif category.name == "Transport":
                amount = round(random.uniform(10, 80), 2)
            elif category.name == "Utilities":
                amount = round(random.uniform(50, 200), 2)
            elif category.name == "Entertainment":
                amount = round(random.uniform(20, 100), 2)
            elif category.name == "Health":
                amount = round(random.uniform(15, 150), 2)
            else:
                amount = round(random.uniform(20, 100), 2)

            transaction = Transaction(
                user_id=demo_user.id,
                date=transaction_date.date(),
                category_id=category.id,
                description=description,
                amount=amount,
                type="expense",
            )
            transactions.append(transaction)

        # Generate revenues (less frequent than expenses)
        for i in range(30):
            days_ago = random.randint(0, 180)
            transaction_date = today - timedelta(days=days_ago)

            category = random.choice(revenue_categories)
            description = random.choice(revenue_descriptions[category.name])

            # Amount varies by category
            if category.name == "Salary":
                amount = round(random.uniform(2500, 4000), 2)
            elif category.name == "Freelance":
                amount = round(random.uniform(200, 1500), 2)
            elif category.name == "Investments":
                amount = round(random.uniform(50, 500), 2)
            else:
                amount = round(random.uniform(50, 300), 2)

            transaction = Transaction(
                user_id=demo_user.id,
                date=transaction_date.date(),
                category_id=category.id,
                description=description,
                amount=amount,
                type="revenue",
            )
            transactions.append(transaction)

        # Add monthly salary for the last 6 months
        salary_category = next(c for c in revenue_categories if c.name == "Salary")
        for month_offset in range(6):
            salary_date = today - timedelta(days=30 * month_offset)
            salary_transaction = Transaction(
                user_id=demo_user.id,
                date=salary_date.date(),
                category_id=salary_category.id,
                description="Monthly salary",
                amount=3500.00,
                type="revenue",
            )
            transactions.append(salary_transaction)

        # Add all transactions
        for transaction in transactions:
            db.session.add(transaction)

        db.session.commit()

        print(f"✅ Database seeded successfully!")
        print(f"   - Created user: demo / demo123")
        print(f"   - Created {len(expense_categories)} expense categories")
        print(f"   - Created {len(revenue_categories)} revenue categories")
        print(f"   - Created {len(transactions)} sample transactions")


if __name__ == "__main__":
    seed_database()
