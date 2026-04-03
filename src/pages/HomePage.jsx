// src/pages/HomePage.jsx
import React from "react";
import HeroCarousel from "@/components/home/HeroCarousel";
import HistorySection from "@/components/home/HistorySection";
import CultureSection from "@/components/home/CultureSection";
import StatsSection from "@/components/home/StatsSection";
import SectorStrip from "@/components/home/SectorStrip";
import NewsTeaser from "@/components/home/NewsTeaser";
import useLenisScroll from "@/hooks/useLenisScroll";

const HomePage = () => {
  useLenisScroll({
    enabled: true,
    snapEnabled: true,
    sectionSelector: ".section",
    snapDuration: 0.35,      // Cepat dan responsif
    wheelThreshold: 15,       // Scroll sedikit langsung pindah
  });

  return (
    <main className="relative">
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