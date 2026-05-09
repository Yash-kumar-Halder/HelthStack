import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchDoctorById, clearCurrentDoctor } from '../feature/doctors/doctors.slice';

import { deleteDoctor } from '@/api/doctors.api';

import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Badge } from '@/components/ui/badge';

import { Separator } from '@/components/ui/separator';

import { Loader2, ArrowLeft, Edit, Trash2, Mail, Phone, Calendar } from 'lucide-react';

export default function DoctorProfile() {
    const { doctorId } = useParams();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { currentDoctor, loading, error } = useSelector((state) => state.doctors);

    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (!doctorId) return;

        dispatch(fetchDoctorById(doctorId));

        return () => {
            dispatch(clearCurrentDoctor());
        };
    }, [dispatch, doctorId]);

    const deleteDoctorHandler = async () => {
        if (isDeleting) return;

        const confirmDelete = window.confirm(
            'Are you sure you want to delete this doctor profile?',
        );

        if (!confirmDelete) return;

        try {
            setIsDeleting(true);

            await deleteDoctor(doctorId);

            toast.success('Doctor deleted successfully');

            dispatch(clearCurrentDoctor());

            navigate(-1, {
                replace: true,
            });
        } catch (error) {
            console.error(error);

            toast.error(error?.response?.data?.message || 'Failed to delete doctor');
        } finally {
            setIsDeleting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <Button
                    variant="ghost"
                    onClick={() => navigate(-1)}
                    className="mb-4 gap-2"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </Button>

                <div className="bg-destructive/10 border border-destructive/30 text-destructive px-4 py-3 rounded-lg">
                    {error}
                </div>
            </div>
        );
    }

    if (!currentDoctor) {
        return (
            <div>
                <Button
                    variant="ghost"
                    onClick={() => navigate(-1)}
                    className="mb-4 gap-2"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </Button>

                <p className="text-muted-foreground">Doctor not found</p>
            </div>
        );
    }

    const doctor = currentDoctor;

    return (
        <div className="space-y-6">
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
                        <h1 className="text-3xl font-bold tracking-tight">
                            {doctor.userId?.name || 'Doctor'}
                        </h1>

                        <p className="text-muted-foreground">{doctor.specialization}</p>
                    </div>
                </div>

                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        onClick={() => navigate(`/doctor/profile/${doctorId}/edit`)}
                        className="gap-2"
                    >
                        <Edit className="h-4 w-4" />
                        Edit
                    </Button>

                    <Button
                        variant="destructive"
                        className="gap-2"
                        onClick={deleteDoctorHandler}
                        disabled={isDeleting}
                    >
                        {isDeleting ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Trash2 className="h-4 w-4" />
                        )}

                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </Button>
                </div>
            </div>

            {/* Content */}
            <div className="grid gap-6 md:grid-cols-3">
                {/* Professional Info */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Professional Information</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <p className="text-sm text-muted-foreground">Status</p>

                                <Badge className="mt-1">{doctor.status}</Badge>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">Verification</p>

                                <Badge
                                    className={`mt-1 ${
                                        doctor.isVerified ? 'bg-green-600' : 'bg-orange-500'
                                    }`}
                                >
                                    {doctor.isVerified ? 'Verified' : 'Pending'}
                                </Badge>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">Department</p>

                                <p className="font-medium mt-1">{doctor.department}</p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">Specialization</p>

                                <p className="font-medium mt-1">{doctor.specialization}</p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">License Number</p>

                                <p className="font-medium mt-1">{doctor.licenseId}</p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">Gender</p>

                                <p className="font-medium mt-1">{doctor.gender}</p>
                            </div>
                        </div>

                        <Separator />

                        <div className="grid md:grid-cols-3 gap-4">
                            <div>
                                <p className="text-sm text-muted-foreground mb-2">Experience</p>

                                <p className="font-medium">{doctor.experience} years</p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground mb-2">
                                    Consultation Fee
                                </p>

                                <p className="font-medium">₹{doctor.consultationFee}</p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground mb-2">Qualifications</p>

                                <div className="flex flex-wrap gap-2">
                                    {doctor.qualifications?.map((qualification) => (
                                        <Badge
                                            key={qualification}
                                            variant="secondary"
                                        >
                                            {qualification}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Contact Info */}
                <Card>
                    <CardHeader>
                        <CardTitle>Contact Details</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Mail className="h-4 w-4 text-muted-foreground" />

                            <div>
                                <p className="text-sm text-muted-foreground">Email</p>

                                <p className="font-medium text-sm break-all">
                                    {doctor.userId?.email || 'N/A'}
                                </p>
                            </div>
                        </div>

                        <Separator />

                        <div className="flex items-center gap-3">
                            <Phone className="h-4 w-4 text-muted-foreground" />

                            <div>
                                <p className="text-sm text-muted-foreground">Phone</p>

                                <p className="font-medium text-sm">
                                    {doctor.userId?.phone || 'N/A'}
                                </p>
                            </div>
                        </div>

                        <Separator />

                        <div className="flex items-center gap-3">
                            <Calendar className="h-4 w-4 text-muted-foreground" />

                            <div>
                                <p className="text-sm text-muted-foreground">Joined</p>

                                <p className="font-medium text-sm">
                                    {new Date(doctor.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
