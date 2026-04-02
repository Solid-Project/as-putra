// pages/HomePage.jsx
import React from 'react';
import HeroCarousel from '@/components/home/HeroCarousel';
import HistorySection from '@/components/home/HistorySection';
import CultureSection from '@/components/home/CultureSection';
import StatsSection from '@/components/home/StatsSection';
import SectorStrip from '@/components/home/SectorStrip';
import NewsTeaser from '@/components/home/NewsTeaser';
import useFullpageSnap from '@/hooks/useFullpageSnap';

const HomePage = () => {
  // Fullpage snap with enabled config
  useFullpageSnap({
    enabled: true,
    duration: 0.5,
    ease: 'power2.inOut'
  });

  return (
    <main className="overflow-x-hidden">
      <HeroCarousel />
      <HistorySection />
      <CultureSection />
      <StatsSection />
      <SectorStrip />
      <NewsTeaser />
    </main>
  );
};

export default HomePage;