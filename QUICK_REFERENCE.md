# 💰 Antigravity - Quick Reference Card

## 🚀 Quick Start Commands

### First Time Setup
```bash
# Backend
cd backend
python -m venv venv
venv\Scripts\activate          # Windows
source venv/bin/activate       # macOS/Linux
pip install -r requirements.txt
python seed_data.py
python app.py

# Frontend (new terminal)
cd frontend
npm install
npm start
```

### Subsequent Runs
```bash
# Backend
cd backend
venv\Scripts\activate && python app.py

# Frontend
cd frontend
npm start
```

### Windows Quick Start
```bash
# Just double-click: start.bat
```

---

## 🔑 Demo Login Credentials

```
Username: demo
Password: demo123
```

---

## 🌐 URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend | http://localhost:5000 |
| API | http://localhost:5000/api |

---

## 📡 API Endpoints Cheat Sheet

### Authentication
```bash
POST /api/login
Body: { "username": "demo", "password": "demo123" }

POST /api/register
Body: { "username": "user", "email": "user@email.com", "password": "pass" }
```

### Transactions
```bash
GET    /api/transactions              # List all
GET    /api/transactions?period=monthly&month=1&year=2024
POST   /api/transactions              # Create
PUT    /api/transactions/:id          # Update
DELETE /api/transactions/:id          # Delete
```

### Analytics
```bash
GET /api/analytics/summary            # Totals
GET /api/analytics/charts             # Chart data
```

### Categories
```bash
GET  /api/categories                  # List all
GET  /api/categories?type=expense     # Filter by type
POST /api/categories                  # Create new
```

---

## 🗄️ Database Quick Actions

### Reset Database
```bash
cd backend
del antigravity.db        # Windows
rm antigravity.db         # macOS/Linux
python seed_data.py
```

### Backup Database
```bash
cd backend
copy antigravity.db antigravity_backup.db    # Windows
cp antigravity.db antigravity_backup.db      # macOS/Linux
```

---

## 🎨 Pre-defined Categories

### Expenses
- 🛒 Grocery
- 🚗 Transport
- 💡 Utilities
- 🎬 Entertainment
- 🏥 Health
- 📦 Others

### Revenues
- 💰 Salary
- 💼 Freelance
- 📈 Investments
- 💵 Others

---

## 🐛 Troubleshooting Quick Fixes

### Backend Won't Start
```bash
# Check Python installation
python --version

# Reinstall dependencies
cd backend
pip install -r requirements.txt

# Check port
netstat -ano | findstr :5000    # Windows
lsof -i :5000                   # macOS/Linux
```

### Frontend Won't Start
```bash
# Check Node.js installation
node --version
npm --version

# Reinstall dependencies
cd frontend
rm -rf node_modules package-lock.json
npm install

# Clear cache
npm cache clean --force
```

### CORS Errors
```bash
# Ensure backend is running
# Check Flask-CORS is installed
pip install Flask-CORS
```

### Database Errors
```bash
# Reset database
cd backend
del antigravity.db && python seed_data.py
```

### Token Expired
```
Solution: Just login again with demo credentials
```

---

## 📝 Common Operations

### Add Transaction
1. Click "➕ Add Transaction"
2. Select Type (Expense/Revenue)
3. Choose Date
4. Select Category
5. Enter Description
6. Enter Amount
7. Click "Create"

### Edit Transaction
1. Find transaction in table
2. Click ✏️ icon
3. Modify fields
4. Click "Update"

### Delete Transaction
1. Find transaction in table
2. Click 🗑️ icon
3. Confirm deletion

### Change View Period
- Click "Monthly" for current month
- Click "Yearly" for current year

---

## 🔧 Configuration Files

### Backend Config
```python
# app.py
SECRET_KEY = 'your-secret-key'
DATABASE_URI = 'sqlite:///antigravity.db'
PORT = 5000
```

### Frontend Config
```javascript
// src/services/api.js
const API_BASE_URL = 'http://localhost:5000/api';
```

---

## 📦 Dependencies Quick List

### Backend (Python)
```
Flask==2.3.3
Flask-SQLAlchemy==3.0.5
Flask-CORS==4.0.0
PyJWT==2.8.0
Werkzeug==2.3.7
SQLAlchemy==2.0.20
```

### Frontend (Node)
```
react: 18.2.0
react-router-dom: 6.16.0
axios: 1.5.0
recharts: 2.8.0
tailwindcss: 3.3.3
```

---

## 🎯 Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Submit form | Enter |
| Close modal | Escape |
| Tab through fields | Tab |
| Refresh page | F5 |
| Open DevTools | F12 |

---

## 📊 Sample Transaction Data

### Example Expense
```json
{
  "date": "2024-01-15",
  "category_id": 1,
  "description": "Weekly groceries",
  "amount": 145.50,
  "type": "expense"
}
```

### Example Revenue
```json
{
  "date": "2024-01-01",
  "category_id": 7,
  "description": "Monthly salary",
  "amount": 3500.00,
  "type": "revenue"
}
```

---

## 🎨 Color Reference

| Element | Color Code | Usage |
|---------|-----------|-------|
| Primary Blue | #0ea5e9 | Buttons, links |
| Expense Red | #ef4444 | Expenses |
| Revenue Green | #10b981 | Revenues |
| Background | #f8fafc | Page background |
| Card White | #ffffff | Cards, modals |
| Text Dark | #1f2937 | Main text |
| Text Light | #6b7280 | Secondary text |

---

## 📱 Responsive Breakpoints

| Device | Width | Layout |
|--------|-------|--------|
| Mobile | < 640px | Single column |
| Tablet | 640px - 1024px | 2 columns |
| Desktop | > 1024px | 3 columns |

---

## 🔒 Security Checklist for Production

- [ ] Change SECRET_KEY in app.py
- [ ] Use environment variables
- [ ] Enable HTTPS
- [ ] Implement rate limiting
- [ ] Use PostgreSQL instead of SQLite
- [ ] Add input sanitization
- [ ] Implement refresh tokens
- [ ] Set secure CORS origins
- [ ] Disable debug mode
- [ ] Add logging and monitoring

---

## 📁 Project Structure Quick View

```
antigravity/
├── backend/
│   ├── app.py              # Flask app
│   ├── models.py           # Database models
│   ├── seed_data.py        # Data initialization
│   └── requirements.txt    # Python deps
└── frontend/
    ├── public/
    │   └── index.html      # HTML template
    ├── src/
    │   ├── pages/
    │   │   ├── Login.jsx   # Login page
    │   │   └── Dashboard.jsx # Dashboard
    │   ├── services/
    │   │   └── api.js      # API client
    │   ├── App.jsx         # Main app
    │   └── index.css       # Styles
    └── package.json        # Node deps
```

---

## 🆘 Emergency Commands

### Kill Process on Port
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5000 | xargs kill -9
```

### Complete Reset
```bash
# Backend
cd backend
del antigravity.db
rmdir /s venv
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python seed_data.py

# Frontend
cd frontend
rmdir /s node_modules
del package-lock.json
npm install
```

---

## 📚 Documentation Quick Links

| Document | Description |
|----------|-------------|
| README.md | Project overview |
| SETUP_GUIDE.md | Detailed setup |
| ARCHITECTURE.md | Technical details |
| FEATURES.md | Feature showcase |
| backend/README.md | API documentation |
| frontend/README.md | Frontend guide |

---

## 💡 Pro Tips

1. **Always activate venv** before running backend
2. **Run both servers** for full functionality
3. **Check console logs** for debugging
4. **Use demo credentials** for quick testing
5. **Reset database** if data gets messy
6. **Toggle Monthly/Yearly** for different insights
7. **Backup database** before major changes
8. **Use browser DevTools** to debug frontend
9. **Read error messages** carefully
10. **Check both terminals** for errors

---

## 🎓 Learning Resources

### Backend (Flask)
- Flask Docs: https://flask.palletsprojects.com/
- SQLAlchemy: https://www.sqlalchemy.org/
- PyJWT: https://pyjwt.readthedocs.io/

### Frontend (React)
- React Docs: https://react.dev/
- React Router: https://reactrouter.com/
- TailwindCSS: https://tailwindcss.com/
- Recharts: https://recharts.org/

---

## ⚡ Performance Optimization

### Backend
- Use database indexing
- Implement query caching
- Add pagination for large datasets
- Use connection pooling

### Frontend
- Lazy load components
- Memoize expensive calculations
- Optimize images
- Minimize bundle size

---

## 🎉 Feature Requests & Bugs

For issues or suggestions:
1. Check existing documentation
2. Review error messages
3. Try troubleshooting steps
4. Document the issue clearly
5. Include steps to reproduce

---

## 🚀 Deployment Checklist

### Backend
- [ ] Change to production database
- [ ] Set environment variables
- [ ] Disable debug mode
- [ ] Use production WSGI server (Gunicorn)
- [ ] Set up monitoring
- [ ] Configure logging
- [ ] Enable HTTPS

### Frontend
- [ ] Run production build (npm run build)
- [ ] Update API URLs
- [ ] Configure environment variables
- [ ] Set up CDN
- [ ] Enable compression
- [ ] Add error tracking

---

**Last Updated:** January 2024  
**Version:** 1.0.0  
**Status:** ✅ Production Ready

---

*Keep this card handy for quick reference! 📌*