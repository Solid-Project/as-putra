import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  BuildingOffice2Icon, 
  UsersIcon, 
  CircleStackIcon, 
  GlobeAltIcon 
} from "@heroicons/react/24/outline";

gsap.registerPlugin(ScrollTrigger);

const FifthLayout = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const leftColRef = useRef(null);
  const rightGridRef = useRef(null);
  const statsRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // --- 1. EFEK LIVE PARALLAX: SHATTER TO REASSEMBLE (VERSI RAPI) ---
      // Kita tidak pakai split teks lagi agar grid tetap aman.
      // Kita buat elemen judul "datang" dari posisi berantakan ke 0 (Posisi Asli)
      
      const tlShatter = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom", // Mulai gerak saat muncul di bawah
          end: "top top",      // SELESAI & RAPI saat section aktif di layar
          scrub: 1.5,          // Mengikuti scroll
        }
      });

      // Efek: Judul datang dari posisi acak (Shatter) ke posisi 0 (Rapi)
      tlShatter.fromTo(titleRef.current, 
        { 
          x: -150, 
          y: 100, 
          rotation: -10, 
          filter: "blur(15px)", 
          opacity: 0 
        },
        { 
          x: 0, 
          y: 0, 
          rotation: 0, 
          filter: "blur(0px)", 
          opacity: 1, 
          ease: "power2.out" 
        }
      );

      // --- 2. LIVE PARALLAX: DUA ARAH (KIRI & KANAN) ---
      
      // Kolom Kiri (Narasi) - Bergerak halus
      gsap.fromTo(leftColRef.current, 
        { y: 80 }, 
        { 
          y: -80, 
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        }
      );

      // Kolom Kanan (Grid Statistik) - Bergerak lebih cepat (Floating)
      gsap.fromTo(rightGridRef.current, 
        { y: 150 }, 
        { 
          y: -150, 
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2
          }
        }
      );

      // --- 3. ANIMASI COUNTER (Tetap Jalan Otomatis) ---
      const statsData = [
        { target: 70, suffix: "" },
        { target: 5000, suffix: "+" },
        { target: 1.3, suffix: "T", isDecimal: true },
        { target: 6, suffix: "B" },
      ];

      statsData.forEach((stat, idx) => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.target,
          duration: 2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
          onUpdate: () => {
            if (statsRefs.current[idx]) {
              let value = stat.isDecimal ? obj.val.toFixed(1) : Math.floor(obj.val);
              statsRefs.current[idx].innerText = value + stat.suffix;
            }
          },
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section min-h-screen flex items-center py-32 px-[8%] bg-white relative overflow-hidden"
      id="fifth-layout"
    >
      {/* Dekorasi Background */}
      <div className="absolute top-0 right-0 w-1/4 h-full bg-slate-50/50 -z-0" />

      <div className="w-full grid lg:grid-cols-2 gap-24 items-center relative z-10">
        
        {/* KOLOM KIRI: NARASI */}
        <div ref={leftColRef} className="max-w-[600px]">
          {/* Judul ini yang akan "Shatter" tapi kembali ke posisi 0 yang RAPI */}
          <h2 
            ref={titleRef} 
            className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl text-slate-900 leading-[1.1] mb-12 font-bold tracking-tighter"
          >
            Pertumbuhan Strategis & Komitmen Keberlanjutan
          </h2>
          <p className="text-slate-600 text-lg md:text-xl leading-relaxed font-light border-l-2 border-blue-600 pl-8">
            Hingga tahun 2026, AS Putra Group terus memperluas jejak ekosistem bisnisnya di seluruh penjuru negeri, 
            menghasilkan nilai tambah bagi ekonomi nasional.
          </p>
        </div>

        {/* KOLOM KANAN: GRID STATISTIK */}
        <div ref={rightGridRef} className="grid grid-cols-2 gap-x-12 gap-y-24 relative">
          {/* Garis Vertikal */}
          <div className="absolute left-1/2 top-0 w-[1px] h-full bg-blue-50 hidden md:block" />

          {/* Item 1 */}
          <div className="flex flex-col gap-6">
            <BuildingOffice2Icon className="w-10 h-10 text-blue-600/40" />
            <span ref={(el) => (statsRefs.current[0] = el)} className="text-6xl md:text-8xl font-['Playfair_Display'] font-bold text-slate-900 tracking-tighter">0</span>
            <span className="text-[10px] uppercase tracking-[0.4em] text-slate-400 font-black">Unit Bisnis</span>
          </div>

          {/* Item 2 */}
          <div className="flex flex-col gap-6 md:pl-12">
            <UsersIcon className="w-10 h-10 text-blue-600/40" />
            <span ref={(el) => (statsRefs.current[1] = el)} className="text-6xl md:text-8xl font-['Playfair_Display'] font-bold text-slate-900 tracking-tighter">0+</span>
            <span className="text-[10px] uppercase tracking-[0.4em] text-slate-400 font-black">Tenaga Kerja</span>
          </div>

          {/* Item 3 */}
          <div className="flex flex-col gap-6">
            <CircleStackIcon className="w-10 h-10 text-blue-600/40" />
            <span ref={(el) => (statsRefs.current[2] = el)} className="text-6xl md:text-8xl font-['Playfair_Display'] font-bold text-slate-900 tracking-tighter">0</span>
            <span className="text-[10px] uppercase tracking-[0.4em] text-slate-400 font-black">Triliun Omset</span>
          </div>

          {/* Item 4 */}
          <div className="flex flex-col gap-6 md:pl-12">
            <GlobeAltIcon className="w-10 h-10 text-blue-600/40" />
            <span ref={(el) => (statsRefs.current[3] = el)} className="text-6xl md:text-8xl font-['Playfair_Display'] font-bold text-slate-900 tracking-tighter">0</span>
            <span className="text-[10px] uppercase tracking-[0.4em] text-slate-400 font-black">Volume Ekspor</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FifthLayout;