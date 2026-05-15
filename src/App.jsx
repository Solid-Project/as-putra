import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import FullPage from "@/pages/FullPage";
import SectorDetailPage from "@/pages/SectorDetailPage"; 
import NewsDetailPage from "@/pages/NewsDetailPage";
import EventDetailPage from "@/components/section/EventDetailPage";
import SectionNavigation from "@/hooks/SectionNavigation";
import TitleManager from "@/components/TitleManager";

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-black">
      <TitleManager/>
      <SectionNavigation key={location.pathname} />

      <React.Suspense 
        fallback={
          <div className="h-screen bg-black flex items-center justify-center text-white font-bold uppercase tracking-widest animate-pulse">
            Loading...
          </div>
        }
      >
        <Routes location={location} key={location.pathname}>
          <Route path="/:slug" element={<FullPage />} />
          <Route path="/" element={<Navigate to="/beranda" replace />} />
          <Route path="/sector/:slug" element={<SectorDetailPage />} />
          <Route path="/news/:id" element={<NewsDetailPage />} />
          <Route path="/event/:id" element={<EventDetailPage />} />
        </Routes>
      </React.Suspense>
    </div>
  );
}

export default App;