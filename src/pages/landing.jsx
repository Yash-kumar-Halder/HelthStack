import React from 'react';
import Navigation from '../components/navigation.jsx';
import Home from '../components/home.jsx';
import Feature from '../components/feature.jsx';

const Landing = () => {
    return (
        <div className="w-full min-h-screen">
            <Navigation />
            <Home />
            <Feature />
        </div>
    );
};

export default Landing;
