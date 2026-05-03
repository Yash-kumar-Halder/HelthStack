import React from 'react';
import { Phone, MapPin, Clock } from 'lucide-react';

const Contact = () => {
    return (
        <div className="bg-gray-100 py-16 px-6 md:px-20">
            <div className="grid md:grid-cols-4 gap-10 items-start">
                {/* LOGO + SOCIAL */}
                <div>
                    <h1 className="text-2xl font-bold text-blue-600">HelthStack</h1>
                    <p className="text-gray-600 mb-4">Smart Hospital Management System</p>

                    <div className="flex gap-4 text-blue-600 text-xl">
                        <i className="ri-facebook-fill"></i>
                        <i className="ri-linkedin-fill"></i>
                        <i className="ri-google-fill"></i>
                    </div>
                </div>

                {/* CALL */}
                <div>
                    <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <Phone size={18} /> Call Now to Book
                    </h2>
                    <p className="text-gray-600">+91 98765 43210</p>
                    <p className="text-gray-600">+91 91234 56789</p>
                </div>

                {/* ADDRESS */}
                <div>
                    <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <MapPin size={18} /> Reach Us
                    </h2>

                    <a
                        href="https://www.google.com/maps/place/Behala+Government+Polytechnic/@22.5117789,88.3020866,17z/data=!3m1!4b1!4m6!3m5!1s0x3a027baa275af09b:0x2c17ef048f558f3d!8m2!3d22.511774!4d88.3046615!16s%2Fg%2F11f9f2f1k9?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-blue-600"
                    >
                        HelthStack Medical Center <br />
                        Behala, Kolkata, West Bengal, India
                    </a>
                </div>

                {/* HOURS */}
                <div>
                    <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <Clock size={18} /> Open Hours
                    </h2>
                    <p className="text-gray-600">Mon–Fri: 9:00 – 19:00</p>
                    <p className="text-gray-600">Sat–Sun: 10:00 – 14:00</p>
                </div>
            </div>

            {/* Bottom line */}
            <div className="border-t mt-10 pt-6 text-center text-gray-500 text-sm">
                © 2026 HelthStack. All rights reserved.
            </div>
        </div>
    );
};

export default Contact;
