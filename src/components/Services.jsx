import React from 'react';

const Services = () => {
    return (
        <section className="w-full py-20 px-10 md:px-20 bg-[#F8FFFE]">
            {/* Heading */}
            <div className="text-center max-w-2xl mx-auto mb-16">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Medical Services</h2>
                <p className="text-gray-600">
                    We provide world-class healthcare services with modern technology and expert
                    doctors for better treatment and care.
                </p>
            </div>

            {/* Services Grid */}
            <div className="grid md:grid-cols-3 gap-8">
                {/* Card 1 */}
                <div className="bg-[#F8FFFE] p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                    <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-teal-100 text-teal-600 text-2xl mb-4">
                        🩺
                    </div>
                    <h3 className="text-xl font-semibold mb-2">General Checkup</h3>
                    <p className="text-gray-600 text-sm">
                        Regular health checkups to ensure your well-being and early detection.
                    </p>
                </div>

                {/* Card 2 */}
                <div className="bg-[#F8FFFE] p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                    <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-teal-100 text-teal-600 text-2xl mb-4">
                        ❤️
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Cardiology</h3>
                    <p className="text-gray-600 text-sm">
                        Expert heart care with advanced diagnostics and treatments.
                    </p>
                </div>

                {/* Card 3 */}
                <div className="bg-[#F8FFFE] p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                    <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-teal-100 text-teal-600 text-2xl mb-4">
                        🦷
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Dental Care</h3>
                    <p className="text-gray-600 text-sm">
                        Comprehensive dental services for a healthy and bright smile.
                    </p>
                </div>

                {/* Card 4 */}
                <div className="bg-[#F8FFFE] p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                    <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-teal-100 text-teal-600 text-2xl mb-4">
                        🧠
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Neurology</h3>
                    <p className="text-gray-600 text-sm">
                        Advanced treatment for brain and nervous system disorders.
                    </p>
                </div>

                {/* Card 5 */}
                <div className="bg-[#F8FFFE] p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                    <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-teal-100 text-teal-600 text-2xl mb-4">
                        🚑
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Emergency Care</h3>
                    <p className="text-gray-600 text-sm">
                        24/7 emergency services with quick response and expert care.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Services;
