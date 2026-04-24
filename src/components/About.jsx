import React from 'react';
import './About.css';

const About = () => {
    return (
        <section className="about">
            <div className="about-image">
                <img
                    src="/images/doctor-about.png"
                    alt="doctor"
                />
            </div>

            <div className="about-text">
                <h2>About Us</h2>

                <p>
                    We are a trusted healthcare platform dedicated to providing quality medical
                    services with experienced doctors and modern technology. Our goal is to make
                    healthcare simple, fast and accessible.
                </p>

                <p>
                    From online consultation to emergency support, we ensure that every patient gets
                    the best care at the right time.
                </p>

                <button className="about-btn">Learn More</button>
            </div>
        </section>
    );
};

export default About;
