import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

// Import Layout Utama agar Selaras dengan Seluruh Aplikasi
import Navbar from "@/components/layout/Navbar"; 
import Footer from "@/components/layout/Footer"; 

// Import Komponen Sektor Utama tempat semua logic API berada
import SectorSection from "@/components/section/SectorSection"; 

const SectorPage = () => {
  // Ambil keyword slug dari parameter URL (Misal: /sector/peternakan -> slug = "peternakan")
  const { slug } = useParams();

  useEffect(() => {
    // Memastikan setiap kali berganti sektor, layar otomatis meluncur halus ke atas
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  return (
    <main className="min-h-screen bg-[#0F1A3E] flex flex-col justify-between">
      {/* 1. NAVBAR UTAMA */}
      <Navbar />
      
      {/* 2. KONTEN SEKTOR UTAMA */}
      {/* Kita kirimkan data 'slug' dari rute parameter ke dalam SectorSection agar dia yang mengolah fetching */}
      <div className="flex-1 w-full">
        <SectorSection currentSlug={slug} index={99} activeIndex={99} />
      </div>

      {/* 3. FOOTER UTAMA */}
      <Footer />
    </main>
  );
};

export default SectorPage;