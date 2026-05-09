import './App.css';

import { Route, Routes, Navigate } from 'react-router-dom';

import Landing from './pages/landing';
import About from './pages/about';
import Contact from './pages/contact';
import LoginUI from './pages/loginUI';
import SignupPage from './pages/sign-up';

import Home from './pages/home';

import ProtectedLayout from './layouts/protected-layout';
import HomeLayout from './layouts/home-layout';
import HospitalDashboardLayout from './layouts/hospital-dashboard-layout';

// Admin Pages
import HospitalDashboard from './pages/hospital-dashboard';
import DoctorsDirectory from './pages/doctors-directory';
import DoctorProfile from './pages/doctor-profile';
import DoctorForm from './pages/doctor-form';

import PatientsDirectory from './pages/patients-directory';
import PatientProfile from './pages/patient-profile';
import PatientForm from './pages/patient-form';

import AppointmentsList from './pages/appointments-list';
import AppointmentBooking from './pages/appointment-booking';

import BedAvailability from './pages/bed-availability';

import UserProfile from './pages/user-profile';
import EditDoctorProfile from './pages/edit-doctor-profile';

function App() {
    return (
        <Routes>
            {/* Public Routes */}
            <Route
                index
                element={<Landing />}
            />

            <Route
                path="/login"
                element={<LoginUI />}
            />

            <Route
                path="/sign-up"
                element={<SignupPage />}
            />

            <Route
                path="/about"
                element={<About />}
            />

            <Route
                path="/contact"
                element={<Contact />}
            />

            {/* Protected Routes */}
            <Route element={<ProtectedLayout />}>
                {/* Home */}
                <Route element={<HomeLayout />}>
                    <Route
                        path="/home"
                        element={<Home />}
                    />
                </Route>

                {/* ================= Global User ================= */}
                <Route element={<HospitalDashboardLayout />}>
                    <Route
                        path="/users/:userId"
                        element={<UserProfile />}
                    />
                </Route>

                {/* ================= ADMIN ================= */}
                <Route element={<HospitalDashboardLayout />}>
                    <Route
                        path="/admin"
                        element={
                            <Navigate
                                to="/admin/dashboard"
                                replace
                            />
                        }
                    />

                    <Route
                        path="/admin/dashboard"
                        element={<HospitalDashboard />}
                    />

                    {/* Doctors */}
                    <Route
                        path="/admin/doctors"
                        element={<DoctorsDirectory />}
                    />

                    <Route
                        path="/admin/doctors/create"
                        element={<DoctorForm />}
                    />

                    <Route
                        path="/admin/doctors/:doctorId"
                        element={<DoctorProfile />}
                    />

                    <Route
                        path="/admin/doctors/:doctorId/edit"
                        element={<DoctorForm />}
                    />

                    {/* Patients */}
                    <Route
                        path="/admin/patients"
                        element={<PatientsDirectory />}
                    />

                    <Route
                        path="/admin/patients/create"
                        element={<PatientForm />}
                    />

                    <Route
                        path="/admin/patients/:patientId"
                        element={<PatientProfile />}
                    />

                    <Route
                        path="/admin/patients/:patientId/edit"
                        element={<PatientForm />}
                    />

                    {/* Appointments */}
                    <Route
                        path="/admin/appointments"
                        element={<AppointmentsList />}
                    />

                    <Route
                        path="/admin/appointments/new"
                        element={<AppointmentBooking />}
                    />

                    {/* Beds */}
                    <Route
                        path="/admin/beds"
                        element={<BedAvailability />}
                    />

                    {/* User */}
                    <Route
                        path="/admin/users/:userId"
                        element={<UserProfile />}
                    />

                    <Route
                        path="/admin/profile"
                        element={<UserProfile />}
                    />
                </Route>

                {/* ================= DOCTOR ================= */}
                <Route element={<HospitalDashboardLayout />}>
                    <Route
                        path="/doctor"
                        element={
                            <Navigate
                                to="/doctor/dashboard"
                                replace
                            />
                        }
                    />

                    <Route
                        path="/doctor/dashboard"
                        element={<HospitalDashboard />}
                    />

                    <Route
                        path="/doctor/appointments"
                        element={<AppointmentsList />}
                    />

                    <Route
                        path="/doctor/patients"
                        element={<PatientsDirectory />}
                    />

                    <Route
                        path="/doctor/profile/create"
                        element={<DoctorForm />}
                    />

                    <Route
                        path="/doctor/profile/:doctorId"
                        element={<DoctorProfile />}
                    />
                    <Route
                        path="/doctor/profile/:doctorId/edit"
                        element={<EditDoctorProfile />}
                    />

                    <Route
                        path="/doctor/users/:userId"
                        element={<UserProfile />}
                    />
                </Route>

                {/* ================= PATIENT ================= */}
                <Route element={<HospitalDashboardLayout />}>
                    <Route
                        path="/patient"
                        element={
                            <Navigate
                                to="/patient/dashboard"
                                replace
                            />
                        }
                    />

                    <Route
                        path="/patient/dashboard"
                        element={<HospitalDashboard />}
                    />

                    <Route
                        path="/patient/appointments"
                        element={<AppointmentsList />}
                    />

                    <Route
                        path="/patient/profile"
                        element={<UserProfile />}
                    />

                    <Route
                        path="/patient/users/:userId"
                        element={<UserProfile />}
                    />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
