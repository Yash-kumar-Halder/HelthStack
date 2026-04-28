import React from 'react';
import LightBg from '../assets/light-bg.jpg';
import { Button } from './ui/button';
import { Apple, Car, Plane, Truck } from 'lucide-react';

const Home = () => {
    return (
        <div className="relative w-full min-h-screen bg-[url('/src/assets/light-bg.jpg')] bg-cover py-14">
            {/* content */}
            <div className="relative">
                <section className="w-2/3 mx-auto pt-52 flex flex-col items-center">
                    <h1 className="text-center font-semibold text-5xl">
                        Seamless Hospital Management <br /> For Modern Healthcare
                    </h1>
                    <p className="w-3/5 text-center my-3">
                        Manage patients, appointments, billing, and staff operations in one unified
                        system—designed to improve efficiency, accuracy, and overall healthcare
                        delivery.
                    </p>
                    <div className="flex items-center gap-5 mt-2">
                        <Button
                            className="px-4 shadow-[0_4px_12px_rgba(0,0,0,0.7)] hover:bg-black hover:shadow-[0_4px_8px_rgba(0,0,0,0.7)] 
                    "
                        >
                            Get Started
                        </Button>
                        <Button
                            variant="outline"
                            className="shadow-[0_4px_10px_rgba(0,0,0,0.5),inset_0_1px_0px_rgba(255,255,255,0.5)] px-4 font-semibold border border-neutral-200 bg-neutral-300/60 hover:bg-neutral-400/30"
                        >
                            Get Started
                        </Button>
                    </div>
                    <div className="w-8/9 min-h-[55vh] border border-amber-700 rounded-xl mt-20 mb-10"></div>
                </section>
            </div>

            {/* bottom gradient overlay */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-b from-transparent to-white"></div>
        </div>
    );
};

export default Home;
