import React from 'react';
import './Stats.css';

const Stats = () => {
    return (
        <section className="stats">
            <div className="stat">
                <h2>100+</h2>
                <p>Doctors</p>
            </div>

            <div className="stat">
                <h2>10K+</h2>
                <p>Patients</p>
            </div>

            <div className="stat">
                <h2>50+</h2>
                <p>Hospitals</p>
            </div>

            <div className="stat">
                <h2>24/7</h2>
                <p>Support</p>
            </div>
        </section>
    );
};

export default Stats;
