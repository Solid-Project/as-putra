import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logoIcon from "@/assets/logo.jpg"; 

gsap.registerPlugin(ScrollTrigger);

const Counter = ({ target, suffix, label, sectionRef }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef({ value: 0 });

  useEffect(() => {
    if (!target) return;

    const ctx = gsap.context(() => {
      gsap.to(countRef.current, {
        value: target,
        duration: 2,
        ease: "power2.out",
        force3D: true,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
        onUpdate: () => {
          setCount(Math.floor(countRef.current.value));
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [target, sectionRef]);

  return (
    <div className="flex flex-col items-center group py-4">
      {/* Angka Statistik - Diperkecil skalanya */}
      <h3 className="text-3xl md:text-4xl text-[#FFC700] font-bold tracking-tight transition-transform duration-500 group-hover:scale-105">
        {count.toLocaleString("id-ID")}
        <span className="text-white/40 ml-0.5 font-light text-xl md:text-2xl">{suffix}</span>
      </h3>
      
      {/* Aksen Garis - Lebih tipis & pendek */}
      <div className="h-[1.5px] w-6 bg-[#FFC700]/50 my-2 rounded-full transition-all duration-500 group-hover:w-10 group-hover:bg-[#FFC700]" />
      
      {/* Label Deskripsi - Ukuran teks dioptimalkan */}
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

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        x: 30,
        rotate: 5,
        force3D: true,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  if (!data || statsData.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="relative py-12 md:py-16 bg-[#0F1A3E] overflow-hidden border-y border-white/5"
      id={`section-${index}`}
    >
      {/* BACKGROUND DECOR - Diperhalus agar tidak mendominasi */}
      <div
        ref={bgRef}
        className="absolute left-[2%] top-1/2 -translate-y-1/2 w-[20vw] opacity-[0.02] pointer-events-none -z-0"
      >
        <img src={logoIcon} alt="" loading="lazy" className="w-full h-auto grayscale invert" />
      </div>

      {/* Konten Utama - Lebih Rapat */}
      <div className="max-w-[1100px] mx-auto px-6 relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-y-8">
          {statsData.map((stat, idx) => (
            <div key={stat.item_id || idx} className="w-1/2 md:w-auto md:flex-1 border-r border-white/5 last:border-none">
              <Counter
                target={parseInt(stat.angkaTarget)}
                suffix={stat.akhiran}
                label={stat.description}
                sectionRef={sectionRef}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;