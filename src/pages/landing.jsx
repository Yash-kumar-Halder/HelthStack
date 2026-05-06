import React from 'react';
import Navigation from '../components/navigation.jsx';
import Feature from '../components/feature.jsx';
import HeroLanding from '../components/hero-landing.jsx';

const Landing = () => {
    return (
        <div className="w-full min-h-screen">
            <HeroLanding />
            <Feature />
        </div>
    );
};

export default Landing;
