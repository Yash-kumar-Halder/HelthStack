import { Heading, Plane, PlayIcon, ScanFaceIcon, Truck } from 'lucide-react';
import React from 'react';

const Card = ({ Icon, paraText }) => {
    return (
        <div className="bg-amber-600/35 p-4 flex flex-col gap-8 rounded-lg shadow-md shadow-neutral-400">
            <Icon
                className="bg-amber-800 p-1 rounded-sm w-fit"
                fill="#fff"
                stroke="#0000"
            />
            {paraText}
        </div>
    );
};

const Feature = () => {
    return (
        <section className="relative min-h-screen py-12 flex flex-col items-center bg-amber-800/20">
            {/* TOP FADE */}
            <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-t from-transparent to-white"></div>

            <div className="relative z-10">
                <h1 className="text-5xl font-bold text-neutral-800 text-center leading-12 tracking-tight">
                    Core Feature That Set Us <br /> Apart From The Competition
                </h1>

                <div className="w-2/3 mx-auto grid grid-cols-1 md:grid-cols-[4fr_3fr_4fr] gap-3 py-20">
                    <div className="flex flex-col gap-3">
                        <Card
                            Icon={PlayIcon}
                            paraText="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam
                                quia, eveniet ea asperiores officiis explicabo esse ut eos maxime
                                dolorum laudantium magni unde delectus sapiente dicta quisquam.
                                Maiores, sit? Totam."
                        />
                        <Card
                            Icon={Truck}
                            paraText="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam
                                quia, eveniet ea asperiores officiis explicabo esse ut eos maxime
                                dolorum laudantium magni unde delectus sapiente dicta quisquam.
                                Maiores, sit? Totam."
                        />
                    </div>
                    <div className="p-4 rounded-lg shadow-md shadow-neutral-400 bg-[url('@/assets/doctor-card.jpg')] bg-cover"></div>
                    <div className="">
                        <div className="flex flex-col gap-3">
                            <Card
                                Icon={Plane}
                                paraText="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam
                                quia, eveniet ea asperiores officiis explicabo esse ut eos maxime
                                dolorum laudantium magni unde delectus sapiente dicta quisquam.
                                Maiores, sit? Totam."
                            />
                            <Card
                                Icon={ScanFaceIcon}
                                paraText="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam
                                quia, eveniet ea asperiores officiis explicabo esse ut eos maxime
                                dolorum laudantium magni unde delectus sapiente dicta quisquam.
                                Maiores, sit? Totam."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Feature;
