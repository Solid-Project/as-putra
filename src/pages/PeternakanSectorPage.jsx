// src/pages/PeternakanSectorPage.jsx
import React, { useEffect, useState } from "react";
import IntroSection from "@/components/sector/IntroSection";
import useFullpageSnap from "@/hooks/useFullPageSnap"; 
import IntroSectionSkeleton from "@/components/skeleton/IntroSectionSkeleton";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import api from "@/lib/api"; 

const COMPONENT_MAP = {
  IntroSection,
};

const PeternakanSectorPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/api/v1/page/Sector Peternakan");
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch page data:", error);
      }
    };
    fetchData();
  }, []);

  const { activeIndex } = useFullpageSnap({ 
    enabled: !!data,
    config: { sectionSelector: ".section" }
  });

  useEffect(() => {
    if (data) {
      const timer = setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
        window.scrollTo(0, 0);
      }, 150); 
      return () => clearTimeout(timer);
    }
  }, [data]);

  return (
    <main className="relative bg-black min-h-screen">
      <Navbar />
      {!data ? (
        <IntroSectionSkeleton />
      ) : (
        <div className="fullpage-wrapper">
          {data?.data?.map((section, index) => {
            const Component = COMPONENT_MAP[section.layout_name];
            if (!Component) return null;

            return (
              <Component
                key={section.id}
                data={section} // Data dikirim dari sini
                isActive={activeIndex === index}
                index={index}
              />
            );
          })}
          <Footer />
        </div>
      )}
    </main>
  );
};

export default PeternakanSectorPage;