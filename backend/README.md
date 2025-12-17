# Antigravity Backend

Flask-based REST API for the Antigravity Personal Financial Budget Management App.

## Features

- User authentication with JWT tokens
- Transaction management (CRUD operations)
- Category management
- Analytics and summary endpoints
- SQLite database
- Mock data generation for testing

## Tech Stack

- **Flask**: Web framework
- **Flask-SQLAlchemy**: ORM for database operations
- **Flask-CORS**: Cross-Origin Resource Sharing support
- **PyJWT**: JSON Web Token authentication
- **SQLite**: Lightweight database

## Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

## Installation

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Create a virtual environment (recommended):**
   ```bash
   # On Windows
   python -m venv venv
   venv\Scripts\activate

   # On macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

## Setup and Run

### 1. Initialize the Database with Sample Data

Run the seed script to create the database, tables, and populate with demo data:

```bash
python seed_data.py
```

This will create:
- A demo user with credentials:
  - **Username**: `demo`
  - **Password**: `demo123`
- 6 expense categories (Grocery, Transport, Utilities, Entertainment, Health, Others)
- 4 revenue categories (Salary, Freelance, Investments, Others)
- ~180 sample transactions over the last 6 months

### 2. Start the Flask Server

```bash
python app.py
```

The server will start at `http://localhost:5000`

## API Endpoints

### Authentication

#### POST /api/login
Login with username and password.

**Request Body:**
```json
{
  "username": "demo",
  "password": "demo123"
}
```

**Response:**
```json
{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user": {
    "id": 1,
    "username": "demo",
    "email": "demo@antigravity.com"
  }
}
```

#### POST /api/register
Register a new user.

**Request Body:**
```json
{
  "username": "newuser",
  "email": "user@example.com",
  "password": "password123"
}
```

### Transactions

#### GET /api/transactions
Get all transactions for the authenticated user.

**Query Parameters:**
- `category_id` (optional): Filter by category
- `type` (optional): Filter by type (expense/revenue)
- `period` (optional): Filter by period (monthly/yearly)
- `month` (optional): Month number (1-12)
- `year` (optional): Year (default: current year)

**Headers:**
- `Authorization`: Bearer {token}

#### POST /api/transactions
Create a new transaction.

**Request Body:**
```json
{
  "date": "2024-01-15",
  "category_id": 1,
  "description": "Weekly groceries",
  "amount": 125.50,
  "type": "expense"
}
```

#### PUT /api/transactions/:id
Update an existing transaction.

**Request Body:** (all fields optional)
```json
{
  "date": "2024-01-16",
  "category_id": 2,
  "description": "Updated description",
  "amount": 150.00,
  "type": "expense"
}
```

#### DELETE /api/transactions/:id
Delete a transaction.

### Analytics

#### GET /api/analytics/summary
Get financial summary (total expenses, revenues, balance).

**Query Parameters:**
- `period` (optional): monthly/yearly
- `month` (optional): Month number (1-12)
- `year` (optional): Year

**Response:**
```json
{
  "total_expenses": 5432.10,
  "total_revenues": 12500.00,
  "balance": 7067.90
}
```

#### GET /api/analytics/charts
Get data for charts (expenses by category, timeline).

**Query Parameters:** Same as summary endpoint

**Response:**
```json
{
  "expenses_by_category": [
    {
      "category": "Grocery",
      "icon": "🛒",
      "amount": 1250.00
    }
  ],
  "timeline": [
    {
      "period": "Jan",
      "expenses": 1234.56,
      "revenues": 3500.00
    }
  ]
}
```

### Categories

#### GET /api/categories
Get all categories.

**Query Parameters:**
- `type` (optional): Filter by type (expense/revenue)

#### POST /api/categories
Create a new category.

**Request Body:**
```json
{
  "name": "Education",
  "type": "expense",
  "icon": "📚"
}
```

## Database Schema

### Users Table
- `id`: Integer, Primary Key
- `username`: String(80), Unique
- `email`: String(120), Unique
- `password_hash`: String(200)
- `created_at`: DateTime

### Categories Table
- `id`: Integer, Primary Key
- `name`: String(50)
- `type`: String(10) - 'expense' or 'revenue'
- `icon`: String(50) - Emoji or icon identifier

### Transactions Table
- `id`: Integer, Primary Key
- `user_id`: Integer, Foreign Key → users.id
- `date`: Date
- `category_id`: Integer, Foreign Key → categories.id
- `description`: String(200)
- `amount`: Numeric(10, 2)
- `type`: String(10) - 'expense' or 'revenue'
- `created_at`: DateTime

## Error Handling

All endpoints return consistent error responses:

```json
{
  "message": "Error description"
}
```

HTTP Status Codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `404`: Not Found
- `500`: Internal Server Error

## Security Notes

⚠️ **Important for Production:**

1. Change the `SECRET_KEY` in `app.py` to a secure random string
2. Use environment variables for sensitive configuration
3. Implement password strength requirements
4. Add rate limiting to prevent brute force attacks
5. Use HTTPS in production
6. Implement refresh tokens for better security
7. Add input validation and sanitization

## Development Tips

- Use a tool like Postman or Thunder Client to test API endpoints
- Check the Flask console for detailed error messages
- The database file `antigravity.db` is created in the backend directory
- To reset the database, delete `antigravity.db` and run `seed_data.py` again

## Troubleshooting

**Issue**: `ModuleNotFoundError`
- Solution: Make sure you've activated the virtual environment and installed all dependencies

**Issue**: Database errors
- Solution: Delete `antigravity.db` and run `seed_data.py` again

**Issue**: CORS errors from frontend
- Solution: Ensure Flask-CORS is installed and configured properly

**Issue**: Token expired errors
- Solution: Login again to get a fresh token (tokens expire after 7 days)

## License

This project is created for educational and portfolio purposes.