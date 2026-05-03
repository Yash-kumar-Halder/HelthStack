import React from 'react';

const SignupPage = () => {
    return (
        <div
            className="min-h-screen w-full bg-cover bg-center flex items-center justify-between px-10 md:px-20"
            style={{
                backgroundImage: "url('/sign-up.png')",
            }}
        >
            <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 shadow-2xl">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white">Create Account</h1>
                </div>

                <form className="space-y-4">
                    <input
                        type="text"
                        placeholder="Full name *"
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder-white/70 outline-none"
                    />

                    <input
                        type="email"
                        placeholder="Work email *"
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder-white/70 outline-none"
                    />

                    <input
                        type="tel"
                        placeholder="Phone number *"
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder-white/70 outline-none"
                    />

                    <input
                        type="password"
                        placeholder="Password *"
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder-white/70 outline-none"
                    />

                    <input
                        type="password"
                        placeholder="Confirm password"
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder-white/70 outline-none"
                    />

                    <div className="flex items-center gap-2 text-white text-sm">
                        <input type="checkbox" />
                        <span>I agree to Terms & Privacy Policy</span>
                    </div>

                    <button className="w-full py-3 rounded-full bg-white text-gray-800 font-semibold hover:bg-gray-100 transition">
                        Create
                    </button>

                    <div className="flex items-center gap-3 my-4">
                        <div className="h-px flex-1 bg-white/30"></div>
                        <span className="text-white text-sm">Or</span>
                        <div className="h-px flex-1 bg-white/30"></div>
                    </div>

                    <button className="relative w-full py-3 rounded-full border border-white text-white hover:bg-white/10 transition font-medium text-lg">
                        <img
                            src="/google.png"
                            alt=""
                            className="w-6 h-6 absolute left-18 top-1/2 -translate-y-1/2 bg-white p-1 rounded-full object-contain"
                        ></img>
                        Sign up with Google
                    </button>
                </form>

                <p className="text-center text-white/80 mt-5 text-sm">
                    Already a member?{' '}
                    <span className="font-semibold cursor-pointer">
                        <a href="#"> Login</a>
                    </span>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;
