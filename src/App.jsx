import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import NewsPage from '@/pages/news/NewsPage';
import NewsDetailPage from '@/pages/news/NewsDetailPage';
import CareerPage from '@/pages/CareerPage';
import SectorPage from '@/pages/SectorPage';
import EventDetailPage from '@/components/career/EventDetailPage';

import SectionNavigation from '@/hooks/SectionNavigation';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0b132b] flex flex-col">
        
        {/* Navbar */}
        <Navbar />

        {/* Optional section navigation */}
        <SectionNavigation />

        {/* Main Content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />

            <Route path="/news" element={<NewsPage />} />
            <Route path="/news/:id" element={<NewsDetailPage />} />

            <Route path="/career" element={<CareerPage />} />
            <Route path="/sector" element={<SectorPage />} />

            <Route path="/event/:id" element={<EventDetailPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;