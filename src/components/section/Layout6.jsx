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

  // 1. LOGIKA SNAP DINAMIS
  // Jika teks deskripsi sangat panjang (> 600 karakter), matikan snap agar user bisa scroll bebas.
  const isLongContent = displayDescription.length > 600; 
  const sectionClass = isLongContent ? "section no-snap" : "section";

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 2. PARALLAX BI-DIRECTIONAL (Menciptakan kedalaman visual)
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

      // 3. ANIMASI COUNTER
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
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
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
  }, [layoutData]);

  return (
    <section
      ref={sectionRef}
      id={`section-${index}`}
      className={`${sectionClass} relative w-full flex flex-col bg-[#0F1A3E] overflow-hidden`}
      style={{ 
        height: isLongContent ? "auto" : "100vh",
        minHeight: "100vh" 
      }}
    >
      {/* Background Decor Logo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none -z-0">
        <img src={logoAsliUrl} alt="" className="w-[80%] h-auto -rotate-12 scale-125" />
      </div>

      <div className={`w-full flex-grow flex items-center px-[8%] z-10 ${isLongContent ? "py-32" : "py-10"}`}>
        <div className="w-full grid lg:grid-cols-3 items-center gap-12 lg:gap-0">
          
          {/* KOLOM 1: NARASI (KIRI) */}
          <div ref={leftColRef} className="flex items-center lg:pr-16 order-2 lg:order-1">
            <p className="font-['Playfair_Display'] text-2xl md:text-3xl text-gray-300 leading-relaxed italic border-l-4 border-[#FFC700] pl-8">
              {displayDescription}
            </p>
          </div>

          {/* KOLOM 2: STATISTIK (TENGAH) */}
          <div ref={midColRef} className="flex flex-col justify-center gap-16 px-10 lg:px-20 py-10 border-y lg:border-y-0 lg:border-x border-white/10 relative bg-white/[0.02] backdrop-blur-sm order-1 lg:order-2">
            <div className="flex flex-col gap-3">
              <CurrencyDollarIcon className="w-8 h-8 text-[#FFC700]/50" />
              <div className="flex items-baseline gap-2">
                <span ref={(el) => (statsRefs.current[0] = el)} className="text-6xl md:text-7xl font-['Playfair_Display'] font-bold text-[#FFC700] leading-none">0</span>
                <span className="text-xl font-bold text-white/80">{layoutData.stat1_unit}</span>
              </div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-black">{layoutData.stat1_label}</p>
            </div>

            <div className="flex flex-col gap-3">
              <GlobeAsiaAustraliaIcon className="w-8 h-8 text-[#FFC700]/50" />
              <div className="flex items-baseline gap-2">
                <span ref={(el) => (statsRefs.current[1] = el)} className="text-6xl md:text-7xl font-['Playfair_Display'] font-bold text-[#FFC700] leading-none">0</span>
                <span className="text-xl font-bold text-white/80">{layoutData.stat2_unit}</span>
              </div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-black">{layoutData.stat2_label}</p>
            </div>
          </div>

          {/* KOLOM 3: LOGO PARTNER (KANAN) */}
          <div ref={rightColRef} className="flex flex-col justify-center items-center lg:pl-16 py-10 order-3">
            <div className="grid grid-cols-2 gap-4 lg:gap-6 mb-10">
              {logos.map((logo, idx) => (
                <div 
                  key={logo.id} 
                  className={`w-24 h-24 lg:w-28 lg:h-28 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700 flex items-center justify-center p-5 bg-white/[0.03] rounded-full border border-white/10 hover:border-[#FFC700]/30 shadow-2xl
                    ${logos.length === 3 && idx === 2 ? "col-span-2 justify-self-center" : ""}`}
                >
                  <img 
                    src={`${import.meta.env.VITE_API_URL}/storage/${logo.file}`} 
                    alt={`Partner ${idx}`} 
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