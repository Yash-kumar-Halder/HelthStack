import React, { useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import { useForm, Controller, useWatch } from 'react-hook-form';

import { fetchDoctors } from '../feature/doctors/doctors.slice';

import { fetchBedAvailability } from '../feature/beds/beds.slice';

import { fetchWards } from '../feature/wards/wards.slice';

import { createNewAdmission } from '../feature/admissions/admissions.slice';

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

import { Loader2, Calendar, User, Bed, Stethoscope } from 'lucide-react';

import { toast } from 'sonner';

const defaultValues = {
    patientId: '',
    patientName: '',
    doctorId: '',
    wardId: '',
    bedId: '',
    appointmentDate: '',
    reason: '',
    notes: '',
};

export default function AppointmentBooking() {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { doctors, loading: doctorsLoading } = useSelector((state) => state.doctors);

    const { wards } = useSelector((state) => state.wards);

    const { availableBeds, loading: bedsLoading } = useSelector((state) => state.beds);

    const { loading: admissionsLoading } = useSelector((state) => state.admissions);

    const [selectedWard, setSelectedWard] = useState('');

    const [selectedBed, setSelectedBed] = useState('');

    const {
        register,
        handleSubmit,
        control,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues,
    });

    const selectedDoctorId = useWatch({
        control,
        name: 'doctorId',
    });

    useEffect(() => {
        dispatch(fetchDoctors({}));

        dispatch(fetchWards());
    }, [dispatch]);

    useEffect(() => {
        if (!selectedWard) return;

        dispatch(
            fetchBedAvailability({
                wardId: selectedWard,
            }),
        );
    }, [selectedWard, dispatch]);

    const selectedDoctor = useMemo(() => {
        return doctors.find((doctor) => doctor._id === selectedDoctorId);
    }, [doctors, selectedDoctorId]);

    const onSubmit = async (data) => {
        try {
            await dispatch(
                createNewAdmission({
                    patientId: data.patientId,

                    doctorId: data.doctorId,

                    wardId: data.wardId,

                    bedId: data.bedId,

                    admissionDate: new Date(data.appointmentDate).toISOString(),

                    reason: data.reason,

                    clinicalNotes: data.notes,
                }),
            ).unwrap();

            toast.success('Appointment booked successfully');

            reset(defaultValues);

            setSelectedWard('');

            setSelectedBed('');

            navigate('/dashboard/appointments');
        } catch (error) {
            console.error(error);

            toast.error(error?.message || 'Failed to book appointment');
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Book Appointment</h1>

                <p className="mt-2 text-muted-foreground">
                    Schedule a patient appointment and assign a bed
                </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Main Form */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Appointment Details</CardTitle>

                        <CardDescription>Fill in appointment information</CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            {/* Patient Section */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4" />

                                    <h3 className="font-semibold">Patient Information</h3>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="patientName">Patient Name</Label>

                                        <Input
                                            id="patientName"
                                            placeholder="Enter patient name"
                                            {...register('patientName', {
                                                required: 'Patient name is required',
                                            })}
                                        />

                                        {errors.patientName && (
                                            <p className="text-sm text-red-500">
                                                {errors.patientName.message}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="patientId">Patient ID</Label>

                                        <Input
                                            id="patientId"
                                            placeholder="Patient ID"
                                            {...register('patientId', {
                                                required: 'Patient ID is required',
                                            })}
                                        />

                                        {errors.patientId && (
                                            <p className="text-sm text-red-500">
                                                {errors.patientId.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Doctor Section */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <Stethoscope className="h-4 w-4" />

                                    <h3 className="font-semibold">Doctor Information</h3>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="doctorId">Select Doctor</Label>

                                    <Controller
                                        name="doctorId"
                                        control={control}
                                        rules={{
                                            required: 'Doctor is required',
                                        }}
                                        render={({ field }) => (
                                            <Select
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger
                                                    id="doctorId"
                                                    disabled={doctorsLoading}
                                                >
                                                    <SelectValue placeholder="Select a doctor" />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    {doctors.map((doctor) => (
                                                        <SelectItem
                                                            key={doctor._id}
                                                            value={doctor._id}
                                                        >
                                                            Dr. {doctor.specialization}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />

                                    {errors.doctorId && (
                                        <p className="text-sm text-red-500">
                                            {errors.doctorId.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Bed Section */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <Bed className="h-4 w-4" />

                                    <h3 className="font-semibold">Room & Bed Assignment</h3>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    {/* Ward */}
                                    <div className="space-y-2">
                                        <Label htmlFor="wardId">Select Ward</Label>

                                        <Controller
                                            name="wardId"
                                            control={control}
                                            rules={{
                                                required: 'Ward is required',
                                            }}
                                            render={({ field }) => (
                                                <Select
                                                    value={field.value}
                                                    onValueChange={(value) => {
                                                        field.onChange(value);

                                                        setSelectedWard(value);

                                                        setSelectedBed('');

                                                        setValue('bedId', '');
                                                    }}
                                                >
                                                    <SelectTrigger id="wardId">
                                                        <SelectValue placeholder="Select a ward" />
                                                    </SelectTrigger>

                                                    <SelectContent>
                                                        {wards.map((ward) => (
                                                            <SelectItem
                                                                key={ward._id}
                                                                value={ward._id}
                                                            >
                                                                {ward.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                    </div>

                                    {/* Bed */}
                                    <div className="space-y-2">
                                        <Label htmlFor="bedId">Select Available Bed</Label>

                                        <Controller
                                            name="bedId"
                                            control={control}
                                            rules={{
                                                required: 'Bed is required',
                                            }}
                                            render={({ field }) => (
                                                <Select
                                                    value={field.value}
                                                    onValueChange={(value) => {
                                                        field.onChange(value);

                                                        setSelectedBed(value);
                                                    }}
                                                    disabled={!selectedWard || bedsLoading}
                                                >
                                                    <SelectTrigger id="bedId">
                                                        <SelectValue placeholder="Select a bed" />
                                                    </SelectTrigger>

                                                    <SelectContent>
                                                        {availableBeds.map((bed) => (
                                                            <SelectItem
                                                                key={bed._id}
                                                                value={bed._id}
                                                            >
                                                                Bed {bed.bedNumber} -{' '}
                                                                {bed.roomNumber}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Appointment Details */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />

                                    <h3 className="font-semibold">Appointment Details</h3>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="appointmentDate">Appointment Date & Time</Label>

                                    <Input
                                        id="appointmentDate"
                                        type="datetime-local"
                                        {...register('appointmentDate', {
                                            required: 'Date is required',
                                        })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="reason">Reason for Admission</Label>

                                    <Input
                                        id="reason"
                                        placeholder="e.g., Annual checkup"
                                        {...register('reason', {
                                            required: 'Reason is required',
                                        })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="notes">Additional Notes</Label>

                                    <Textarea
                                        id="notes"
                                        placeholder="Any additional information..."
                                        rows={4}
                                        {...register('notes')}
                                    />
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                                <Button
                                    type="submit"
                                    disabled={admissionsLoading || !selectedWard || !selectedBed}
                                    className="gap-2"
                                >
                                    {admissionsLoading && (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    )}
                                    Book Appointment
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

                {/* Sidebar */}
                <div className="space-y-4">
                    {/* Available Beds */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Available Beds</CardTitle>
                        </CardHeader>

                        <CardContent>
                            {selectedWard && availableBeds.length > 0 ? (
                                <div className="space-y-2">
                                    {availableBeds.map((bed) => (
                                        <div
                                            key={bed._id}
                                            className="cursor-pointer rounded border p-2 text-sm transition-colors hover:bg-muted"
                                            onClick={() => {
                                                setSelectedBed(bed._id);

                                                setValue('bedId', bed._id);
                                            }}
                                        >
                                            <p className="font-medium">Bed {bed.bedNumber}</p>

                                            <p className="text-xs text-muted-foreground">
                                                Room {bed.roomNumber}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : selectedWard ? (
                                <p className="text-sm text-muted-foreground">
                                    No beds available in this ward
                                </p>
                            ) : (
                                <p className="text-sm text-muted-foreground">
                                    Select a ward to view available beds
                                </p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Selected Doctor */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Selected Doctor</CardTitle>
                        </CardHeader>

                        <CardContent>
                            {selectedDoctor ? (
                                <div className="space-y-2">
                                    <p className="font-medium">
                                        Dr. {selectedDoctor.specialization}
                                    </p>

                                    <p className="text-sm text-muted-foreground">
                                        Department: {selectedDoctor.department}
                                    </p>
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground">No doctor selected</p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
