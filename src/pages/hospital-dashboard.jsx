import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchDoctors } from '../feature/doctors/doctors.slice';
import { fetchBeds } from '../feature/beds/beds.slice';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Stethoscope, Users, Bed, Calendar, TrendingUp, Plus, ArrowRight } from 'lucide-react';

export default function HospitalDashboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { doctors } = useSelector((state) => state.doctors);
    const { beds } = useSelector((state) => state.beds);
    const { admissions } = useSelector((state) => state.admissions);

    useEffect(() => {
        dispatch(fetchDoctors({}));
        dispatch(fetchBeds({}));
    }, [dispatch]);

    const activeDoctors = doctors.filter((d) => d.status === 'ACTIVE');
    const availableBeds = beds.filter((b) => b.status === 'AVAILABLE');
    const occupiedBeds = beds.filter((b) => b.status === 'OCCUPIED');

    const stats = [
        {
            title: 'Active Doctors',
            value: activeDoctors.length,
            description: 'Available for consultation',
            icon: Stethoscope,
            color: 'text-blue-600',
            bgColor: 'bg-blue-100',
        },
        {
            title: 'Available Beds',
            value: availableBeds.length,
            description: 'Ready for admission',
            icon: Bed,
            color: 'text-green-600',
            bgColor: 'bg-green-100',
        },
        {
            title: 'Occupied Beds',
            value: occupiedBeds.length,
            description: 'Currently in use',
            icon: Users,
            color: 'text-red-600',
            bgColor: 'bg-red-100',
        },
        {
            title: 'Active Admissions',
            value: admissions?.length || 0,
            description: 'Ongoing appointments',
            icon: Calendar,
            color: 'text-purple-600',
            bgColor: 'bg-purple-100',
        },
    ];

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 p-8 text-white">
                <h1 className="text-3xl font-bold mb-2">Welcome to Hospital Dashboard</h1>
                <p className="text-blue-100">
                    Manage doctors, patients, appointments, and bed availability efficiently
                </p>
            </div>

            {/* Statistics Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <Card
                            key={stat.title}
                            className="hover:shadow-lg transition-shadow"
                        >
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <CardTitle className="text-sm font-medium">
                                        {stat.title}
                                    </CardTitle>
                                    <div className={`${stat.bgColor} p-2 rounded-lg`}>
                                        <Icon className={`h-5 w-5 ${stat.color}`} />
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {stat.description}
                                </p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Frequently used operations</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                        <Button
                            onClick={() => navigate('/dashboard/doctors/create')}
                            className="gap-2"
                            variant="outline"
                        >
                            <Plus className="h-4 w-4" />
                            Add Doctor
                        </Button>
                        <Button
                            onClick={() => navigate('/dashboard/patients/create')}
                            className="gap-2"
                            variant="outline"
                        >
                            <Plus className="h-4 w-4" />
                            Add Patient
                        </Button>
                        <Button
                            onClick={() => navigate('/dashboard/appointments/new')}
                            className="gap-2"
                            variant="outline"
                        >
                            <Plus className="h-4 w-4" />
                            Book Appointment
                        </Button>
                        <Button
                            onClick={() => navigate('/dashboard/beds')}
                            className="gap-2"
                            variant="outline"
                        >
                            <Bed className="h-4 w-4" />
                            Check Availability
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Recent Activity */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Top Doctors */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            Active Doctors
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => navigate('/dashboard/doctors')}
                                className="gap-1"
                            >
                                View All
                                <ArrowRight className="h-3 w-3" />
                            </Button>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {activeDoctors.slice(0, 5).map((doctor) => (
                            <div
                                key={doctor._id}
                                className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                                onClick={() => navigate(`/dashboard/doctors/${doctor._id}`)}
                            >
                                <div className="flex-1">
                                    <p className="font-medium">Dr. {doctor.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {doctor.specialization}
                                    </p>
                                </div>
                                <Badge>{doctor.department}</Badge>
                            </div>
                        ))}
                        {activeDoctors.length === 0 && (
                            <p className="text-muted-foreground text-center py-4">
                                No active doctors
                            </p>
                        )}
                    </CardContent>
                </Card>

                {/* Bed Status */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            Bed Status Overview
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => navigate('/dashboard/beds')}
                                className="gap-1"
                            >
                                View All
                                <ArrowRight className="h-3 w-3" />
                            </Button>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-3 border rounded-lg bg-green-50">
                            <div>
                                <p className="font-medium text-green-900">Available Beds</p>
                                <p className="text-sm text-green-700">Ready for admission</p>
                            </div>
                            <div className="text-2xl font-bold text-green-600">
                                {availableBeds.length}
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg bg-red-50">
                            <div>
                                <p className="font-medium text-red-900">Occupied Beds</p>
                                <p className="text-sm text-red-700">Currently in use</p>
                            </div>
                            <div className="text-2xl font-bold text-red-600">
                                {occupiedBeds.length}
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg bg-blue-50">
                            <div>
                                <p className="font-medium text-blue-900">Total Beds</p>
                                <p className="text-sm text-blue-700">Across all wards</p>
                            </div>
                            <div className="text-2xl font-bold text-blue-600">{beds.length}</div>
                        </div>
                        <div className="mt-4 pt-4 border-t">
                            <div className="flex items-center gap-2 text-sm">
                                <TrendingUp className="h-4 w-4 text-green-600" />
                                <span>
                                    {availableBeds.length > 0
                                        ? `${Math.round(
                                              (availableBeds.length / beds.length) * 100,
                                          )}% of beds available`
                                        : 'No beds available'}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
