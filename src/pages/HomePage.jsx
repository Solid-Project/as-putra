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

const API_URL = "http://localhost:8000/";

const COMPONENT_MAP = {
  HeroCarousel,
  HistorySection,
  CardSection,
  SectorStrip,
  NewsTeaser,
};

const HomePage = () => {
  const { activeIndex } = useFullpageSnap({ enabled: true });
  const data = usePageData();
  return (
    <main className="relative bg-black">
      <Navbar />

      {/* 1. LOADING STATE */}
      {!data ? (
        <HeroSkeleton />
      ) : (
        <>
          {/* 2. CONTENT */}
          {data.data?.map((section, index) => {
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

          {/* 3. FOOTER SELALU DI AKHIR */}
          <Footer />
        </>
      )}
    </main>
  );
};

function usePageData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}api/v1/page/beranda`);
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error("Failed to fetch:", error);
      }
    };

    fetchData();
  }, []);

  return data;
}

export default HomePage;
