// src/pages/SectorPage.jsx
import React from 'react';
import IntroSection from '@/components/sector/SectorConstruction/IntroSection';
import FirstLayout from '@/components/sector/SectorConstruction/Layout1';
import FourthLayout from '@/components/sector/SectorConstruction/Layout4';
import useFullpageSnap from '@/hooks/useFullPageSnap';

const ConstructionSectorPage = () => {
  useFullpageSnap({enabled: true});

  // Filter data berdasarkan layout

  return (
    <main className="overflow-x-hidden">
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
    </main>
  );
};

export default ConstructionSectorPage;