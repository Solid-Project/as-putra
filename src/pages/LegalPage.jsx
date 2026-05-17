import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// IMPORT KOMPONEN GLOBAL NAVIGASI KAMU (Sesuaikan jalurnya)
import Navbar from "@/components/layout/Navbar"; 
import Footer from "@/components/layout/Footer"; 

// IMPORT 2 SECTION MILIKMU
import PrivacyPolicySection from "@/components/section/PrivacyPolicy";
import TermsConditionsSection from "@/components/section/TermsConditions";

const LegalPage = () => {
  const { type } = useParams(); // Membaca param dinamis /legal/:type
  const navigate = useNavigate();

  // Memaksa halaman otomatis scroll ke paling atas setiap kali menu diklik
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type]);

  // Pengaman URL
  useEffect(() => {
    if (type !== "privacy-policy" && type !== "terms-conditions") {
      navigate("/beranda");
    }
  }, [type, navigate]);

  const isPrivacy = type === "privacy-policy";

  return (
    <div className="min-h-screen bg-white flex flex-col">
      
      {/* 1. NAVBAR UTAMA UTK MENJAGA KESELARASAN */}
      <Navbar />

      {/* 2. CONTAINER UTAMA DENGAN ATRIBUT data-theme */}
      {/* Sesuaikan "light" atau tema yang biasa dibaca oleh Navbar dinamis kamu */}
      <main 
        data-theme="light" 
        className="flex-grow w-full px-6 md:px-10 lg:px-[6%] py-12 md:py-20 max-w-4xl mx-auto"
      >
        
        {/* Kelas utility untuk merapikan teks HTML dari generator */}
        <div className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed text-justify
          [&>h1]:text-2xl [&>h1]:font-black [&>h1]:text-[#0F1A3E] [&>h1]:mb-6
          [&>h2]:text-xl [&>h2]:font-bold [&>h2]:text-[#0F1A3E] [&>h2]:mt-8 [&>h2]:mb-4
          [&>h3]:text-base [&>h3]:font-bold [&>h3]:text-[#0F1A3E] [&>h3]:mt-6 [&>h3]:mb-2
          [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-1 [&>ul]:mb-4">
          
          {isPrivacy ? <PrivacyPolicySection /> : <TermsConditionsSection />}
          
        </div>
        
      </main>

      {/* 3. MEGA FOOTER DI PALING BAWAH */}
      <Footer />

    </div>
  );
};

export default LegalPage;