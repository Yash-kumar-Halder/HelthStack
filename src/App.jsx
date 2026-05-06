import './App.css';

import Landing from './pages/landing';
import About from './pages/about';
import LoginUI from './pages/loginUI';
import SignupPage from './pages/sign-up';
import Contact from './pages/contact';

import useLenisScroll from './lib/lenis';

import { Route, Routes } from 'react-router-dom';

import AuthProvider from './providers/auth.provider';
import DashboardLayout from './layouts/dashboard-layout';
import HomeLayout from './layouts/home-layout';
import Home from './pages/home';
import Navigation from './components/navigation';

function App() {
    useLenisScroll();

    return (
        <AuthProvider>
            <Routes>
                <Route element={<Navigation />}>
                    <Route
                        index
                        element={<Landing />}
                    />

                    <Route
                        path="/login"
                        element={<LoginUI />}
                    />

                    <Route
                        path="/about"
                        element={<About />}
                    />

                    <Route
                        path="/contact"
                        element={<Contact />}
                    />

                    <Route
                        path="/sign-up"
                        element={<SignupPage />}
                    />

                    <Route element={<DashboardLayout />}>
                        <Route
                            path="/dashboard"
                            element={<h1>Dashboard</h1>}
                        />
                    </Route>
                    <Route element={<HomeLayout />}>
                        <Route
                            path="/home"
                            element={<Home />}
                        />
                    </Route>
                </Route>
            </Routes>
        </AuthProvider>
    );
}

export default App;
