// src/pages/SectorPage.jsx
import React from 'react';
import HeroSector from '@/components/sector/HeroSector';
import IntroSection from '@/components/sector/IntroSection';
import FirstLayout from '@/components/sector/FirstLayout';
import SecondLayout from '@/components/sector/SecondLayout';
import ThirdLayout from '@/components/sector/ThirdLayout';
import FourthLayout from '@/components/sector/FourthLayout';
import FifthLayout from '@/components/sector/FifthLayout';
import SixLayout from '@/components/sector/SixLayout';
import SevenLayout from '@/components/sector/SevenLayout';
import EightLayout from '@/components/sector/EightLayout';
import NineLayout from '@/components/sector/NineLayout';
import TenLayout from '@/components/sector/TenLayout';
import { sectorData } from '@/components/data/SectorData';
import useFullpageSnap from '@/hooks/useFullPageSnap';

const SectorPage = () => {
  useFullpageSnap({enabled: true});

  // Filter data berdasarkan layout
  const layout1Data = sectorData.find(sector => sector.layout === 'layout1');
  const layout2Data = sectorData.find(sector => sector.layout === 'layout2');

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
      <IntroSection 
    title="Finance Sector" 
    image="/react/img/team.webp" 
  />
      {layout1Data && <FirstLayout data={layout1Data} />}
      {layout2Data && <SecondLayout data={layout2Data} />}
      <ThirdLayout />
      <FourthLayout/>
      <FifthLayout/>
      <SixLayout/>
      <SevenLayout/>
      <EightLayout/>
      <NineLayout/>
      <TenLayout/>
    </main>
  );
};

export default SectorPage;