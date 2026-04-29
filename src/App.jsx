import './App.css';

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing from './pages/landing';
import About from './pages/about';
import LoginUI from './pages/loginUI';

function App() {
    return (
        <>
            <Landing />
            <About />
            <LoginUI />
        </>
    );
}

export default App;
