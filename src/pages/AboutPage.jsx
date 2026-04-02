// src/pages/AboutPage.jsx
import React from 'react';
import HeroAbout from '@/components/about/HeroAbout';
import VisionMission from '@/components/about/VisionMission';
import OurValues from '@/components/about/OurValues';
import HistoryTimeline from '@/components/about/HistoryTimeline';
import useFullpageSnap from '@/hooks/useFullpageSnap';

const AboutPage = () => {
  // Fullpage snap with enabled config
  useFullpageSnap({ enabled: true });

  return (
    <main className="overflow-x-hidden">
      <HeroAbout />
      <VisionMission />
      <OurValues />
      <HistoryTimeline />
    </main>
  );
};

export default AboutPage;