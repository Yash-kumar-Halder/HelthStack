import { registerUser } from '@/api/auth.api.js';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Signupform = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            phone: '',
            role: '',
        },
    });

    const onSubmit = async (data) => {
        try {
            const result = await registerUser(data);

            console.log('User Registered:', result);

            reset();

            toast.success('Register successful');

            navigate('/home');
        } catch (error) {
            console.error(error);

            toast.error(error.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="[&_input::placeholder]:text-neutral-200 space-y-4"
            >
                <div>
                    <label className="block mb-1 font-medium">Name</label>

                    <input
                        type="text"
                        placeholder="Enter name"
                        className="w-full border rounded-lg px-3 py-2 outline-none"
                        {...register('name', {
                            required: 'Name is required',
                            minLength: {
                                value: 3,
                                message: 'Name must be at least 3 characters',
                            },
                        })}
                    />

                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                </div>

                <div>
                    <label className="block mb-1 font-medium">Email</label>

                    <input
                        type="email"
                        placeholder="Enter email"
                        className="w-full border rounded-lg px-3 py-2 outline-none"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Invalid email address',
                            },
                        })}
                    />

                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                </div>

                <div>
                    <label className="block mb-1 font-medium">Password</label>

                    <input
                        type="password"
                        placeholder="Enter password"
                        className="w-full border rounded-lg px-3 py-2 outline-none"
                        {...register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 6,
                                message: 'Password must be at least 6 characters',
                            },
                        })}
                    />

                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                    )}
                </div>

                <div>
                    <label className="block mb-1 font-medium">Phone</label>

                    <input
                        type="text"
                        placeholder="Enter phone number"
                        className="w-full border rounded-lg px-3 py-2 outline-none"
                        {...register('phone', {
                            required: 'Phone number is required',
                            pattern: {
                                value: /^[0-9]{10}$/,
                                message: 'Phone number must be 10 digits',
                            },
                        })}
                    />

                    {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                    )}
                </div>

                <div>
                    <label className="block mb-1 font-medium">Role</label>

                    <select
                        className="w-full border rounded-lg px-3 py-2 outline-none"
                        {...register('role', {
                            required: 'Role is required',
                        })}
                    >
                        <option value="">Select Role</option>
                        <option value="ADMIN">ADMIN</option>
                        <option value="DOCTOR">DOCTOR</option>
                        <option value="PATIENT">PATIENT</option>
                        <option value="NURSE">NURSE</option>
                    </select>

                    {errors.role && (
                        <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black text-white py-2 rounded-lg hover:opacity-90 transition"
                >
                    {isSubmitting ? 'Registering...' : 'Register'}
                </button>
            </form>
        </div>
    );
};

export default Signupform;
