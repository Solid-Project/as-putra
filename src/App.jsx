import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import NewsPage from "@/pages/news/NewsPage";
import NewsDetailPage from "@/pages/news/NewsDetailPage";
import CareerPage from "@/pages/CareerPage";
import SectorPage from "@/pages/SectorPage"; // Ini halaman list semua sektor
import SectorDetailPage from "@/pages/SectorDetailPage"; // Komponen baru kita
import EventDetailPage from "@/components/career/EventDetailPage";

import SectionNavigation from "@/hooks/SectionNavigation";

function App() {
  return (
    <div className="min-h-screen bg-[#0b132b]">
      <SectionNavigation />

      <React.Suspense fallback={<div className="h-screen bg-[#0b132b]" />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:id" element={<NewsDetailPage />} />
          <Route path="/career" element={<CareerPage />} />
          
          {/* Halaman utama list sektor */}
        {/*}  <Route path="/sector" element={<SectorPage />} /> */}
          
          {/* MAGIC HAPPENS HERE: Satu baris untuk semua sektor (peternakan, retail, dll) */}
          <Route path="/sector/:slug" element={<SectorDetailPage />} />
          
          <Route path="/event/:id" element={<EventDetailPage />} />
        </Routes>
      </React.Suspense>
    </div>
  );
}

export default App;