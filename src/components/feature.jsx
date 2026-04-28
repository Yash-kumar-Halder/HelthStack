import { Plane, Truck } from 'lucide-react';
import React from 'react';
import DoctorCardImage from '@/assets/doctor-card.jpg';

const Feature = () => {
    return (
        <section className="relative min-h-screen py-12 flex flex-col items-center bg-amber-950/10">
            {/* TOP FADE */}
            <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-t from-transparent to-white"></div>

            <div className="relative z-10">
                <h1 className="text-5xl font-medium text-center leading-12 tracking-tight">
                    Core Feature That Set Us <br /> Apart From The Competition
                </h1>

                <div className="w-2/3 mx-auto grid grid-cols-1 md:grid-cols-[4fr_3fr_4fr] gap-3 py-20">
                    <div className="flex flex-col gap-3">
                        <div className="bg-amber-600/30 p-4 rounded-lg shadow-md shadow-neutral-400 flex flex-col gap-8">
                            <Plane
                                className="bg-black p-1 rounded-sm"
                                fill="#fff"
                                stroke="#0000"
                            />
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam quia,
                            eveniet ea asperiores officiis explicabo esse ut eos maxime dolorum
                            laudantium magni unde delectus sapiente dicta quisquam. Maiores, sit?
                            Totam.
                        </div>
                        <div className="bg-amber-600/30 p-4 rounded-lg shadow-md shadow-neutral-400 flex flex-col gap-8">
                            <Truck
                                className="bg-black p-1 rounded-sm"
                                fill="#fff"
                                stroke="#0000"
                            />
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam quia,
                            eveniet ea asperiores officiis explicabo esse ut eos maxime dolorum
                            laudantium magni unde delectus sapiente dicta quisquam. Maiores, sit?
                            Totam.
                        </div>
                    </div>
                    <div className="p-4 rounded-lg shadow-md shadow-neutral-400 bg-[url('@/assets/doctor-card.jpg')] bg-cover"></div>
                    <div className="">
                        <div className="flex flex-col gap-3">
                            <div className="bg-amber-600/30 p-4 flex flex-col gap-8 rounded-lg shadow-md shadow-neutral-400">
                                <Plane
                                    className="bg-black p-1 rounded-sm"
                                    fill="#fff"
                                    stroke="#0000"
                                />
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam
                                quia, eveniet ea asperiores officiis explicabo esse ut eos maxime
                                dolorum laudantium magni unde delectus sapiente dicta quisquam.
                                Maiores, sit? Totam.
                            </div>
                            <div className="bg-amber-600/30 p-4 flex flex-col gap-8 rounded-lg shadow-md shadow-neutral-400">
                                <Truck
                                    className="bg-black p-1 rounded-sm"
                                    fill="#fff"
                                    stroke="#0000"
                                />
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam
                                quia, eveniet ea asperiores officiis explicabo esse ut eos maxime
                                dolorum laudantium magni unde delectus sapiente dicta quisquam.
                                Maiores, sit? Totam.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-b from-transparent to-white"></div>
        </section>
    );
};

export default Feature;
