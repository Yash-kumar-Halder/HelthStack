# Hospital Management System - Setup Guide

## Installation Instructions

### Prerequisites

- Node.js 16.x or higher
- npm 7.x or higher
- Git (for version control)

### Step 1: Install Dependencies

```bash
# Navigate to client directory
cd client

# Install npm packages
npm install

# Install additional Radix UI packages (if npm install didn't cover them)
npm install @radix-ui/react-dropdown-menu @radix-ui/react-label @radix-ui/react-select
```

### Step 2: Verify Installation

After installation, verify that all packages are installed:

```bash
# Check if all dependencies are installed
npm list @radix-ui/react-dropdown-menu @radix-ui/react-label @radix-ui/react-select
```

### Step 3: Start Development Server

```bash
# Start the development server
npm run dev

# The application will be available at http://localhost:5173
```

### Step 4: Build for Production

```bash
# Build the production bundle
npm run build

# Preview the production build locally
npm run preview
```

## Backend Setup

Ensure the backend server is running:

```bash
# Navigate to server directory
cd server

# Install backend dependencies
npm install

# Start the backend server (should run on http://localhost:3000)
npm run dev
```

## Environment Configuration

The client is configured to connect to the backend at `http://localhost:3000/api`.

**Location**: `src/api/axios.js`

If your backend runs on a different port, update:

```javascript
const api = axios.create({
    baseURL: 'http://localhost:YOUR_PORT/api',
    // ...
});
```

## Project Structure Overview

```
client/
├── src/
│   ├── api/                    # API services
│   ├── app/                    # Redux store
│   ├── components/             # React components
│   ├── feature/                # Redux slices
│   ├── layouts/                # Layout components
│   ├── lib/                    # Utilities
│   ├── pages/                  # Page components
│   ├── App.jsx                 # Main app component
│   ├── App.css                 # Global styles
│   ├── main.jsx                # Entry point
│   └── index.css               # Global CSS
├── public/                     # Static assets
├── package.json                # Dependencies
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind CSS config
├── HOSPITAL_FEATURES.md        # Feature documentation
├── ROUTES_GUIDE.md             # Route reference
└── SETUP.md                    # This file
```

## Key Files and Their Purposes

| File                 | Purpose                    |
| -------------------- | -------------------------- |
| `src/main.jsx`       | Application entry point    |
| `src/App.jsx`        | Main routing configuration |
| `src/app/store.js`   | Redux store setup          |
| `src/api/axios.js`   | API client configuration   |
| `tailwind.config.js` | Tailwind CSS customization |
| `vite.config.js`     | Vite bundler configuration |

## Common Commands

### Development

```bash
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Run ESLint
npm run format:fix       # Format code with Prettier
npm run format:check     # Check code formatting
```

### Debugging

```bash
# Run with debug logging
DEBUG=* npm run dev

# Open DevTools in browser
# Press F12 or Right-click > Inspect
```

## Troubleshooting

### Issue: Port 5173 Already in Use

```bash
# Find and kill the process using port 5173
# On Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# On Mac/Linux:
lsof -i :5173
kill -9 <PID>

# Or use a different port:
npm run dev -- --port 5174
```

### Issue: Dependencies Not Installed

```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Issue: API Connection Errors

1. Verify backend is running: `http://localhost:3000`
2. Check CORS configuration on backend
3. Verify API endpoint in `src/api/axios.js`
4. Check browser console for specific error messages

### Issue: Redux DevTools Not Working

```bash
# Install Redux DevTools Extension for your browser
# Chrome: https://chrome.google.com/webstore/detail/redux-devtools/lmjabpmokfj...
# Firefox: https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/
```

### Issue: Tailwind CSS Not Applying

```bash
# Rebuild Tailwind CSS
npx tailwindcss -i ./src/index.css -o ./src/output.css

# Or clear cache and restart
rm -rf ./.next
npm run dev
```

## Testing the Installation

1. **Navigate to Dashboard**
    - Go to `http://localhost:5173/dashboard`

2. **Try Adding a Doctor**
    - Click "Add Doctor"
    - Fill in sample data
    - Submit form
    - Doctor should appear in directory

3. **Try Adding a Patient**
    - Go to Patients section
    - Click "New Patient"
    - Fill in sample data
    - Submit form

4. **Try Booking an Appointment**
    - Go to Appointments
    - Click "Book Appointment"
    - Select doctor and patient
    - Select bed
    - Book appointment

## Performance Optimization

### Build Optimization

```bash
# Analyze bundle size
npm run build -- --analyze

# Use production mode for faster builds
npm run build
```

### Development Tips

1. Use React DevTools browser extension
2. Use Redux DevTools for state debugging
3. Use Lighthouse for performance audits
4. Monitor network requests in DevTools

## IDE Setup

### VS Code Extensions (Recommended)

- **ES7+ React/Redux/React-Native snippets** by dsznajder.es7-react-js-snippets
- **Prettier - Code formatter** by esbenp.prettier-vscode
- **ESLint** by dbaeumer.vscode-eslint
- **Tailwind CSS IntelliSense** by bradlc.vscode-tailwindcss
- **Redux DevTools** by jswanson.vscode-redux

### VS Code Settings

```json
{
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    }
}
```

## Production Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify

```bash
# Build first
npm run build

# Then drag the 'dist' folder to Netlify
```

### Deploy to Custom Server

```bash
# Build the project
npm run build

# Copy 'dist' folder to your server
# Configure your server to serve index.html for all routes
```

## Environment Variables

Create a `.env` file in the client directory (if needed):

```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=HealthStack Hospital
```

Use in code:

```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

## Version Control Setup

```bash
# Initialize git (if not done)
git init

# Add all files
git add .

# Initial commit
git commit -m "Initial hospital management system commit"

# Add remote repository
git remote add origin <your-repo-url>

# Push to repository
git push -u origin main
```

## Documentation

- **Feature Documentation**: See `HOSPITAL_FEATURES.md`
- **Route Guide**: See `ROUTES_GUIDE.md`
- **API Documentation**: See `docs/API-HOSPITAL.md` in the server

## Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Review the console for error messages
3. Check the Redux DevTools for state issues
4. Look at network requests in browser DevTools
5. Consult the documentation files

## Next Steps

After setup:

1. ✅ Verify the backend is running
2. ✅ Start the development server
3. ✅ Access the dashboard
4. ✅ Test creating doctors and patients
5. ✅ Test booking appointments
6. ✅ Explore all features

---

**Happy coding! 🎉**

For more information, refer to:

- HOSPITAL_FEATURES.md - Feature overview
- ROUTES_GUIDE.md - Route reference
- Backend README.md - Backend documentation
