import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Routes, Route } from "react-router-dom";

import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import NewsPage from "@/pages/news/NewsPage";
import NewsDetailPage from "@/pages/news/NewsDetailPage";
import CareerPage from "@/pages/CareerPage";
import SectorPage from "@/pages/SectorPage";
import SectionNavigation from '@/hooks/SectionNavigation';
import PeternakanSectorPage from '@/pages/PeternakanSectorPage.jsx';
import HospitalitySectorPage from '@/pages/HospitalitySectorPage.jsx';
import RetailSectorPage from '@/pages/RetailSectorPage.jsx';
import ConstructionSectorPage from '@/pages/ConstructionSectorPage.jsx';
import LifestyleSectorPage from '@/pages/LifestyleSectorPage.jsx';
import EkspedisiSectorPage from '@/pages/EkspedisiSectorPage.jsx'
import EventDetailPage from "@/components/career/EventDetailPage";

function App() {
  return (
    <div className="min-h-screen bg-[#0b132b]">
      <Navbar />
      <SectionNavigation />
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
        <Route path="/sector/education" element={<ConstructionSectorPage />} />
        <Route path="/sector/lifestyle" element={<LifestyleSectorPage />} />
        <Route path="/sector/ekspedisi" element={<EkspedisiSectorPage />} />
        <Route path="/sector/others" element={<EkspedisiSectorPage />} />
        <Route path="/event/:id" element={<EventDetailPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;