import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRightIcon, ArrowLeftIcon, BuildingOffice2Icon } from "@heroicons/react/24/outline";

gsap.registerPlugin(ScrollTrigger);

const Layout7 = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const mainCardRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const cardsRef = useRef([]);

  const unitBisnis = [
    { id: 1, name: "CEHA", desc: "Lokasi: Jl. Jend. Sudirman, Awirarangan, Kec. Kuningan, Kabupaten Kuningan, Jawa Barat 45511", img: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?q=80&w=600" },
    { id: 2, name: "AYAMKU", desc: "Tersebar di berbagai lokasi strategis di Kuningan, mencakup lebih dari 10 outlet aktif.", img: "https://images.unsplash.com/photo-1547496502-affa22d38842?q=80&w=600" },
    { id: 3, name: "AS PUTRA MART", desc: "Jl. Jend. Sudirman, Winduhaji, Kec. Kuningan, Kabupaten Kuningan, Jawa Barat 45511 ", img: "https://images.unsplash.com/photo-1594913366159-1832ffef867d?q=80&w=600" },
    ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. LIVE PARALLAX HEADER: Bergerak turun pelan saat scroll ke bawah
      gsap.fromTo(headerRef.current, 
        { y: -60, opacity: 0.7 }, 
        {
          y: 60,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          }
        }
      );

      // 2. LIVE PARALLAX MAIN CARD: Bergerak NAIK berlawanan arah dengan header
      // Ini yang bikin efek "berpapasan" yang indah
      gsap.fromTo(mainCardRef.current, 
        { y: 100 }, 
        {
          y: -100,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5, // Sedikit lebih lambat agar terasa "berat"
          }
        }
      );

      // 3. INTERNAL DRIFT: Kartu kecil di dalam meluncur halus secara horizontal
      cardsRef.current.forEach((card, idx) => {
        gsap.fromTo(card, 
          { x: 30 * (idx + 1) }, 
          {
            x: -30 * (idx + 1),
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 2,
            }
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scroll = (direction) => {
    const { current } = scrollContainerRef;
    if (current) {
      const scrollAmount = 300; 
      current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className="section min-h-screen flex flex-col justify-center py-12 bg-[#F8FAFC] overflow-hidden" 
      id="seven-layout"
    >
      
      {/* HEADER: PADAT & RAPAT */}
      <div ref={headerRef} className="w-full px-[6%] mx-auto mb-6 flex justify-between items-end relative z-10">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-2">
             <div className="w-8 h-[2px] bg-[var(--color-utama)]"></div>
             <span className="text-[var(--color-utama)] font-bold tracking-[0.3em] text-[9px] uppercase">Subsidiaries</span>
          </div>
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl lg:text-5xl text-slate-950 font-bold leading-[1.1] tracking-tighter">
            Sektor Retail AS PUTRA
          </h2>
        </div>
      </div>

      {/* MAIN CARD: COMPACT & SOLID */}
      <div className="w-full px-[6%] mx-auto relative z-10">
        <div 
          ref={mainCardRef}
          className="bg-white p-6 md:p-8 rounded-sm shadow-[0_40px_80px_-20px_rgba(0,0,0,0.06)] border border-slate-100"
        >
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-50">
             <BuildingOffice2Icon className="w-6 h-6 text-blue-600/50" />
             <h3 className="text-base font-bold text-slate-900 tracking-tight italic font-['Playfair_Display']">Unit Usaha & Produk</h3>
          </div>

          <div 
            ref={scrollContainerRef}
            className="hide-scrollbar flex gap-6 overflow-x-auto snap-x snap-mandatory touch-pan-x"
          >
            {unitBisnis.map((item, idx) => (
              <div 
                key={item.id}
                ref={(el) => (cardsRef.current[idx] = el)}
                className="unit-card flex-none w-[240px] md:w-[280px] snap-start group cursor-pointer"
              >
                <div className="relative h-[160px] md:h-[180px] overflow-hidden rounded-sm bg-slate-50 mb-4 border border-slate-100">
                  <img 
                    src={item.img} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-500" />
                </div>

                <h4 className="text-base font-bold text-slate-950 mb-1 tracking-tight group-hover:text-blue-700 transition-colors">
                  {item.name}
                </h4>
                <p className="text-slate-500 text-[11px] leading-relaxed font-light line-clamp-2">
                  {item.desc}
                </p>
                <div className="mt-3 w-6 group-hover:w-10 h-[1.5px] bg-[var(--color-utama)] transition-all duration-500"></div>
              </div>
            ))}
            <div className="flex-none w-[20px]" />
          </div>
        </div>
      </div>

    </section>
  );
};

export default Layout7;