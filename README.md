# 💰 Antigravity - Personal Financial Budget Management App

A modern, sophisticated, and minimalistic personal financial budget management web application built with React, TailwindCSS, Flask, and SQLite.

![Antigravity Banner](https://img.shields.io/badge/Status-Ready-success) ![React](https://img.shields.io/badge/React-18.2.0-blue) ![Flask](https://img.shields.io/badge/Flask-2.3.3-black) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.3-38bdf8)

## ✨ Features

### 🎯 Core Functionality
- **User Authentication**: Secure JWT-based login system
- **Transaction Management**: Complete CRUD operations for expenses and revenues
- **Category Management**: Pre-defined and custom categories with emoji icons
- **Real-time Analytics**: Live KPIs, summaries, and financial insights
- **Interactive Charts**: Beautiful visualizations using Recharts
- **Filtering**: Monthly and yearly views with category filters

### 🎨 Design & UX
- **Apple-Inspired Design**: Clean, minimal, and elegant aesthetics
- **Smooth Animations**: Fade, slide, and scale effects throughout
- **Responsive Layout**: Perfect on mobile, tablet, and desktop
- **Intuitive Navigation**: Split-screen login and comprehensive dashboard
- **Color-Coded Data**: Visual distinction between expenses and revenues

## 🛠️ Tech Stack

### Frontend
- **React 18**: Modern UI library with hooks
- **React Router DOM**: Client-side routing
- **TailwindCSS**: Utility-first CSS framework
- **Recharts**: Powerful charting library
- **Axios**: Promise-based HTTP client
- **Poppins Font**: Clean, modern typography

### Backend
- **Flask**: Lightweight Python web framework
- **Flask-SQLAlchemy**: ORM for database operations
- **Flask-CORS**: Cross-origin resource sharing
- **PyJWT**: JSON Web Token implementation
- **SQLite**: Embedded relational database
- **Werkzeug**: Password hashing and security

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 14+ and npm
- **Python** 3.8+
- **pip** (Python package manager)
- **Git** (optional, for cloning)

## 🚀 Quick Start

### 1. Clone or Download the Project

```bash
# If using Git
git clone <repository-url>
cd antigravity

# Or download and extract the ZIP file
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create and activate virtual environment (recommended)
# On Windows
python -m venv venv
venv\Scripts\activate

# On macOS/Linux
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Initialize database with sample data
python seed_data.py

# Start the Flask server
python app.py
```

The backend will be running at `http://localhost:5000`

### 3. Frontend Setup

Open a **new terminal window** and:

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Start the React development server
npm start
```

The app will open automatically at `http://localhost:3000`

### 4. Login to the App

Use the demo credentials:
- **Username**: `demo`
- **Password**: `demo123`

## 📁 Project Structure

```
antigravity/
├── backend/
│   ├── app.py                 # Flask application with API endpoints
│   ├── models.py              # Database models (User, Transaction, Category)
│   ├── seed_data.py           # Database initialization script
│   ├── requirements.txt       # Python dependencies
│   ├── antigravity.db         # SQLite database (generated)
│   └── README.md              # Backend documentation
│
├── frontend/
│   ├── public/
│   │   └── index.html         # HTML template
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx      # Login page with split layout
│   │   │   └── Dashboard.jsx  # Main dashboard
│   │   ├── services/
│   │   │   └── api.js         # API service with Axios
│   │   ├── App.jsx            # Main app component
│   │   ├── index.js           # Entry point
│   │   └── index.css          # Global styles
│   ├── tailwind.config.js     # Tailwind configuration
│   ├── package.json           # Node dependencies
│   └── README.md              # Frontend documentation
│
└── README.md                  # This file
```

## 📊 Application Pages

### Login Page
- **Split Layout**: Visual branding on left, form on right
- **Responsive**: Single column on mobile
- **Demo Credentials**: Clearly displayed for easy testing
- **Error Handling**: Clear feedback for invalid logins

### Dashboard Page
- **KPI Cards**: Total Expenses, Total Revenues, Current Balance
- **Charts**: 
  - Bar chart: Expenses by category
  - Line chart: Timeline of expenses vs revenues
- **Transactions Table**: Sortable, filterable, with CRUD actions
- **Period Filters**: Toggle between monthly and yearly views
- **Add/Edit Modal**: Smooth modal for transaction management

## 🎨 Design Philosophy

### Color Palette
- **Primary**: Calming blues (#0ea5e9 family)
- **Accent Green**: #10b981 (revenues, positive)
- **Accent Orange**: #f97316 (expenses, attention)
- **Background**: Soft grays (#f8fafc)
- **Cards**: Pure white with soft shadows

### Typography
- **Font**: Poppins (300, 400, 500, 600, 700)
- **Hierarchy**: Clear distinction between headings and body text

### Components
- **Border Radius**: 20-30px for modern look
- **Shadows**: Subtle, layered shadows
- **Animations**: 200-300ms smooth transitions
- **Spacing**: Generous padding for breathability

## 🔐 Security

### Implemented
- JWT token-based authentication
- Password hashing with Werkzeug
- Protected API routes
- CORS configuration
- Input validation

### Production Recommendations
- Change `SECRET_KEY` in Flask app
- Use environment variables for config
- Implement HTTPS
- Add rate limiting
- Use stronger password policies
- Implement refresh tokens

## 📈 Sample Data

The `seed_data.py` script creates:
- **1 Demo User**: username `demo`, password `demo123`
- **10 Categories**: 6 expense, 4 revenue
- **~180 Transactions**: Realistic data over 6 months
- **Varied Amounts**: Category-appropriate spending

Categories include:
- **Expenses**: 🛒 Grocery, 🚗 Transport, 💡 Utilities, 🎬 Entertainment, 🏥 Health, 📦 Others
- **Revenues**: 💰 Salary, 💼 Freelance, 📈 Investments, 💵 Others

## 🔧 Configuration

### Backend API URL
Edit `frontend/src/services/api.js`:
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

### Database Reset
To start fresh:
```bash
cd backend
# Delete the database file
rm antigravity.db  # On Windows: del antigravity.db
# Re-run seed script
python seed_data.py
```

### Custom Categories
Add new categories via:
1. API endpoint: `POST /api/categories`
2. Direct database insertion
3. Modify `seed_data.py` before initialization

## 📱 Responsive Design

- **Mobile** (< 640px): Stacked layout, simplified charts
- **Tablet** (640px - 1024px): Two-column grid, medium charts
- **Desktop** (> 1024px): Full multi-column layout, large charts

## 🐛 Troubleshooting

### Backend Issues

**Port 5000 already in use:**
```bash
# Change port in app.py, last line:
app.run(debug=True, port=5001)
```

**Module not found errors:**
```bash
# Ensure virtual environment is activated
pip install -r requirements.txt
```

**Database errors:**
```bash
# Delete and recreate database
rm antigravity.db
python seed_data.py
```

### Frontend Issues

**Cannot connect to backend:**
- Verify backend is running on port 5000
- Check CORS is enabled in Flask
- Confirm API_BASE_URL in api.js

**Styles not loading:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**Chart not displaying:**
```bash
# Ensure Recharts is installed
npm install recharts
```

## 🚢 Deployment

### Backend
- Use Gunicorn or uWSGI for production
- Deploy on Heroku, DigitalOcean, or AWS
- Switch to PostgreSQL for production
- Set environment variables for secrets

### Frontend
- Build: `npm run build`
- Deploy to Netlify, Vercel, or AWS S3
- Configure environment variables
- Set up proper routing for SPA

### Full Stack
- Docker containers for both services
- Use docker-compose for orchestration
- Configure reverse proxy (nginx)

## 📚 API Documentation

Full API documentation available in `backend/README.md`

### Key Endpoints
- `POST /api/login` - User authentication
- `GET /api/transactions` - List transactions
- `POST /api/transactions` - Create transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction
- `GET /api/analytics/summary` - Get financial summary
- `GET /api/analytics/charts` - Get chart data
- `GET /api/categories` - List categories

## 🎯 Future Enhancements

- [ ] Dark mode toggle
- [ ] Budget goals and alerts
- [ ] Recurring transactions
- [ ] Multi-currency support
- [ ] Export to CSV/PDF
- [ ] Mobile app (React Native)
- [ ] Bank account integration
- [ ] Bill reminders
- [ ] Financial reports
- [ ] Multi-user support
- [ ] Expense sharing

## 🤝 Contributing

This is a portfolio/educational project. Feel free to:
- Fork and modify for your needs
- Submit suggestions
- Report bugs
- Improve documentation

## 📄 License

This project is created for educational and portfolio purposes.

## 👨‍💻 Author

Built with ❤️ as a modern, production-ready financial management solution.

## 🙏 Acknowledgments

- **React Team** - For the amazing framework
- **TailwindCSS** - For the utility-first CSS approach
- **Flask** - For the elegant Python framework
- **Recharts** - For beautiful, customizable charts

---

## 🎉 Getting Help

1. **Check README files**: Backend and Frontend READMEs have detailed info
2. **Review API docs**: All endpoints documented in backend README
3. **Check console logs**: Browser console and Flask terminal for errors
4. **Verify both servers**: Ensure both backend (5000) and frontend (3000) are running

---

**Happy Financial Management! 💰📊**