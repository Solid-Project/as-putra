import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // ← HAPUS BrowserRouter kedua dari import
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import NewsPage from '@/pages/news/NewsPage';
import NewsDetailPage from '@/pages/news/NewsDetailPage';
import CareerPage from '@/pages/CareerPage';
import SectorPage from '@/pages/SectorPage';
import SectionNavigation from '@/hooks/SectionNavigation';
import EventDetailPage from '@/components/career/EventDetailPage';

function App() {
  return (
    <Router basename="/react">  {/* ← SATU Router dengan basename */}
      <div className="min-h-screen bg-[#0b132b]">
        <Navbar />
        <SectionNavigation />
        <Routes>  {/* ← LANGSUNG Routes, tanpa BrowserRouter lagi */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:id" element={<NewsDetailPage />} />
          <Route path="/career" element={<CareerPage />} />
          <Route path="/sector" element={<SectorPage />} />
          <Route path="/event/:id" element={<EventDetailPage/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;