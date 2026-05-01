// src/pages/SectorPage.jsx
import React from 'react';
import HeroSector from '@/components/sector/HeroSector';
import IntroSection from '@/components/sector/SectorHospitality/IntroSection';
import FirstLayout from '@/components/sector/SectorHospitality/Layout1';
import ThirdLayout from '@/components/sector/SectorHospitality/Layout3';
import NineLayout from '@/components/sector/SectorHospitality/Layout9';
import { sectorData } from '@/components/data/SectorData';
import useFullpageSnap from '@/hooks/useFullPageSnap';

const HospitalitySectorPage = () => {
  useFullpageSnap({enabled: true});

  // Filter data berdasarkan layout
  const layout1Data = sectorData.find(sector => sector.layout === 'layout1');

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
      <HeroSector />
      <IntroSection/>
      {layout1Data && <FirstLayout data={layout1Data} />}
      <ThirdLayout />
      <NineLayout/>
    </main>
  );
};

export default HospitalitySectorPage;