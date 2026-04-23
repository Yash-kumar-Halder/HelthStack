import React from 'react';
import './Services.css';

const Services = () => {
    return (
        <section className="services">
            <div className="services-left">
                <h2>Our Services</h2>
                <p>
                    We provide a wide range of healthcare services to ensure the best care for our
                    patients with modern technology and experienced doctors.
                </p>
            </div>

            <div className="services-right">
                <div className="service-item">General Checkup</div>
                <div className="service-item">Cardiology</div>
                <div className="service-item">Dental Care</div>
                <div className="service-item">Neurology</div>
                <div className="service-item">Emergency Service</div>
            </div>
        </section>
    );
};

export default Services;
