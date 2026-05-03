import './App.css';

import Landing from './pages/landing';
import About from './pages/about';
import LoginUI from './pages/loginUI';
import useLenisScroll from './lib/lenis';
import { Route, Routes } from 'react-router-dom';
import SignupPage from './pages/sign-up';
import Contact from './pages/contact';

function App() {
    useLenisScroll();
    return (
        <>
            <Routes>
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
            </Routes>
        </>
    );
}

export default App;
