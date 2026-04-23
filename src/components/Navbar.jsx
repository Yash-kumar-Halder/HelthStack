import React from 'react';
import './Navbar.css';

const Navbar = () => {
    return (
        <div className="container">
            <header className="navbar">
                <h2 className="logo">Health Stack</h2>
                <nav>
                    <a href="#">Home</a>
                    <a href="#">Service</a>
                    <a href="#">Find Doctor</a>
                    <a href="#">Health Records</a>
                    <a href="#">My care</a>
                </nav>
                <button className="btn">Login</button>
            </header>
        </div>
    );
};

export default Navbar;
