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
  const leftTextRef = useRef(null);
  const rightGridRef = useRef(null);
  const statsRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Animasi Teks Kiri
      gsap.fromTo(
        leftTextRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 2. Animasi Counter
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
          duration: 2.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
          onUpdate: () => {
            if (statsRefs.current[idx]) {
              let value = stat.isDecimal 
                ? obj.val.toFixed(1) 
                : Math.floor(obj.val);
              statsRefs.current[idx].innerText = value + stat.suffix;
            }
          },
        });
      });

      // 3. Animasi Grid Kanan
      gsap.fromTo(
        rightGridRef.current.children,
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section min-h-screen flex items-center py-24 px-[8%] bg-white relative overflow-hidden"
      id="fifth-layout"
      data-theme="light"
    >
      {/* Dekorasi Latar Belakang Biru Muda Sangat Tipis */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 -z-0" />

      <div className="w-full grid lg:grid-cols-2 gap-24 items-center relative z-10">
        
        {/* KOLOM KIRI: NARASI (Warna Teks Biru Tua/Slate-900) */}
        <div ref={leftTextRef} className="max-w-[600px]">
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl lg:text-5xl text-slate-900 leading-[1.2] mb-10 font-bold">
            Pertumbuhan Strategis & Komitmen Keberlanjutan
          </h2>
          <p className="text-slate-600 text-lg md:text-xl leading-relaxed font-light border-l-2 border-blue-600 pl-8">
            Hingga tahun 2026, AS Putra Group terus memperluas jejak ekosistem bisnisnya di seluruh penjuru negeri, 
            menghasilkan nilai tambah bagi ekonomi nasional melalui inovasi dan integritas yang tak tergoyahkan.
          </p>
        </div>

        {/* KOLOM KANAN: GRID STATISTIK */}
        <div 
          ref={rightGridRef}
          className="grid grid-cols-2 gap-x-8 gap-y-20 relative"
        >
          {/* Garis Vertikal Tengah - Biru Tipis */}
          <div className="absolute left-1/2 top-0 w-[1px] h-full bg-blue-100 hidden md:block" />

          {/* Item 1: Companies */}
          <div className="flex flex-col gap-5">
            <BuildingOffice2Icon className="w-8 h-8 text-blue-600/70" />
            <span ref={(el) => (statsRefs.current[0] = el)} className="text-5xl md:text-7xl font-['Playfair_Display'] font-bold text-slate-900 tracking-tighter">0</span>
            <span className="text-xs uppercase tracking-[0.3em] text-slate-400 font-bold">Unit Bisnis</span>
          </div>

          {/* Item 2: Employers */}
          <div className="flex flex-col gap-5 md:pl-12">
            <UsersIcon className="w-8 h-8 text-blue-600/70" />
            <span ref={(el) => (statsRefs.current[1] = el)} className="text-5xl md:text-7xl font-['Playfair_Display'] font-bold text-slate-900 tracking-tighter">0+</span>
            <span className="text-xs uppercase tracking-[0.3em] text-slate-400 font-bold">Tenaga Kerja</span>
          </div>

          {/* Item 3: Turnover */}
          <div className="flex flex-col gap-5">
            <CircleStackIcon className="w-8 h-8 text-blue-600/70" />
            <span ref={(el) => (statsRefs.current[2] = el)} className="text-5xl md:text-7xl font-['Playfair_Display'] font-bold text-slate-900 tracking-tighter">0</span>
            <span className="text-xs uppercase tracking-[0.3em] text-slate-400 font-bold">Triliun Omset</span>
          </div>

          {/* Item 4: Export Volume */}
          <div className="flex flex-col gap-5 md:pl-12">
            <GlobeAltIcon className="w-8 h-8 text-blue-600/70" />
            <span ref={(el) => (statsRefs.current[3] = el)} className="text-5xl md:text-7xl font-['Playfair_Display'] font-bold text-slate-900 tracking-tighter">0</span>
            <span className="text-xs uppercase tracking-[0.3em] text-slate-400 font-bold">Miliar Volume Ekspor</span>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FifthLayout;