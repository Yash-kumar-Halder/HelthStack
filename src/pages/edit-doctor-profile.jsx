import React, { useEffect, useMemo } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { useForm, Controller, useWatch } from 'react-hook-form';

import { fetchDoctorById, updateDoctorProfile } from '../feature/doctors/doctors.slice';

import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Input } from '@/components/ui/input';

import { Label } from '@/components/ui/label';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import { Textarea } from '@/components/ui/textarea';

import { ArrowLeft, Loader2, Save } from 'lucide-react';

const departments = [
    'Cardiology',
    'Neurology',
    'Orthopedics',
    'Pediatrics',
    'General Medicine',
    'Dermatology',
    'ENT',
];

const defaultValues = {
    department: '',
    specialization: '',
    consultationFee: '',
    experience: '',
    qualifications: '',
    licenseId: '',
    gender: '',
    status: 'ACTIVE',
};

const getFormValues = (doctor) => ({
    department: doctor?.department || '',
    specialization: doctor?.specialization || '',
    consultationFee: doctor?.consultationFee?.toString() || '',
    experience: doctor?.experience?.toString() || '',
    qualifications: doctor?.qualifications?.join(', ') || '',
    licenseId: doctor?.licenseId || '',
    gender: doctor?.gender || '',
    status: doctor?.status || 'ACTIVE',
});

export default function EditDoctorProfile() {
    const { doctorId } = useParams();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { currentDoctor, loading } = useSelector((state) => state.doctors);

    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues,
    });

    const qualifications = useWatch({
        control,
        name: 'qualifications',
    });

    const qualificationPreview = useMemo(() => {
        return qualifications
            ?.split(',')
            ?.map((item) => item.trim())
            ?.filter(Boolean);
    }, [qualifications]);

    useEffect(() => {
        if (!doctorId) return;

        dispatch(fetchDoctorById(doctorId));
    }, [dispatch, doctorId]);

    useEffect(() => {
        if (!currentDoctor?._id) return;

        reset(getFormValues(currentDoctor));
    }, [currentDoctor, reset]);

    const onSubmit = async (data) => {
        try {
            const payload = {
                ...data,

                consultationFee: Number(data.consultationFee),

                experience: Number(data.experience),

                qualifications: data.qualifications
                    .split(',')
                    .map((item) => item.trim())
                    .filter(Boolean),
            };

            const updatedDoctor = await dispatch(
                updateDoctorProfile({
                    doctorId,
                    doctorData: payload,
                }),
            ).unwrap();

            reset(getFormValues(updatedDoctor));

            toast.success('Doctor profile updated successfully');
        } catch (error) {
            console.error(error);

            toast.error(error?.message || 'Failed to update doctor profile');
        }
    };

    if (loading && !currentDoctor) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-5xl space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
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
                        <h1 className="text-3xl font-bold tracking-tight">Edit Doctor Profile</h1>

                        <p className="mt-1 text-muted-foreground">
                            Update professional information and profile details
                        </p>
                    </div>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <Card>
                    <CardHeader>
                        <CardTitle>Doctor Information</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <div className="grid gap-5 md:grid-cols-2">
                            {/* Department */}
                            <div className="space-y-2">
                                <Label>Department</Label>

                                <Controller
                                    name="department"
                                    control={control}
                                    rules={{
                                        required: 'Department is required',
                                    }}
                                    render={({ field }) => (
                                        <Select
                                            key={field.value}
                                            value={field.value || ''}
                                            defaultValue={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select department" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                {departments.map((department) => (
                                                    <SelectItem
                                                        key={department}
                                                        value={department}
                                                    >
                                                        {department}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />

                                {errors.department && (
                                    <p className="text-sm text-red-500">
                                        {errors.department.message}
                                    </p>
                                )}
                            </div>

                            {/* Specialization */}
                            <div className="space-y-2">
                                <Label>Specialization</Label>

                                <Input
                                    placeholder="Cardiac Surgeon"
                                    {...register('specialization', {
                                        required: 'Specialization is required',
                                    })}
                                />

                                {errors.specialization && (
                                    <p className="text-sm text-red-500">
                                        {errors.specialization.message}
                                    </p>
                                )}
                            </div>

                            {/* Experience */}
                            <div className="space-y-2">
                                <Label>Experience (Years)</Label>

                                <Input
                                    type="number"
                                    placeholder="5"
                                    {...register('experience', {
                                        required: 'Experience is required',
                                    })}
                                />
                            </div>

                            {/* Consultation Fee */}
                            <div className="space-y-2">
                                <Label>Consultation Fee</Label>

                                <Input
                                    type="number"
                                    placeholder="500"
                                    {...register('consultationFee', {
                                        required: 'Consultation fee is required',
                                    })}
                                />
                            </div>

                            {/* License ID */}
                            <div className="space-y-2">
                                <Label>License ID</Label>

                                <Input
                                    placeholder="LIC-123456"
                                    {...register('licenseId', {
                                        required: 'License ID is required',
                                    })}
                                />
                            </div>

                            {/* Gender */}
                            <div className="space-y-2">
                                <Label>Gender</Label>

                                <Controller
                                    name="gender"
                                    control={control}
                                    rules={{
                                        required: 'Gender is required',
                                    }}
                                    render={({ field }) => (
                                        <Select
                                            key={field.value}
                                            value={field.value || ''}
                                            defaultValue={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select gender" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                <SelectItem value="Male">Male</SelectItem>

                                                <SelectItem value="Female">Female</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>

                            {/* Status */}
                            <div className="space-y-2">
                                <Label>Status</Label>

                                <Controller
                                    name="status"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            key={field.value}
                                            value={field.value || ''}
                                            defaultValue={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>

                                            <SelectContent>
                                                <SelectItem value="ACTIVE">ACTIVE</SelectItem>

                                                <SelectItem value="INACTIVE">INACTIVE</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Qualifications */}
                        <div className="space-y-2">
                            <Label>Qualifications</Label>

                            <Textarea
                                rows={4}
                                placeholder="MBBS, MD, DM Neurology"
                                {...register('qualifications', {
                                    required: 'At least one qualification is required',
                                })}
                            />

                            <p className="text-xs text-muted-foreground">
                                Separate qualifications using commas
                            </p>

                            <div className="flex flex-wrap gap-2 pt-2">
                                {qualificationPreview?.map((qualification) => (
                                    <div
                                        key={qualification}
                                        className="rounded-full bg-muted px-3 py-1 text-sm"
                                    >
                                        {qualification}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-3 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => navigate(-1)}
                            >
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="gap-2"
                            >
                                {isSubmitting ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Save className="h-4 w-4" />
                                )}

                                {isSubmitting ? 'Saving Changes...' : 'Save Changes'}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
}
