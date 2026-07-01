import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSectionAnimation } from "@/hooks/useSectionAnimation";
import logoIcon from "@/assets/logo.jpg"; 

gsap.registerPlugin(ScrollTrigger);

const Counter = ({ target, suffix, label, sectionRef }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef({ value: 0 });

  useSectionAnimation(sectionRef, () => {
    if (!target) return;
    gsap.to(countRef.current, {
      value: target, duration: 2, ease: "power2.out", force3D: true,
      scrollTrigger: { trigger: sectionRef.current, start: "top 90%", toggleActions: "play none none none" },
      onUpdate: () => { setCount(Math.floor(countRef.current.value)); },
    });
  }, [target]);

  return (
    <div className="flex flex-col items-center group py-4">
      <h3 className="text-3xl md:text-4xl text-[#FFC700] font-bold tracking-tight transition-transform duration-500 group-hover:scale-105">
        {count.toLocaleString("id-ID")}
        <span className="text-white/40 ml-0.5 font-light text-xl md:text-2xl">{suffix}</span>
      </h3>
      <div className="h-[1.5px] w-6 bg-[#FFC700]/50 my-2 rounded-full transition-all duration-500 group-hover:w-10 group-hover:bg-[#FFC700]" />
      <p className="text-blue-100/50 uppercase tracking-[0.2em] text-[9px] md:text-[10px] font-semibold text-center max-w-[120px] leading-snug">
        {label}
      </p>
    </div>
  );
};

const StatsSection = ({ data, index }) => {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);

  const statsData = data?.layout_data || [];

  useSectionAnimation(sectionRef, () => {
    gsap.to(bgRef.current, {
      x: 30, rotate: 5, force3D: true,
      scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1 },
    });
  }, []);

  if (!data || statsData.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="relative h-[20vh] flex items-center justify-center bg-[#0F1A3E] overflow-hidden border-y border-white/5 snap-start -mt-px"
      id={`section-${index}`}
    >
      {/* BACKGROUND DECOR */}
      <div
        ref={bgRef}
        className="absolute left-[5%] top-1/2 -translate-y-1/2 w-[12vw] opacity-[0.03] pointer-events-none"
      >
        <img src={logoIcon} alt="" loading="lazy" className="w-full h-auto grayscale invert" />
      </div>

      {/* Konten Utama - Menggunakan style Playfair yang indah */}
      <div className="w-full max-w-[1440px] px-6 sm:px-8 md:px-12 lg:px-[8%]">
        <div className="flex items-center justify-between gap-4">
          {statsData.map((stat, idx) => (
            <div key={stat.item_id || idx} className="flex-1 flex justify-center border-r border-white/10 last:border-none">
              <div className="flex flex-col items-center">
                <div className="text-2xl md:text-4xl font-black text-white font-['Playfair_Display'] tracking-tight">
                  {parseInt(stat.angkaTarget).toLocaleString("id-ID")}
                  <span className="text-[#FFC700] ml-1 text-base md:text-xl font-normal">{stat.akhiran}</span>
                </div>
                <div className="w-8 h-[2px] bg-[#FFC700]/30 my-2 rounded-full" />
                <div className="text-[8px] md:text-[9px] uppercase tracking-[0.25em] text-white/50 font-medium">
                  {stat.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;