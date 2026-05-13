import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFullpageSnap from "@/hooks/useFullPageSnap"; 
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSkeleton from "@/components/skeleton/HeroSkeleton";

// Import Layouts
import IntroSection from "@/components/sector/IntroSection";
import Layout1 from "@/components/sector/Layout1";
import Layout2 from "@/components/sector/Layout2";
import Layout3 from "@/components/sector/Layout3";
import Layout4 from "@/components/sector/Layout4";
import Layout5 from "@/components/sector/Layout5";
import Layout6 from "@/components/sector/Layout6";
import Layout7 from "@/components/sector/Layout7";
import Layout8 from "@/components/sector/Layout8";
import Layout9 from "@/components/sector/Layout9";
import Layout10 from "@/components/sector/Layout10";

// Mendaftarkan semua layout yang mungkin muncul di API Sector
const COMPONENT_MAP = {
  "IntroSection": IntroSection,
  "layout1": Layout1,
  "layout2": Layout2,
  "Layout3": Layout3,
  "Layout4": Layout4,
  "Layout5": Layout5,
  "Layout6": Layout6,
  "Layout7": Layout7,
  "Layout8": Layout8,
  "Layout9": Layout9,
  "Layout10": Layout10
};

const SectorDetailPage = () => {
  const { slug } = useParams(); 
  const [sections, setSections] = useState(null); // Mulai dengan null agar skeleton muncul

  useEffect(() => {
    const fetchSectorData = async () => {
      try {
        const formattedName = `sector ${slug.toLowerCase()}`;
        const baseUrl = import.meta.env.VITE_API_URL.replace(/\/$/, "");
        
        const response = await fetch(`${baseUrl}/api/v1/page/${encodeURIComponent(formattedName)}`);
        if (!response.ok) throw new Error("Sector not found");
        
        const result = await response.json();
        
        // Sesuaikan dengan struktur API (result.data biasanya array sections)
        const dataArray = result.data || result;
        setSections(dataArray);
      } catch (error) {
        console.error("Failed to fetch sector data:", error);
        setSections([]); // Set array kosong jika error agar tidak loading selamanya
      }
    };

    setSections(null); // Reset ke loading setiap kali slug berubah (pindah sektor)
    fetchSectorData();
  }, [slug]);

  // Aktifkan Efek Snap Scroll (sama seperti AboutPage)
  const { activeIndex } = useFullpageSnap({ 
    enabled: !!sections && sections.length > 0,
    config: { sectionSelector: ".section" } // Pastikan setiap Layout punya class "section"
  });

  // Handle Resize & Reset Scroll posisi (sama seperti AboutPage)
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
                className="section" // Tambahkan ini agar Snap Scroll bekerja
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