// src/pages/SectorPage.jsx
import React from 'react';
import HeroSector from '@/components/sector/HeroSector';
import FirstLayout from '@/components/sector/FirstLayout';
import SecondLayout from '@/components/sector/SecondLayout';
import { sectorData } from '@/components/data/sectorData';
import useFullpageSnap from '@/hooks/useFullpageSnap';

const SectorPage = () => {
  useFullpageSnap();

  // Filter data berdasarkan layout
  const layout1Data = sectorData.find(sector => sector.layout === 'layout1');
  const layout2Data = sectorData.find(sector => sector.layout === 'layout2');

  return (
    <main className="overflow-x-hidden">
      <HeroSector />
      {layout1Data && <FirstLayout data={layout1Data} />}
      {layout2Data && <SecondLayout data={layout2Data} />}
    </main>
  );
};

export default SectorPage;