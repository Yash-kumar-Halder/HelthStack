import React from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import Features from './Features';
import Stats from './Stats';
import Services from './Services';
import Blog from './Blog';
import About from './About';
import Footer from './Footer';
const Home = () => {
    return (
        <>
            <Navbar />
            <HeroSection />
            <Features />
            <Stats />
            <Services />
            <Blog />
            <About />
            <Footer />
        </>
    );
};

export default Home;
