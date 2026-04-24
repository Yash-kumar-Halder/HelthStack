import React from 'react';
import './Features.css';

const Features = () => {
    return (
        <section className="features">
            <div className="features-container">
                <div className="feature-card">
                    <div className="icon">🩺</div>
                    <h3>Online Consultation</h3>
                    <p>Connect with certified doctors anytime from your home.</p>
                </div>

                <div className="feature-card">
                    <div className="icon">📅</div>
                    <h3>Easy Appointment</h3>
                    <p>Book appointments quickly without long waiting times.</p>
                </div>

                <div className="feature-card">
                    <div className="icon">💊</div>
                    <h3>Digital Prescription</h3>
                    <p>Get prescriptions directly on your phone instantly.</p>
                </div>

                <div className="feature-card">
                    <div className="icon">🚑</div>
                    <h3>24/7 Emergency</h3>
                    <p>Immediate support for urgent medical situations.</p>
                </div>
            </div>
        </section>
    );
};

export default Features;
