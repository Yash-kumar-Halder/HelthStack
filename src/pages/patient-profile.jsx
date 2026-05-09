import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchPatientById,
    fetchPatientAdmissions,
    clearCurrentPatient,
} from '../feature/patients/patients.slice';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Loader2, ArrowLeft, Edit, Trash2, Mail, Phone, Calendar, Droplet } from 'lucide-react';

export default function PatientProfile() {
    const { patientId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentPatient, patientAdmissions, loading, error } = useSelector(
        (state) => state.patients,
    );

    useEffect(() => {
        dispatch(fetchPatientById(patientId));
        dispatch(fetchPatientAdmissions(patientId));

        return () => {
            dispatch(clearCurrentPatient());
        };
    }, [dispatch, patientId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (error || !currentPatient) {
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
                    {error || 'Patient not found'}
                </div>
            </div>
        );
    }

    const patient = currentPatient;

    return (
        <div className="space-y-6">
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
                            {patient.firstName} {patient.lastName}
                        </h1>
                        <p className="text-muted-foreground">Patient ID: {patient.patientId}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        onClick={() => navigate(`/dashboard/patients/${patientId}/edit`)}
                        className="gap-2"
                    >
                        <Edit className="h-4 w-4" />
                        Edit
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <p className="text-sm text-muted-foreground">Date of Birth</p>
                                <p className="font-medium mt-1">
                                    {new Date(patient.dateOfBirth).toLocaleDateString()}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Age</p>
                                <p className="font-medium mt-1">{patient.age} years</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Gender</p>
                                <p className="font-medium mt-1">{patient.gender}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Blood Type</p>
                                <div className="mt-1">
                                    <Badge className="gap-2">
                                        <Droplet className="h-3 w-3" />
                                        {patient.bloodType}
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        <Separator />

                        <div>
                            <p className="text-sm text-muted-foreground mb-2">Address</p>
                            <p className="font-medium">{patient.address || 'N/A'}</p>
                        </div>

                        {patient.medicalHistory && (
                            <div>
                                <p className="text-sm text-muted-foreground mb-2">
                                    Medical History
                                </p>
                                <p className="font-medium">{patient.medicalHistory}</p>
                            </div>
                        )}

                        {patient.allergies && (
                            <div>
                                <p className="text-sm text-muted-foreground mb-2">Allergies</p>
                                <div className="flex flex-wrap gap-2">
                                    {patient.allergies.map((allergy) => (
                                        <Badge
                                            key={allergy}
                                            variant="destructive"
                                        >
                                            {allergy}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Contact Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <div>
                                <p className="text-sm text-muted-foreground">Email</p>
                                <p className="font-medium text-sm break-all">{patient.email}</p>
                            </div>
                        </div>
                        <Separator />
                        <div className="flex items-center gap-3">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <div>
                                <p className="text-sm text-muted-foreground">Phone</p>
                                <p className="font-medium text-sm">{patient.phone}</p>
                            </div>
                        </div>
                        <Separator />
                        <div className="flex items-center gap-3">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <div>
                                <p className="text-sm text-muted-foreground">Registered</p>
                                <p className="font-medium text-sm">
                                    {new Date(patient.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {patientAdmissions && patientAdmissions.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Admission History</CardTitle>
                        <CardDescription>
                            Previous hospital admissions and treatments
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {patientAdmissions.map((admission) => (
                                <div
                                    key={admission._id}
                                    className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="font-medium">Admission Date</p>
                                            <p className="text-sm text-muted-foreground">
                                                {new Date(
                                                    admission.admissionDate,
                                                ).toLocaleDateString()}
                                            </p>
                                        </div>
                                        {admission.dischargeDate && (
                                            <Badge variant="outline">Discharged</Badge>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
