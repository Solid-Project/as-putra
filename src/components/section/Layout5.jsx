import React, { useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSectionAnimation } from "@/hooks/useSectionAnimation";
import logoAsliUrl from "@/assets/logo.jpg";

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
  
  const statsData = useMemo(() => {
    return data?.layout_data?.items || [];
  }, [data?.layout_data?.items]);

  useSectionAnimation(sectionRef, () => {

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

      // 2. PARALLAX EFFECT (DESKTOP ONLY)
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
                const isDecimal = stat.target?.toString().includes(".");
                statsRefs.current[idx].innerText = isDecimal 
                  ? obj.val.toFixed(1) 
                  : Math.floor(obj.val);
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

  }, [statsData]);

  return (
    <section
      ref={sectionRef}
      className="section min-h-screen flex items-start lg:items-center py-20 md:py-32 px-6 sm:px-12 lg:px-[8%] bg-[#0F1A3E] relative overflow-hidden"
      id={`section-${index}`}
      data-theme="dark"
    >
      {/* Background Decor Logo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] md:opacity-[0.03] pointer-events-none -z-0">
        <img src={logoAsliUrl} alt="" className="w-[90%] md:w-[80%] h-auto rotate-12 scale-110" />
      </div>

      {/* Grid Utama */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative z-10 pt-10 lg:pt-0">

        {/* KOLOM KIRI: NARASI */}
        <div ref={leftColRef} className="w-full max-w-[600px]">
          <h2
            ref={titleRef}
            className="font-['Playfair_Display'] text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.2] lg:leading-[1.1] mb-6 md:mb-12 font-bold tracking-tighter"
          >
            {displayTitle}
          </h2>
          <div className="w-16 md:w-20 h-1 md:h-1.5 bg-[#FFC700] mb-6 md:mb-10" />
          <p className="text-gray-400 text-base md:text-xl leading-relaxed font-light text-justify">
            {displayDescription}
          </p>
        </div>

        {/* KOLOM KANAN: GRID STATISTIK (Garis pemisah vertikal telah dihapus) */}
        <div ref={rightGridRef} className="grid grid-cols-2 gap-x-6 sm:gap-x-12 gap-y-12 md:gap-y-20 relative">
          
          {statsData.map((item, idx) => (
            <div
              key={item.id || idx}
              className="flex flex-col gap-2 md:gap-4 justify-start items-start"
            >
              <div className="flex flex-col min-w-0 w-full">
                
                {/* WADAH UTAMA ANGKA & UNIT */}
                <div className="flex items-baseline text-[#FFC700] font-['Playfair_Display'] font-bold leading-none">
                  
                  {/* 1. ANGKA UTAMA */}
                  <span
                    ref={(el) => (statsRefs.current[idx] = el)}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter"
                  >
                    {item.target || "0"}
                  </span>

                  {/* 2. UNIT / SUFFIX */}
                  {item.suffix && (
                    <span className="ml-1.5 md:ml-2 text-xl sm:text-2xl md:text-3xl font-sans font-medium tracking-normal text-[#FFC700]/85 select-none">
                      {item.suffix}
                    </span>
                  )}
                  
                </div>

                {/* TEKS LABEL */}
                <span className="text-[10px] md:text-xs uppercase tracking-[0.15em] md:tracking-[0.3em] text-gray-500 font-extrabold mt-2.5 md:mt-3 leading-snug break-words">
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