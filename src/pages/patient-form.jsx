import React, { useEffect } from 'react';

import { useParams, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { useForm, useFieldArray, Controller } from 'react-hook-form';

import {
    createNewPatient,
    updatePatientProfile,
    fetchPatientById,
    clearCurrentPatient,
} from '../feature/patients/patients.slice';

import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';

import { Label } from '@/components/ui/label';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import { Textarea } from '@/components/ui/textarea';

import { ArrowLeft, Loader2, Plus, Trash2 } from 'lucide-react';

import { toast } from 'sonner';

const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    bloodType: 'O+',
    address: '',
    medicalHistory: '',
    allergies: [],
};

const bloodTypes = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];

export default function PatientForm() {
    const { patientId } = useParams();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { currentPatient, loading } = useSelector((state) => state.patients);

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues,
    });

    const {
        fields: allergies,
        append: appendAllergy,
        remove: removeAllergy,
    } = useFieldArray({
        control,
        name: 'allergies',
    });

    useEffect(() => {
        if (!patientId) return;

        dispatch(fetchPatientById(patientId));

        return () => {
            dispatch(clearCurrentPatient());
        };
    }, [dispatch, patientId]);

    useEffect(() => {
        if (!currentPatient?._id) return;

        reset({
            firstName: currentPatient.firstName || '',

            lastName: currentPatient.lastName || '',

            email: currentPatient.email || '',

            phone: currentPatient.phone || '',

            dateOfBirth: currentPatient.dateOfBirth?.split('T')[0] || '',

            gender: currentPatient.gender || '',

            bloodType: currentPatient.bloodType || 'O+',

            address: currentPatient.address || '',

            medicalHistory: currentPatient.medicalHistory || '',

            allergies: currentPatient.allergies || [],
        });
    }, [currentPatient, reset]);

    const onSubmit = async (data) => {
        try {
            const payload = {
                ...data,

                allergies: data.allergies.filter(Boolean),
            };

            if (patientId) {
                await dispatch(
                    updatePatientProfile({
                        patientId,
                        patientData: payload,
                    }),
                ).unwrap();

                toast.success('Patient profile updated successfully');
            } else {
                await dispatch(createNewPatient(payload)).unwrap();

                toast.success('Patient profile created successfully');
            }

            navigate('/dashboard/patients');
        } catch (error) {
            console.error(error);

            toast.error(error?.message || 'Something went wrong');
        }
    };

    if (loading && patientId && !currentPatient) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    onClick={() => navigate(-1)}
                    className="gap-2"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </Button>

                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        {patientId ? 'Edit Patient Profile' : 'Create Patient Profile'}
                    </h1>

                    <p className="text-muted-foreground">
                        {patientId ? 'Update patient information' : 'Register a new patient'}
                    </p>
                </div>
            </div>

            {/* Form */}
            <Card>
                <CardHeader>
                    <CardTitle>Patient Information</CardTitle>

                    <CardDescription>Enter patient personal and medical details</CardDescription>
                </CardHeader>

                <CardContent>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        {/* Personal Details */}
                        <div className="space-y-4">
                            <h3 className="font-semibold">Personal Details</h3>

                            <div className="grid gap-4 md:grid-cols-2">
                                {/* First Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>

                                    <Input
                                        id="firstName"
                                        placeholder="John"
                                        {...register('firstName', {
                                            required: 'First name is required',
                                        })}
                                    />

                                    {errors.firstName && (
                                        <p className="text-sm text-red-500">
                                            {errors.firstName.message}
                                        </p>
                                    )}
                                </div>

                                {/* Last Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>

                                    <Input
                                        id="lastName"
                                        placeholder="Doe"
                                        {...register('lastName', {
                                            required: 'Last name is required',
                                        })}
                                    />

                                    {errors.lastName && (
                                        <p className="text-sm text-red-500">
                                            {errors.lastName.message}
                                        </p>
                                    )}
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>

                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="patient@email.com"
                                        {...register('email', {
                                            required: 'Email is required',
                                        })}
                                    />

                                    {errors.email && (
                                        <p className="text-sm text-red-500">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>

                                {/* Phone */}
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone</Label>

                                    <Input
                                        id="phone"
                                        type="tel"
                                        placeholder="+91 9876543210"
                                        {...register('phone', {
                                            required: 'Phone is required',
                                        })}
                                    />

                                    {errors.phone && (
                                        <p className="text-sm text-red-500">
                                            {errors.phone.message}
                                        </p>
                                    )}
                                </div>

                                {/* DOB */}
                                <div className="space-y-2">
                                    <Label htmlFor="dateOfBirth">Date of Birth</Label>

                                    <Input
                                        id="dateOfBirth"
                                        type="date"
                                        {...register('dateOfBirth', {
                                            required: 'Date of birth is required',
                                        })}
                                    />

                                    {errors.dateOfBirth && (
                                        <p className="text-sm text-red-500">
                                            {errors.dateOfBirth.message}
                                        </p>
                                    )}
                                </div>

                                {/* Gender */}
                                <div className="space-y-2">
                                    <Label htmlFor="gender">Gender</Label>

                                    <Controller
                                        name="gender"
                                        control={control}
                                        rules={{
                                            required: 'Gender is required',
                                        }}
                                        render={({ field }) => (
                                            <Select
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger id="gender">
                                                    <SelectValue placeholder="Select gender" />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    <SelectItem value="Male">Male</SelectItem>

                                                    <SelectItem value="Female">Female</SelectItem>

                                                    <SelectItem value="Other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />

                                    {errors.gender && (
                                        <p className="text-sm text-red-500">
                                            {errors.gender.message}
                                        </p>
                                    )}
                                </div>

                                {/* Blood Type */}
                                <div className="space-y-2">
                                    <Label htmlFor="bloodType">Blood Type</Label>

                                    <Controller
                                        name="bloodType"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger id="bloodType">
                                                    <SelectValue placeholder="Select blood type" />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    {bloodTypes.map((type) => (
                                                        <SelectItem
                                                            key={type}
                                                            value={type}
                                                        >
                                                            {type}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>

                            <Textarea
                                id="address"
                                placeholder="Street address..."
                                rows={2}
                                {...register('address')}
                            />
                        </div>

                        {/* Medical Info */}
                        <div className="space-y-4">
                            <h3 className="font-semibold">Medical Information</h3>

                            {/* Medical History */}
                            <div className="space-y-2">
                                <Label htmlFor="medicalHistory">Medical History</Label>

                                <Textarea
                                    id="medicalHistory"
                                    placeholder="Previous conditions, surgeries, etc."
                                    rows={4}
                                    {...register('medicalHistory')}
                                />
                            </div>

                            {/* Allergies */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <Label>Allergies</Label>

                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => appendAllergy('')}
                                        className="gap-2"
                                    >
                                        <Plus className="h-3 w-3" />
                                        Add Allergy
                                    </Button>
                                </div>

                                <div className="space-y-2">
                                    {allergies.map((field, index) => (
                                        <div
                                            key={field.id}
                                            className="flex gap-2"
                                        >
                                            <Input
                                                placeholder="Allergy name"
                                                {...register(`allergies.${index}`)}
                                            />

                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeAllergy(index)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                            <Button
                                type="submit"
                                disabled={loading || isSubmitting}
                                className="gap-2"
                            >
                                {(loading || isSubmitting) && (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                )}

                                {patientId ? 'Update Patient' : 'Create Patient'}
                            </Button>

                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => navigate(-1)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
