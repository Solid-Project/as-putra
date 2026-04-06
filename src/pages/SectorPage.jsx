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
import useFullpageSnap from '@/hooks/useFullpageSnap';

const SectorPage = () => {
  useFullpageSnap({enabled: true});

  // Filter data berdasarkan layout
  const layout1Data = sectorData.find(sector => sector.layout === 'layout1');
  const layout2Data = sectorData.find(sector => sector.layout === 'layout2');

  return (
    <main className="overflow-x-hidden">
      <HeroSector />
      <IntroSection 
    title="Finance Sector" 
    image="/react/img/team.jpeg" 
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