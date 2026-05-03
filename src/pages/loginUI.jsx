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
                        <div className="w-1/2 p-14">
                            <h2 className="text-4xl font-semibold text-gray-800">Welcome to</h2>
                            <h1 className="text-5xl font-bold text-teal-500 mb-3">HelthStack</h1>
                            <p className="text-gray-500 mb-8 font-bold">
                                Please login here to access
                            </p>

                            <button className="w-full border rounded-lg py-4 mb-4 shadow-sm">
                                Login with Google
                            </button>

                            <button className="w-full border rounded-lg py-4 mb-6 shadow-sm">
                                Login with Facebook
                            </button>

                            <div className="flex items-center gap-4 mb-6">
                                <hr className="flex-1" />
                                <span className="text-gray-400">OR</span>
                                <hr className="flex-1" />
                            </div>

                            {/* Email */}
                            <div className="flex items-center border rounded-lg px-4 py-4 mb-4">
                                <span className="mr-3">📧</span>
                                <input
                                    type="email"
                                    placeholder="example@email.com"
                                    className="outline-none w-full"
                                />
                            </div>

                            {/* Password */}
                            <div className="flex items-center border rounded-lg px-4 py-4 mb-4">
                                <span className="mr-3">🔒</span>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="outline-none w-full"
                                />
                                <span>
                                    <a href="#">👁️</a>
                                </span>
                            </div>

                            <div className="flex justify-between text-sm text-gray-500 mb-6">
                                <label>
                                    <input
                                        type="checkbox"
                                        className="mr-2"
                                    />
                                    Remember me
                                </label>
                                <a
                                    href="#"
                                    className="text-teal-500"
                                >
                                    Forgot Password?
                                </a>
                            </div>

                            <button className="w-full bg-teal-500 text-white py-4 rounded-lg text-lg font-semibold hover:bg-teal-600">
                                Login
                            </button>
                            <p className="text-center mt-6 text-gray-500 text-sm">
                                Don't have an account?{' '}
                                <a
                                    href="#"
                                    className="text-teal-600 font-semibold hover:text-teal-700 hover:underline transition duration-200"
                                >
                                    Sign Up
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginUI;
