import React from 'react';
import HeroCareer from '@/components/career/HeroCareer';
import CareerSection from '@/components/career/CareerSection';
import WhyJoin from '@/components/career/WhyJoin';
import useFullpageSnap from '@/hooks/useFullPageSnap';

const CareerPage = () => {
  const { activeIndex } = useFullpageSnap({ enabled: true });

  return (
    <main className="overflow-x-hidden">
      <HeroCareer activeIndex={activeIndex}/>
      <CareerSection activeIndex={activeIndex}/>
      <WhyJoin activeIndex={activeIndex}/>
    </main>
  );
};

export default CareerPage;

