// src/pages/AboutPage.jsx
import React from 'react';
import HeroAbout from '@/components/about/HeroAbout';
import VisionMission from '@/components/about/VisionMission';
import OurValues from '@/components/about/OurValues';
import HistoryTimeline from '@/components/about/HistoryTimeline';
import useFullpageSnap from '@/hooks/useFullPageSnap';

const AboutPage = () => {
  // Fullpage snap with enabled config
  const { activeIndex } = useFullpageSnap({ enabled: true });

  return (
    <main className="overflow-x-hidden">
      <HeroAbout activeIndex={activeIndex} />
      <VisionMission activeIndex={activeIndex} />
      <OurValues activeIndex={activeIndex} />
      <HistoryTimeline activeIndex={activeIndex} />
    </main>
  );
};

export default AboutPage;