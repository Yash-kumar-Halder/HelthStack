import { assets } from '@/assets/assets';
import React from 'react';
import { Phone, MapPin, Clock } from 'lucide-react';

const Contact = () => {
    return (
        <div className="bg-gray-100 min-h-screen p-4 md:p-8 space-y-6">
            {/*  Top Navbar will be included here */}
            {/*  Hero Section */}
            <div className="relative rounded-xl overflow-hidden h-[220 px] md:h-[280 px]">
                <img
                    src={assets.hero_image}
                    alt="hero"
                    className="w-full h-150 object-cover"
                />

                <h2 className="absolute bottom-6 left-6 text-white text-3xl font-bold">
                    Contact Us
                </h2>
            </div>

            {/*  Contact Section */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* LEFT */}
                <div className="space-y-6">
                    {/* <p className="text-sm text-gray-500">/ get in touch /</p> */}

                    <h2 className="text-3xl font-bold leading-snug">
                        We are always ready to help you and answer your questions
                    </h2>

                    <p className="text-gray-600">
                        Reach out to us anytime. We’re here to support your journey.
                    </p>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <h4 className="font-semibold">Call Center</h4>
                            <p>+91 88337 58541 </p>
                        </div>
                        <div>
                            <h4 className="font-semibold">Our Location</h4>
                            <p>Kolkata, India</p>
                        </div>
                        <div>
                            <h4 className="font-semibold">Email</h4>
                            <p>healthinfo@email.com</p>
                        </div>
                        <div>
                            <h4 className="font-semibold">Social</h4>
                            <p>Facebook / LinkedIn</p>
                        </div>
                    </div>
                </div>

                {/* RIGHT FORM SHOULD BE HERE*/}
            </div>

            {/*  Map Section */}
            <div className="rounded-xl overflow-hidden">
                <iframe
                    title="map"
                    src="https://maps.google.com/maps?q=kolkata&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-[300 px] border-0"
                ></iframe>
            </div>

            {/*  Footer */}
            <div className="bg-black text-white rounded-xl p-6 md:p-10 space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500">
                    It’s blow your mind! <br /> Meet Neural Networks
                </h2>

                <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-300">
                    <div>
                        <h4 className="font-semibold text-white">Company</h4>
                        <p>About</p>
                        <p>Team</p>
                        <p>Contact</p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white">Services</h4>
                        <p>AI Solutions</p>
                        <p>Development</p>
                        <p>Consulting</p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white">Links</h4>
                        <p>Privacy Policy</p>
                        <p>Terms</p>
                    </div>
                </div>

                <p className="text-xs text-gray-400">© 2026 Neural. All rights reserved.</p>
            </div>
        </div>
    );
};

export default Contact;
