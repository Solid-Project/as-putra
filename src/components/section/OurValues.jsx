import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import logoAsliUrl from "@/assets/logo.jpg"; 

const OurValues = ({ data, activeIndex, index }) => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const headerRef = useRef(null);
  const bgLogoRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  const isActive = activeIndex === index;
  const COLOR_NAVY = "#1D2B53";
  const COLOR_GOLD = "#FFC619";

  // Ambil array cards dari layout_data
  const valueItems = data?.layout_data?.cards || [];

  useEffect(() => {
    if (!sectionRef.current || !data) return;
    
    const cards = cardsRef.current.slice(0, valueItems.length).filter(Boolean);

    if (!isActive) {
      gsap.set([headerRef.current, ...cards, bgLogoRef.current], { clearProps: "all" });
      hasAnimatedRef.current = false;
      return;
    }

    if (hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    const tl = gsap.timeline();
    
    tl.fromTo(bgLogoRef.current, 
      { opacity: 0, scale: 1.2, rotate: 0 },
      { opacity: 0.04, scale: 1.1, rotate: -12, duration: 2, ease: "power2.out" }
    );

    tl.fromTo(headerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      "-=1.5"
    ).fromTo(cards,
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.6, ease: "power2.out" },
      "-=0.4"
    );
  }, [isActive, data, valueItems]);

  if (!data) return null;

  return (
    <section
      ref={sectionRef}
      /* PERBAIKAN: Padding disamakan dengan Navbar */
      className="relative w-full h-[100vh] flex flex-col bg-white overflow-hidden px-4 sm:px-6 md:px-8 lg:px-[5%]"
      id={`section-${index}`}
      data-theme="light"
      data-title="Our Values"
    >
      {/* BACKGROUND ACCENTS */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div ref={bgLogoRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] opacity-[0.04]">
          <img src={logoAsliUrl} alt="" className="w-full h-auto grayscale" />
        </div>
        <div className="absolute top-0 right-[15%] w-[100px] h-full bg-gradient-to-b from-[#1D2B53]/5 via-transparent to-transparent -rotate-12" />
      </div>
      <div className="relative z-10 w-full h-full flex flex-col justify-center py-6">
        
        {/* HEADER */}
        <div ref={headerRef} className="mb-8 lg:mb-10 text-left">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-0.5" style={{ backgroundColor: COLOR_GOLD }} />
            <span className="font-black tracking-[0.3em] uppercase text-[9px] md:text-[10px]" style={{ color: COLOR_NAVY }}>
              {data.subtitle || "CORE VALUES"}
            </span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-['Playfair_Display'] font-extrabold text-[#1D2B53] leading-tight">
              Principles Of Our <span style={{ color: COLOR_GOLD }}>Growth</span>
            </h2>
            <div className="max-w-md border-l-2 pl-4 mb-1" style={{ borderColor: COLOR_GOLD }}>
                <p className="text-gray-500 text-xs md:text-sm font-medium leading-relaxed">
                {data.description}
                </p>
            </div>
          </div>
        </div>

        {/* CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5 flex-none">
          {valueItems.map((item, idx) => {
            const imageSrc = `${import.meta.env.VITE_API_URL}/storage/${item.image}`;

            return (
              <div
                key={item.id || idx}
                ref={(el) => (cardsRef.current[idx] = el)}
                className="group relative bg-white rounded-[1.5rem] shadow-lg border border-gray-100 flex flex-col overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
                style={{ height: "clamp(300px, 50vh, 420px)" }}
              >
                {/* IMAGE AREA */}
                <div className="relative h-[40%] overflow-hidden">
                  <div className="absolute inset-0 bg-[#1D2B53]/30 group-hover:bg-transparent z-10 transition-colors duration-500" />
                  <img 
                    src={imageSrc} 
                    alt={item.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => { e.target.src = logoAsliUrl; e.target.className = "w-full h-full object-contain p-4 opacity-20"; }}
                  />
                  <div className="absolute bottom-3 left-3 z-20 bg-[#1D2B53] text-[#FFC619] w-7 h-7 rounded-md flex items-center justify-center font-black text-[9px]">
                    0{idx + 1}
                  </div>
                </div>

                {/* TEXT AREA */}
                <div className="p-5 flex flex-col justify-between flex-1 bg-white">
                  <div>
                    <h4 className="text-sm md:text-base font-black mb-2 leading-tight uppercase tracking-tight" style={{ color: COLOR_NAVY }}>
                      {item.title}
                    </h4>
                    <p className="text-[11px] md:text-xs text-gray-500 leading-relaxed font-medium line-clamp-4 lg:line-clamp-5">
                      {item.description}
                    </p>
                  </div>

                  {/* Footer Card Decor */}
                  <div className="pt-3 flex items-center justify-between">
                    <div className="h-[1.5px] rounded-full bg-gray-100 flex-grow mr-3 overflow-hidden">
                      <div 
                        className="h-full transition-all duration-1000 w-0 group-hover:w-full" 
                        style={{ backgroundColor: COLOR_GOLD }} 
                      />
                    </div>
                    <div className="w-1 h-1 rounded-full" style={{ backgroundColor: COLOR_NAVY }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurValues;