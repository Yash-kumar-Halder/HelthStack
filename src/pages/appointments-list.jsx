import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
    Plus,
    Calendar,
    User,
    Stethoscope,
    Bed,
    Clock,
    CheckCircle,
    Loader2,
    AlertCircle,
} from 'lucide-react';

export default function AppointmentsList() {
    const navigate = useNavigate();
    // const dispatch = useDispatch();
    const { admissions, loading, error } = useSelector((state) => state.admissions);

    const getStatusBadge = (status) => {
        const statusMap = {
            ACTIVE: { variant: 'default', icon: CheckCircle, label: 'Active' },
            PENDING: { variant: 'secondary', icon: Clock, label: 'Pending' },
            COMPLETED: { variant: 'outline', icon: CheckCircle, label: 'Completed' },
            CANCELLED: { variant: 'destructive', icon: AlertCircle, label: 'Cancelled' },
        };

        const config = statusMap[status] || { variant: 'secondary', icon: Clock, label: status };
        const Icon = config.icon;

        return (
            <Badge
                variant={config.variant}
                className="gap-1"
            >
                <Icon className="h-3 w-3" />
                {config.label}
            </Badge>
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
                    <p className="text-muted-foreground mt-2">
                        Manage patient admissions and appointments
                    </p>
                </div>
                <Button
                    onClick={() => navigate('/dashboard/appointments/new')}
                    size="lg"
                    className="gap-2"
                >
                    <Plus className="h-4 w-4" />
                    Book Appointment
                </Button>
            </div>

            {error && (
                <div className="bg-destructive/10 border border-destructive/30 text-destructive px-4 py-3 rounded-lg flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    {error}
                </div>
            )}

            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
            ) : admissions?.length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground mb-4">No appointments booked yet</p>
                        <Button onClick={() => navigate('/dashboard/appointments/new')}>
                            Create First Appointment
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {admissions.map((admission) => (
                        <Card
                            key={admission._id}
                            className="hover:shadow-lg transition-shadow cursor-pointer"
                            onClick={() => navigate(`/dashboard/appointments/${admission._id}`)}
                        >
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <CardTitle className="flex items-center gap-2">
                                            <User className="h-4 w-4" />
                                            {admission.patient?.firstName}{' '}
                                            {admission.patient?.lastName}
                                        </CardTitle>
                                        <CardDescription>
                                            {admission.patient?.patientId}
                                        </CardDescription>
                                    </div>
                                    {getStatusBadge(admission.status)}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                                            <Stethoscope className="h-3 w-3" />
                                            Doctor
                                        </p>
                                        <p className="font-medium mt-1">
                                            Dr. {admission.doctor?.name}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {admission.doctor?.specialization}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                                            <Calendar className="h-3 w-3" />
                                            Admission Date
                                        </p>
                                        <p className="font-medium mt-1">
                                            {new Date(admission.admissionDate).toLocaleDateString()}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {new Date(admission.admissionDate).toLocaleTimeString()}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                                            <Bed className="h-3 w-3" />
                                            Bed Assignment
                                        </p>
                                        <p className="font-medium mt-1">
                                            Bed {admission.bed?.bedNumber}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Room {admission.bed?.roomNumber}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-muted-foreground">Reason</p>
                                        <p className="font-medium mt-1">{admission.reason}</p>
                                    </div>
                                </div>

                                <Separator className="my-4" />

                                <div className="space-y-2">
                                    <p className="text-sm text-muted-foreground">Clinical Notes</p>
                                    <p className="text-sm">
                                        {admission.clinicalNotes || 'No additional notes'}
                                    </p>
                                </div>

                                {admission.dischargeDate && (
                                    <div className="mt-4 pt-4 border-t">
                                        <p className="text-sm text-muted-foreground">
                                            Discharged:{' '}
                                            {new Date(admission.dischargeDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                )}

                                <div className="flex gap-2 mt-4 pt-4 border-t">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex-1"
                                    >
                                        View Details
                                    </Button>
                                    {!admission.dischargeDate && (
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            className="flex-1"
                                        >
                                            Discharge Patient
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
