import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../feature/auth/auth.slice';

import { Button } from '@/components/ui/button';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
    Stethoscope,
    Users,
    Calendar,
    Bed,
    LayoutGrid,
    Menu,
    LogOut,
    Settings,
    User,
    User2,
    Shield,
    ClipboardList,
} from 'lucide-react';

const roleNavigation = {
    ADMIN: [
        {
            label: 'Dashboard',
            href: '/admin/dashboard',
            icon: LayoutGrid,
        },
        {
            label: 'Doctors',
            href: '/admin/doctors',
            icon: Stethoscope,
        },
        {
            label: 'Patients',
            href: '/admin/patients',
            icon: Users,
        },
        {
            label: 'Appointments',
            href: '/admin/appointments',
            icon: Calendar,
        },
        {
            label: 'Beds',
            href: '/admin/beds',
            icon: Bed,
        },
        {
            label: 'Users',
            href: '/admin/users',
            icon: Shield,
        },
    ],

    DOCTOR: [
        {
            label: 'Dashboard',
            href: '/doctor/dashboard',
            icon: LayoutGrid,
        },
        {
            label: 'Appointments',
            href: '/doctor/appointments',
            icon: Calendar,
        },
        {
            label: 'Patients',
            href: '/doctor/patients',
            icon: Users,
        },
        {
            label: 'My Profile',
            href: '/doctor/profile',
            icon: User,
        },
    ],

    PATIENT: [
        {
            label: 'Dashboard',
            href: '/patient/dashboard',
            icon: LayoutGrid,
        },
        {
            label: 'Appointments',
            href: '/patient/appointments',
            icon: ClipboardList,
        },
        {
            label: 'Profile',
            href: '/patient/profile',
            icon: User,
        },
    ],
};

function NavLink({ item, isActive, onClick }) {
    const Icon = item.icon;

    return (
        <Button
            variant={isActive ? 'default' : 'ghost'}
            className="w-full justify-start gap-2"
            onClick={onClick}
        >
            <Icon className="h-4 w-4" />

            {item.label}
        </Button>
    );
}

export default function DashboardLayout() {
    const location = useLocation();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);

    const userRole = user?.role?.name || 'PATIENT';

    const navItems = roleNavigation[userRole] || [];

    const basePath =
        userRole === 'ADMIN' ? '/admin' : userRole === 'DOCTOR' ? '/doctor' : '/patient';

    const handleLogout = () => {
        dispatch(logout());

        navigate('/login');
    };

    const currentPage =
        navItems.find((item) => location.pathname.startsWith(item.href))?.label || 'Dashboard';

    return (
        <div className="flex h-screen">
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex w-64 border-r bg-muted/30 flex-col">
                {/* Logo */}
                <div className="p-6 border-b">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600">
                            <Stethoscope className="h-5 w-5 text-white" />
                        </div>

                        <div>
                            <h2 className="font-bold text-lg">HealthStack</h2>

                            <p className="text-xs text-muted-foreground">Hospital Management</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.href}
                            item={item}
                            isActive={location.pathname === item.href}
                            onClick={() => navigate(item.href)}
                        />
                    ))}
                </nav>

                {/* Bottom Actions */}
                <div className="p-4 border-t space-y-2">
                    <Button
                        variant="ghost"
                        className="w-full justify-start gap-2"
                        onClick={() => navigate(`${basePath}/settings`)}
                    >
                        <Settings className="h-4 w-4" />
                        Settings
                    </Button>

                    <Button
                        variant="ghost"
                        className="w-full justify-start gap-2 text-destructive hover:text-destructive"
                        onClick={handleLogout}
                    >
                        <LogOut className="h-4 w-4" />
                        Logout
                    </Button>
                </div>
            </aside>

            {/* Main Layout */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="border-b bg-white px-4 py-4 md:px-6">
                    <div className="flex items-center justify-between">
                        {/* Left */}
                        <div className="flex items-center gap-4">
                            {/* Mobile Sidebar */}
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="md:hidden"
                                    >
                                        <Menu className="h-5 w-5" />
                                    </Button>
                                </SheetTrigger>

                                <SheetContent
                                    side="left"
                                    className="w-64"
                                >
                                    <div className="mb-6">
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600">
                                                <Stethoscope className="h-5 w-5 text-white" />
                                            </div>

                                            <div>
                                                <h2 className="font-bold">HealthStack</h2>

                                                <p className="text-xs text-muted-foreground">
                                                    Hospital Management
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <nav className="space-y-2">
                                        {navItems.map((item) => (
                                            <NavLink
                                                key={item.href}
                                                item={item}
                                                isActive={location.pathname === item.href}
                                                onClick={() => navigate(item.href)}
                                            />
                                        ))}
                                    </nav>
                                </SheetContent>
                            </Sheet>

                            {/* Page Title */}
                            <div>
                                <h1 className="text-2xl font-bold">{currentPage}</h1>
                            </div>
                        </div>

                        {/* User Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="gap-2"
                                >
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
                                        <User className="h-4 w-4 text-blue-600" />
                                    </div>

                                    <span className="hidden sm:inline">{user?.name || 'User'}</span>

                                    <span className="text-xs rounded-full px-2 py-0.5 bg-orange-500 text-white">
                                        {userRole}
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem onClick={() => navigate(`${basePath}/profile`)}>
                                    <User className="h-4 w-4 mr-2" />
                                    Profile
                                </DropdownMenuItem>

                                <DropdownMenuItem onClick={() => navigate(`${basePath}/settings`)}>
                                    <Settings className="h-4 w-4 mr-2" />
                                    Settings
                                </DropdownMenuItem>

                                <DropdownMenuItem onClick={() => navigate(`/users/${user?._id}`)}>
                                    <User2 className="h-4 w-4 mr-2" />
                                    Public Profile
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem
                                    onClick={handleLogout}
                                    className="text-destructive cursor-pointer"
                                >
                                    <LogOut className="h-4 w-4 mr-2" />
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto bg-muted/30">
                    <div className="p-4 md:p-6 max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
