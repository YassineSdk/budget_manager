# 🚀 Antigravity - Complete Setup & User Guide

## Table of Contents
1. [System Requirements](#system-requirements)
2. [Installation Guide](#installation-guide)
3. [First Time Setup](#first-time-setup)
4. [Running the Application](#running-the-application)
5. [User Guide](#user-guide)
6. [Troubleshooting](#troubleshooting)
7. [Advanced Configuration](#advanced-configuration)

---

## System Requirements

### Minimum Requirements
- **Operating System**: Windows 10+, macOS 10.14+, or Linux (Ubuntu 18.04+)
- **RAM**: 4GB minimum, 8GB recommended
- **Disk Space**: 500MB free space
- **Internet**: Required for initial dependency download

### Required Software
- **Python 3.8+** - [Download](https://www.python.org/downloads/)
- **Node.js 14+** - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **pip** (comes with Python)

---

## Installation Guide

### Step 1: Verify Prerequisites

Open a terminal/command prompt and verify installations:

```bash
# Check Python version (should be 3.8 or higher)
python --version

# Check Node.js version (should be 14 or higher)
node --version

# Check npm version
npm --version

# Check pip version
pip --version
```

### Step 2: Download the Project

Option A: Clone from Git (if available)
```bash
git clone <repository-url>
cd antigravity
```

Option B: Download ZIP
1. Download the project ZIP file
2. Extract to your desired location
3. Navigate to the extracted folder

### Step 3: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment (HIGHLY RECOMMENDED)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate

# On macOS/Linux:
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt
```

**Note**: You should see `(venv)` prefix in your terminal when virtual environment is active.

### Step 4: Initialize Database

```bash
# Still in the backend directory with venv activated
python seed_data.py
```

**Expected Output:**
```
Creating demo user...
Creating categories...
Creating sample transactions...
✅ Database seeded successfully!
   - Created user: demo / demo123
   - Created 6 expense categories
   - Created 4 revenue categories
   - Created 186 sample transactions
```

### Step 5: Frontend Setup

Open a **NEW** terminal window (keep backend terminal open):

```bash
# Navigate to frontend directory from project root
cd frontend

# Install Node.js dependencies
npm install
```

**Note**: This may take 2-5 minutes on first installation.

---

## First Time Setup

### Option A: Automated Setup (Windows Only)

Simply double-click `start.bat` in the project root directory. This will:
- Check for all prerequisites
- Create virtual environment if needed
- Install all dependencies
- Initialize database
- Start both servers automatically

### Option B: Manual Setup (All Platforms)

#### Terminal 1 - Backend
```bash
cd backend
venv\Scripts\activate  # On Windows
source venv/bin/activate  # On macOS/Linux
python app.py
```

**Expected Output:**
```
 * Serving Flask app 'app'
 * Debug mode: on
 * Running on http://127.0.0.1:5000
```

#### Terminal 2 - Frontend
```bash
cd frontend
npm start
```

**Expected Output:**
```
Compiled successfully!
You can now view antigravity-frontend in the browser.
  Local:            http://localhost:3000
```

---

## Running the Application

### Starting the Application

After first-time setup, to run the app:

#### On Windows (Easy Way)
Double-click `start.bat` in the project root.

#### Manual Start (All Platforms)

**Terminal 1 - Backend:**
```bash
cd backend
venv\Scripts\activate  # or source venv/bin/activate on macOS/Linux
python app.py
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

### Stopping the Application

- Press `Ctrl+C` in both terminal windows
- Or close the terminal windows

### Accessing the Application

Once both servers are running:
1. Open your browser
2. Navigate to: `http://localhost:3000`
3. You should see the Antigravity login page

---

## User Guide

### 1. Logging In

**Demo Credentials:**
- Username: `demo`
- Password: `demo123`

1. Enter username and password
2. Click "Sign In" button
3. You'll be redirected to the dashboard

### 2. Dashboard Overview

The dashboard consists of four main sections:

#### A. KPI Cards (Top Section)
- **Total Expenses**: Shows sum of all expenses (red)
- **Total Revenues**: Shows sum of all income (green)
- **Current Balance**: Shows net income (revenues - expenses)

#### B. Period Filter
Toggle between:
- **Monthly**: Shows current month's data
- **Yearly**: Shows current year's data

#### C. Charts Section
- **Expenses by Category**: Bar chart showing spending breakdown
- **Timeline**: Line chart comparing expenses vs revenues over time

#### D. Transactions Table
Lists all transactions with:
- Date
- Category (with emoji icon)
- Description
- Amount (color-coded)
- Type badge
- Edit/Delete actions

### 3. Adding a Transaction

1. Click the "➕ Add Transaction" button
2. Modal will appear with form
3. Fill in the details:
   - **Type**: Choose Expense or Revenue
   - **Date**: Select transaction date
   - **Category**: Pick from dropdown (categories change based on type)
   - **Description**: Enter details
   - **Amount**: Enter value (e.g., 125.50)
4. Click "Create" button
5. Transaction appears in table immediately

**Example Expense:**
- Type: Expense
- Date: 2024-01-15
- Category: Grocery 🛒
- Description: Weekly shopping at Walmart
- Amount: 145.50

**Example Revenue:**
- Type: Revenue
- Date: 2024-01-01
- Category: Salary 💰
- Description: Monthly salary payment
- Amount: 3500.00

### 4. Editing a Transaction

1. Locate the transaction in the table
2. Click the ✏️ (pencil) icon
3. Edit form appears with current values
4. Modify desired fields
5. Click "Update" button
6. Changes reflect immediately

### 5. Deleting a Transaction

1. Locate the transaction in the table
2. Click the 🗑️ (trash) icon
3. Confirm deletion in popup dialog
4. Transaction is removed immediately
5. KPIs and charts update automatically

### 6. Viewing Different Time Periods

**Monthly View:**
- Click "Monthly" button
- Shows current month's data
- Timeline shows daily breakdown

**Yearly View:**
- Click "Yearly" button
- Shows current year's data
- Timeline shows monthly breakdown

### 7. Understanding Categories

**Expense Categories:**
- 🛒 Grocery: Food and household items
- 🚗 Transport: Gas, parking, public transit
- 💡 Utilities: Electricity, water, internet, phone
- 🎬 Entertainment: Movies, dining, subscriptions
- 🏥 Health: Medical, pharmacy, gym
- 📦 Others: Miscellaneous expenses

**Revenue Categories:**
- 💰 Salary: Regular employment income
- 💼 Freelance: Project-based income
- 📈 Investments: Stocks, dividends, interest
- 💵 Others: Gifts, refunds, other income

### 8. Logging Out

1. Click "Logout 🚪" in the top-right corner
2. You'll be redirected to the login page
3. Your data is saved automatically

---

## Troubleshooting

### Common Issues and Solutions

#### Issue 1: "Python is not recognized"
**Cause**: Python not installed or not in PATH

**Solution**:
1. Download Python from python.org
2. During installation, check "Add Python to PATH"
3. Restart terminal and try again

#### Issue 2: "Node is not recognized"
**Cause**: Node.js not installed or not in PATH

**Solution**:
1. Download Node.js from nodejs.org
2. Run the installer (it adds to PATH automatically)
3. Restart terminal and try again

#### Issue 3: Port 5000 already in use
**Cause**: Another application using port 5000

**Solution**:
1. Stop the other application, or
2. Change Flask port in `backend/app.py`:
   ```python
   app.run(debug=True, port=5001)  # Change 5000 to 5001
   ```
3. Update API URL in `frontend/src/services/api.js`:
   ```javascript
   const API_BASE_URL = 'http://localhost:5001/api';
   ```

#### Issue 4: Port 3000 already in use
**Cause**: Another React app or service using port 3000

**Solution**:
- When prompted, press 'Y' to run on different port
- Or stop the other application

#### Issue 5: CORS Errors
**Symptoms**: API calls fail, console shows CORS errors

**Solution**:
1. Ensure backend is running
2. Verify Flask-CORS is installed: `pip install Flask-CORS`
3. Check backend terminal for any errors
4. Restart backend server

#### Issue 6: Database Errors
**Symptoms**: Transactions not saving, errors about database

**Solution**:
```bash
cd backend
# Delete the database
rm antigravity.db  # On Windows: del antigravity.db
# Recreate it
python seed_data.py
```

#### Issue 7: Blank Charts
**Symptoms**: Charts show "No data available"

**Solution**:
1. Check that transactions exist in the database
2. Verify you're logged in
3. Try toggling between Monthly/Yearly filters
4. Check browser console for errors

#### Issue 8: Styles Not Loading
**Symptoms**: App looks unstyled, plain HTML

**Solution**:
```bash
cd frontend
# Clear cache and reinstall
rm -rf node_modules package-lock.json  # On Windows: rmdir /s node_modules & del package-lock.json
npm install
npm start
```

#### Issue 9: Token Expired
**Symptoms**: Suddenly logged out, "Token expired" message

**Solution**:
- This is normal - tokens expire after 7 days
- Simply log in again with demo credentials

#### Issue 10: Module Not Found Errors (Backend)
**Solution**:
```bash
cd backend
venv\Scripts\activate  # Ensure venv is active
pip install -r requirements.txt
```

---

## Advanced Configuration

### Changing the Secret Key

**Security Note**: Change the secret key before deploying to production!

Edit `backend/app.py`:
```python
app.config['SECRET_KEY'] = 'your-super-secret-key-here-use-random-string'
```

Generate a secure key:
```python
import secrets
print(secrets.token_hex(32))
```

### Adding Custom Categories

#### Method 1: Through API (Recommended)
Use the API endpoint after logging in:
```bash
POST http://localhost:5000/api/categories
Headers: Authorization: Bearer {your-token}
Body: {
  "name": "Education",
  "type": "expense",
  "icon": "📚"
}
```

#### Method 2: Direct Database
Edit `backend/seed_data.py` and add to the category lists:
```python
expense_categories = [
    # ... existing categories
    Category(name="Education", type="expense", icon="📚"),
]
```
Then recreate database:
```bash
python seed_data.py
```

### Changing Database

To use PostgreSQL instead of SQLite:

1. Install PostgreSQL
2. Install psycopg2: `pip install psycopg2-binary`
3. Update `backend/app.py`:
```python
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@localhost/antigravity'
```

### Customizing Colors

Edit `frontend/tailwind.config.js`:
```javascript
colors: {
  primary: {
    500: '#your-color-here',
    // ... other shades
  }
}
```

### Enabling Production Mode

#### Backend:
```python
# In app.py, change:
app.run(debug=False, host='0.0.0.0', port=5000)
```

#### Frontend:
```bash
npm run build
# Serve the build folder with a static server
```

---

## Performance Tips

1. **Database**: Regularly clean old transactions (keep recent 12 months)
2. **Browser**: Clear cache if app feels slow
3. **Backend**: Consider using Gunicorn for production instead of Flask dev server
4. **Frontend**: Use production build for better performance

---

## Backup and Restore

### Backing Up Data

```bash
# The entire database is in one file
cp backend/antigravity.db backend/antigravity_backup_2024-01-15.db
```

### Restoring Data

```bash
# Replace current database with backup
cp backend/antigravity_backup_2024-01-15.db backend/antigravity.db
```

---

## Additional Resources

- **Backend README**: `backend/README.md` - Detailed API documentation
- **Frontend README**: `frontend/README.md` - Component and styling details
- **Main README**: `README.md` - Project overview

---

## Getting Help

If you encounter issues:

1. ✅ Check this guide's troubleshooting section
2. ✅ Review error messages in terminal
3. ✅ Check browser console (F12) for frontend errors
4. ✅ Ensure both servers are running
5. ✅ Verify all prerequisites are installed
6. ✅ Try resetting the database

---

## Best Practices

### For Regular Use
- ✅ Keep transactions up-to-date
- ✅ Use descriptive transaction descriptions
- ✅ Categorize correctly for accurate analytics
- ✅ Review monthly and yearly summaries
- ✅ Back up database before major changes

### For Development
- ✅ Always use virtual environment for Python
- ✅ Keep dependencies updated
- ✅ Test changes on development data first
- ✅ Review console logs regularly
- ✅ Use git for version control

---

## Quick Reference

### Start Application
```bash
# Terminal 1
cd backend && venv\Scripts\activate && python app.py

# Terminal 2
cd frontend && npm start
```

### Stop Application
```bash
Ctrl+C in both terminals
```

### Reset Database
```bash
cd backend
del antigravity.db  # or rm on macOS/Linux
python seed_data.py
```

### Login Credentials
- Username: `demo`
- Password: `demo123`

### URLs
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- API Docs: See backend/README.md

---

**Happy Financial Management! 💰📊**

*Last Updated: January 2024*