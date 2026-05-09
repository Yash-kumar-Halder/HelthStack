# Hospital Management System - Frontend Documentation

## Overview

A comprehensive, modern, and professional hospital management system built with React, Redux, and shadCN UI. This application provides a complete solution for managing doctors, patients, appointments, and bed availability in a hospital environment.

## Features Implemented

### 1. **Doctor Management**

- **Doctor Directory**: View all doctors with filtering by department and status
- **Doctor Profile**: Detailed view of doctor information including specialization, license, experience, and bio
- **Create/Edit Doctor**: Add new doctors or update existing doctor profiles
- **Search & Filter**: Search by name/email and filter by department and status

### 2. **Patient Management**

- **Patient Directory**: Browse all registered patients with search functionality
- **Patient Profile**: Comprehensive patient profile including:
    - Personal details (age, gender, blood type)
    - Contact information
    - Medical history
    - Allergies
    - Admission history
- **Create/Edit Patient**: Register new patients or update existing information
- **Allergy Management**: Add/remove multiple allergies per patient

### 3. **Appointment Booking**

- **Book Appointments**: Create new appointments with:
    - Patient selection
    - Doctor assignment
    - Ward and bed selection
    - Appointment date and time
    - Reason for admission
    - Clinical notes
- **Real-time Bed Availability**: See available beds as you select a ward
- **Appointment List**: View all appointments with status tracking
- **Admission History**: Track patient admission and discharge dates

### 4. **Bed Availability Management**

- **Availability Dashboard**: Real-time overview of bed status
- **Filter by Ward & Room**: Find beds by location
- **Status Tracking**: View bed status (Available, Occupied, Maintenance)
- **Statistical Overview**: Total, available, and occupied bed counts
- **Quick Actions**: Book beds directly from availability view

### 5. **Dashboard**

- **Hospital Dashboard**: Overview page with key statistics
- **Quick Actions**: Fast access to common operations
- **Activity Summary**: Recent doctors and bed status information
- **Navigation Menu**: Intuitive sidebar with all major features

## Project Architecture

### File Structure

```
src/
├── api/                          # API Service Calls
│   ├── doctors.api.js            # Doctor endpoints
│   ├── patients.api.js           # Patient endpoints
│   ├── admissions.api.js         # Appointment/Admission endpoints
│   ├── beds.api.js               # Bed management endpoints
│   ├── wards.api.js              # Ward management endpoints
│   ├── rooms.api.js              # Room management endpoints
│   ├── auth.api.js               # Authentication
│   ├── axios.js                  # Axios configuration
│   └── token.service.js          # Token management
│
├── app/
│   └── store.js                  # Redux store configuration
│
├── feature/                      # Redux Slices
│   ├── auth/
│   │   └── auth.slice.js
│   ├── doctors/
│   │   └── doctors.slice.js
│   ├── patients/
│   │   └── patients.slice.js
│   ├── admissions/
│   │   └── admissions.slice.js
│   ├── beds/
│   │   └── beds.slice.js
│   ├── wards/
│   │   └── wards.slice.js
│   └── rooms/
│       └── rooms.slice.js
│
├── pages/                        # Page Components
│   ├── hospital-dashboard.jsx
│   ├── doctors-directory.jsx
│   ├── doctor-profile.jsx
│   ├── doctor-form.jsx
│   ├── patients-directory.jsx
│   ├── patient-profile.jsx
│   ├── patient-form.jsx
│   ├── appointment-booking.jsx
│   ├── appointments-list.jsx
│   ├── bed-availability.jsx
│   └── ...
│
├── layouts/
│   ├── hospital-dashboard-layout.jsx
│   ├── dashboard-layout.jsx
│   ├── protected-layout.jsx
│   └── ...
│
├── components/
│   ├── ui/                       # shadCN UI Components
│   │   ├── button.jsx
│   │   ├── input.jsx
│   │   ├── card.jsx
│   │   ├── badge.jsx
│   │   ├── label.jsx
│   │   ├── textarea.jsx
│   │   ├── select.jsx
│   │   ├── dropdown-menu.jsx
│   │   ├── separator.jsx
│   │   ├── sheet.jsx
│   │   └── ...
│   └── ...
│
└── App.jsx                       # Main routing configuration
```

## Technology Stack

- **Frontend Framework**: React 19.2.4
- **State Management**: Redux Toolkit 2.11.2
- **UI Components**: shadCN UI with Tailwind CSS 4.2.2
- **HTTP Client**: Axios 1.16.0
- **Form Management**: React Hook Form 7.75.0
- **Routing**: React Router 7.14.2
- **Icons**: Lucide React 1.11.0, Hugeicons
- **Notifications**: Sonner 2.0.7
- **CSS**: Tailwind CSS with Class Variance Authority

## Installation & Setup

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation Steps

```bash
# Install dependencies
npm install

# Install additional Radix UI packages (if not already installed)
npm install @radix-ui/react-dropdown-menu @radix-ui/react-label @radix-ui/react-select

# Start development server
npm run dev

# Build for production
npm run build
```

## API Integration

All pages are connected to the backend API with the following endpoints:

### Doctors

- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:doctorId` - Get single doctor
- `POST /api/doctors` - Create doctor
- `PATCH /api/doctors/:doctorId` - Update doctor
- `DELETE /api/doctors/:doctorId` - Delete doctor

### Patients

- `POST /api/patients` - Create patient
- `GET /api/patients/:patientId` - Get patient
- `GET /api/patients/:patientId/admissions` - Get patient admissions
- `PATCH /api/patients/:patientId` - Update patient
- `DELETE /api/patients/:patientId` - Delete patient

### Admissions (Appointments)

- `POST /api/admissions` - Create admission
- `GET /api/admissions/:admissionId` - Get admission details
- `PATCH /api/admissions/:admissionId/discharge` - Discharge patient

### Beds

- `GET /api/beds/availability` - Get available beds
- `GET /api/beds` - Get all beds
- `GET /api/beds/:bedId` - Get bed details
- `POST /api/beds` - Create bed
- `PATCH /api/beds/:bedId` - Update bed

### Wards & Rooms

- Similar REST endpoints for ward and room management

## Redux State Management

Each feature module has its own Redux slice with:

- **Async Thunks**: Handle API calls
- **Reducers**: Manage state updates
- **Selectors**: Access state from components
- **Error Handling**: Centralized error management

### Example Usage:

```javascript
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctors } from '../feature/doctors/doctors.slice';

function MyComponent() {
  const dispatch = useDispatch();
  const { doctors, loading, error } = useSelector(state => state.doctors);

  useEffect(() => {
    dispatch(fetchDoctors({}));
  }, [dispatch]);

  return (
    // Component JSX
  );
}
```

## UI Components

All UI components are built with shadCN UI and Tailwind CSS:

- **Button**: Multiple variants (default, outline, ghost, destructive)
- **Input**: Text input fields with validation support
- **Card**: Container component with header, content, footer
- **Badge**: Status indicators with multiple variants
- **Select**: Dropdown selector with search support
- **Textarea**: Multi-line text input
- **Separator**: Visual divider
- **Sheet**: Mobile-friendly side drawer
- **DropdownMenu**: Context menus with radio/checkbox items
- **Label**: Form labels with accessibility

## Styling & Design

- **Color Scheme**: Professional blue/green/red accent colors
- **Typography**: Clean, readable font hierarchy
- **Spacing**: Consistent padding and margins
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Animations**: Smooth transitions and loading states
- **Dark Mode Support**: Full dark mode compatibility with next-themes

## Key Features Details

### 1. Doctors Directory

- Real-time search and filtering
- Department and status filtering
- Grid or list view options
- Quick access to doctor profiles

### 2. Patient Management

- Comprehensive patient data capture
- Blood type selection
- Medical history and allergies tracking
- Admission history view

### 3. Appointment Booking

- Multi-step form for better UX
- Real-time bed availability
- Doctor and ward selection
- Automatic bed status update on booking

### 4. Bed Availability

- Statistical dashboard
- Visual status indicators
- Ward and room filtering
- Occupancy metrics

## Error Handling

- API error messages displayed to users
- Form validation errors with field-level feedback
- Toast notifications for success/error states
- Fallback UI for loading and error states

## Performance Optimizations

- Redux state caching
- Lazy loading of components
- Image optimization
- Efficient re-renders with memoization
- API call deduplication

## Security Features

- Protected routes with authentication
- JWT token management
- Request interceptors for auth headers
- Secure token storage
- CORS configuration

## Future Enhancements

- Export data to PDF/Excel
- Advanced reporting dashboard
- Real-time notifications
- Video consultations integration
- Mobile app (React Native)
- Role-based access control (RBAC)
- Advanced analytics and metrics
- Prescription management
- Medical records digitalization

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request
4. Follow the code style guidelines

## Support & Documentation

For detailed API documentation, see: `/docs/API-HOSPITAL.md`

---

**Built with ❤️ using React, Redux, and shadCN UI**
