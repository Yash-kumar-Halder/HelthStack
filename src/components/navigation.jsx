import React, { useState } from 'react';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [openDoctor, setOpenDoctor] = useState(false);

    return (
        <nav className="absolute top-0 left-0 w-full flex items-center justify-between px-10 py-5 z-50">
            {/* Logo */}
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center">
                    <img
                        src="/images/Health_stack_logo.png"
                        alt="logo"
                        className="w-full h-full object-contain"
                    />
                </div>
                <h1 className="text-xl font-semibold text-gray-800">HealthStack</h1>
            </div>

            {/* Menu */}
            <ul className="hidden md:flex items-center gap-4 text-gray-700 font-medium">
                {/* Active */}
                <li className="px-4 py-2 rounded-full cursor-pointer bg-transparent transition-all duration-300 ease-in-out hover:bg-teal-600 hover:text-white">
                    Home
                </li>

                <li
                    className="relative"
                    onMouseEnter={() => setOpenDoctor(true)}
                    onMouseLeave={() => setOpenDoctor(false)}
                >
                    <div className="px-4 py-2 rounded-full cursor-pointer bg-transparent transition-all duration-300 ease-in-out hover:bg-teal-600 hover:text-white">
                        Find Doctor ▾
                    </div>

                    {openDoctor && (
                        <div className="absolute top-full left-0 pt-2 w-56">
                            <div className="bg-white shadow-lg rounded-xl py-2">
                                <p className="px-4 py-2 hover:bg-teal-200 cursor-pointer">
                                    By Specialty
                                </p>
                                <p className="px-4 py-2 hover:bg-teal-200 cursor-pointer">
                                    By Location
                                </p>
                                <p className="px-4 py-2 hover:bg-teal-200 cursor-pointer">
                                    By Experience
                                </p>
                                <p className="px-4 py-2 hover:bg-teal-200 cursor-pointer">
                                    Available Today
                                </p>
                            </div>
                        </div>
                    )}
                </li>

                {/* Dropdown */}
                <div
                    className="relative"
                    onMouseEnter={() => setOpen(true)}
                    onMouseLeave={() => setOpen(false)}
                >
                    <div className="px-4 py-2 rounded-full cursor-pointer bg-transparent transition-all duration-300 ease-in-out hover:bg-teal-600 hover:text-white">
                        Services ▾
                    </div>

                    {open && (
                        <div className="absolute top-full left-0 w-52 bg-white shadow-lg rounded-xl py-2">
                            <p className="px-4 py-2 hover:bg-teal-200 cursor-pointer">
                                General Checkup
                            </p>
                            <p className="px-4 py-2 hover:bg-teal-200 cursor-pointer">Cardiology</p>
                            <p className="px-4 py-2 hover:bg-teal-200 cursor-pointer">
                                Dental Care
                            </p>
                            <p className="px-4 py-2 hover:bg-teal-200 cursor-pointer">Neurology</p>
                            <p className="px-4 py-2 hover:bg-teal-200 cursor-pointer">Emergency</p>
                        </div>
                    )}
                </div>

                <li className="px-4 py-2 rounded-full cursor-pointer bg-transparent transition-all duration-300 ease-in-out hover:bg-teal-600 hover:text-white">
                    About Us
                </li>

                <li className="px-4 py-2 rounded-full cursor-pointer bg-transparent transition-all duration-300 ease-in-out hover:bg-teal-600 hover:text-white">
                    Contact
                </li>
            </ul>

            {/* Buttons */}
            <div className="flex items-center gap-4">
                {/* Sign Up */}
                <button className="px-5 py-2 rounded-full border border-gray-300 bg-white text-gray-700 hover:scale-105 hover:border-teal-600 hover:text-teal-600 transition">
                    Sign Up
                </button>

                {/* Log In */}
                <button className="px-5 py-2 rounded-full bg-teal-600 text-white hover:bg-teal-700 hover:scale-105 active:scale-95 transition duration-200">
                    Log In
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
