import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  BuildingOffice2Icon, 
  UsersIcon, 
  CircleStackIcon, 
  GlobeAltIcon 
} from "@heroicons/react/24/outline";
import logoAsliUrl from "@/assets/logo.jpg";

gsap.registerPlugin(ScrollTrigger);

const Layout5 = ({ data, index }) => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const leftColRef = useRef(null);
  const rightGridRef = useRef(null);
  const statsRefs = useRef([]);
  const hasAnimatedCounter = useRef(false);

  // Ambil data dari JSON props
  const displayTitle = data?.title || "Aretha Farm";
  const displayDescription = data?.description || "";
  const statsData = data?.layout_data?.items || [];

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. EFEK REVEAL JUDUL
      gsap.fromTo(titleRef.current, 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );

      // 2. PARALLAX EFFECT UNTUK KOLOM
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
                const isDecimal = stat.target.includes(".");
                let value = isDecimal ? obj.val.toFixed(1) : Math.floor(obj.val);
                statsRefs.current[idx].innerText = value + (stat.suffix || "");
              }
            },
          });
        });
      };

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
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

  // Map icon berdasarkan index agar variatif
  const icons = [
    <BuildingOffice2Icon className="w-10 h-10 text-[#FFC700]/40" />,
    <UsersIcon className="w-10 h-10 text-[#FFC700]/40" />,
    <CircleStackIcon className="w-10 h-10 text-[#FFC700]/40" />,
    <GlobeAltIcon className="w-10 h-10 text-[#FFC700]/40" />
  ];

  return (
    <section
      ref={sectionRef}
      className="section min-h-screen flex items-center py-32 px-[8%] bg-[#0F1A3E] relative overflow-hidden"
      id={`section-${index}`}
      data-theme="dark"
    >
      {/* Background Decor Logo (Sama dengan Layout Lain) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none -z-0">
        <img src={logoAsliUrl} alt="" className="w-[80%] h-auto rotate-12 scale-110" />
      </div>

      <div className="w-full grid lg:grid-cols-2 gap-24 items-center relative z-10">
        
        {/* KOLOM KIRI: NARASI */}
        <div ref={leftColRef} className="max-w-[600px]">
          <h2 
            ref={titleRef} 
            className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] mb-12 font-bold tracking-tighter"
          >
            {displayTitle}
          </h2>
          <div className="w-20 h-1.5 bg-[#FFC700] mb-10" />
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed font-light text-justify">
            {displayDescription}
          </p>
        </div>

        {/* KOLOM KANAN: GRID STATISTIK */}
        <div ref={rightGridRef} className="grid grid-cols-2 gap-x-12 gap-y-20 relative">
          {/* Garis Vertikal Dekoratif */}
          <div className="absolute left-1/2 top-0 w-[1px] h-full bg-[#FFC700]/10 hidden md:block" />

          {statsData.map((item, idx) => (
            <div key={item.id} className={`flex flex-col gap-6 ${idx % 2 !== 0 ? "md:pl-12" : ""}`}>
              {icons[idx % icons.length]}
              <div className="flex flex-col">
                <span 
                  ref={(el) => (statsRefs.current[idx] = el)} 
                  className="text-5xl md:text-7xl font-['Playfair_Display'] font-bold text-[#FFC700] tracking-tighter"
                >
                  0
                </span>
                <span className="text-[10px] uppercase tracking-[0.4em] text-gray-500 font-black mt-2">
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