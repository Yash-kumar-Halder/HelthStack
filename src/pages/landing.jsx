import React from 'react';
import Navigation from '../components/navigation.jsx';
import Feature from '../components/feature.jsx';
import HeroLanding from '../components/hero-landing.jsx';
import useLenisScroll from '@/lib/lenis.js';

const Landing = () => {
    useLenisScroll();
    return (
        <div className="w-full min-h-screen">
            <Navigation />
            <HeroLanding />
            <Feature />
        </div>
    );
};

export default Landing;
