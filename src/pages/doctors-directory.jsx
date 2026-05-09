import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import { toast } from 'sonner';

import { Loader2, Search, ShieldCheck, UserPlus } from 'lucide-react';

import { fetchDoctors } from '../feature/doctors/doctors.slice';

import { approveDoctor } from '@/api/doctors.api';

import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';

import { Card, CardContent } from '@/components/ui/card';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const departments = ['Cardiology', 'Neurology', 'Orthopedics', 'General Medicine', 'Pediatrics'];

export default function DoctorsDirectory() {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { doctors = [], loading, error } = useSelector((state) => state.doctors);

    const [searchTerm, setSearchTerm] = useState('');

    const [departmentFilter, setDepartmentFilter] = useState('ALL');

    const [statusFilter, setStatusFilter] = useState('ALL');

    const [verifiedFilter, setVerifiedFilter] = useState('ALL');

    const [approvingDoctorId, setApprovingDoctorId] = useState(null);

    const loadDoctors = useCallback(async () => {
        try {
            await dispatch(
                fetchDoctors({
                    department: departmentFilter === 'ALL' ? '' : departmentFilter,

                    status: statusFilter === 'ALL' ? '' : statusFilter,

                    isVerified: verifiedFilter === 'ALL' ? '' : verifiedFilter === 'VERIFIED',
                }),
            ).unwrap();
        } catch (error) {
            console.error(error);

            toast.error(error?.message || 'Failed to fetch doctors');
        }
    }, [dispatch, departmentFilter, statusFilter, verifiedFilter]);

    useEffect(() => {
        loadDoctors();
    }, [loadDoctors]);

    const filteredDoctors = useMemo(() => {
        return doctors.filter((doctor) => {
            const search = searchTerm.toLowerCase();

            const doctorName = `${doctor.firstName || ''} ${doctor.lastName || ''}`.toLowerCase();

            return (
                doctorName.includes(search) ||
                doctor.email?.toLowerCase().includes(search) ||
                doctor.specialization?.toLowerCase().includes(search)
            );
        });
    }, [doctors, searchTerm]);

    const handleVerifyDoctor = async (doctorId) => {
        if (approvingDoctorId) return;

        try {
            setApprovingDoctorId(doctorId);

            await approveDoctor(doctorId);

            toast.success('Doctor approved successfully');

            await loadDoctors();
        } catch (error) {
            console.error(error);

            toast.error(error?.response?.data?.message || 'Failed to approve doctor');
        } finally {
            setApprovingDoctorId(null);
        }
    };

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Doctors Directory</h1>

                    <p className="mt-1 text-muted-foreground">
                        Browse and manage healthcare professionals
                    </p>
                </div>

                <Button
                    onClick={() => navigate('/dashboard/doctors/create')}
                    className="gap-2"
                >
                    <UserPlus className="h-4 w-4" />
                    Add Doctor
                </Button>
            </div>

            {/* Filters */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />

                    <Input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search doctors..."
                        className="pl-9"
                    />
                </div>

                {/* Department */}
                <Select
                    value={departmentFilter}
                    onValueChange={setDepartmentFilter}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Department" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="ALL">All Departments</SelectItem>

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

                {/* Status */}
                <Select
                    value={statusFilter}
                    onValueChange={setStatusFilter}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="ALL">All Status</SelectItem>

                        <SelectItem value="ACTIVE">Active</SelectItem>

                        <SelectItem value="INACTIVE">Inactive</SelectItem>
                    </SelectContent>
                </Select>

                {/* Verification */}
                <Select
                    value={verifiedFilter}
                    onValueChange={setVerifiedFilter}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Verification" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="ALL">All Verification</SelectItem>

                        <SelectItem value="VERIFIED">Verified</SelectItem>

                        <SelectItem value="UNVERIFIED">Unverified</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Error */}
            {error && (
                <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                    {error}
                </div>
            )}

            {/* Loading */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
            ) : filteredDoctors.length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                        <p className="text-lg font-medium">No doctors found</p>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Try changing filters or search terms
                        </p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {filteredDoctors.map((doctor) => (
                        <Card
                            key={doctor._id}
                            className="cursor-pointer transition-all hover:shadow-lg"
                            onClick={() => navigate(`/doctor/profile/${doctor._id}`)}
                        >
                            <CardContent className="space-y-5 p-5">
                                {/* Top */}
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <h2 className="text-xl font-semibold">
                                            Dr. {doctor.firstName} {doctor.lastName}
                                        </h2>

                                        <p className="text-sm text-muted-foreground">
                                            {doctor.specialization}
                                        </p>
                                    </div>

                                    <div className="flex flex-col items-end gap-2">
                                        {/* Status */}
                                        <span
                                            className={`rounded-full px-2 py-1 text-xs font-medium ${
                                                doctor.status === 'ACTIVE'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-gray-200 text-gray-700'
                                            }`}
                                        >
                                            {doctor.status}
                                        </span>

                                        {/* Verified */}
                                        <span
                                            className={`rounded-full px-2 py-1 text-xs font-medium ${
                                                doctor.isVerified
                                                    ? 'bg-blue-100 text-blue-700'
                                                    : 'bg-orange-100 text-orange-700'
                                            }`}
                                        >
                                            {doctor.isVerified ? 'Verified' : 'Pending'}
                                        </span>
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="space-y-3 text-sm">
                                    <div>
                                        <p className="text-muted-foreground">Department</p>

                                        <p className="font-medium">{doctor.department}</p>
                                    </div>

                                    <div>
                                        <p className="text-muted-foreground">Email</p>

                                        <p className="break-all font-medium">{doctor.email}</p>
                                    </div>

                                    <div>
                                        <p className="text-muted-foreground">License ID</p>

                                        <p className="font-medium">{doctor.licenseId}</p>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="space-y-2">
                                    {!doctor.isVerified && (
                                        <Button
                                            className="w-full gap-2"
                                            disabled={approvingDoctorId === doctor._id}
                                            onClick={async (event) => {
                                                event.stopPropagation();

                                                await handleVerifyDoctor(doctor._id);
                                            }}
                                        >
                                            {approvingDoctorId === doctor._id ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            ) : (
                                                <ShieldCheck className="h-4 w-4" />
                                            )}

                                            {approvingDoctorId === doctor._id
                                                ? 'Approving...'
                                                : 'Approve Doctor'}
                                        </Button>
                                    )}

                                    <Button
                                        variant="outline"
                                        className="w-full"
                                    >
                                        View Profile
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
