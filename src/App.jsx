import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import NewsPage from "@/pages/news/NewsPage";
import NewsDetailPage from "@/pages/news/NewsDetailPage";
import CareerPage from "@/pages/CareerPage";
import SectorPage from "@/pages/SectorPage";
import PeternakanSectorPage from "@/pages/PeternakanSectorPage";
import HospitalitySectorPage from "@/pages/HospitalitySectorPage";
import RetailSectorPage from "@/pages/RetailSectorPage";
import ConstructionSectorPage from "@/pages/ConstructionSectorPage";
import LifestyleSectorPage from "@/pages/LifestyleSectorPage";
import EkspedisiSectorPage from "@/pages/EkspedisiSectorPage";
import EventDetailPage from "@/components/career/EventDetailPage";

import SectionNavigation from "@/hooks/SectionNavigation";

function App() {
  return (
    <div className="min-h-screen bg-[#0b132b]">
      <SectionNavigation />

      <React.Suspense
        fallback={<div className="h-screen bg-[#0b132b]" />}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:id" element={<NewsDetailPage />} />
          <Route path="/career" element={<CareerPage />} />
          <Route path="/sector" element={<SectorPage />} />
          <Route path="/sector/peternakan" element={<PeternakanSectorPage />} />
          <Route path="/sector/hospitality" element={<HospitalitySectorPage />} />
          <Route path="/sector/retail" element={<RetailSectorPage />} />
          <Route path="/sector/construction" element={<ConstructionSectorPage />} />
          <Route path="/sector/lifestyle" element={<LifestyleSectorPage />} />
          <Route path="/sector/ekspedisi" element={<EkspedisiSectorPage />} />
          <Route path="/event/:id" element={<EventDetailPage />} />
        </Routes>
      </React.Suspense>
      
    </div>
  );
}

export default App;