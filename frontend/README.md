# Antigravity Frontend

Modern, minimalistic React-based frontend for the Antigravity Personal Financial Budget Management App.

## Features

- 🔐 **Secure Authentication**: JWT-based login system
- 📊 **Interactive Dashboard**: Real-time KPIs and financial overview
- 📈 **Data Visualization**: Beautiful charts with Recharts
- 💰 **Transaction Management**: Full CRUD operations
- 🎨 **Modern UI**: Apple-inspired design with TailwindCSS
- 📱 **Responsive Design**: Works seamlessly on all devices
- ⚡ **Smooth Animations**: Elegant transitions and interactions

## Tech Stack

- **React 18**: UI library
- **React Router DOM**: Client-side routing
- **Axios**: HTTP client for API calls
- **Recharts**: Chart library for data visualization
- **TailwindCSS**: Utility-first CSS framework
- **Poppins Font**: Clean, modern typography

## Prerequisites

- Node.js 14 or higher
- npm or yarn package manager
- Backend server running on `http://localhost:5000`

## Installation

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

   Or using yarn:
   ```bash
   yarn install
   ```

## Running the Application

### Development Mode

Start the development server with hot reload:

```bash
npm start
```

The app will open at `http://localhost:3000`

### Production Build

Build the app for production:

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Project Structure

```
frontend/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── components/         # Reusable components (future)
│   ├── pages/
│   │   ├── Login.jsx       # Login page with split layout
│   │   └── Dashboard.jsx   # Main dashboard page
│   ├── services/
│   │   └── api.js          # API service with Axios
│   ├── utils/              # Utility functions (future)
│   ├── App.jsx             # Main app component with routing
│   ├── index.js            # Entry point
│   └── index.css           # Global styles with Tailwind
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.js       # PostCSS configuration
└── package.json            # Dependencies and scripts
```

## Features Walkthrough

### 1. Login Page

- **Split Layout Design**:
  - Left side: Branded section with financial imagery and app benefits
  - Right side: Clean, minimal login form
- **Demo Credentials** displayed on the page:
  - Username: `demo`
  - Password: `demo123`
- **Error Handling**: Clear error messages for invalid credentials
- **Smooth Animations**: Fade-in and slide-up effects

### 2. Dashboard Page

#### KPI Cards
Three prominent cards displaying:
- **Total Expenses**: Sum of all expenses (red)
- **Total Revenues**: Sum of all income (green)
- **Current Balance**: Net income (blue/red based on value)

Each card features:
- Large, readable numbers
- Relevant emoji icons
- Hover animations
- Soft shadows

#### Charts Section
Two interactive charts:

1. **Expenses by Category** (Bar Chart):
   - Visual breakdown of spending by category
   - Color-coded bars
   - Interactive tooltips

2. **Timeline Chart** (Line Chart):
   - Dual-line chart showing expenses vs revenues over time
   - Monthly or daily data based on filter
   - Smooth curves with data points

#### Transactions Table
- **Sortable columns**: Date, Category, Description, Amount, Type
- **Color-coded amounts**: Red for expenses, green for revenues
- **Quick actions**: Edit and delete buttons for each transaction
- **Empty state**: Friendly message when no data available

#### Period Filters
Toggle between:
- **Monthly**: Current month's data
- **Yearly**: Current year's data

### 3. Transaction Modal

Add/Edit transaction form with:
- **Type Toggle**: Switch between Expense and Revenue
- **Date Picker**: Select transaction date
- **Category Dropdown**: Dynamic list based on type
- **Description Field**: Free text input
- **Amount Input**: Decimal number with validation
- **Smooth Modal Animations**: Scale-in effect with backdrop blur

## Design Guidelines

### Color Palette

```css
Primary Blue: #0ea5e9 - #0c4a6e
Accent Green: #10b981
Accent Orange: #f97316
Accent Purple: #a855f7
Background Light: #f8fafc
Card Background: #ffffff
```

### Typography

- **Font Family**: Poppins
- **Weights**: 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)

### Spacing & Borders

- **Border Radius**: 20-30px for cards and buttons
- **Shadows**: Soft shadows (0 2px 15px rgba(0,0,0,0.05))
- **Padding**: Generous spacing for breathing room

### Animations

- **Fade In**: 0.3s ease-in
- **Slide Up**: 0.3s ease-out
- **Scale In**: 0.2s ease-out
- **Hover Effects**: Smooth transitions on all interactive elements

## API Configuration

The API base URL is configured in `src/services/api.js`:

```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

**To change the backend URL:**
1. Open `src/services/api.js`
2. Modify the `API_BASE_URL` constant
3. Restart the development server

## Authentication Flow

1. User enters credentials on login page
2. Frontend sends POST request to `/api/login`
3. Backend validates and returns JWT token
4. Token stored in `localStorage`
5. Token included in all subsequent API requests via Authorization header
6. On 401 errors, user is redirected to login page

## Available Scripts

### `npm start`
Runs the app in development mode at `http://localhost:3000`

### `npm run build`
Builds the app for production to the `build` folder

### `npm test`
Launches the test runner (if tests are configured)

### `npm run eject`
**Note: This is a one-way operation!**
Ejects from Create React App for full configuration control

## Environment Variables

Create a `.env` file in the frontend directory for custom configuration:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## Customization

### Changing Colors

Edit `tailwind.config.js` to modify the color palette:

```javascript
colors: {
  primary: {
    // Your custom colors
  }
}
```

### Adding New Components

1. Create component in `src/components/`
2. Import in relevant page
3. Follow existing naming conventions

### Custom Animations

Add to `tailwind.config.js` under `theme.extend.animation`:

```javascript
animation: {
  'custom-animation': 'customKeyframe 1s ease-in-out',
}
```

## Troubleshooting

### Issue: "Cannot GET /" in production
**Solution**: Ensure your server is configured to serve `index.html` for all routes

### Issue: API calls fail with CORS error
**Solution**: Make sure the backend has CORS enabled and is running

### Issue: Charts not displaying
**Solution**: Check that Recharts is properly installed: `npm install recharts`

### Issue: Styles not applying
**Solution**: 
1. Ensure Tailwind is properly configured
2. Check that `index.css` imports Tailwind directives
3. Restart the development server

### Issue: Token expired errors
**Solution**: Login again to get a fresh token (tokens expire after 7 days)

## Performance Optimization

- **Code Splitting**: React.lazy() for route-based splitting
- **Memoization**: Use React.memo() for expensive components
- **Image Optimization**: Use WebP format for images
- **Bundle Analysis**: Run `npm run build` and analyze bundle size

## Accessibility

- Semantic HTML elements used throughout
- ARIA labels on interactive elements
- Keyboard navigation supported
- Color contrast meets WCAG AA standards

## Future Enhancements

- [ ] Dark mode toggle
- [ ] Export transactions to CSV/PDF
- [ ] Budget goals and tracking
- [ ] Multi-currency support
- [ ] Recurring transactions
- [ ] Mobile app with React Native
- [ ] Notifications and alerts
- [ ] Advanced filtering and search
- [ ] Data import from bank statements

## Contributing

This is a portfolio project, but suggestions and improvements are welcome!

## Security Best Practices

- Never commit `.env` files with sensitive data
- Keep dependencies updated
- Use HTTPS in production
- Implement Content Security Policy
- Sanitize user inputs

## License

This project is created for educational and portfolio purposes.

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review the backend README for API documentation
3. Ensure both frontend and backend are running

---

**Built with ❤️ using React and TailwindCSS**