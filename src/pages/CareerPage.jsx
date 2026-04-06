import React from 'react';
import HeroCareer from '@/components/career/HeroCareer';
import CareerSection from '@/components/career/CareerSection';
import WhyJoin from '@/components/career/WhyJoin';
import useFullpageSnap from '@/hooks/useFullpageSnap';

const CareerPage = () => {
  useFullpageSnap({ enabled: true });

  return (
    <main className="overflow-x-hidden">
      <HeroCareer />
      <CareerSection />
      <WhyJoin />
    </main>
  );
};

export default CareerPage;

