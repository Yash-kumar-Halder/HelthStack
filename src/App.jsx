import './App.css';
//import Landing from './pages/landing';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Contact from './pages/contact';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Contact />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
