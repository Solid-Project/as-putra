// src/pages/SectorPage.jsx
import React from 'react';
import IntroSection from '@/components/sector/SectorRetail/IntroSection';
import FirstLayout from '@/components/sector/SectorRetail/Section1';
import SecondLayout from '@/components/sector/SectorRetail/Section2';
import ThirdLayout from '@/components/sector/SectorRetail/Section3';
import FourthLayout from '@/components/sector/SectorRetail/Section4';
import FifthLayout from '@/components/sector/SectorRetail/Section5';
import SixLayout from '@/components/sector/SectorRetail/Section6';
import SeventhLayout from '@/components/sector/SectorRetail/Section7';
import EightLayout from '@/components/sector/SectorRetail/Section8';
import NineLayout from '@/components/sector/SectorRetail/Section9';
import TenLayout from '@/components/sector/SectorRetail/Section10';
import ElevenLayout from '@/components/sector/SectorRetail/Section11';
import { sectorData } from '@/components/data/SectorData';
import useFullpageSnap from '@/hooks/useFullPageSnap';

const RetailSectorPage = () => {
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
      <IntroSection/>
      {layout1Data && <FirstLayout data={layout1Data} />}
      <SecondLayout />
      <ThirdLayout />
      <FourthLayout />
      <FifthLayout />
      <SixLayout />
      <SeventhLayout/>
      <EightLayout/>
      <NineLayout/>
      <TenLayout/>
      <ElevenLayout/>
    </main>
  );
};

export default RetailSectorPage;