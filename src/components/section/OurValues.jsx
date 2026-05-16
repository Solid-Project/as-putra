import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const OurValues = ({ data, activeIndex, index }) => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const headerRef = useRef(null);
  const bgLogoRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  const isActive = activeIndex === index;
  const COLOR_NAVY = "#1D2B53";
  const COLOR_GOLD = "#FFC619";

  const valueItems = data?.layout_data?.cards || [];
  const logoAsliUrl = "/path-to-your-logo.png"; 

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
      className="relative w-full min-h-screen md:h-screen flex flex-col bg-white overflow-hidden px-4 sm:px-6 md:px-8 lg:px-[5%]"
      id={`section-${index}`}
      data-theme="light"
      data-title="Our Values"
    >
      {/* BACKGROUND ACCENTS */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div ref={bgLogoRef} className="absolute top-1/4 md:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[250px] md:max-w-[800px] opacity-[0.03]">
          <img src={logoAsliUrl} alt="" className="w-full h-auto grayscale" />
        </div>
      </div>

      {/* 
        PERUBAHAN UTAMA: 
        - `justify-start md:justify-center`: Di mobile mulai dari atas, di desktop tetap di tengah layar.
        - `pt-12 pb-8 md:py-6`: Memberikan sedikit padding atas di mobile agar tidak terlalu mepet ke notch/screen atas, sisanya mengalir ke bawah.
      */}
      <div className="relative z-10 w-full h-full flex flex-col justify-start md:justify-center pt-12 pb-8 md:py-6 md:my-auto">
        
        {/* HEADER */}
        <div ref={headerRef} className="mb-5 md:mb-8 lg:mb-10 text-left">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-6 md:w-10 h-0.5" style={{ backgroundColor: COLOR_GOLD }} />
            <span className="font-black tracking-[0.25em] uppercase text-[8px] md:text-[10px]" style={{ color: COLOR_NAVY }}>
              {data.subtitle || "CORE VALUES"}
            </span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 md:gap-4">
            <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-['Playfair_Display'] font-extrabold text-[#1D2B53] leading-tight">
              Principles Of Our <span style={{ color: COLOR_GOLD }}>Growth</span>
            </h2>
            
            <div className="max-w-2xl border-l-2 pl-2 md:pl-4 mb-0.5" style={{ borderColor: COLOR_GOLD }}>
                <p className="text-gray-500 text-[10px] md:text-sm font-medium leading-relaxed whitespace-normal break-words">
                  {data.description}
                </p>
            </div>
          </div>
        </div>

        {/* CARDS GRID (Mobile: 2 Kolom, otomatis nambah ke bawah kalau banyak card) */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5 sm:gap-4 lg:gap-5">
          {valueItems.map((item, idx) => {
            const imageSrc = `${import.meta.env.VITE_API_URL}/storage/${item.image}`;

            return (
              <div
                key={item.id || idx}
                ref={(el) => (cardsRef.current[idx] = el)}
                className="group relative bg-white rounded-[1rem] md:rounded-[1.5rem] shadow-sm md:shadow-lg border border-gray-100 flex flex-col overflow-hidden transition-all duration-500 md:hover:-translate-y-2 md:hover:shadow-xl"
                style={{ 
                  height: window.innerWidth >= 1024 ? "clamp(320px, 48vh, 450px)" : window.innerWidth >= 768 ? "360px" : "auto" 
                }}
              >
                {/* IMAGE AREA */}
                <div className="relative h-[80px] sm:h-[120px] md:h-[40%] overflow-hidden flex-shrink-0">
                  <div className="absolute inset-0 bg-[#1D2B53]/20 md:bg-[#1D2B53]/30 md:group-hover:bg-transparent z-10 transition-colors duration-500" />
                  <img 
                    src={imageSrc} 
                    alt={item.title}
                    className="w-full h-full object-cover md:grayscale md:group-hover:grayscale-0 transition-transform duration-700 md:group-hover:scale-110"
                    onError={(e) => { 
                      e.target.src = logoAsliUrl; 
                      e.target.className = "w-full h-full object-contain p-2 opacity-20"; 
                    }}
                  />
                  <div className="absolute bottom-1.5 left-1.5 md:bottom-3 md:left-3 z-20 bg-[#1D2B53] text-[#FFC619] w-5 h-5 md:w-7 md:h-7 rounded md:rounded-md flex items-center justify-center font-black text-[8px] md:text-[9px]">
                    0{idx + 1}
                  </div>
                </div>

                {/* TEXT AREA */}
                <div className="p-3 md:p-5 flex flex-col justify-between flex-1 bg-white">
                  <div className="mb-2">
                    <h4 className="text-[11px] md:text-sm lg:text-base font-black mb-1 leading-tight uppercase tracking-tight" style={{ color: COLOR_NAVY }}>
                      {item.title}
                    </h4>
                    
                    <p className="text-[10px] md:text-xs text-gray-500 leading-normal md:leading-relaxed font-medium break-words whitespace-normal line-clamp-4 md:line-clamp-none">
                      {item.description}
                    </p>
                  </div>

                  {/* Footer Card Decor (Hidden on mobile) */}
                  <div className="hidden md:flex pt-3 items-center justify-between mt-auto">
                    <div className="h-[1.5px] rounded-full bg-gray-100 flex-grow mr-3 overflow-hidden">
                      <div 
                        className="h-full transition-all duration-1000 w-0 md:group-hover:w-full" 
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