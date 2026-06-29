import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  CurrencyDollarIcon, 
  GlobeAsiaAustraliaIcon 
} from "@heroicons/react/24/outline";
import logoAsliUrl from "@/assets/logo.jpg";

gsap.registerPlugin(ScrollTrigger);

const Layout6 = ({ data, index }) => {
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const midColRef = useRef(null);
  const rightColRef = useRef(null);
  const statsRefs = useRef([]);

  const displayDescription = data?.description || "";
  const layoutData = data?.layout_data || {};
  const logos = layoutData?.logos || [];

  const isLongContent = displayDescription.length > 600; 
  const sectionClass = isLongContent ? "section no-snap" : "section";

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. PARALLAX BI-DIRECTIONAL (HANYA AKTIF DI DESKTOP >= 1024px)
      // Di mobile dimatikan total agar posisi elemen tidak saling menabrak atau meluber
      if (window.innerWidth >= 1024) {
        // Kolom Kiri: Naik pelan
        gsap.fromTo(leftColRef.current, { y: 40 }, { 
          y: -40, scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1 } 
        });

        // Kolom Tengah: Turun pelan
        gsap.fromTo(midColRef.current, { y: -60 }, { 
          y: 60, scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1.2 } 
        });

        // Kolom Kanan: Naik lebih cepat
        gsap.fromTo(rightColRef.current, { y: 100 }, { 
          y: -100, scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1.5 } 
        });
      }

      // 2. ANIMASI COUNTER
      const statsToAnimate = [
        parseFloat(layoutData.stat1_val) || 0,
        parseFloat(layoutData.stat2_val) || 0
      ];

      statsToAnimate.forEach((target, idx) => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2.5,
          ease: "expo.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
          onUpdate: () => {
            if (statsRefs.current[idx]) {
              statsRefs.current[idx].innerText = obj.val.toLocaleString("id-ID", {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              });
            }
          }
        });
      });

    }, sectionRef);
    return () => ctx.revert();
  }, [layoutData, displayDescription]);

  return (
    <section
      ref={sectionRef}
      id={`section-${index}`}
      // OPTIMASI: Menggunakan h-auto di mobile agar fleksibel menampung susunan 3 kolom vertikal
      className={`${sectionClass} relative w-full flex flex-col bg-[#0F1A3E] overflow-hidden h-auto lg:h-screen`}
      style={{ 
        minHeight: "100vh" 
      }}
    >
      {/* Background Decor Logo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none -z-0">
        <img src={logoAsliUrl} alt="" loading="lazy" className="w-[90%] md:w-[80%] h-auto -rotate-12 scale-125" />
      </div>

      {/* OPTIMASI: Padding disesuaikan menjadi px-6 di mobile agar konten tidak terhimpit/terpotong kaku */}
      <div className={`w-full flex-grow flex items-start lg:items-center px-6 sm:px-12 lg:px-[8%] z-10 py-20 lg:py-10`}>
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 items-center gap-14 lg:gap-0">
          
          {/* KOLOM 1: NARASI (KIRI) */}
          {/* Di mobile text-xl agar proporsional, border-l-4 disesuaikan warnanya */}
          <div ref={leftColRef} className="flex items-center lg:pr-16 order-2 lg:order-1 w-full">
            <p className="font-['Playfair_Display'] text-xl md:text-3xl text-gray-300 leading-relaxed italic border-l-4 border-[#FFC700] pl-6 md:pl-8 text-justify">
              {displayDescription}
            </p>
          </div>

          {/* KOLOM 2: STATISTIK (TENGAH) */}
          {/* Di mobile border pembatas diganti dari sumbu Y (atas-bawah kaku) menjadi sumbu X/padding agar tidak mengunci space */}
          <div ref={midColRef} className="flex flex-col justify-center gap-10 md:gap-16 px-4 sm:px-10 lg:px-20 py-8 lg:py-10 border-y lg:border-y-0 lg:border-x border-white/10 relative bg-white/[0.01] lg:bg-white/[0.02] backdrop-blur-sm order-1 lg:order-2 w-full">
            
            <div className="flex flex-col gap-2.5">
              <div className="flex items-baseline gap-2">
                <span ref={(el) => (statsRefs.current[0] = el)} className="text-5xl md:text-7xl font-['Playfair_Display'] font-bold text-[#FFC700] leading-none">0</span>
                <span className="text-lg md:text-xl font-bold text-white/80">{layoutData.stat1_unit}</span>
              </div>
              <p className="text-[9px] md:text-[10px] uppercase tracking-[0.25em] md:tracking-[0.3em] text-gray-500 font-black">{layoutData.stat1_label}</p>
            </div>

            <div className="flex flex-col gap-2.5">
              <div className="flex items-baseline gap-2">
                <span ref={(el) => (statsRefs.current[1] = el)} className="text-5xl md:text-7xl font-['Playfair_Display'] font-bold text-[#FFC700] leading-none">0</span>
                <span className="text-lg md:text-xl font-bold text-white/80">{layoutData.stat2_unit}</span>
              </div>
              <p className="text-[9px] md:text-[10px] uppercase tracking-[0.25em] md:tracking-[0.3em] text-gray-500 font-black">{layoutData.stat2_label}</p>
            </div>

          </div>

          {/* KOLOM 3: LOGO PARTNER (KANAN) */}
          <div ref={rightColRef} className="flex flex-col justify-center items-center lg:pl-16 pt-4 lg:py-10 order-3 w-full">
            {/* Menggunakan grid-cols-3 di mobile terkecil jika logo banyak agar tidak memakan ruang ke bawah */}
            <div className="grid grid-cols-3 sm:grid-cols-2 gap-4 lg:gap-6 w-full justify-items-center">
              {logos.map((logo, idx) => (
                <div 
                  key={logo.id || idx} 
                  className={`w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700 flex items-center justify-center p-4 lg:p-5 bg-white/[0.03] rounded-full border border-white/10 hover:border-[#FFC700]/30 shadow-2xl
                    ${logos.length === 3 && idx === 2 ? "col-span-1 sm:col-span-2 justify-self-center" : ""}`}
                >
                  <img 
                    src={`${import.meta.env.VITE_API_URL}/storage/${logo.file}`} 
                    alt={`Partner ${idx}`} 
                    loading="lazy"
                    className="w-full h-full object-contain" 
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Layout6;