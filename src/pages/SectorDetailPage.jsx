import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//import Hooks & Layout Utama
import useFullpageSnap from "@/hooks/useFullPageSnap"; 
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSkeleton from "@/components/skeleton/HeroSkeleton";
//Import Layout
import HeroSector from "@/components/section/HeroSector";
import IntroSection from "@/components/section/IntroSection";
import Layout1 from "@/components/section/Layout1";
import Layout2 from "@/components/section/Layout2";
import Layout3 from "@/components/section/Layout3";
import Layout4 from "@/components/section/Layout4";
import Layout5 from "@/components/section/Layout5";
import Layout6 from "@/components/section/Layout6";
import Layout7 from "@/components/section/Layout7";
import Layout8 from "@/components/section/Layout8";
import Layout9 from "@/components/section/Layout9";
import Layout10 from "@/components/section/Layout10";

const COMPONENT_MAP = {
  "HeroSector": HeroSector,
  "IntroSection": IntroSection,
  "layout1": Layout1,
  "layout2": Layout2,
  "layout3": Layout3,
  "layout4": Layout4,
  "layout5": Layout5,
  "layout6": Layout6,
  "layout7": Layout7,
  "layout8": Layout8,
  "layout9": Layout9,
  "layout10": Layout10
};

const SectorDetailPage = () => {
  const { slug } = useParams(); 
  const [sections, setSections] = useState(null); // Mulai dengan null agar skeleton muncul

  useEffect(() => {
    const fetchSectorData = async () => {
      setSections(null); 
      try {
        const baseUrl = import.meta.env.VITE_API_URL.replace(/\/$/, "");
        const capitalizedSlug = slug.charAt(0).toUpperCase() + slug.slice(1).toLowerCase();
        const pageName = `Sector ${capitalizedSlug}`;
        const response = await fetch(`${baseUrl}/api/v1/page/${encodeURIComponent(pageName)}`);
        
        if (!response.ok) throw new Error("Halaman sektor tidak ditemukan");
        
        const result = await response.json();
        
        if (result.status && result.data) {
          setSections(result.data);
        } else {
          setSections([]);
        }
      } catch (error) {
        console.error("Gagal memuat data sektor:", error);
        setSections([]); 
      }
    };

    fetchSectorData();
  }, [slug]);
  const { activeIndex } = useFullpageSnap({ 
    enabled: !!sections && sections.length > 0,
    config: { sectionSelector: ".section" }
  });
  useEffect(() => {
    if (sections) {
      const timer = setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
        window.scrollTo(0, 0);
      }, 150); 
      return () => clearTimeout(timer);
    }
  }, [sections, slug]);

  return (
    <main className="relative bg-black min-h-screen">
      <Navbar />

      {!sections ? (
        <HeroSkeleton />
      ) : (
        <div className="fullpage-wrapper">
          {sections.map((section, index) => {
            const Component = COMPONENT_MAP[section.layout_name];
            if (!Component) return null;

            return (
              <Component
                key={section.id || index}
                data={section}
                isActive={activeIndex === index}
                index={index}
                className="section"
              />
            );
          })}
          <Footer />
        </div>
      )}
    </main>
  );
};

export default SectorDetailPage;