import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  CurrencyDollarIcon, 
  GlobeAsiaAustraliaIcon 
} from "@heroicons/react/24/outline";

gsap.registerPlugin(ScrollTrigger);

const Layout6 = () => {
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const midColRef = useRef(null);
  const rightColRef = useRef(null);
  const statsRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // --- LIVE PARALLAX KONTRAS (BI-DIRECTIONAL) ---
      // Kita buat range pergerakan yang besar agar efeknya "terlihat" nyata

      // Kolom 1: Bergerak dari Bawah ke Atas (Sangat Lambat)
      gsap.fromTo(leftColRef.current, 
        { y: 50 }, 
        { 
          y: -50, 
          ease: "none", 
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom", // Mulai saat muncul di bawah
            end: "bottom top",   // Selesai saat hilang di atas
            scrub: 1
          } 
        }
      );

      // Kolom 2: Bergerak dari Atas ke Bawah (Berlawanan Arah)
      gsap.fromTo(midColRef.current, 
        { y: -80 }, 
        { 
          y: 80, 
          ease: "none", 
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2
          } 
        }
      );

      // Kolom 3: Bergerak dari Bawah ke Atas (Paling Cepat)
      gsap.fromTo(rightColRef.current, 
        { y: 150 }, 
        { 
          y: -150, 
          ease: "none", 
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5
          } 
        }
      );

      // --- ANIMASI COUNTER (Tetap Jalan) ---
      const statsData = [124.5, 5.345];
      statsData.forEach((target, idx) => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
          onUpdate: () => {
            if (statsRefs.current[idx]) {
              statsRefs.current[idx].innerText = obj.val.toLocaleString("id-ID", {
                minimumFractionDigits: 1,
                maximumFractionDigits: 3,
              });
            }
          }
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section min-h-screen flex items-center bg-[#F8FAFC] py-32 px-[5%] relative overflow-hidden"
      id="six-layout"
      data-theme="light"
    >
      <div className="w-full grid lg:grid-cols-3 items-stretch relative z-10">
        
        {/* KOLOM 1: NARASI (KIRI) */}
        <div ref={leftColRef} className="flex items-center pr-12 lg:pr-20 py-10">
          <p className="font-['Playfair_Display'] text-2xl md:text-3xl text-slate-800 leading-relaxed italic border-blue-600">
            "Sebagai salah satu grup usaha terbesar di Indonesia, AS Putra terus berkomitmen menghadirkan fasilitas modern, laboratorium teknologi terkini, serta investasi berkelanjutan demi masa depan industri nasional."
          </p>
        </div>

        {/* KOLOM 2: STATISTIK (TENGAH) */}
        <div ref={midColRef} className="flex flex-col justify-center gap-20 px-12 lg:px-20 py-10 border-y lg:border-y-0 lg:border-x border-slate-200 relative bg-white/30">
          <div className="flex flex-col gap-4">
            <CurrencyDollarIcon className="w-10 h-10 text-blue-600/60" />
            <div className="flex items-baseline gap-2">
              <span ref={(el) => (statsRefs.current[0] = el)} className="text-6xl md:text-7xl font-['Playfair_Display'] font-bold text-slate-900">0</span>
              <span className="text-xl font-bold text-slate-900">Miliar</span>
            </div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400 font-bold">Omset Tahunan Grup</p>
          </div>

          <div className="flex flex-col gap-4">
            <GlobeAsiaAustraliaIcon className="w-10 h-10 text-blue-600/60" />
            <div className="flex items-baseline gap-2">
              <span ref={(el) => (statsRefs.current[1] = el)} className="text-6xl md:text-7xl font-['Playfair_Display'] font-bold text-slate-900">0</span>
              <span className="text-xl font-bold text-slate-900">Juta</span>
            </div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400 font-bold">Volume Ekspor Global</p>
          </div>
        </div>

        {/* KOLOM 3: LOGO (KANAN) */}
        <div ref={rightColRef} className="flex flex-col justify-center items-center gap-16 pl-12 lg:pl-20 py-10">
          <div className="w-32 h-32 grayscale hover:grayscale-0 transition-all duration-500 flex items-center justify-center border border-slate-100 rounded-full bg-white shadow-sm hover:shadow-xl p-4">
            <img src="https://cdn.simpleicons.org/blueprint/1e293b" alt="Unit 1" className="w-full object-contain" />
          </div>
          
          <div className="w-28 h-28 grayscale hover:grayscale-0 transition-all duration-500 flex items-center justify-center border border-slate-100 rounded-full bg-white shadow-sm hover:shadow-xl p-6">
            <img src="https://cdn.simpleicons.org/probot/1e293b" alt="Unit 2" className="w-full object-contain" />
          </div>

          <div className="w-40 h-16 grayscale hover:grayscale-0 transition-all duration-500 flex items-center justify-center">
             <span className="font-black text-2xl tracking-tighter text-slate-300 group-hover:text-blue-900 transition-colors uppercase">AS PUTRA</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Layout6;