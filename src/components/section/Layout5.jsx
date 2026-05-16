import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  BuildingOffice2Icon, 
  UsersIcon, 
  CircleStackIcon, 
  GlobeAltIcon 
} from "@heroicons/react/24/outline";
import logoAsliUrl from "@/assets/logo.jpg"; // FIX: Diperbaiki dari '=' menjadi 'from' agar tidak error

gsap.registerPlugin(ScrollTrigger);

const Layout5 = ({ data, index }) => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const leftColRef = useRef(null);
  const rightGridRef = useRef(null);
  const statsRefs = useRef([]);
  const hasAnimatedCounter = useRef(false);

  const displayTitle = data?.title || "Aretha Farm";
  const displayDescription = data?.description || "";
  const statsData = data?.layout_data?.items || [];

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. REVEAL JUDUL
      gsap.fromTo(titleRef.current, 
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          }
        }
      );

      // 2. PARALLAX EFFECT (HANYA AKTIF DI DESKTOP)
      // FIX: Di mobile dimatikan karena y: -50 membuat teks merosot menabrak elemen lain
      if (window.innerWidth >= 1024) {
        gsap.fromTo(leftColRef.current, 
          { y: 50 }, 
          { 
            y: -50, 
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1
            }
          }
        );
      }

      // 3. ANIMASI COUNTER
      const animateCounters = () => {
        statsData.forEach((stat, idx) => {
          const targetNum = parseFloat(stat.target) || 0;
          const obj = { val: 0 };
          gsap.to(obj, {
            val: targetNum,
            duration: 2.5,
            ease: "power4.out",
            onUpdate: () => {
              if (statsRefs.current[idx]) {
                const isDecimal = stat.target?.includes(".");
                let value = isDecimal ? obj.val.toFixed(1) : Math.floor(obj.val);
                statsRefs.current[idx].innerText = value + (stat.suffix || "");
              }
            },
          });
        });
      };

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        onEnter: () => {
          if (!hasAnimatedCounter.current) {
            animateCounters();
            hasAnimatedCounter.current = true;
          }
        },
        onLeaveBack: () => {
          hasAnimatedCounter.current = false;
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [statsData]);

  return (
    <section
      ref={sectionRef}
      // FIX: Menggunakan items-start di mobile agar konten mengalir dari atas, tidak menumpuk di tengah layar
      className="section min-h-screen flex items-start lg:items-center py-20 md:py-32 px-6 sm:px-12 lg:px-[8%] bg-[#0F1A3E] relative overflow-hidden"
      id={`section-${index}`}
      data-theme="dark"
    >
      {/* Background Decor Logo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] md:opacity-[0.03] pointer-events-none -z-0">
        <img src={logoAsliUrl} alt="" className="w-[90%] md:w-[80%] h-auto rotate-12 scale-110" />
      </div>

      {/* Grid Utama (Otomatis menjadi 1 kolom di mobile, 2 kolom di desktop) */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative z-10 pt-10 lg:pt-0">
        
        {/* KOLOM KIRI: NARASI */}
        <div ref={leftColRef} className="w-full max-w-[600px]">
          <h2 
            ref={titleRef} 
            // FIX: Ukuran font judul disesuaikan (text-3xl di mobile) agar tidak meluber patah-patah
            className="font-['Playfair_Display'] text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.2] lg:leading-[1.1] mb-6 md:mb-12 font-bold tracking-tighter"
          >
            {displayTitle}
          </h2>
          <div className="w-16 md:w-20 h-1 md:h-1.5 bg-[#FFC700] mb-6 md:mb-10" />
          <p className="text-gray-400 text-base md:text-xl leading-relaxed font-light text-justify">
            {displayDescription}
          </p>
        </div>

        {/* KOLOM KANAN: GRID STATISTIK */}
        {/* Tetap mempertahankan struktur grid-cols-2 asli Anda, tapi gap disesuaikan agar pas di layar HP */}
        <div ref={rightGridRef} className="grid grid-cols-2 gap-x-6 sm:gap-x-12 gap-y-12 md:gap-y-20 relative">
          {/* Garis Vertikal Dekoratif (Disembunyikan di mobile kecil agar tidak menabrak teks) */}
          <div className="absolute left-1/2 top-0 w-[1px] h-full bg-[#FFC700]/10 hidden sm:block" />

          {statsData.map((item, idx) => (
            // Tetap mempertahankan flex-col vertikal asli bawaan Anda
            <div key={item.id || idx} className={`flex flex-col gap-4 md:gap-6 ${idx % 2 !== 0 ? "sm:pl-12" : ""}`}>
              <div className="flex flex-col">
                <span 
                  ref={(el) => (statsRefs.current[idx] = el)} 
                  // FIX: Angka stat di-scale down dari text-5xl (bawaan) menjadi text-4xl di mobile agar pas
                  className="text-4xl md:text-7xl font-['Playfair_Display'] font-bold text-[#FFC700] tracking-tighter leading-none"
                >
                  0
                </span>
                {/* FIX: Tracking spasasi dikurangi sedikit di mobile agar text label panjang tidak hancur */}
                <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.4em] text-gray-500 font-black mt-2 leading-tight">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Layout5;