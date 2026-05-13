// src/pages/HomePage.jsx
import React, { useEffect, useState } from "react";
import HeroCarousel from "@/components/home/HeroCarousel";
import HistorySection from "@/components/home/HistorySection";
import CultureSection from "@/components/home/CultureSection";
import StatsSection from "@/components/home/StatsSection";
import CardSection from "@/components/home/AboutSummary";
import SectorStrip from "@/components/home/SectorStrip";
import NewsTeaser from "@/components/home/NewsTeaser";
import useFullpageSnap from "@/hooks/useFullPageSnap";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import HeroSkeleton from "@/components/skeleton/HeroSkeleton";
import api from "@/lib/api"; 

const COMPONENT_MAP = {
  HeroCarousel,
  HistorySection,
  CardSection : CultureSection,
  StatsSection,
  SectorStrip,
  NewsTeaser,
};

const HomePage = () => {
  const data = usePageData();

  // 1. Perbaikan Hook Snap: 
  // - enabled: !!data (Hanya jalan setelah data ada)
  // - Ditambahkan deps agar hook melakukan kalkulasi ulang saat data masuk
  const { activeIndex } = useFullpageSnap({ 
    enabled: !!data,
    config: {
      // Jika hook kamu mendukung opsi, pastikan deteksi elemen tepat
      sectionSelector: ".section", 
    }
  });

  // 2. Paksa Refresh Snapping saat data muncul
  useEffect(() => {
    if (data) {
      // Gunakan timeout kecil agar React selesai merender elemen .section ke DOM
      const timer = setTimeout(() => {
        // Trigger resize agar hook snapping mendeteksi ulang tinggi & posisi section
        window.dispatchEvent(new Event("resize"));
        // Pastikan kembali ke atas saat refresh/load data pertama kali
        window.scrollTo(0, 0);
      }, 150); 
      
      return () => clearTimeout(timer);
    }
  }, [data]);

  return (
    <main className="relative bg-black min-h-screen">
      <Navbar />

      {!data ? (
        <HeroSkeleton />
      ) : (
        <div className="fullpage-wrapper">
          {data?.data?.map((section, index) => {
            const Component = COMPONENT_MAP[section.layout_name];
            if (!Component) return null;

            return (
              <Component
                key={section.id}
                data={section}
                isActive={activeIndex === index}
                index={index}
              />
            );
          })}
          
          {/* Footer diletakkan di dalam mapping jika ingin masuk snap terakhir, 
              atau biarkan di luar jika ingin normal scroll setelah snap selesai */}
              <NewsTeaser/>
          <Footer />
        </div>
      )}
    </main>
  );
};

function usePageData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/api/v1/page/beranda");
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch page data:", error);
      }
    };

    fetchData();
  }, []);

  return data;
}

export default HomePage;