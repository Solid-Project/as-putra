import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

gsap.registerPlugin(ScrollTrigger);

const Layout10 = ({ data, index }) => {
  const sectionRef = useRef(null);
  const parallaxBgRef = useRef(null);
  const cardRef = useRef(null);
  const titleRef = useRef(null);
  const scrollTextRef = useRef(null);

  const displayTitle = data?.title || "Bersatu Bersama Petani";
  const displaySubtitle = data?.subtitle || "Bermakna dalam perjalanan";
  const displayDescription = data?.description || "";
  const displayImage = data?.image ? `${import.meta.env.VITE_API_URL}/storage/${data.image}` : "";
  const displayLabel = data?.more_text || "AS Putra Group";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(parallaxBgRef.current, { y: "-10%" }, {
        y: "10%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleScroll = (direction) => {
    if (scrollTextRef.current) {
      const currentScroll = scrollTextRef.current.scrollTop;
      const scrollAmount = 140;
      const target = direction === "next" ? currentScroll + scrollAmount : currentScroll - scrollAmount;

      gsap.to(scrollTextRef.current, {
        scrollTop: target,
        duration: 0.8,
        ease: "power3.out"
      });
    }
  };

  return (
    <section 
      ref={sectionRef} 
      id={`section-${index}`}
      className="section min-h-screen flex items-center bg-white py-24 relative overflow-hidden"
      data-theme="dark"
    >
      {/* BACKGROUND */}
      <div className="absolute top-0 left-0 w-full lg:w-3/5 h-[120%] -z-0 overflow-hidden bg-slate-100">
        {displayImage && (
          <img 
            ref={parallaxBgRef}
            src={displayImage} 
            alt={displayTitle} 
            className="w-full h-full object-cover origin-top scale-110 opacity-90 lg:opacity-100" 
          />
        )}
        <div className="absolute inset-0 bg-black/30 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white lg:block hidden z-20" />
      </div>

      <div className="container mx-auto px-[8%] relative z-30">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* KOLOM KIRI: JUDUL RAKSASA */}
          <div ref={titleRef} className="lg:col-span-6 flex flex-col">
            <span className="text-white/70 font-black tracking-[0.4em] text-[10px] uppercase mb-8 block">
              {displayTitle}
            </span>
            {displayTitle.split(" ").map((word, i) => (
              <h1 key={i} className="font-['Playfair_Display'] text-6xl md:text-8xl lg:text-[7.5rem] text-white font-black leading-[0.85] tracking-tighter drop-shadow-2xl">
                {word.replace(/[.,]/g, "")}.
              </h1>
            ))}
          </div>

          {/* KOLOM KANAN: CARD */}
          <div className="lg:col-span-5 lg:col-start-8 relative">
            
            {/* NAVIGASI VERTIKAL (Garis Animasi) */}
            <div className="absolute -left-12 lg:-left-16 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-4 z-40">
                <button 
                  onClick={() => handleScroll("prev")}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 bg-white shadow-md hover:bg-slate-900 hover:text-white transition-all duration-300 group"
                >
                  <ChevronUpIcon className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                </button>
                
                <div className="h-20 w-[1px] bg-slate-200 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-slate-900 -translate-y-full animate-scroll-line" />
                </div>

                <button 
                  onClick={() => handleScroll("next")}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 bg-white shadow-md hover:bg-slate-900 hover:text-white transition-all duration-300 group"
                >
                  <ChevronDownIcon className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                </button>
            </div>

            {/* CARD CONTENT */}
            <div 
              ref={cardRef} 
              className="bg-white p-10 md:p-14 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] rounded-3xl relative overflow-hidden"
            >
              <div className="flex items-center gap-3 mb-6">
                 <span className="text-slate-900 font-black tracking-[0.3em] text-[9px] uppercase">{displayLabel}</span>
              </div>

              <h2 className="font-['Playfair_Display'] text-3xl text-slate-900 font-bold mb-8 leading-tight tracking-tight">
                {displaySubtitle}
              </h2>
              
              {/* AREA DESKRIPSI DENGAN SOFT DEPTH BORDER */}
              <div className="relative group">
                {/* Border Indah: Menggunakan shadow-inner dan border sangat tipis agar teks terpisah dari background kartu */}
                <div 
                  className="absolute inset-0 -m-4 border border-slate-50 bg-slate-50/30 rounded-2xl shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] pointer-events-none transition-all duration-500 group-hover:bg-slate-50/50"
                />
                
                <div 
                  ref={scrollTextRef}
                  className="relative z-10 text-slate-500 text-base leading-relaxed font-light h-[180px] overflow-y-auto hide-scrollbar italic whitespace-pre-line px-2"
                >
                  {displayDescription}
                </div>

                {/* Indikator Gradasi di bagian bawah agar teks tidak terpotong kaku saat scroll */}
                <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-white/80 to-transparent pointer-events-none z-20" />
              </div>
            </div>

          </div>

        </div>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        @keyframes scroll-line {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-scroll-line {
          animation: scroll-line 2s infinite linear;
        }
      `}</style>
    </section>
  );
};

export default Layout10;