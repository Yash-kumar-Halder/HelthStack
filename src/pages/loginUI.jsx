import LoginForm from '@/components/login-form';
import React from 'react';

const LoginUI = () => {
    return (
        <div className="min-h-screen bg-linear-to-r from-cyan-500 to-teal-500 flex items-center justify-center p-8">
            <div className="w-full max-w-7xl flex gap-10 items-center">
                {/* Left Side */}
                <div className="text-white w-1/4">
                    <h1 className="text-6xl font-extrabold mb-8">HelthStack</h1>
                    <h2 className="text-5xl font-bold">Login Page</h2>

                    <div className="mt-32 flex items-center gap-3">
                        <div className="bg-white p-4 rounded-full shadow-lg text-2xl">❤️</div>
                        <div>
                            <h3 className="text-2xl font-bold">24X7 Services</h3>
                            <p className="text-sm font-bold">Your Health, Our Priority</p>
                        </div>
                    </div>
                </div>

                {/* Main Card */}
                <div className="bg-white/20 backdrop-blur-md border border-white rounded-[35px] p-5 w-3/4 shadow-2xl">
                    <div className="bg-white rounded-[30px] flex overflow-hidden min-h-[650px]">
                        {/* Left Image */}
                        <div className="w-1/2 bg-cyan-50 flex items-center justify-center p-10">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/2966/2966485.png"
                                alt="Hospital"
                                className="w-[85%] object-contain"
                            />
                        </div>

                        {/* Login Form */}
                        <LoginForm />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginUI;
