import { Button } from './ui/button';
import LightBG from '../assets/light-bg.jpg';

const Home = () => {
    return (
        <div
            className="relative w-full min-h-screen bg-cover py-10"
            style={{ backgroundImage: `url(${LightBG})` }}
        >
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
                        <Button className="px-4 shadow-lg shadow-neutral-700 border-0 hover:bg-black hover:-translate-y-0.5">
                            Explore
                        </Button>
                        <Button
                            variant="outline"
                            className="shadow-[0_4px_10px_rgba(0,0,0,0.8),inset_0_1px_0px_rgba(255,255,255,0.5)] px-4 font-semibold border border-neutral-200 bg-neutral-300/60 hover:bg-neutral-400/30 hover:-translate-y-0.5"
                        >
                            Get Started
                        </Button>
                    </div>
                    <div className="w-8/9 min-h-[55vh] border border-amber-700 rounded-xl mt-20 mb-10"></div>
                </section>
            </div>
        </div>
    );
};

export default Home;
