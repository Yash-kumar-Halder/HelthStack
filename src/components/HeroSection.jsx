import React from 'react';
import './Herosection.css';

const HeroSection = () => {
    return (
        <div className="hero">
            <div className="hero-text">
                <h1>
                    Take Care of Your <br />
                    <span>Health in Time</span>
                </h1>
                <p>
                    Connect with trusted healthcare professionals anytime, anywhere with our
                    easy-to-use mobile app
                </p>
                <button className="download-btn">Get Appointment </button>
            </div>

            <div className="hero-image">
                <img
                    src={'/images/doctor.png'}
                    alt="doctor"
                />
            </div>
        </div>
    );
};

export default HeroSection;
