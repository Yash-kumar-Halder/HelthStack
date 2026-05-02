import './App.css';

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing from './pages/landing';
import About from './pages/about';
import LoginUI from './pages/loginUI';
import SignupPage from './pages/sign-up';
import Contact from './pages/contact';

function App() {
    return (
        <>
            <Landing />
            <About />
            <LoginUI />
            <SignupPage />
            <Contact />
        </>
    );
}

export default App;
