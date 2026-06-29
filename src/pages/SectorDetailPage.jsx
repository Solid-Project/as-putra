import React, { useEffect, useState, Suspense, lazy } from "react";
import { useParams } from "react-router-dom";
//import Hooks & Layout Utama
import useFullpageSnap from "@/hooks/useFullPageSnap"; 
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSkeleton from "@/components/skeleton/HeroSkeleton";
import HeroSector from "@/components/section/HeroSector";

import AutoTranslate from "@/lib/AutoTranslate"; 
//Import Layout
const IntroSection = lazy(() => import("@/components/section/IntroSection"));
const Layout1 = lazy(() => import("@/components/section/Layout1"));
const Layout2 = lazy(() => import("@/components/section/Layout2"));
const Layout3 = lazy(() => import("@/components/section/Layout3"));
const Layout4 = lazy(() => import("@/components/section/Layout4"));
const Layout5 = lazy(() => import("@/components/section/Layout5"));
const Layout6 = lazy(() => import("@/components/section/Layout6"));
const Layout7 = lazy(() => import("@/components/section/Layout7"));
const Layout8 = lazy(() => import("@/components/section/Layout8"));
const Layout9 = lazy(() => import("@/components/section/Layout9"));
const Layout10 = lazy(() => import("@/components/section/Layout10"));

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
        
        // 1. Ubah strip (-) kembali menjadi spasi tunggal
        const normalSpaces = slug.replace(/-/g, " ");

        // 2. Ubah tiap kata jadi huruf besar di awal (Title Case)
        // Contoh: "energi-dan-otomotif" -> "Energi Dan Otomotif"
        let capitalizedSlug = normalSpaces
          .split(" ")
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(" ");

        // 3. TOLERANSI UNTUK KATA HUBUNG "dan"
        // Jika di database backend Anda kata "dan" menggunakan huruf kecil ("Sector Energi dan Otomotif"),
        // baris ini akan otomatis mengubah "Dan" menjadi "dan" kecil agar COCOK dengan database.
        capitalizedSlug = capitalizedSlug.replace(/\bDan\b/g, "dan");

        // 4. Gabungkan menjadi nama halaman lengkap yang dikenali backend
        const pageName = `Sector ${capitalizedSlug}`;
        
        // Tembak API dengan nama yang sudah dibersihkan dan di-encode
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
      
      {/* 
        Biarkan wrapper utama dan AutoTranslate selalu stand-by di DOM.
        Ini memastikan MutationObserver dari AutoTranslate tidak kehilangan momentum saat teks muncul.
      */}
      <div className="fullpage-wrapper">
        <AutoTranslate />

        {!sections ? (
          // Tampilkan skeleton di dalam wrapper jika data masih diambil
          <HeroSkeleton />
        ) : (
          // Tampilkan komponen jika data sudah siap
          sections.map((section, index) => {
            const Component = COMPONENT_MAP[section.layout_name];
            if (!Component) return null;

            return (
              <Suspense fallback={<div className="w-full h-full min-h-[50vh] bg-black/5 animate-pulse" />} key={section.id || index}>
                <Component
                  data={section}
                  isActive={activeIndex === index}
                  index={index}
                  className="section"
                />
              </Suspense>
            );
          })
        )}
        
        {/* Footer hanya muncul jika sections sudah ada nilainya */}
        {sections && <Footer />}
      </div>
    </main>
  );
};

export default SectorDetailPage;