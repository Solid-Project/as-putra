import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import CareerNavigator from "@/components/section/CareerNavigator";
import EmployeeEvents from "@/components/section/EmployeeEvents";
import CareerJobs from "@/components/section/CareerJobs";
import logoAsliUrl from "@/assets/logo.jpg"; 
import bgCareerUrl from "@/assets/img/aretha.webp";

const CareerSection = ({ activeIndex }) => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const headerRef = useRef(null);
  const silhouetteRef = useRef(null);
  const [activeTab, setActiveTab] = useState("events");
  
  const SECTION_INDEX = 1;
  const isActive = activeIndex === SECTION_INDEX;

  const COLOR_NAVY = "#1D2B53";
  const COLOR_GOLD = "#FFC619";

  useEffect(() => {
    if (!isActive) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Animasi Siluet Masuk Lembut
      tl.fromTo(silhouetteRef.current, 
        { opacity: 0, scale: 0.95, x: 30 },
        { opacity: 0.03, scale: 1, x: 0, duration: 1.5, ease: "power2.out" }
      );

      // Reveal Elemen Utama dengan Transisi Berkelas
      tl.fromTo(".reveal-item", 
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, stagger: 0.12, ease: "power3.out" },
        "-=1.2"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isActive]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen py-24 lg:py-32 px-4 sm:px-6 md:px-8 lg:px-[6%] bg-slate-50 flex flex-col justify-center overflow-hidden"
      id="career-section"
      data-theme="light"
    >
      {/* 1. MEDIA BACKGROUND IMAGE WITH PERFECT BALANCED OVERLAY */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img 
          src={bgCareerUrl} 
          alt="AS PUTRA Office Environment" 
          className="w-full h-full object-cover object-center transform scale-100"
        />
        {/* MODIFIKASI: Overlay semi-transparan premium agar foto Aretha tetap terlihat hidup namun teks tetap terbaca tajam */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/75 to-white/85 md:from-white/75 md:via-gray-100/70 md:to-white/80 backdrop-blur-[0.5px]" />
        
        {/* Garis Grid Korporat Tipis Eksklusif */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:5rem_5rem]" />
      </div>

      {/* SILUET LOGO BACKGROUND */}
      <div 
        ref={silhouetteRef} 
        className="absolute -right-20 md:-right-40 bottom-0 w-[350px] md:w-[750px] pointer-events-none z-0 opacity-0 select-none mix-blend-multiply"
      >
        <img src={logoAsliUrl} alt="" className="w-full h-auto grayscale opacity-15" />
      </div>

      {/* KONTEN UTAMA CONTROLLER */}
      <div className="w-full relative z-10 max-w-[1440px] mx-auto flex flex-col gap-12 lg:gap-14">
        
        {/* HEADER SECTION */}
        <div ref={headerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start w-full">
          
          {/* Sisi Kiri: Headline Utama */}
          <div className="reveal-item lg:col-span-7 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4">
              {/* Indikator bar tipis bersudut tumpul halus */}
              <span className="w-6 h-[3px] rounded-full" style={{ backgroundColor: COLOR_GOLD }} />
              <span className="font-black tracking-[0.3em] uppercase text-[10px] md:text-xs" style={{ color: COLOR_NAVY }}>
                Career Opportunities
              </span>
            </div>
            
            <h2 className="font-['Playfair_Display'] text-[#1D2B53] text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.15] tracking-tight">
              Build the <br />
              <span style={{ color: COLOR_GOLD }} className="italic font-normal">Future</span> with us.
            </h2>
          </div>
          
          {/* Sisi Kanan: Deskripsi Penjelas */}
          <div className="reveal-item lg:col-span-5 flex flex-col justify-between h-full pt-2 lg:pt-8">
            {/* Border garis kiri dengan tumpul tipis */}
            <div className="border-l-4 pl-6 py-1 rounded-l" style={{ borderColor: COLOR_GOLD }}>
              <p className="text-gray-700 text-base leading-relaxed font-semibold mb-3 drop-shadow-sm">
                Bukan sekadar tempat bekerja. Ini adalah ruang inkubasi potensi, tempat di mana setiap dedikasi Anda bertransformasi menjadi pilar nyata evolusi <span style={{ color: COLOR_NAVY }} className="font-bold">AS PUTRA Group</span>.
              </p>
              <p className="text-gray-500 text-[11px] tracking-widest uppercase font-black">
                Sinergi • Integritas • Inovasi Berkelanjutan
              </p>
            </div>
          </div>

        </div>

        {/* CONTAINER NAVIGATOR DAN AREA KONTEN */}
        <div ref={contentRef} className="w-full flex flex-col gap-8">
          
          {/* TAB NAVIGATOR (Slightly Rounded - Mengikuti Estetika Baru) */}
          <div className="reveal-item flex justify-center w-full">
            <div className="bg-white/90 backdrop-blur-md p-1.5 rounded-lg border border-gray-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] inline-block max-w-full">
              <CareerNavigator activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
          </div>

          {/* AREA SUB-KONTEN DINAMIS (Wadah Berkarakter Mewah dengan Modest Rounded Corner) */}
          {/* MODIFIKASI: Menggunakan rounded-xl (12px) agar tetap elegan tanpa terkesan kaku/tajam maupun membulat berlebihan */}
          <div className="reveal-item w-full min-h-[420px] lg:min-h-[520px] bg-white/95 backdrop-blur-sm border border-gray-200/60 rounded-xl p-4 sm:p-6 lg:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.03)] transition-all duration-300">
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