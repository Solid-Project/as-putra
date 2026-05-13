import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

  useEffect(() => {
    ScrollTrigger.refresh();
    let ctx = gsap.context(() => {
      gsap.to(silhouetteLeftRef.current, {
        y: -60, rotate: -5,
        scrollTrigger: { trigger: sectionRef.current, scrub: 1 }
      });
      gsap.to(silhouetteRightRef.current, {
        y: 60, rotate: 5,
        scrollTrigger: { trigger: sectionRef.current, scrub: 1 }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [data]);

  return (
    <section
      ref={sectionRef}
      className="section relative min-h-screen flex items-center py-24 px-[10%] bg-[#FDFDFD] overflow-hidden"
      id={`section-${orderId}`} 
    >
      {/* BACKGROUND SILUET LOGO - Warna Asli, Tetap Berani */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <img 
          ref={silhouetteLeftRef}
          src={logoAsPutra} 
          className="absolute -top-20 -left-20 w-[55vw] opacity-[0.06] object-contain grayscale-0"
        />
        <img 
          ref={silhouetteRightRef}
          src={logoAsPutra} 
          className="absolute -bottom-20 -right-20 w-[45vw] opacity-[0.04] grayscale-0 object-contain"
        />
      </div>

      {/* DEKORASI GARIS FRAME (PENGGANTI WATERMARK) */}
      <div className="absolute inset-0 pointer-events-none z-0 border-[40px] border-transparent">
        <div className="w-full h-full border border-slate-100/50 rounded-[4rem] relative">
            {/* Aksen Sudut Emas */}
            <div className="absolute -top-[1px] -left-[1px] w-20 h-[2px]" style={{ backgroundColor: COLOR_GOLD }} />
            <div className="absolute -top-[1px] -left-[1px] w-[2px] h-20" style={{ backgroundColor: COLOR_GOLD }} />
        </div>
      </div>

      <div className="w-full relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* KOLOM 1: STORY */}
          <div className="lg:col-span-4 pt-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[4px] w-12" style={{ backgroundColor: COLOR_GOLD }} />
              <span className="text-[11px] font-black tracking-[0.4em] uppercase text-slate-400">
                The Heritage
              </span>
            </div>
            <h2 className="font-['Playfair_Display'] text-4xl lg:text-5xl mb-10 font-black leading-[1.1] text-[#1D2B53]">
              {data?.title}
            </h2>
            <div 
              className="text-slate-500 text-lg leading-relaxed font-light mb-8"
              dangerouslySetInnerHTML={{ __html: data?.description }}
            />
            {/* Small Detail Sejajar Teks */}
            <div className="h-[1px] w-full bg-slate-100 mb-6" />
            <div className="flex justify-between items-center text-[9px] font-bold text-slate-300 tracking-[0.3em] uppercase">
                <span>Business Unit {orderId}</span>
                <span>Established Excellence</span>
            </div>
          </div>

          {/* KOLOM 2: CENTER CARD */}
          <div className="lg:col-span-4 flex justify-center pt-6">
            <div className="relative w-full max-w-[360px] aspect-[4/5] bg-white rounded-[3.5rem] shadow-[0_60px_120px_-20px_rgba(29,43,83,0.12)] border border-slate-50 flex flex-col items-center justify-center overflow-hidden">
              <div className="absolute top-0 w-full h-2.5" style={{ backgroundColor: COLOR_GOLD }} />
              
              <div className="mb-6 w-24 h-20 flex items-center justify-center">
                <img src={logoCounter} alt="Icon" className="w-full h-full object-contain" />
              </div>
              
              <div className="flex items-start">
                <div ref={statsRef} className="text-[9rem] lg:text-[11rem] font-bold tracking-tighter leading-none font-['Playfair_Display'] text-[#1D2B53]">
                  0
                </div>
                <span className="text-5xl font-black mt-6" style={{ color: COLOR_GOLD }}>+</span>
              </div>
              
              <div className="px-10 text-slate-400 font-bold text-[10px] uppercase tracking-[0.6em] mt-4 text-center leading-loose">
                {data?.subtitle}
              </div>
            </div>
          </div>

          {/* KOLOM 3: PARTNERS */}
          <div className="lg:col-span-4 pt-12">
            <div className="flex items-center gap-4 mb-10">
              <span className="text-[11px] font-black tracking-[0.5em] uppercase text-slate-400">
                Strategic Partners
              </span>
              <div className="h-[4px] w-12" style={{ backgroundColor: COLOR_GOLD }} />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {partners.map((item, idx) => (
                <div key={idx} className="group h-28 flex items-center justify-center p-6 bg-white rounded-3xl border border-slate-100 shadow-sm transition-all duration-500">
                  <img 
                    src={`${storageUrl}/${item.image}`} 
                    className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-100"
                  />
                </div>
              ))}
            </div>

            <div className="mt-12 text-center lg:text-left">
                <p className="text-[10px] text-slate-300 font-bold uppercase tracking-[0.3em] leading-loose">
                    © AS Putra Group <br/> Collaboration for the nation
                </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Layout2;