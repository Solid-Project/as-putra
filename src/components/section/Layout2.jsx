import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSectionAnimation } from "@/hooks/useSectionAnimation";

// IMPORT LOGO
import logoAsPutra from "@/assets/logo.jpg";     
import logoCounter from "@/assets/logo-teks-asli.png"; 

gsap.registerPlugin(ScrollTrigger);

const Layout2 = ({ data, isActive, index }) => {
  const sectionRef = useRef(null);
  const statsRef = useRef(null);
  const silhouetteLeftRef = useRef(null);
  const silhouetteRightRef = useRef(null);

  const orderId = data?.section_order || index;
  const layoutData = typeof data?.layout_data === 'string' 
    ? JSON.parse(data.layout_data) 
    : data?.layout_data;

  const counterValue = parseInt(layoutData?.angka_counter_tengah) || 0;
  const partners = layoutData?.items || [];
  const storageUrl = `${import.meta.env.VITE_API_URL}/storage`;

  const COLOR_NAVY = "#1D2B53";
  const COLOR_GOLD = "#FFC619";

  useEffect(() => {
    if (isActive && statsRef.current) {
      const cont = { val: 0 };
      statsRef.current.innerText = "0";
      gsap.to(cont, {
        val: counterValue,
        duration: 2.5,
        delay: 0.4,
        ease: "power2.out",
        onUpdate: () => {
          if (statsRef.current) {
            statsRef.current.innerText = Math.floor(cont.val);
          }
        }
      });
    }
  }, [isActive, counterValue]);

  useSectionAnimation(sectionRef, () => {
    ScrollTrigger.refresh();
    gsap.to(silhouetteLeftRef.current, {
      y: -60, rotate: -5,
      force3D: true,
      scrollTrigger: { trigger: sectionRef.current, scrub: 1 }
    });
    gsap.to(silhouetteRightRef.current, {
      y: 60, rotate: 5,
      force3D: true,
      scrollTrigger: { trigger: sectionRef.current, scrub: 1 }
    });
  }, [data]);

  return (
    <section
      ref={sectionRef}
      // OPTIMASI: Menggunakan px-4 di mobile, px-[10%] baru aktif di desktop. py disesuaikan.
      className="section relative min-h-screen flex items-start md:items-center py-12 md:py-24 px-4 sm:px-6 md:px-[10%] bg-[#FDFDFD] overflow-hidden"
      id={`section-${orderId}`} 
      data-theme="light"
    >
      {/* BACKGROUND SILUET LOGO */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <img 
          ref={silhouetteLeftRef}
          src={logoAsPutra} 
          loading="lazy"
          className="absolute -top-10 -left-10 w-[65vw] md:w-[55vw] opacity-[0.04] md:opacity-[0.06] object-contain"
        />
        <img 
          ref={silhouetteRightRef}
          src={logoAsPutra} 
          loading="lazy"
          className="absolute -bottom-10 -right-10 w-[55vw] md:w-[45vw] opacity-[0.03] md:opacity-[0.04] object-contain"
        />
      </div>

      {/* DEKORASI GARIS FRAME (Disesuaikan ketebalannya di mobile agar tidak makan tempat) */}
      <div className="absolute inset-0 pointer-events-none z-0 border-[16px] md:border-[40px] border-transparent">
        <div className="w-full h-full border border-slate-100/70 rounded-[2rem] md:rounded-[4rem] relative">
            <div className="absolute -top-[1px] -left-[1px] w-10 md:w-20 h-[2px]" style={{ backgroundColor: COLOR_GOLD }} />
            <div className="absolute -top-[1px] -left-[1px] w-[2px] h-10 md:h-20" style={{ backgroundColor: COLOR_GOLD }} />
        </div>
      </div>

      <div className="w-full relative z-10 pt-4 md:pt-0">
        {/* Kontainer Utama Grid */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 md:gap-12 lg:gap-20 items-start">
          
          {/* KOLOM 1: STORY */}
          <div className="w-full lg:col-span-4 pt-4 md:pt-12">
            <div className="flex items-center gap-3 mb-4 md:mb-8">
              <div className="h-[3px] md:h-[4px] w-8 md:w-12" style={{ backgroundColor: COLOR_GOLD }} />
              
            </div>
            <h2 className="font-['Playfair_Display'] text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 md:mb-10 font-black leading-[1.2] md:leading-[1.1] text-[#1D2B53]">
              {data?.title}
            </h2>
            <div 
              className="text-slate-500 text-sm md:text-lg leading-relaxed font-light mb-2 prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: data?.description }}
            />
          </div>

          {/* KOLOM 2: CENTER CARD (COUNTER) */}
          <div className="w-full lg:col-span-4 flex justify-center pt-2 md:pt-6">
            {/* OPTIMASI: Menggunakan md:max-w-[360px] dan penyesuaian border radius di mobile */}
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] aspect-[4/4.5] md:aspect-[4/5] bg-white rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_30px_60px_-15px_rgba(29,43,83,0.08)] md:shadow-[0_60px_120px_-20px_rgba(29,43,83,0.12)] border border-slate-50 flex flex-col items-center justify-center overflow-hidden p-6">
              <div className="absolute top-0 w-full h-1.5 md:h-2.5" style={{ backgroundColor: COLOR_GOLD }} />
              
              <div className="mb-3 md:mb-6 w-16 h-12 md:w-24 md:h-20 flex items-center justify-center">
                <img src={logoCounter} alt="Icon" loading="lazy" className="w-full h-full object-contain" />
              </div>
              
              <div className="flex items-start">
                {/* Font diturunkan dari 9rem ke 6rem di mobile agar tidak memotong box */}
                <div ref={statsRef} className="text-[6rem] sm:text-[7.5rem] md:text-[9rem] lg:text-[11rem] font-bold tracking-tighter leading-none font-['Playfair_Display'] text-[#1D2B53]">
                  0
                </div>
                <span className="text-3xl md:text-5xl font-black mt-2 md:mt-6" style={{ color: COLOR_GOLD }}>+</span>
              </div>
              
              <div className="px-4 md:px-10 text-slate-400 font-bold text-[8px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.6em] mt-2 md:mt-4 text-center leading-normal md:leading-loose">
                {data?.subtitle}
              </div>
            </div>
          </div>

          {/* KOLOM 3: PARTNERS */}
          <div className="w-full lg:col-span-4 pt-4 md:pt-12">
            <div className="flex items-center gap-3 mb-6 md:mb-10">
             
              <div className="h-[3px] md:h-[4px] w-8 md:w-12" style={{ backgroundColor: COLOR_GOLD }} />
            </div>
            
            {/* Grid Partner: Menggunakan p-4 dan h-20 di mobile agar lebih proporsional */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {partners.map((item, idx) => (
                <div key={idx} className="group h-20 md:h-28 flex items-center justify-center p-4 md:p-6 bg-white rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm transition-all duration-500">
                  <img 
                    src={`${storageUrl}/${item.image}`} 
                    loading="lazy"
                    className="max-w-full max-h-full object-contain filter grayscale-0 md:grayscale md:group-hover:grayscale-0 opacity-80 md:opacity-40 md:group-hover:opacity-100"
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Layout2;