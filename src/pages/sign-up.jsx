import Signupform from '@/components/signup-form.jsx';

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

                <Signupform />

                <p className="text-center text-white/80 mt-5 text-sm">
                    Already a member?{' '}
                    <span className="font-semibold cursor-pointer">
                        <a href="/login"> Login</a>
                    </span>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;
