import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logoIcon from "@/assets/logo.jpg"; 


gsap.registerPlugin(ScrollTrigger);

const puzzleShapes = [
  "polygon(0% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 0% 100%, 0% 80%, 10% 50%, 0% 20%)",
  "polygon(20% 0%, 100% 0%, 100% 100%, 20% 100%, 0% 80%, 0% 20%)",
  "polygon(0% 20%, 20% 0%, 80% 0%, 100% 20%, 100% 100%, 0% 100%)",
  "polygon(0% 0%, 100% 0%, 100% 80%, 80% 100%, 20% 100%, 0% 80%)",
  "polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)",
];

// --- Sub-Komponen SKELETON ---
const SkeletonLoader = () => {
  return (
    <div className="flex flex-wrap justify-center gap-8 md:gap-4 animate-pulse">
      {[1, 2, 3].map((_, idx) => (
        <div key={idx} className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)]">
          <div className="relative bg-white/5 border border-white/10 rounded-3xl p-6 h-full overflow-hidden">
            <div 
              className="relative w-full aspect-video mb-8 bg-neutral-700/50"
              style={{ clipPath: puzzleShapes[idx % puzzleShapes.length] }}
            />
            <div className="h-7 bg-neutral-700/50 rounded-lg w-3/4 mb-4 ml-4" />
            <div className="space-y-2 ml-4">
              <div className="h-4 bg-neutral-700/50 rounded w-full" />
              <div className="h-4 bg-neutral-700/50 rounded w-5/6" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// --- Komponen Utama ---
const CardSection = ({ data, isLoading, isActive, index }) => {
  const sectionRef = useRef(null);
  const cultureCards = data?.layout_data?.items || [];

  useEffect(() => {
    if (isLoading || cultureCards.length === 0) return;

    // PERBAIKAN UTAMA: Gunakan gsap.matchMedia() untuk memisahkan Desktop & Mobile
    const mm = gsap.matchMedia();

    mm.add({
      // Definisikan breakpoint layar
      isDesktop: "(min-width: 768px)",
      isMobile: "(max-w-767px)"
    }, (context) => {
      const { isDesktop } = context.conditions;

      if (isDesktop) {
        // --- LOGIKA UTAMA DESKTOP (Menggunakan isActive / Paralaks Aktif) ---
        ScrollTrigger.refresh();

        if (isActive) {
          gsap.fromTo(
            ".culture-card-item",
            { y: 40, opacity: 0, rotate: 2 },
            {
              y: 0,
              opacity: 1,
              rotate: 0,
              stagger: 0.12,
              duration: 0.8,
              ease: "power3.out",
              overwrite: "auto"
            }
          );
        } else {
          // Hilang kembali jika tidak aktif (efek paralaks desktop kuno)
          gsap.to(".culture-card-item", {
            y: 40,
            opacity: 0,
            rotate: 2,
            duration: 0.5,
            overwrite: "auto"
          });
        }
      } else {
        // --- LOGIKA UTAMA MOBILE (Bebas dari isActive / Langsung Muncul Aman) ---
        // Di mobile, paksa opacity langsung 1 dan hilangkan semua modifikasi posisi GSAP
        gsap.set(".culture-card-item", { 
          opacity: 1, 
          y: 0, 
          rotate: 0,
          clearProps: "all" 
        });
      }
    }, sectionRef); // Scope selektor di dalam sectionRef

    return () => mm.revert();
  }, [isActive, isLoading, cultureCards]);

  if (!data && !isLoading) return null;

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 flex flex-col bg-[#0F1A3E] overflow-hidden px-4 sm:px-6 md:px-8 lg:px-[5%]"
      id={`section-${index}`}
      data-theme="dark"
    >
      {/* Background Logo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] opacity-[0.03] pointer-events-none -z-0">
        <img src={logoIcon} alt="" className="w-full h-auto rotate-12 scale-150" />
      </div>

      <div className="w-full z-10">
        {/* Header Section */}
        <div className="mb-20 text-left md:flex md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-[#FFC700] font-black tracking-[0.4em] uppercase text-xs mb-4 block">
              Our Core Values
            </span>
            {isLoading ? (
               <div className="animate-pulse">
                 <div className="h-16 bg-neutral-700/50 rounded-xl w-3/4 mb-6" />
                 <div className="h-20 bg-neutral-700/50 rounded-xl w-full border-l-2 border-[#FFC700]/30" />
               </div>
            ) : (
              <>
                <h2 className="text-5xl md:text-7xl font-['Playfair_Display'] font-bold text-white mb-6">
                  {data?.title?.split(' ')[0]} <span className="text-[#FFC700] italic">{data?.title?.split(' ')[1]}</span>
                </h2>
                <div className="max-w-md border-l-2 border-[#FFC700]/30 pl-6">
                  <p className="text-gray-400 text-lg leading-relaxed">
                    {data?.description}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* LOGIK KONTEN: Skeleton vs Real Data */}
        <div>
          {isLoading ? (
            <SkeletonLoader />
          ) : (
            <div className="flex flex-wrap justify-center gap-8 md:gap-4">
              {cultureCards.map((item, idx) => (
                <div
                  key={item.id || idx}
                  /* PERBAIKAN CSS MOBILE SAFE: Default menggunakan opacity-100 agar mobile langsung tampil tanpa intervensi inline script */
                  className="culture-card-item opacity-100 relative group w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)] transition-all duration-500"
                >
                  <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 h-full hover:bg-white/10 transition-colors duration-500 overflow-hidden">
                    
                    <div 
                      className="relative w-full aspect-video mb-8 overflow-hidden group-hover:scale-105 transition-transform duration-700"
                      style={{ 
                        clipPath: puzzleShapes[idx % puzzleShapes.length],
                        backgroundColor: '#1a2a4e'
                      }}
                    >
                      <img 
                        src={item.image ? `${import.meta.env.VITE_API_URL}/storage/${item.image}` : `https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800`} 
                        alt={item.title}
                        className="w-full h-full object-cover mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#FFC700]/40 to-transparent opacity-60 group-hover:opacity-20 transition-opacity" />
                    </div>

                    <div className="relative">
                       <div className="absolute -left-2 top-0 w-1 h-full bg-[#FFC700] rounded-full scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />
                       <h3 className="text-[#FFC700] font-bold text-2xl mb-4 pl-4 group-hover:translate-x-2 transition-transform italic">
                        {item.title}
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed pl-4 opacity-80 group-hover:opacity-100">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CardSection;