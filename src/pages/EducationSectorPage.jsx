// src/pages/SectorPage.jsx
import React from 'react';
import IntroSection from '@/components/sector/SectorEducation/HeroSector';
import FirstLayout from '@/components/sector/SectorEducation/Section1';
import FourthLayout from '@/components/sector/SectorEducation/Layout4';
import useFullpageSnap from '@/hooks/useFullPageSnap';
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
const ConstructionSectorPage = () => {
  useFullpageSnap({enabled: true});

  // Filter data berdasarkan layout

  return (
    <main className="overflow-x-hidden">
      <Navbar/>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{ display: 'none' }}>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
          </filter>
        </defs>
      </svg>
      <IntroSection/>
      <FirstLayout/>
      <FourthLayout/>
      <Footer/>
    </main>
  );
};

export default ConstructionSectorPage;