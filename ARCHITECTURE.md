# 🏗️ Antigravity - Architecture & Technical Documentation

## Overview

Antigravity is a full-stack personal financial management application built with a modern, scalable architecture following REST API principles and component-based frontend design.

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        USER BROWSER                          │
│                      (http://localhost:3000)                 │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ HTTP/HTTPS
                         │
┌────────────────────────▼────────────────────────────────────┐
│                    REACT FRONTEND                            │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Pages                                                │   │
│  │  ├─ Login.jsx (Authentication)                       │   │
│  │  └─ Dashboard.jsx (Main App)                         │   │
│  │                                                       │   │
│  │  Components (Future)                                 │   │
│  │  ├─ KPICard.jsx                                      │   │
│  │  ├─ TransactionTable.jsx                             │   │
│  │  └─ Charts.jsx                                       │   │
│  │                                                       │   │
│  │  Services                                            │   │
│  │  └─ api.js (Axios HTTP Client)                      │   │
│  │                                                       │   │
│  │  Styling                                             │   │
│  │  ├─ TailwindCSS (Utility Classes)                   │   │
│  │  └─ index.css (Custom Styles)                       │   │
│  └──────────────────────────────────────────────────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ REST API (JSON)
                         │ JWT Authentication
                         │
┌────────────────────────▼────────────────────────────────────┐
│                    FLASK BACKEND                             │
│                  (http://localhost:5000)                     │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  API Endpoints                                        │   │
│  │  ├─ /api/login         (POST)                       │   │
│  │  ├─ /api/register      (POST)                       │   │
│  │  ├─ /api/transactions  (GET, POST)                  │   │
│  │  ├─ /api/transactions/:id (PUT, DELETE)             │   │
│  │  ├─ /api/analytics/summary (GET)                    │   │
│  │  ├─ /api/analytics/charts (GET)                     │   │
│  │  └─ /api/categories    (GET, POST)                  │   │
│  │                                                       │   │
│  │  Middleware                                          │   │
│  │  ├─ CORS Handler                                     │   │
│  │  ├─ JWT Token Validation                            │   │
│  │  └─ Error Handler                                    │   │
│  │                                                       │   │
│  │  Business Logic                                      │   │
│  │  ├─ Authentication                                    │   │
│  │  ├─ Transaction Management                           │   │
│  │  ├─ Analytics Calculation                            │   │
│  │  └─ Data Aggregation                                │   │
│  └──────────────────────────────────────────────────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ SQLAlchemy ORM
                         │
┌────────────────────────▼────────────────────────────────────┐
│                    SQLite DATABASE                           │
│                   (antigravity.db)                           │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Tables                                               │   │
│  │  ├─ users                                            │   │
│  │  │  ├─ id (PK)                                       │   │
│  │  │  ├─ username                                      │   │
│  │  │  ├─ email                                         │   │
│  │  │  ├─ password_hash                                 │   │
│  │  │  └─ created_at                                    │   │
│  │  │                                                    │   │
│  │  ├─ categories                                       │   │
│  │  │  ├─ id (PK)                                       │   │
│  │  │  ├─ name                                          │   │
│  │  │  ├─ type (expense/revenue)                       │   │
│  │  │  └─ icon                                          │   │
│  │  │                                                    │   │
│  │  └─ transactions                                     │   │
│  │     ├─ id (PK)                                       │   │
│  │     ├─ user_id (FK → users)                         │   │
│  │     ├─ category_id (FK → categories)                │   │
│  │     ├─ date                                          │   │
│  │     ├─ description                                   │   │
│  │     ├─ amount                                        │   │
│  │     ├─ type (expense/revenue)                       │   │
│  │     └─ created_at                                    │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## Technology Stack Details

### Frontend Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2.0 | UI Framework |
| React Router DOM | 6.16.0 | Client-side routing |
| Axios | 1.5.0 | HTTP client |
| Recharts | 2.8.0 | Data visualization |
| TailwindCSS | 3.3.3 | CSS framework |
| PostCSS | 8.4.29 | CSS processing |
| Autoprefixer | 10.4.15 | CSS vendor prefixes |

### Backend Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Flask | 2.3.3 | Web framework |
| Flask-SQLAlchemy | 3.0.5 | ORM |
| Flask-CORS | 4.0.0 | CORS handling |
| PyJWT | 2.8.0 | JWT authentication |
| Werkzeug | 2.3.7 | Security utilities |
| SQLAlchemy | 2.0.20 | Database toolkit |
| SQLite | 3.x | Database engine |

---

## Data Flow Diagrams

### Authentication Flow

```
┌──────┐         ┌─────────┐         ┌─────────┐         ┌──────────┐
│Client│         │Frontend │         │ Backend │         │ Database │
└──┬───┘         └────┬────┘         └────┬────┘         └────┬─────┘
   │                  │                   │                    │
   │ 1. Enter creds   │                   │                    │
   ├─────────────────►│                   │                    │
   │                  │                   │                    │
   │                  │ 2. POST /api/login│                    │
   │                  ├──────────────────►│                    │
   │                  │                   │                    │
   │                  │                   │ 3. Query user      │
   │                  │                   ├───────────────────►│
   │                  │                   │                    │
   │                  │                   │ 4. User data       │
   │                  │                   │◄───────────────────┤
   │                  │                   │                    │
   │                  │                   │ 5. Verify password │
   │                  │                   │                    │
   │                  │                   │ 6. Generate JWT    │
   │                  │                   │                    │
   │                  │ 7. Return token   │                    │
   │                  │◄──────────────────┤                    │
   │                  │                   │                    │
   │                  │ 8. Store in       │                    │
   │                  │    localStorage   │                    │
   │                  │                   │                    │
   │ 9. Navigate to   │                   │                    │
   │    Dashboard     │                   │                    │
   │◄─────────────────┤                   │                    │
```

### Transaction CRUD Flow

```
CREATE:
Client → Frontend → POST /api/transactions → Backend → DB Insert → Response

READ:
Client → Frontend → GET /api/transactions → Backend → DB Query → Response

UPDATE:
Client → Frontend → PUT /api/transactions/:id → Backend → DB Update → Response

DELETE:
Client → Frontend → DELETE /api/transactions/:id → Backend → DB Delete → Response
```

---

## Component Architecture

### Frontend Component Hierarchy

```
App (Router)
│
├─ Login Page
│  ├─ Left Panel (Branding)
│  └─ Right Panel (Form)
│     ├─ Username Input
│     ├─ Password Input
│     ├─ Submit Button
│     └─ Error Display
│
└─ Dashboard Page (Protected)
   ├─ Header
   │  ├─ Logo
   │  ├─ User Info
   │  └─ Logout Button
   │
   ├─ Period Filter
   │  ├─ Monthly Button
   │  └─ Yearly Button
   │
   ├─ KPI Cards Section
   │  ├─ Total Expenses Card
   │  ├─ Total Revenues Card
   │  └─ Current Balance Card
   │
   ├─ Charts Section
   │  ├─ Expenses by Category (Bar Chart)
   │  └─ Timeline (Line Chart)
   │
   ├─ Transactions Section
   │  ├─ Add Transaction Button
   │  └─ Transactions Table
   │     ├─ Table Header
   │     ├─ Table Body (Rows)
   │     └─ Action Buttons
   │
   └─ Transaction Modal (Conditional)
      ├─ Type Toggle
      ├─ Date Picker
      ├─ Category Dropdown
      ├─ Description Input
      ├─ Amount Input
      └─ Submit/Cancel Buttons
```

---

## API Architecture

### Endpoint Structure

```
/api
├─ /login (POST)
│  ├─ Public endpoint
│  ├─ Body: { username, password }
│  └─ Returns: { token, user }
│
├─ /register (POST)
│  ├─ Public endpoint
│  ├─ Body: { username, email, password }
│  └─ Returns: { message }
│
├─ /transactions
│  ├─ GET (Protected)
│  │  ├─ Query params: category_id, type, period, month, year
│  │  └─ Returns: { transactions: [] }
│  │
│  └─ POST (Protected)
│     ├─ Body: { date, category_id, description, amount, type }
│     └─ Returns: { message, transaction }
│
├─ /transactions/:id
│  ├─ PUT (Protected)
│  │  ├─ Body: { date?, category_id?, description?, amount?, type? }
│  │  └─ Returns: { message, transaction }
│  │
│  └─ DELETE (Protected)
│     └─ Returns: { message }
│
├─ /analytics/summary (GET, Protected)
│  ├─ Query params: period, month, year
│  └─ Returns: { total_expenses, total_revenues, balance }
│
├─ /analytics/charts (GET, Protected)
│  ├─ Query params: period, month, year
│  └─ Returns: { expenses_by_category: [], timeline: [] }
│
└─ /categories
   ├─ GET (Protected)
   │  ├─ Query params: type?
   │  └─ Returns: { categories: [] }
   │
   └─ POST (Protected)
      ├─ Body: { name, type, icon }
      └─ Returns: { message, category }
```

### Authentication Mechanism

```
1. User logs in → Backend generates JWT
2. Frontend stores JWT in localStorage
3. All subsequent requests include: Authorization: Bearer <token>
4. Backend validates token on protected routes
5. Token expires after 7 days
6. Expired/invalid tokens → 401 → Redirect to login
```

---

## Database Schema

### Entity-Relationship Diagram

```
┌──────────────────┐
│      users       │
├──────────────────┤
│ id (PK)          │───┐
│ username         │   │
│ email            │   │
│ password_hash    │   │
│ created_at       │   │
└──────────────────┘   │
                       │ 1:N
                       │
┌──────────────────┐   │    ┌──────────────────┐
│   categories     │   │    │  transactions    │
├──────────────────┤   │    ├──────────────────┤
│ id (PK)          │───┼───►│ id (PK)          │
│ name             │   │    │ user_id (FK)     │
│ type             │   │    │ category_id (FK) │
│ icon             │   │    │ date             │
└──────────────────┘   │    │ description      │
        │              │    │ amount           │
        │ 1:N          │    │ type             │
        └──────────────┘    │ created_at       │
                            └──────────────────┘
```

### Table Specifications

**users**
- `id`: INTEGER, PRIMARY KEY, AUTO INCREMENT
- `username`: VARCHAR(80), UNIQUE, NOT NULL
- `email`: VARCHAR(120), UNIQUE, NOT NULL
- `password_hash`: VARCHAR(200), NOT NULL
- `created_at`: DATETIME, DEFAULT CURRENT_TIMESTAMP

**categories**
- `id`: INTEGER, PRIMARY KEY, AUTO INCREMENT
- `name`: VARCHAR(50), NOT NULL
- `type`: VARCHAR(10), NOT NULL (CHECK: 'expense' OR 'revenue')
- `icon`: VARCHAR(50), NOT NULL

**transactions**
- `id`: INTEGER, PRIMARY KEY, AUTO INCREMENT
- `user_id`: INTEGER, FOREIGN KEY → users(id), NOT NULL
- `category_id`: INTEGER, FOREIGN KEY → categories(id), NOT NULL
- `date`: DATE, NOT NULL
- `description`: VARCHAR(200), NOT NULL
- `amount`: DECIMAL(10, 2), NOT NULL
- `type`: VARCHAR(10), NOT NULL (CHECK: 'expense' OR 'revenue')
- `created_at`: DATETIME, DEFAULT CURRENT_TIMESTAMP

---

## State Management

### Frontend State

```javascript
Dashboard Component State:
├─ loading: boolean
├─ summary: {
│     total_expenses: number,
│     total_revenues: number,
│     balance: number
│  }
├─ transactions: Transaction[]
├─ chartData: {
│     expenses_by_category: CategoryData[],
│     timeline: TimelineData[]
│  }
├─ categories: Category[]
├─ filters: {
│     period: 'monthly' | 'yearly',
│     month: number,
│     year: number
│  }
├─ showModal: boolean
├─ modalMode: 'create' | 'edit'
├─ selectedTransaction: Transaction | null
├─ formData: TransactionForm
└─ error: string
```

### Authentication State

```javascript
Stored in localStorage:
├─ token: string (JWT)
└─ user: {
      id: number,
      username: string,
      email: string
   }
```

---

## Security Features

### Implemented Security Measures

1. **Password Security**
   - Bcrypt hashing via Werkzeug
   - No plain-text password storage
   - Salt generation per password

2. **Authentication**
   - JWT with expiration (7 days)
   - Token required for protected routes
   - Automatic logout on token expiry

3. **Authorization**
   - User-scoped data access
   - Transactions filtered by user_id
   - No cross-user data leakage

4. **Input Validation**
   - Required field validation
   - Type checking (expense/revenue)
   - Amount format validation

5. **CORS Protection**
   - Configured origins
   - Credentials handling
   - Method restrictions

### Security Recommendations for Production

```
❌ Current (Development)          ✅ Production Ready
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hard-coded SECRET_KEY          → Environment variable
SQLite database                → PostgreSQL/MySQL
No rate limiting              → Implement rate limiting
No HTTPS                      → HTTPS only
No input sanitization         → XSS protection
Simple password rules         → Strong password policy
No 2FA                        → Optional 2FA
No session management         → Refresh tokens
Debug mode enabled            → Debug disabled
No API versioning             → Versioned API (/v1/)
```

---

## Performance Considerations

### Frontend Optimization

```
✅ Implemented:
- Component-based architecture
- Minimal re-renders
- Efficient state updates
- Conditional rendering
- Lazy loading (via routing)

🔄 Future Improvements:
- React.memo() for expensive components
- useMemo() for computed values
- useCallback() for event handlers
- Virtual scrolling for large tables
- Code splitting
- Image optimization
```

### Backend Optimization

```
✅ Implemented:
- Indexed database fields (PKs, FKs)
- Efficient SQLAlchemy queries
- JSON response caching

🔄 Future Improvements:
- Database query optimization
- Redis caching layer
- Database connection pooling
- Query result pagination
- Async request handling
- Load balancing
```

---

## Scalability Path

### Current Capacity
- **Users**: Single user (demo)
- **Transactions**: Thousands (SQLite limit: millions)
- **Concurrent Users**: ~10-50 (Flask dev server)
- **Data Size**: Up to 2GB (SQLite limit)

### Scaling Strategy

**Phase 1: Small Scale (1-100 users)**
- Current architecture sufficient
- Add Gunicorn for better concurrency
- Basic monitoring

**Phase 2: Medium Scale (100-1000 users)**
- Migrate to PostgreSQL
- Add Redis caching
- Implement CDN for static assets
- Horizontal scaling with load balancer

**Phase 3: Large Scale (1000+ users)**
- Microservices architecture
- Separate analytics service
- Message queue (RabbitMQ/Kafka)
- Auto-scaling infrastructure
- Multi-region deployment

---

## Error Handling Strategy

### Frontend Error Handling

```javascript
1. API Errors
   ├─ Network errors → User-friendly message
   ├─ 401 Unauthorized → Redirect to login
   ├─ 404 Not Found → Display error state
   └─ 500 Server Error → Generic error message

2. Form Validation
   ├─ Client-side validation
   ├─ Real-time feedback
   └─ Prevent invalid submissions

3. Loading States
   ├─ Spinner during API calls
   ├─ Disabled buttons
   └─ Optimistic updates
```

### Backend Error Handling

```python
1. Request Validation
   ├─ Missing fields → 400 Bad Request
   ├─ Invalid format → 400 Bad Request
   └─ Type errors → 400 Bad Request

2. Authentication Errors
   ├─ Invalid credentials → 401 Unauthorized
   ├─ Expired token → 401 Unauthorized
   └─ Missing token → 401 Unauthorized

3. Resource Errors
   ├─ Not found → 404 Not Found
   ├─ Already exists → 400 Bad Request
   └─ Forbidden → 403 Forbidden

4. Server Errors
   ├─ Database errors → 500 Internal Server Error
   ├─ Unexpected errors → 500 Internal Server Error
   └─ All errors logged
```

---

## Testing Strategy

### Frontend Testing (Future)

```
Unit Tests:
├─ Component rendering
├─ Event handlers
├─ State updates
└─ Utility functions

Integration Tests:
├─ API service calls
├─ Form submissions
└─ Navigation flows

E2E Tests:
├─ Login flow
├─ Create transaction
├─ Edit transaction
└─ Delete transaction
```

### Backend Testing (Future)

```
Unit Tests:
├─ Model methods
├─ Utility functions
└─ Helper functions

Integration Tests:
├─ API endpoints
├─ Database operations
└─ Authentication flow

Load Tests:
├─ Concurrent users
├─ Transaction throughput
└─ Response times
```

---

## Deployment Architecture

### Development Environment

```
Developer Machine
├─ Backend: Flask dev server (port 5000)
├─ Frontend: React dev server (port 3000)
├─ Database: SQLite (local file)
└─ Hot reloading enabled
```

### Production Environment (Recommended)

```
Cloud Provider (AWS/Azure/GCP/Heroku)
│
├─ Frontend (Static Hosting)
│  ├─ Netlify/Vercel/S3+CloudFront
│  ├─ Optimized build
│  └─ CDN enabled
│
├─ Backend (App Server)
│  ├─ Gunicorn + Flask
│  ├─ Docker container
│  ├─ Auto-scaling group
│  └─ Health checks
│
├─ Database (Managed Service)
│  ├─ PostgreSQL (RDS/Cloud SQL)
│  ├─ Automated backups
│  └─ Read replicas
│
└─ Infrastructure
   ├─ Load Balancer
   ├─ HTTPS certificates
   ├─ Monitoring (CloudWatch/Datadog)
   └─ Logging (ELK Stack)
```

---

## Design Patterns Used

### Frontend Patterns

1. **Container/Presentational Pattern**
   - Dashboard handles logic
   - Sub-components handle display

2. **Custom Hooks Pattern** (Future)
   - useAuth() for authentication
   - useTransactions() for data fetching

3. **HOC Pattern**
   - ProtectedRoute for auth checks

### Backend Patterns

1. **Repository Pattern**
   - SQLAlchemy models as repositories
   - Clean data access layer

2. **Decorator Pattern**
   - @token_required for protected routes
   - @app.route for endpoint registration

3. **Factory Pattern**
   - App configuration
   - Database initialization

---

## Monitoring and Logging

### What to Monitor (Production)

```
Application Metrics:
├─ Response times
├─ Error rates
├─ Active users
├─ Transaction volume
└─ API endpoint usage

Infrastructure Metrics:
├─ CPU usage
├─ Memory usage
├─ Disk I/O
├─ Network traffic
└─ Database connections

Business Metrics:
├─ Daily active users
├─ Transactions per user
├─ Category distribution
└─ Revenue vs expenses trends
```

---

## Future Enhancements

### Planned Features

**Phase 1: Core Improvements**
- [ ] Dark mode
- [ ] Export to CSV/PDF
- [ ] Advanced filters
- [ ] Search functionality
- [ ] Pagination

**Phase 2: Advanced Features**
- [ ] Budget goals
- [ ] Recurring transactions
- [ ] Multi-currency
- [ ] Financial reports
- [ ] Email notifications

**Phase 3: Collaboration**
- [ ] Multi-user households
- [ ] Shared expenses
- [ ] Permission management
- [ ] Activity logs

**Phase 4: Intelligence**
- [ ] Spending predictions
- [ ] Category suggestions
- [ ] Anomaly detection
- [ ] Financial advice

---

## Conclusion

Antigravity is built with modern best practices, scalability in mind, and a focus on user experience. The architecture supports easy maintenance, testing, and future enhancements while maintaining clean separation of concerns and modularity.

---

*Last Updated: January 2024*
*Version: 1.0.0*