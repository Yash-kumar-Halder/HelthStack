import React from 'react';
import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
    return (
        <main className="pt-14 px-6">
            <h1>Home</h1>
            <Outlet />
        </main>
    );
};

export default HomeLayout;
