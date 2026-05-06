import React from 'react';

const About = () => {
    return (
        <div className="bg-neutral-100 min-h-screen py-12 px-6">
            {/* Heading Section */}
            <div className="w-2/3 mx-auto mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                    Built on Care, Driven by People,
                    <br />
                    <span className="text-green-500">Focused on Health</span>
                </h1>
            </div>

            {/* Content Section */}
            <div className="w-2/3 mx-auto grid md:grid-cols-3 gap-6 mt-10">
                {/* Card */}
                <div className="bg-blue-600 text-white px-5 py-3 rounded-lg shadow-lg flex flex-col justify-end min-h-38">
                    <h2 className="text-4xl font-bold">10+</h2>
                    <p className="text-xl">AI based Technology</p>
                </div>

                {/* Card */}
                <div className="bg-linear-to-r from-purple-600 to-pink-500 text-white px-5 py-3 rounded-lg shadow-lg flex flex-col justify-end min-h-38">
                    <h2 className="text-4xl font-bold">5+</h2>
                    <p className="text-xl">Modern Technologies</p>
                </div>

                {/* Card */}
                <div className="bg-indigo-500 text-white px-5 py-3 rounded-lg shadow-lg flex flex-col justify-end min-h-38">
                    <h2 className="text-4xl font-bold">200+</h2>
                    <p className="text-xl">Medical Staff</p>
                </div>

                {/* Card */}
                <div className="bg-purple-500 text-white px-5 py-3 rounded-lg shadow-lg flex flex-col justify-end min-h-38">
                    <h2 className="text-4xl font-bold">5000+</h2>
                    <p className="text-xl">Patients Served</p>
                </div>

                {/* Card */}
                <div className="bg-blue-500 text-white px-5 py-3 rounded-lg shadow-lg flex flex-col justify-end min-h-38">
                    <h2 className="text-4xl font-bold">24x7</h2>
                    <p className="text-xl">Services</p>
                </div>

                {/* Card */}
                <div className="bg-blue-700 text-white px-5 py-3 rounded-lg shadow-lg flex flex-col justify-end min-h-38">
                    <h2 className="text-4xl font-bold">1M+</h2>
                    <p className="text-xl">Happy Patients</p>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="max-w-5xl mx-auto mt-16 text-center">
                <p className="text-gray-600 text-lg">
                    Our Hospital Management System is designed to streamline operations, enhance
                    patient care, and provide seamless coordination between doctors, staff, and
                    patients. We focus on delivering efficient, reliable, and compassionate
                    healthcare services.
                </p>
            </div>
        </div>
    );
};

export default About;
