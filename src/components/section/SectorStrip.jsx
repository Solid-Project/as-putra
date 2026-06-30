import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSectionAnimation } from "@/hooks/useSectionAnimation";
import OptimizedImage from "@/components/ui/OptimizedImage";

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

  useSectionAnimation(sectionRef, () => {
    const bgs = bgRefs.current.filter(Boolean);
    if (bgs.length === 0) return;

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop) return;

    bgs.forEach((bg) => {
      gsap.fromTo(bg, 
        { y: "-10%" }, 
        { y: "10%", ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
            fastScrollEnd: true,
            anticipatePin: 1,
          }
        }
      );
    });
  }, [sectors]);

  if (!sectors.length) return null;

  return (
    <section
      ref={sectionRef}
      className="h-screen w-full flex items-stretch overflow-hidden bg-[#0F1A3E] relative snap-start"
      id={`section-${index}`}
    >
      <div className="flex w-full h-full">
        {sectors.map((item, idx) => (
          <div
            key={item.id || idx}
            className="relative flex-1 flex flex-col justify-center items-start text-white border-r border-white/10 last:border-none px-6 overflow-hidden bg-[#0F1A3E]"
          >
            {/* BACKGROUND LAYER PARALLAKS & OVERLAY */}
            <div className="absolute inset-0 z-0 bg-[#0F1A3E]">
              <div 
                ref={(el) => (bgRefs.current[idx] = el)}
                className="absolute inset-0 will-change-transform" 
              >
                <OptimizedImage 
                  src={getFullImageUrl(item.image)} 
                  alt={item.title}
                  className="w-full h-[130%] top-[-15%] absolute object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-[#0F1A3E]/60 z-[1]" />
              </div>
            </div>
            {/* CONTENT CONTAINER */}
            <div className="relative z-10 w-full text-left flex flex-col justify-start items-start max-w-md mx-auto md:mx-0 md:h-[350px]">
              
              <h3 className="font-bold text-xl md:text-[1.3vw] lg:text-[1.5vw] mb-4 uppercase tracking-wider leading-none w-full md:whitespace-nowrap">
                {item.title}
              </h3>
              
              <p className="text-sm md:text-xs lg:text-sm opacity-80 mb-6 leading-relaxed w-full break-words whitespace-normal font-light">
                {item.description}
              </p>
              
              <div className="h-[3px] w-12 bg-yellow-500 shadow-lg shadow-yellow-500/30" />
            </div>

          </div>

        ))}
      </div>
    </section>
  );
};

export default SectorStrip;