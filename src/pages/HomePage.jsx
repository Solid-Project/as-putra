// src/pages/HomePage.jsx
import React from "react";
import HeroCarousel from "@/components/home/HeroCarousel";
import HistorySection from "@/components/home/HistorySection";
import CultureSection from "@/components/home/CultureSection";
import StatsSection from "@/components/home/StatsSection";
import AboutSummary from "@/components/home/AboutSummary";
import SectorStrip from "@/components/home/SectorStrip";
import NewsTeaser from "@/components/home/NewsTeaser";
import useFullpageSnap from "@/hooks/useFullPageSnap";

const HomePage = () => {
    useFullpageSnap({ enabled: true });

  return (
    <main className="relative">
      <HeroCarousel />
      <HistorySection />
      <AboutSummary/>
      <SectorStrip />
      <NewsTeaser />
    </main>
  );
};

export default HomePage;