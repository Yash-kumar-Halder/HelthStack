import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWards } from '../feature/wards/wards.slice';
import { fetchRooms } from '../feature/rooms/rooms.slice';
import { fetchBeds } from '../feature/beds/beds.slice';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Loader2, Building2, Bed, Check, Clock, DoorOpenIcon } from 'lucide-react';

export default function BedAvailability() {
    const dispatch = useDispatch();
    const { wards, loading: wardsLoading } = useSelector((state) => state.wards);
    console.log(wardsLoading);
    const { rooms, loading: roomsLoading } = useSelector((state) => state.rooms);
    console.log(roomsLoading);
    const { beds, loading: bedsLoading } = useSelector((state) => state.beds);

    const [selectedWard, setSelectedWard] = useState('');
    const [selectedRoom, setSelectedRoom] = useState('');
    const [bedStatus, setBedStatus] = useState('');

    useEffect(() => {
        dispatch(fetchWards());
    }, [dispatch]);

    useEffect(() => {
        if (selectedWard) {
            dispatch(fetchRooms({ wardId: selectedWard }));
        }
    }, [selectedWard, dispatch]);

    useEffect(() => {
        const filters = {};
        if (selectedWard) filters.wardId = selectedWard;
        if (selectedRoom) filters.roomId = selectedRoom;
        if (bedStatus) filters.status = bedStatus;

        dispatch(fetchBeds(filters));
    }, [selectedWard, selectedRoom, bedStatus, dispatch]);

    const filteredBeds = beds;

    const availableBedCount = beds.filter((b) => b.status === 'AVAILABLE').length;
    const occupiedBedCount = beds.filter((b) => b.status === 'OCCUPIED').length;

    const getStatusColor = (status) => {
        switch (status) {
            case 'AVAILABLE':
                return 'bg-green-100 text-green-800';
            case 'OCCUPIED':
                return 'bg-red-100 text-red-800';
            case 'MAINTENANCE':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'AVAILABLE':
                return <Check className="h-4 w-4" />;
            case 'OCCUPIED':
                return <Bed className="h-4 w-4" />;
            case 'MAINTENANCE':
                return <Clock className="h-4 w-4" />;
            default:
                return null;
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Bed Availability</h1>
                <p className="text-muted-foreground mt-2">
                    Check real-time bed availability across all wards
                </p>
            </div>

            {/* Statistics */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-600" />
                            Available Beds
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{availableBedCount}</div>
                        <p className="text-xs text-muted-foreground">Ready for admission</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                            <Bed className="h-4 w-4 text-red-600" />
                            Occupied Beds
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{occupiedBedCount}</div>
                        <p className="text-xs text-muted-foreground">Currently in use</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-blue-600" />
                            Total Beds
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{beds.length}</div>
                        <p className="text-xs text-muted-foreground">Across all wards</p>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <Card>
                <CardHeader>
                    <CardTitle>Filter Beds</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Select Ward</label>
                            <Select
                                value={selectedWard}
                                onValueChange={setSelectedWard}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="All Wards" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">All Wards</SelectItem>
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
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Select Room</label>
                            <Select
                                value={selectedRoom}
                                onValueChange={setSelectedRoom}
                                disabled={!selectedWard}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="All Rooms" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">All Rooms</SelectItem>
                                    {rooms.map((room) => (
                                        <SelectItem
                                            key={room._id}
                                            value={room._id}
                                        >
                                            Room {room.roomNumber}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Bed Status</label>
                            <Select
                                value={bedStatus}
                                onValueChange={setBedStatus}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="All Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">All Status</SelectItem>
                                    <SelectItem value="AVAILABLE">Available</SelectItem>
                                    <SelectItem value="OCCUPIED">Occupied</SelectItem>
                                    <SelectItem value="MAINTENANCE">Maintenance</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Beds Grid */}
            {bedsLoading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
            ) : filteredBeds.length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">No beds found with selected filters</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {filteredBeds.map((bed) => (
                        <Card
                            key={bed._id}
                            className={`cursor-pointer transition-all hover:shadow-lg ${
                                bed.status === 'AVAILABLE' ? 'border-green-200' : 'border-red-200'
                            }`}
                        >
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle className="text-lg">
                                            Bed {bed.bedNumber}
                                        </CardTitle>
                                        <CardDescription className="flex items-center gap-1 mt-1">
                                            <DoorOpenIcon className="h-3 w-3" />
                                            Room {bed.roomNumber}
                                        </CardDescription>
                                    </div>
                                    <Badge className={getStatusColor(bed.status)}>
                                        {getStatusIcon(bed.status)}
                                        <span className="ml-1">{bed.status}</span>
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div>
                                    <p className="text-sm text-muted-foreground">Bed Type</p>
                                    <p className="font-medium">{bed.bedType || 'Standard'}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Ward</p>
                                    <p className="font-medium text-sm">{bed.ward?.name || 'N/A'}</p>
                                </div>
                                {bed.status === 'OCCUPIED' && bed.patient && (
                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            Current Patient
                                        </p>
                                        <p className="font-medium text-sm">{bed.patient.name}</p>
                                    </div>
                                )}
                                <Button
                                    size="sm"
                                    className="w-full"
                                    variant={bed.status === 'AVAILABLE' ? 'default' : 'secondary'}
                                >
                                    {bed.status === 'AVAILABLE' ? 'Book Now' : 'View Details'}
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
