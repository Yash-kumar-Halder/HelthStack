import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Logo + description */}
                <div className="footer-box">
                    <h2>Health Stack</h2>
                    <p>
                        Your trusted healthcare platform for online consultation, appointments, and
                        emergency support.
                    </p>
                </div>

                {/* Links */}
                <div className="footer-box">
                    <h3>Quick Links</h3>
                    <a href="#">Home</a>
                    <a href="#">Services</a>
                    <a href="#">About</a>
                    <a href="#">Contact</a>
                </div>

                {/* Contact */}
                <div className="footer-box">
                    <h3>Contact</h3>
                    <p>Email: support@helthstack.com</p>
                    <p>Phone: +91 98765 43210</p>
                    <p>Location: India</p>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© 2026 Health stack. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
