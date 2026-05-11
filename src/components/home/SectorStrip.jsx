import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const SectorStrip = ({ data, isActive, index }) => {
  const sectionRef = useRef(null);
  const bgRefs = useRef([]);
  
  const sectors = data?.layout_data || [];

  const getFullImageUrl = (path) => {
    if (!path) return "";
    const cleanBase = BASE_URL.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL;
    return `${cleanBase}/storage/${path}`;
  };

  useEffect(() => {
    const bgs = bgRefs.current.filter(Boolean);
    
    if (bgs.length > 0) {
      const ctx = gsap.context(() => {
        bgs.forEach((bg) => {
          gsap.fromTo(bg, 
            { y: "-10%" }, 
            {
              y: "10%", 
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              }
            }
          );
        });
      }, sectionRef);

      return () => ctx.revert();
    }
  }, [sectors]);

  if (!sectors.length) return null;

  return (
    <section
      ref={sectionRef}
      className="section"
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        backgroundColor: "#0F1A3E",
        position: "relative",
      }}
      id={`section-${index}`}
    >
      <div 
        className="grid w-full h-full" 
        style={{ 
          gridTemplateColumns: `repeat(${sectors.length}, 1fr)`,
          position: "relative"
        }}
      >
        {sectors.map((item, idx) => (
          <div
            key={item.id || idx}
            className="relative flex flex-col justify-center text-white border-r border-white/10 last:border-none"
            style={{ 
              padding: "2.5rem 2rem", // Padding disesuaikan agar teks panjang tidak mepet
              height: "100%", 
              overflow: "hidden",
              backgroundColor: "#1a1a1a" 
            }}
          >
            {/* BACKGROUND LAYER PARALAKS */}
            <div className="absolute inset-0 z-0">
              <div 
                ref={(el) => (bgRefs.current[idx] = el)}
                className="absolute inset-x-0 h-[120%] top-[-10%]" 
                style={{
                  backgroundImage: `linear-gradient(rgba(15, 26, 62, 0.5), rgba(15, 26, 62, 0.85)), url(${getFullImageUrl(item.image)})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </div>

            {/* CONTENT - Teks tampil utuh */}
            <div className="relative z-10 pointer-events-none">
              <h3 className="font-bold text-xl md:text-2xl mb-4 uppercase tracking-tight leading-tight">
                {item.title}
              </h3>
              {/* Teks Deskripsi Panjang */}
              <p className="text-sm opacity-90 mb-6 leading-relaxed whitespace-normal break-words">
                {item.description}
              </p>
              <div className="h-[3px] w-12 bg-yellow-500 shadow-lg shadow-yellow-500/20" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SectorStrip;