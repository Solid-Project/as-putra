import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logoIcon from "@/assets/logo.jpg"; 

gsap.registerPlugin(ScrollTrigger);

const CardSection = ({ data, isActive, index }) => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const COLOR_NAVY = "#1D2B53";
  const COLOR_GOLD = "#FFC619";

  const cultureCards = data?.layout_data?.items || [];

  useEffect(() => {
    if (isActive && cultureCards.length > 0) {
      gsap.to(cardsRef.current, {
        y: 0,
        opacity: 1,
        rotate: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
      });
    }
  }, [isActive, cultureCards]);

  if (!data) return null;

  return (
    <section
      ref={sectionRef}
      /* PERBAIKAN RADIKAL: -mt-20 & pt-0 memaksa layout naik ke atas. !bg-white menghancurkan warna navy pembungkus luar */
      className="relative w-full -mt-20 pt-0 pb-24 flex flex-col !bg-white overflow-hidden px-4 sm:px-6 md:px-8 lg:px-[5%]"
      id={`section-${index}`}
      style={{ backgroundColor: '#FFFFFF' }}
      data-theme="light"
    >
      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] opacity-[0.02] pointer-events-none -z-0">
        <img src={logoIcon} alt="" className="w-full h-auto rotate-12 scale-125 select-none" />
      </div>

      <div className="w-full z-10">
        
        {/* HEADER AREA - Jarak mb-10 agar semakin rapat ke atas */}
        <div className="mb-10 text-left md:flex md:items-end md:justify-between gap-6 pb-6 border-b border-gray-100">
          <div className="max-w-2xl">
            <span className="font-black tracking-[0.25em] uppercase text-[10px] mb-2 block" style={{ color: COLOR_NAVY }}>
              Our Core Values
            </span>
            <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] font-bold mb-4" style={{ color: COLOR_NAVY }}>
              {data.title.split(' ')[0]} <span className="italic" style={{ color: COLOR_GOLD }}>{data.title.split(' ')[1] || ""}</span>
            </h2>
            <div className="max-w-xl border-l-2 border-gray-200 pl-4">
              <p className="text-gray-500 text-sm md:text-base leading-relaxed font-medium">
                {data.description}
              </p>
            </div>
          </div>
        </div>

        {/* CULTURE CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cultureCards.map((item, idx) => (
            <div
              key={item.id || idx}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="relative group w-full transition-all duration-400"
              style={{ opacity: 0, transform: "translateY(25px)" }}
            >
              <div className="relative bg-gray-50/50 border border-gray-200/80 rounded-xl p-5 h-full hover:bg-white hover:border-gray-300 hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="relative w-full aspect-video mb-5 overflow-hidden rounded-lg bg-gray-100 border border-gray-200">
                    <img 
                      src={item.image ? `${import.meta.env.VITE_API_URL}/storage/${item.image}` : `https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800`} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent" />
                  </div>

                  <div className="relative pl-3 border-l-2 border-gray-200 group-hover:border-[#1D2B53] transition-colors duration-300">
                    <h3 className="font-bold text-lg mb-2 transition-transform duration-300 group-hover:translate-x-0.5 font-['Playfair_Display']" style={{ color: COLOR_NAVY }}>
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-xs md:text-sm leading-relaxed font-medium opacity-95">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CardSection;