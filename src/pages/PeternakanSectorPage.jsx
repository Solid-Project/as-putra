// src/pages/SectorPage.jsx
import React from 'react';
import IntroSection from '@/components/sector/SectorPeternakan/HeroSector';
import TenLayout from '@/components/sector/SectorPeternakan/Layout10';
import FirstLayout from '@/components/sector/SectorPeternakan/Section1';
import SecondLayout from '@/components/sector/SectorPeternakan/Section2';
import ThirdLayout from '@/components/sector/SectorPeternakan/Section3';
import ForthLayout from '@/components/sector/SectorPeternakan/Layout3';
import FifthLayout from '@/components/sector/SectorPeternakan/Section4';
import SixLayout from '@/components/sector/SectorPeternakan/Section5';
import SevenLayuout from '@/components/sector/SectorPeternakan/Section6';
import NineLayout from '@/components/sector/SectorPeternakan/Layout9';
import Closing from '@/components/sector/SectorPeternakan/closing';
import { sectorData } from '@/components/data/SectorData';
import useFullpageSnap from '@/hooks/useFullPageSnap';
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import HeroSkeleton from "@/components/skeleton/HeroSkeleton";
const PeternakanSectorPage = () => {
  useFullpageSnap({enabled: true});

  // Filter data berdasarkan layout
  const layout1Data = sectorData.find(sector => sector.layout === 'layout1');

  return (
    <main className="overflow-x-hidden">
            <Navbar />
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
      <TenLayout/>
      {layout1Data && <FirstLayout data={layout1Data} />}
      <SecondLayout />
      <ThirdLayout />
      <FifthLayout />
      <ForthLayout />
      <NineLayout/>
      <SixLayout/>
      <SevenLayuout/>
      <Closing/>
                <Footer />
      
    </main>
  );
};

export default PeternakanSectorPage;