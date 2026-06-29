import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useSectionAnimation } from "@/hooks/useSectionAnimation";
import CareerNavigator from "@/components/section/CareerNavigator";
import EmployeeEvents from "@/components/section/EmployeeEvents";
import CareerJobs from "@/components/section/CareerJobs";
import logoAsliUrl from "@/assets/logo.jpg"; 

const CareerSection = ({ activeIndex }) => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const headerRef = useRef(null);
  const [activeTab, setActiveTab] = useState("events");
  
  const SECTION_INDEX = 1;
  const isActive = activeIndex === SECTION_INDEX;

  const COLOR_GOLD = "#FFC619";

  useSectionAnimation(sectionRef, () => {
    if (!isActive) return;
    const tl = gsap.timeline();
    
    tl.fromTo(".reveal-item", 
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.75, stagger: 0.12, ease: "power3.out", force3D: true }
    );
  }, [isActive]);

  return (
    <section
      ref={sectionRef}
      /* PERBAIKAN 1: Ganti 'justify-center' menjadi 'justify-start pt-16 md:pt-24 lg:pt-32' agar konten langsung mepet ke atas sejak awal di mobile */
      className="relative w-full min-h-screen pt-16 pb-24 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 lg:px-[6%] bg-slate-50 flex flex-col justify-start overflow-hidden"
      id="career-section"
      data-theme="light"
    >
      {/* 1. MEDIA BACKGROUND: LARGE LOGO SILHOUETTE */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden grayscale opacity-15 mix-blend-multiply select-none">
        <img 
          src={logoAsliUrl} 
          alt="" 
          className="w-[100vw] md:w-[150vw] h-auto rotate-12 scale-150 transform-origin-center object-contain"
        />
      </div>

      {/* BACKGROUND OVERLAY BALANCED PERFECTLY */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/65 to-white/75 md:from-white/65 md:via-gray-100/60 md:to-white/70 backdrop-blur-[0.5px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:5rem_5rem]" />
      </div>

      {/* KONTEN UTAMA CONTROLLER */}
      {/* PERBAIKAN 2: Perkecil 'gap-12' menjadi 'gap-6 md:gap-12' agar space kosong di mobile berkurang drastis */}
      <div className="w-full relative z-10 max-w-[1440px] mx-auto flex flex-col gap-6 md:gap-12 lg:gap-14">
        
        {/* HEADER SECTION */}
        {/* PERBAIKAN 3: Hilangkan gap-8 di mobile menjadi 'gap-0 md:gap-8' */}
        <div ref={headerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-16 items-start w-full">
          
          {/* Sisi Kiri: Headline Utama */}
          <div className="reveal-item lg:col-span-7 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-2 md:mb-4">
            </div>
            
            {/* PERBAIKAN 4: Sesuaikan ukuran text di mobile agar lebih rapat dan padat */}
            <h2 className="font-['Playfair_Display'] text-[#1D2B53] text-3xl sm:text-5xl lg:text-6xl font-black leading-[1.2] tracking-tight">
              Build the <br />
              <span style={{ color: COLOR_GOLD }} className="italic font-normal">Future</span> with us.
            </h2>
          </div>
        </div>

        {/* CONTAINER NAVIGATOR DAN AREA KONTEN */}
        {/* PERBAIKAN 5: Perkecil jarak navigator ke konten box dari 'gap-8' menjadi 'gap-4 md:gap-8' */}
        <div ref={contentRef} className="w-full flex flex-col gap-4 md:gap-8">
          
          {/* TAB NAVIGATOR */}
          <div className="reveal-item flex justify-center w-full">
            <CareerNavigator activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          {/* AREA SUB-KONTEN DINAMIS */}
          <div className="reveal-item w-full min-h-[380px] sm:min-h-[420px] lg:min-h-[520px] bg-white/95 backdrop-blur-sm border border-gray-200/60 rounded-xl p-4 sm:p-6 lg:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.03)] transition-all duration-300">
            {activeTab === "events" ? (
              <EmployeeEvents isActive={true} />
            ) : (
              <CareerJobs isActive={true} />
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default CareerSection;