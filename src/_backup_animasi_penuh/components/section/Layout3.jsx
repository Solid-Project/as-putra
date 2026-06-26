import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

gsap.registerPlugin(ScrollTrigger);

const Layout3 = ({ data, isActive, index }) => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const bgRef = useRef(null);
  const [activePage, setActivePage] = useState(0);

  const displayTitle = data?.title || "Sektor Bisnis";
  const displayImage = data?.image ? `${import.meta.env.VITE_API_URL}/storage/${data.image}` : ""; 
  const layoutData = typeof data?.layout_data === 'string' ? JSON.parse(data.layout_data) : data?.layout_data;
  const points = layoutData?.points || [];
  
  const itemsPerPage = 2; 
  const totalPages = Math.ceil(points.length / itemsPerPage);
  const currentPoints = points.slice(activePage * itemsPerPage, (activePage * itemsPerPage) + itemsPerPage);

  const handleNext = () => { if (activePage < totalPages - 1) setActivePage(activePage + 1); };
  const handlePrev = () => { if (activePage > 0) setActivePage(activePage - 1); };

  useEffect(() => {
    ScrollTrigger.refresh();
    let ctx = gsap.context(() => {
      gsap.fromTo(bgRef.current, { scale: 1.2, y: "-8%" }, {
        scale: 1.1, y: "8%", ease: "none",
        scrollTrigger: { trigger: sectionRef.current, scrub: true }
      });
      if (isActive) {
        gsap.fromTo(cardRef.current, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 1, ease: "power3.out" });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, [isActive, data]);

  return (
    <section ref={sectionRef} className="section relative h-screen w-full overflow-hidden flex flex-col justify-center" 
    id={`section-${index}`} 
    data-theme="dark">
      {/* 1. BACKGROUND */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {displayImage && <img ref={bgRef} src={displayImage} className="w-full h-[116%] object-cover opacity-45" alt="" />}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F1A3E] via-[#0F1A3E]/70 to-transparent" />
      </div>

      {/* 2. WRAPPER POSISI KIRI */}
      <div className="w-full z-10 px-10 lg:px-24">
        {/* CARD - MIN-H UNTUK KONSISTENSI, MAX-H UNTUK KEAMANAN LAYAR */}
        <div ref={cardRef} className="bg-white w-full max-w-[440px] min-h-[480px] h-fit max-h-[80vh] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] relative rounded-sm flex flex-col overflow-hidden">
          <div className="p-8 lg:p-12 flex flex-col h-full overflow-hidden">
            
            {/* HEADER */}
            <div className="flex-none mb-6">
              <div className="flex items-center gap-2 mb-2">
                 <div className="h-[2px] w-6 bg-[#FFC619]" />
               
              </div>
              <h2 className="font-['Playfair_Display'] font-bold text-3xl lg:text-4xl text-[#1D2B53] leading-tight">{displayTitle}</h2>
              <div className="h-[1px] w-full bg-slate-50 mt-6" />
            </div>

            {/* CONTENT AREA - FIT KE FOOTER JIKA TEKS PENDEK */}
            <div className="flex-grow space-y-6 mb-6 overflow-y-auto pr-2 custom-scroll">
              {currentPoints.map((p, i) => (
                <div key={i} className="animate-fadeIn" style={{ animationDelay: `${i * 0.1}s` }}>
                  <span className="font-black block mb-2 tracking-[0.15em] text-[10px] uppercase text-[#1D2B53]">{p.title}</span>
                  <p className="font-light text-slate-500 text-sm lg:text-[14px] leading-relaxed border-l-2 border-[#FFC619]/50 pl-4">{p.description}</p>
                </div>
              ))}
            </div>

            {/* FOOTER */}
            <div className="flex-none flex items-center justify-between pt-6 border-t border-slate-50 mt-auto">
              <div className="flex items-center gap-5">
                <button onClick={handlePrev} disabled={activePage === 0} className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${activePage === 0 ? 'opacity-10' : 'hover:text-[#FFC619]'}`} style={{ color: "#1D2B53" }}>
                  <ChevronLeftIcon className="w-3 h-3 stroke-[3]" /> Prev
                </button>
                <div className="w-[1px] h-3 bg-slate-200" />
                <button onClick={handleNext} disabled={activePage === totalPages - 1} className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${activePage === totalPages - 1 ? 'opacity-10' : 'hover:text-[#FFC619]'}`} style={{ color: "#1D2B53" }}>
                  Next <ChevronRightIcon className="w-3 h-3 stroke-[3]" />
                </button>
              </div>
              {totalPages > 1 && (
                <div className="flex gap-1.5">
                  {[...Array(totalPages)].map((_, i) => (
                    <div key={i} className={`h-[3px] transition-all duration-500 rounded-full ${activePage === i ? "w-6 bg-[#FFC619]" : "w-1.5 bg-slate-200"}`} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } } 
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
        .custom-scroll::-webkit-scrollbar { width: 3px; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #FFC619; border-radius: 10px; }
      `}</style>
    </section>
  );
};

export default Layout3;