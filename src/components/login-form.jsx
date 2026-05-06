import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';

import { loginUser } from '../api/auth.api';
import { setCredentials } from '@/feature/auth/auth.slice';

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onTouched',
    });

    const onSubmit = async (data) => {
        try {
            const result = await loginUser(data);

            dispatch(setCredentials({ user: result.data.user }));
            reset();
            toast.success('Login successful');
            navigate('/home', { replace: true });
        } catch (error) {
            console.error(error);

            toast.error(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="w-full max-w-md mx-auto rounded-2xl bg-teal-500 p-6 shadow-xl">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-white">Welcome Back</h1>

                <p className="mt-2 text-sm text-neutral-400">Login to continue to your account</p>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5 [&_input::placeholder]:text-neutral-500"
            >
                <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-200">Email</label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full rounded-xl border border-neutral-700 bg-neutral-200 px-4 py-3 text-white outline-none transition focus:border-neutral-500"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Please enter a valid email',
                            },
                        })}
                    />

                    {errors.email && <p className="text-sm text-red-400">{errors.email.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-200">Password</label>

                    <input
                        type="password"
                        placeholder="Enter your password"
                        className="w-full rounded-xl border border-neutral-700 bg-neutral-200 px-4 py-3 text-white outline-none transition focus:border-neutral-500"
                        {...register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 6,
                                message: 'Password must be at least 6 characters',
                            },
                        })}
                    />

                    {errors.password && (
                        <p className="text-sm text-red-400">{errors.password.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-xl bg-white py-3 font-semibold text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isSubmitting ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
