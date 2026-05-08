// src/pages/SectorPage.jsx
import React from 'react';
import IntroSection from '@/components/sector/SectorLifestyle/IntroSection';
import FirstLayout from '@/components/sector/SectorLifestyle/Section1';
import SecondLayout from '@/components/sector/SectorLifestyle/Section2';
import ThirdLayout from '@/components/sector/SectorLifestyle/Section3';
import FourthLayout from '@/components/sector/SectorLifestyle/Section4';
import Fifth from '@/components/sector/SectorLifestyle/Section5';
import SixLayout from '@/components/sector/SectorLifestyle/Section6';
import SevenLayout from '@/components/sector/SectorLifestyle/Section7';
import EightLayout from '@/components/sector/SectorLifestyle/Section8';
import useFullpageSnap from '@/hooks/useFullPageSnap';

const LifestyleSectorPage = () => {
  useFullpageSnap({enabled: true});

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
      <SecondLayout/>
      <ThirdLayout/>
      <FourthLayout/>
      <Fifth/>
      <SixLayout/>
      <SevenLayout/>
      <EightLayout/>
    </main>
  );
};

export default LifestyleSectorPage;