import React from 'react';
import Navigation from './Navigation';
import Services from './Services';

const Home = () => {
    return (
        <div className="relative w-full min-h-screen bg-[#EFFFFD] overflow-hidden">
            {/* Navbar */}
            <Navigation />

            {/* Content */}
            <div className="flex flex-col md:flex-row items-center justify-between px-10 md:px-20 pt-32">
                {/* LEFT */}
                <div className="max-w-xl z-10">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight mb-6">
                        We Provide Quality <br />
                        <span className="text-teal-600">Healthcare</span> For You
                    </h1>

                    <p className="text-gray-600 text-lg mb-8">
                        Our medical center is committed to providing advanced healthcare services
                        with modern technology and experienced doctors.
                    </p>

                    <div className="flex gap-4">
                        <button className="px-6 py-3 rounded-full bg-teal-600 text-white transition-all duration-300 ease-in-out hover:bg-teal-700 hover:scale-105 hover:shadow-lg active:scale-95">
                            Get Appointment
                        </button>

                        <button className="px-6 py-3 rounded-full border border-gray-300 bg-white text-gray-700 transition-all duration-300 ease-in-out hover:border-teal-600 hover:text-teal-600 hover:shadow-md active:scale-95">
                            Learn More
                        </button>
                    </div>
                </div>
                {/* RIGHT */}
                <div className="relative mt-16 md:mt-0 flex flex-col items-center">
                    {/* STATS*/}
                    <div className="relative mt-16 md:mt-0 flex justify-center items-center">
                        {/* Background */}
                        <div className="absolute w-[420px] h-[420px] bg-teal-200 rounded-full blur-3xl opacity-60"></div>

                        {/* Wrapper */}
                        <div className="relative">
                            {/* Doctor Image */}
                            <img
                                src="/images/doctor.png"
                                alt="doctor"
                                className="w-[380px] md:w-[750px] relative z-10"
                            />

                            {/* Stats OVER IMAGE */}
                            <div className="absolute left-1/2 -translate-x-1/2 bottom-[-30px] z-20 w-[90%] md:w-[900px]">
                                <div className="flex items-center justify-center gap-30 bg-teal/50 backdrop-blur-md px-8 py-8 rounded-full text-white">
                                    <div className="text-center">
                                        <h2 className="text-2xl font-bold text-teal-400">500+</h2>
                                        <p className="text-2xl">Doctors</p>
                                    </div>

                                    <div className="text-center">
                                        <h2 className="text-2xl font-bold text-teal-400">10k+</h2>
                                        <p className="text-2xl">Patients</p>
                                    </div>

                                    <div className="text-center">
                                        <h2 className="text-2xl font-bold text-teal-400">50+</h2>
                                        <p className="text-2xl">Clinics</p>
                                    </div>

                                    <div className="text-center">
                                        <h2 className="text-2xl font-bold text-teal-400">4.9</h2>
                                        <p className="text-2xl">Rating</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Services />
        </div>
    );
};

export default Home;
