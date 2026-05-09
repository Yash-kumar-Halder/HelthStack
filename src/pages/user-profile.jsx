import { fetchUserById } from '@/api/user.api';

import React, { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';

import { User, Mail, Phone, Shield, Calendar, BadgeCheck, CircleAlert } from 'lucide-react';

const UserProfile = () => {
    const { userId } = useParams();

    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState('');

    useEffect(() => {
        if (!userId) return;

        const getUser = async () => {
            try {
                setLoading(true);

                const data = await fetchUserById(userId);

                setUser(data);
            } catch (error) {
                console.error(error);

                setError(error?.response?.data?.message || 'Failed to fetch user');
            } finally {
                setLoading(false);
            }
        };

        getUser();
    }, [userId]);

    if (loading) {
        return <div className="p-6">Loading user profile...</div>;
    }

    if (error) {
        return (
            <div className="p-6">
                <div className="bg-red-100 text-red-600 border border-red-300 p-4 rounded-md">
                    {error}
                </div>
            </div>
        );
    }

    if (!user) {
        return <div className="p-6">User not found</div>;
    }

    const roleName = user?.role?.name?.toUpperCase();

    const handleCreateProfile = () => {
        if (roleName === 'DOCTOR') {
            navigate('/doctor/profile/create');
        }

        if (roleName === 'PATIENT') {
            navigate('/patient/profile/create');
        }
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">
            {/* USER CARD */}
            <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
                {/* Header */}
                <div className="border-b p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                            <User className="h-8 w-8 text-blue-600" />
                        </div>

                        <div>
                            <h1 className="text-3xl font-bold">{user.name}</h1>

                            <p className="text-gray-500 mt-1">
                                {user.role?.name || 'USER'} Account
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {/* Account Status */}
                        <span
                            className={`px-3 py-1 text-sm rounded-full ${
                                user.status === 'ACTIVE'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-red-100 text-red-700'
                            }`}
                        >
                            {user.status}
                        </span>

                        {/* Verification */}
                        <span
                            className={`px-3 py-1 text-sm rounded-full ${
                                user.isVerified
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'bg-orange-100 text-orange-700'
                            }`}
                        >
                            {user.isVerified ? 'Verified' : 'Unverified'}
                        </span>
                    </div>
                </div>

                {/* Body */}
                <div className="grid md:grid-cols-2 gap-6 p-6">
                    <div>
                        <div className="flex items-center gap-2 text-gray-500">
                            <User className="h-4 w-4" />

                            <p className="text-sm">Full Name</p>
                        </div>

                        <p className="text-lg font-medium mt-1">{user.name}</p>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 text-gray-500">
                            <Mail className="h-4 w-4" />

                            <p className="text-sm">Email Address</p>
                        </div>

                        <p className="text-lg font-medium mt-1 break-all">{user.email}</p>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 text-gray-500">
                            <Phone className="h-4 w-4" />

                            <p className="text-sm">Phone Number</p>
                        </div>

                        <p className="text-lg font-medium mt-1">{user.phone}</p>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 text-gray-500">
                            <Shield className="h-4 w-4" />

                            <p className="text-sm">Role</p>
                        </div>

                        <p className="text-lg font-medium mt-1">{user.role?.name || 'N/A'}</p>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 text-gray-500">
                            <BadgeCheck className="h-4 w-4" />

                            <p className="text-sm">Role Profile Created</p>
                        </div>

                        <p className="text-lg font-medium mt-1">
                            {user.isRoleProfileCreated ? 'Yes' : 'No'}
                        </p>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 text-gray-500">
                            <Calendar className="h-4 w-4" />

                            <p className="text-sm">Account Created</p>
                        </div>

                        <p className="text-lg font-medium mt-1">
                            {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            </div>

            {/* ROLE PROFILE SECTION */}
            <div className="mt-6 bg-white border rounded-2xl shadow-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                    {!user.isRoleProfileCreated && (
                        <CircleAlert className="h-5 w-5 text-orange-500" />
                    )}

                    <h2 className="text-2xl font-bold">{user.role?.name} Profile</h2>
                </div>

                {user.isRoleProfileCreated ? (
                    <div className="flex items-center justify-between flex-col md:flex-row gap-4">
                        <div>
                            <p className="text-green-700 font-medium">
                                {user.role?.name} profile already created.
                            </p>

                            <p className="text-gray-500 text-sm mt-1">
                                You can now manage and view profile details.
                            </p>
                        </div>

                        {console.log(user.profileId)}

                        <Button
                            onClick={() =>
                                navigate(`/${roleName.toLowerCase()}/profile/${user.profileId}`)
                            }
                        >
                            View {user.role?.name} Profile
                        </Button>
                    </div>
                ) : (
                    <div className="flex items-center justify-between flex-col md:flex-row gap-4">
                        <div>
                            <p className="text-orange-700 font-medium">
                                No {user.role?.name} profile created yet.
                            </p>

                            <p className="text-gray-500 text-sm mt-1">
                                Create your role-specific profile to continue.
                            </p>
                        </div>

                        {(roleName === 'DOCTOR' || roleName === 'PATIENT') && (
                            <Button onClick={handleCreateProfile}>
                                Create {user.role?.name} Profile
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
