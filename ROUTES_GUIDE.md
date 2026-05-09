# Hospital Management System - Route Guide

## Dashboard Routes

### Main Dashboard

- **`/dashboard`** - Hospital Dashboard with overview statistics

### Doctor Management

- **`/dashboard/doctors`** - Doctors Directory with list and search
- **`/dashboard/doctors/create`** - Create new doctor profile
- **`/dashboard/doctors/:doctorId`** - View doctor profile
- **`/dashboard/doctors/:doctorId/edit`** - Edit doctor profile

### Patient Management

- **`/dashboard/patients`** - Patients Directory with list and search
- **`/dashboard/patients/create`** - Create new patient profile
- **`/dashboard/patients/:patientId`** - View patient profile and history
- **`/dashboard/patients/:patientId/edit`** - Edit patient profile

### Appointment Management

- **`/dashboard/appointments`** - List all appointments and admissions
- **`/dashboard/appointments/new`** - Book new appointment

### Bed Management

- **`/dashboard/beds`** - Bed availability dashboard with real-time status

## Quick Start Guide

### Step 1: Access Dashboard

1. Login with your credentials
2. Navigate to `/dashboard`
3. You'll see the Hospital Dashboard with statistics

### Step 2: Add First Doctor

1. Click "Add Doctor" button or go to `/dashboard/doctors/create`
2. Fill in doctor details:
    - Full Name
    - Email
    - Phone
    - Department
    - Specialization
    - License Number
    - Years of Experience
    - Qualifications
    - Status (Active/Inactive/On Leave)
3. Submit the form
4. Doctor will appear in the directory

### Step 3: Register Patient

1. Navigate to `/dashboard/patients`
2. Click "New Patient" or go to `/dashboard/patients/create`
3. Fill in patient details:
    - First Name & Last Name
    - Email & Phone
    - Date of Birth
    - Gender
    - Blood Type
    - Address
    - Medical History (optional)
    - Allergies (can add multiple)
4. Submit the form
5. Patient will be registered

### Step 4: Book Appointment

1. Go to `/dashboard/appointments/new`
2. Fill appointment details:
    - Select Patient
    - Select Doctor
    - Select Ward
    - Select Available Bed (bed list updates based on ward)
    - Set Appointment Date & Time
    - Provide Reason for Admission
    - Add Clinical Notes (optional)
3. Submit booking
4. Appointment will appear in appointments list

### Step 5: Check Bed Availability

1. Navigate to `/dashboard/beds`
2. View real-time bed statistics
3. Filter by:
    - Ward
    - Room
    - Status (Available/Occupied/Maintenance)
4. Quick book from bed cards

## State Management

### Redux Store Structure

```
store = {
  auth: { user, isAuthenticated },
  doctors: { doctors[], currentDoctor, loading, error },
  patients: { currentPatient, patientAdmissions[], loading, error },
  admissions: { admissions[], currentAdmission, loading, error },
  beds: { beds[], availableBeds[], currentBed, loading, error },
  wards: { wards[], currentWard, loading, error },
  rooms: { rooms[], currentRoom, loading, error }
}
```

## API Endpoints Reference

### Doctors

```
GET    /api/doctors                 - Get all doctors
GET    /api/doctors/:doctorId       - Get single doctor
POST   /api/doctors                 - Create doctor
PATCH  /api/doctors/:doctorId       - Update doctor
DELETE /api/doctors/:doctorId       - Delete doctor
```

### Patients

```
POST   /api/patients                       - Create patient
GET    /api/patients/:patientId            - Get patient
GET    /api/patients/:patientId/admissions - Get patient admissions
PATCH  /api/patients/:patientId            - Update patient
DELETE /api/patients/:patientId            - Delete patient
```

### Admissions

```
POST   /api/admissions                        - Create admission
GET    /api/admissions/:admissionId          - Get admission
PATCH  /api/admissions/:admissionId/discharge - Discharge patient
```

### Beds

```
GET    /api/beds/availability              - Get available beds
GET    /api/beds                           - Get all beds
GET    /api/beds/:bedId                    - Get single bed
POST   /api/beds                           - Create bed
PATCH  /api/beds/:bedId                    - Update bed
DELETE /api/beds/:bedId                    - Delete bed
```

## Page Components Reference

### Dashboard Layout

- **File**: `src/layouts/hospital-dashboard-layout.jsx`
- **Features**: Sidebar navigation, header with user menu, mobile responsiveness

### Hospital Dashboard

- **File**: `src/pages/hospital-dashboard.jsx`
- **Features**: Statistics, quick actions, activity summary

### Doctor Pages

- **Directory**: `src/pages/doctors-directory.jsx`
- **Profile**: `src/pages/doctor-profile.jsx`
- **Form**: `src/pages/doctor-form.jsx`

### Patient Pages

- **Directory**: `src/pages/patients-directory.jsx`
- **Profile**: `src/pages/patient-profile.jsx`
- **Form**: `src/pages/patient-form.jsx`

### Appointment Pages

- **List**: `src/pages/appointments-list.jsx`
- **Booking**: `src/pages/appointment-booking.jsx`

### Bed Pages

- **Availability**: `src/pages/bed-availability.jsx`

## Redux Slices Reference

### Doctors Slice

```javascript
import {
    fetchDoctors,
    createNewDoctor,
    fetchDoctorById,
    updateDoctorProfile,
    deleteDoctorProfile,
} from './feature/doctors/doctors.slice';
```

### Patients Slice

```javascript
import {
    createNewPatient,
    fetchPatientById,
    fetchPatientAdmissions,
    updatePatientProfile,
} from './feature/patients/patients.slice';
```

### Admissions Slice

```javascript
import {
    createNewAdmission,
    fetchAdmissionById,
    dischargePatientAdmission,
} from './feature/admissions/admissions.slice';
```

### Beds Slice

```javascript
import {
    fetchBedAvailability,
    fetchBeds,
    createNewBed,
    updateBedInfo,
} from './feature/beds/beds.slice';
```

## UI Components Available

- **Button**: `<Button variant="default|outline|ghost|destructive" size="sm|md|lg" />`
- **Input**: `<Input type="text|email|date|datetime-local|tel" />`
- **Card**: `<Card><CardHeader><CardTitle></CardTitle></CardHeader><CardContent></CardContent></Card>`
- **Badge**: `<Badge variant="default|secondary|destructive|outline" />`
- **Select**: `<Select><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem /></SelectContent></Select>`
- **Textarea**: `<Textarea rows={number} />`
- **Label**: `<Label htmlFor="id">Label Text</Label>`
- **Separator**: `<Separator />`
- **Sheet**: `<Sheet><SheetTrigger /><SheetContent /></Sheet>`
- **DropdownMenu**: `<DropdownMenu><DropdownMenuTrigger /><DropdownMenuContent></DropdownMenuContent></DropdownMenu>`

## Troubleshooting

### Dependencies Not Found

If you get "module not found" errors:

```bash
npm install @radix-ui/react-dropdown-menu @radix-ui/react-label @radix-ui/react-select
```

### Redux Not Working

Make sure the store is properly configured in `src/app/store.js` and the `PersistGate` wrapper is used in `main.jsx`

### API Connection Issues

- Check that the backend is running on port 3000
- Verify the API base URL in `src/api/axios.js`
- Check network tab in browser DevTools

## Performance Tips

1. Use `useCallback` for event handlers in lists
2. Memoize expensive components with `React.memo`
3. Use lazy loading for routes with `React.lazy`
4. Implement virtual scrolling for long lists
5. Cache API responses in Redux

## Security Considerations

- Keep tokens secure in localStorage (already handled by token.service.js)
- Always validate user input on the client side
- Use protected routes for sensitive pages
- Implement rate limiting for API calls
- Use HTTPS in production

---

**For more information, see HOSPITAL_FEATURES.md**
