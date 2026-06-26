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
      /* 
        FIXED UTAMA: 
        Di mobile diubah menjadi h-auto agar semua strip bisa memanjang ke bawah murni secara alami.
        Di desktop baru dikunci md:h-screen (100% layar) agar presisi di tengah.
      */
      className="h-auto md:h-screen w-full flex items-stretch overflow-hidden bg-[#0F1A3E] relative snap-start"
      id={`section-${index}`}
    >
      <div 
        /* 
          FIXED GRID:
          Mobile menggunakan h-auto mengikuti konten, Desktop menggunakan md:h-full 
          agar flexbox vertikal di bawahnya bisa mendeteksi titik tengah ekuator layar komputer.
        */
        className="grid w-full h-auto md:h-full grid-cols-1 md:grid-flow-col md:auto-cols-fr"
      >
        {sectors.map((item, idx) => (
          <div
            key={item.id || idx}
            /* 
              FIXED KOLOM:
              - min-h-[50vh] di mobile memastikan tiap sektor mengambil porsi setengah layar HP yang rapi.
              - md:h-full mengembalikan tinggi kolom penuh di monitor desktop.
              - justify-center mendudukkan boks konten [350px] murni simetris di tengah-tengah.
            */
            className="relative flex flex-col justify-center items-start text-white border-b md:border-b-0 md:border-r border-white/10 last:border-none px-6 py-20 min-h-[50vh] md:min-h-0 md:h-full overflow-hidden bg-[#1a1a1a]"
          >
            {/* BACKGROUND LAYER PARALAKS */}
            <div className="absolute inset-0 z-0">
              <div 
                ref={(el) => (bgRefs.current[idx] = el)}
                className="absolute inset-x-0 h-[130%] top-[-15%]" 
                style={{
                  backgroundImage: `linear-gradient(rgba(15, 26, 62, 0.65), rgba(15, 26, 62, 0.95)), url(${getFullImageUrl(item.image)})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </div>

            {/* CONTENT CONTAINER */}
            <div className="relative z-10 w-full text-left flex flex-col justify-start items-start max-w-md mx-auto md:mx-0 md:h-[350px]">
              
              {/* JUDUL */}
              <h3 className="font-bold text-xl md:text-[1.3vw] lg:text-[1.5vw] mb-4 uppercase tracking-wider leading-none w-full md:whitespace-nowrap">
                {item.title}
              </h3>
              
              {/* DESKRIPSI */}
              <p className="text-sm md:text-xs lg:text-sm opacity-80 mb-6 leading-relaxed w-full break-words whitespace-normal font-light">
                {item.description}
              </p>
              
              {/* Garis Kuning */}
              <div className="h-[3px] w-12 bg-yellow-500 shadow-lg shadow-yellow-500/30" />
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};

export default SectorStrip;