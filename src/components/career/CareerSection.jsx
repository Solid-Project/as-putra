import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import CareerNavigator from "@/components/career/CareerNavigator";
import EmployeeEvents from "@/components/career/EmployeeEvents";
import CareerJobs from "@/components/career/CareerJobs";
import logoAsliUrl from "@/assets/logo-trans.png";

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

      // Animasi Siluet: Muncul perlahan dengan scale down untuk kesan elegan
      tl.fromTo(silhouetteRef.current, 
        { opacity: 0, scale: 1.2, rotate: 5 },
        { opacity: 0.1, scale: 1, rotate: 0, duration: 2, ease: "power2.out" }
      );

      tl.fromTo(".reveal-text", 
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power4.out" },
        "-=1.5"
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
      className="section no-snap py-24 px-6 md:px-12 bg-[#050A1A] relative overflow-hidden"
      id="career-section"
    >
      {/* 🎭 FIXED ARTISTIC SILHOUETTE */}
      {/* Menggunakan mix-blend-overlay agar menyatu dengan warna Navy. 
          Opacity dinaikkan sedikit ke 0.1 agar bentuk logo "AS PUTRA" mulai terlihat tapi tetap subtle.
      */}
      <div 
        ref={silhouetteRef}
        className="absolute -right-20 -bottom-20 w-[400px] md:w-[700px] h-[400px] md:h-[700px] pointer-events-none select-none z-0"
        style={{ mixBlendMode: 'overlay' }}
      >
        <img 
          src={logoAsliUrl} 
          alt="Silhouette Decor" 
          className="w-full h-full object-contain opacity-40 contrast-125 grayscale"
          // Grayscale + Overlay akan membuat bagian gelap logo mengikuti warna background
        />
      </div>

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* ⚡ HEADER SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-20">
          <div ref={bigTitleRef}>
            <div className="reveal-text flex items-center gap-3 mb-6">
              <div className="w-10 h-[2px] bg-[var(--color-utama)]"></div>
              <span className="text-[var(--color-utama)] text-xs font-black uppercase tracking-[0.4em]">
                Career Opportunities
              </span>
            </div>
            <h2 className="font-['Playfair_Display'] text-white text-5xl md:text-7xl leading-[1.1] reveal-text font-bold">
              Build the <br />
              <span className="text-[var(--color-utama)] italic font-medium">Future</span> with us.
            </h2>
          </div>
          
          <div className="reveal-text">
            <p className="text-white/80 text-lg md:text-xl max-w-md border-l-2 border-[var(--color-utama)] pl-6 leading-relaxed">
              Bukan sekadar pekerjaan. Ini adalah tempat di mana visi bertemu dengan eksekusi. Jadilah bagian dari evolusi <span className="text-white font-bold">AS PUTRA</span>.
            </p>
          </div>
        </div>

        {/* 📱 CONTENT AREA */}
        <div ref={contentRef} className="relative">
          <div className="z-20 bg-white/5 backdrop-blur-xl p-2 rounded-2xl border border-white/10 shadow-2xl inline-block mb-12">
            <CareerNavigator activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          <div className="min-h-[500px]">
            {activeTab === "events" ? (
              <div className="animate-in fade-in duration-700">
                <EmployeeEvents isActive={true} />
              </div>
            ) : (
              <div className="animate-in fade-in duration-700">
                <CareerJobs isActive={true} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Decorative Gradient Glow - Menambah kedalaman visual tanpa mengganggu teks */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-utama)] opacity-[0.03] blur-[120px] pointer-events-none"></div>
    </section>
  );
};

export default CareerSection;