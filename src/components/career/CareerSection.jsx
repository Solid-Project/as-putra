import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import CareerNavigator from "@/components/career/CareerNavigator";
import EmployeeEvents from "@/components/career/EmployeeEvents";
import CareerJobs from "@/components/career/CareerJobs";
import logoAsliUrl from "@/assets/logo.jpg";

const CareerSection = ({ activeIndex }) => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const bigTitleRef = useRef(null);
  const silhouetteRef = useRef(null);
  const [activeTab, setActiveTab] = useState("events");
  
  const SECTION_INDEX = 1;
  const isActive = activeIndex === SECTION_INDEX;

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!isActive) return;

      const tl = gsap.timeline();

      // Siluet dibuat sangat halus (0.03) agar tidak mengalihkan fokus dari teks
      tl.fromTo(silhouetteRef.current, 
        { x: 50, opacity: 0, scale: 1.1 },
        { x: 0, opacity: 0.03, scale: 1, duration: 1.5, ease: "power3.out" }
      );

      tl.fromTo(".reveal-text", 
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power4.out" },
        "-=1"
      );

      tl.fromTo(contentRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isActive]);

  return (
    <section
      ref={sectionRef}
      className="section no-snap py-24 px-6 md:px-12 bg-[#050A1A] relative overflow-hidden" // Navy yang lebih pekat untuk kontras maksimal
      id="career-section"
    >
      {/* 🎭 ARTISTIC SILHOUETTE - Low Opacity for Readability */}
      <div 
        ref={silhouetteRef}
        className="absolute -right-10 -bottom-10 w-[500px] h-[500px] pointer-events-none select-none"
      >
        <img 
          src={logoAsliUrl} 
          alt="AS PUTRA Logo" 
          className="w-full h-full object-contain grayscale invert brightness-200"
        />
      </div>

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* ⚡ HEADER SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-20">
          <div ref={bigTitleRef}>
            <div className="reveal-text flex items-center gap-3 mb-6">
              <div className="w-10 h-[2px] bg-[var(--color-utama)]"></div>
              <span className="text-[var(--color-utama)] text-xs font-bold uppercase tracking-[0.4em]">
                Career Opportunities
              </span>
            </div>
            {/* Teks Putih Murni (#FFFFFF) di atas Navy Peat adalah kombinasi paling nyaman */}
            <h2 className="font-['Playfair_Display'] text-white text-5xl md:text-7xl leading-[1.1] reveal-text font-bold">
              Build the <br />
              <span className="text-[var(--color-utama)] italic font-medium">Future</span> with us.
            </h2>
          </div>
          
          <div className="reveal-text">
            {/* Teks deskripsi menggunakan Putih dengan opasitas 90% */}
            <p className="text-white/90 text-lg md:text-xl max-w-md border-l-2 border-[var(--color-utama)]/50 pl-6 leading-relaxed">
              Bukan sekadar pekerjaan. Ini adalah tempat di mana visi bertemu dengan eksekusi. Jadilah bagian dari evolusi <span className="text-[var(--color-utama)] font-bold">AS PUTRA</span>.
            </p>
          </div>
        </div>

        {/* 📱 CONTENT AREA */}
        <div ref={contentRef} className="relative">
          {/* Navigator dengan Glassmorphism yang lebih gelap agar teks navigator jelas */}
          <div className="z-20 bg-white/5 backdrop-blur-xl p-2 rounded-2xl border border-white/10 shadow-2xl inline-block">
            <CareerNavigator activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          <div className="mt-12 min-h-[500px]">
            {activeTab === "events" ? (
              <EmployeeEvents isActive={true} />
            ) : (
              <CareerJobs isActive={true} />
            )}
          </div>
        </div>
      </div>

      {/* Subtle Grid Background Decor */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none"></div>
    </section>
  );
};

export default CareerSection;