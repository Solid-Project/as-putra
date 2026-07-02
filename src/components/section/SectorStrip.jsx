import React, { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSectionAnimation } from "@/hooks/useSectionAnimation";
import OptimizedImage from "@/components/ui/OptimizedImage";

gsap.registerPlugin(ScrollTrigger);

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const SectorStrip = ({ data, isActive, index }) => {
  const sectionRef = useRef(null);
  
  // Asumsi data datang dari API dengan field slug atau kita generate dari title
  const sectors = data?.layout_data?.map(item => {
    let slug = item.slug || item.title?.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
    
    // ponytail: mapping manual khusus untuk override slug
    if (slug?.includes("hotel") || slug?.includes("resort")) {
      slug = "hospitality";
    } else if (slug?.includes("ekspedisi")) {
      slug = "others";
    }

    return { ...item, slug };
  }) || [];

  const getFullImageUrl = (path) => {
    if (!path) return "";
    const cleanBase = BASE_URL.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL;
    return `${cleanBase}/storage/${path}`;
  };

  useSectionAnimation(sectionRef, () => {
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop) return;

    gsap.to(".sector-img", {
      y: "15%",
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 2,
      },
    });
  }, [sectors]);

  if (!sectors.length) return null;

  return (
    <section
      ref={sectionRef}
      className="h-[80vh] w-full flex items-stretch overflow-hidden bg-[#0F1A3E] relative snap-start"
      id={`section-${index}`}
    >
      <div className="flex w-full h-full">
        {sectors.map((item, idx) => (
          <Link
            key={item.id || idx}
            to={`/sector/${item.slug}`}
            className="relative flex-1 flex flex-col justify-center items-center text-white border-r border-white/10 last:border-none overflow-hidden bg-[#0F1A3E] group"
          >
            {/* BACKGROUND LAYER */}
            <div className="absolute inset-0 z-0 bg-[#0F1A3E]">
              <OptimizedImage 
                src={getFullImageUrl(item.image)} 
                alt={item.title}
                className="sector-img w-full h-full object-cover opacity-60 scale-100 transition-transform duration-[2s] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 z-[1] transition-colors duration-500 group-hover:bg-black/30" />
            </div>
            
            {/* CONTENT CONTAINER */}
            <div className="relative z-10 w-full px-8 text-center flex flex-col justify-center items-center max-w-xs">
              <h3 className="font-bold text-lg md:text-xl mb-4 uppercase tracking-wider leading-none">
                {item.title}
              </h3>
              <p className="text-xs opacity-80 mb-6 leading-relaxed font-light line-clamp-3">
                {item.description}
              </p>
              <div className="h-[3px] w-12 bg-yellow-500 shadow-lg shadow-yellow-500/30 transition-all duration-500 group-hover:w-20" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SectorStrip;
