import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import React from 'react';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="flex-1">
                <Outlet />
            </main>
        </SidebarProvider>
    );
};

export default DashboardLayout;
