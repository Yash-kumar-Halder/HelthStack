import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Users, Loader2 } from 'lucide-react';

export default function PatientsDirectory() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(false);
    console.log(setPatients, setLoading);
    const filteredPatients = patients.filter(
        (patient) =>
            patient.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.patientId?.includes(searchTerm),
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Patients</h1>
                    <p className="text-muted-foreground mt-2">Manage and view patient profiles</p>
                </div>
                <Button
                    onClick={() => navigate('/dashboard/patients/create')}
                    size="lg"
                    className="gap-2"
                >
                    <Plus className="h-4 w-4" />
                    New Patient
                </Button>
            </div>

            <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search by name, email, or patient ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                />
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
            ) : filteredPatients.length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <Users className="h-12 w-12 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">No patients found</p>
                        <Button
                            variant="outline"
                            onClick={() => navigate('/dashboard/patients/create')}
                            className="mt-4"
                        >
                            Create First Patient
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredPatients.map((patient) => (
                        <Card
                            key={patient._id}
                            className="hover:shadow-lg transition-shadow cursor-pointer"
                            onClick={() => navigate(`/dashboard/patients/${patient._id}`)}
                        >
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <CardTitle className="text-lg">
                                            {patient.firstName} {patient.lastName}
                                        </CardTitle>
                                        <CardDescription>ID: {patient.patientId}</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div>
                                    <p className="text-sm text-muted-foreground">Age</p>
                                    <p className="font-medium">{patient.age} years</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Blood Type</p>
                                    <Badge variant="outline">{patient.bloodType}</Badge>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Contact</p>
                                    <p className="font-medium text-sm break-all">{patient.email}</p>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full"
                                >
                                    View Profile
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
