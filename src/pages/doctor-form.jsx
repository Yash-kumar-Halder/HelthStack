import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import {
    createNewDoctor,
    updateDoctorProfile,
    fetchDoctorById,
    clearCurrentDoctor,
} from '../feature/doctors/doctors.slice';

import { toast } from 'sonner';

export default function DoctorForm() {
    const { doctorId } = useParams();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { currentDoctor, loading } = useSelector((state) => state.doctors);

    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            department: '',
            specialization: '',
            consultationFee: 0,
            experience: 0,
            qualifications: '',
            licenseId: '',
            status: 'ACTIVE',
            gender: '',
        },
    });

    useEffect(() => {
        if (doctorId) {
            dispatch(fetchDoctorById(doctorId));
        }

        return () => {
            dispatch(clearCurrentDoctor());
        };
    }, [dispatch, doctorId]);

    useEffect(() => {
        if (currentDoctor) {
            reset({
                department: currentDoctor.department || '',
                specialization: currentDoctor.specialization || '',
                consultationFee: currentDoctor.consultationFee || 0,
                experience: currentDoctor.experience || 0,
                qualifications: currentDoctor.qualifications?.join(', ') || '',
                licenseId: currentDoctor.licenseId || '',
                status: currentDoctor.status || 'ACTIVE',
                gender: currentDoctor.gender || '',
            });
        }
    }, [currentDoctor, reset]);

    const onSubmit = async (data) => {
        try {
            const formattedData = {
                ...data,

                consultationFee: Number(data.consultationFee),

                experience: Number(data.experience),

                qualifications: data.qualifications
                    .split(',')
                    .map((item) => item.trim())
                    .filter(Boolean),
            };

            if (doctorId) {
                await dispatch(
                    updateDoctorProfile({
                        doctorId,
                        doctorData: formattedData,
                    }),
                );

                toast.success('Doctor updated successfully');
            } else {
                await dispatch(createNewDoctor(formattedData));

                toast.success('Doctor created successfully');
            }

            navigate(-1);
        } catch (error) {
            console.error(error);

            toast.error(error.message || 'Something went wrong');
        }
    };

    const departments = [
        'Cardiology',
        'Neurology',
        'Orthopedics',
        'Pediatrics',
        'General Medicine',
        'Dermatology',
        'ENT',
    ];

    return (
        <div className="p-6 max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold">
                        {doctorId ? 'Edit Doctor' : 'Add Doctor'}
                    </h1>

                    <p className="text-gray-500 mt-1">
                        {doctorId ? 'Update doctor information' : 'Create a new doctor profile'}
                    </p>
                </div>

                <button
                    onClick={() => navigate(-1)}
                    className="border px-4 py-2 rounded-md hover:bg-gray-100"
                >
                    Back
                </button>
            </div>

            {/* Form */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="border rounded-lg p-6 space-y-6 bg-white"
            >
                <div className="grid md:grid-cols-2 gap-4">
                    {/* Department */}
                    <div>
                        <label className="block mb-2 font-medium">Department</label>

                        <select
                            {...register('department', {
                                required: 'Department is required',
                            })}
                            className="w-full border p-3 rounded-md"
                        >
                            <option value="">Select Department</option>

                            {departments.map((dept) => (
                                <option
                                    key={dept}
                                    value={dept}
                                >
                                    {dept}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Specialization */}
                    <div>
                        <label className="block mb-2 font-medium">Specialization</label>

                        <input
                            type="text"
                            placeholder="Cardiologist"
                            {...register('specialization', {
                                required: 'Specialization is required',
                            })}
                            className="w-full border p-3 rounded-md"
                        />
                    </div>

                    {/* Consultation Fee */}
                    <div>
                        <label className="block mb-2 font-medium">Consultation Fee</label>

                        <input
                            type="number"
                            placeholder="500"
                            {...register('consultationFee', {
                                required: 'Consultation fee is required',
                                min: 0,
                            })}
                            className="w-full border p-3 rounded-md"
                        />
                    </div>

                    {/* Experience */}
                    <div>
                        <label className="block mb-2 font-medium">Experience (Years)</label>

                        <input
                            type="number"
                            placeholder="5"
                            {...register('experience', {
                                required: 'Experience is required',
                                min: 0,
                            })}
                            className="w-full border p-3 rounded-md"
                        />
                    </div>

                    {/* License ID */}
                    <div>
                        <label className="block mb-2 font-medium">License ID</label>

                        <input
                            type="text"
                            placeholder="LIC-123456"
                            {...register('licenseId', {
                                required: 'License ID is required',
                            })}
                            className="w-full border p-3 rounded-md"
                        />
                    </div>

                    {/* Gender */}
                    <div>
                        <label className="block mb-2 font-medium">Gender</label>

                        <select
                            {...register('gender', {
                                required: 'Gender is required',
                            })}
                            className="w-full border p-3 rounded-md"
                        >
                            <option value="">Select Gender</option>

                            <option value="Male">Male</option>

                            <option value="Female">Female</option>
                        </select>
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block mb-2 font-medium">Status</label>

                        <select
                            {...register('status')}
                            className="w-full border p-3 rounded-md"
                        >
                            <option value="ACTIVE">Active</option>

                            <option value="INACTIVE">Inactive</option>
                        </select>
                    </div>
                </div>

                {/* Qualifications */}
                <div>
                    <label className="block mb-2 font-medium">Qualifications</label>

                    <input
                        type="text"
                        placeholder="MBBS, MD, DM"
                        {...register('qualifications', {
                            required: 'Qualifications are required',
                        })}
                        className="w-full border p-3 rounded-md"
                    />

                    <p className="text-sm text-gray-500 mt-1">
                        Separate qualifications with commas
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-black text-white px-5 py-3 rounded-md disabled:opacity-50"
                    >
                        {loading ? 'Loading...' : doctorId ? 'Update Doctor' : 'Create Doctor'}
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="border px-5 py-3 rounded-md hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
