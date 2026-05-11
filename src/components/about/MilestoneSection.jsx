import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import logoAsliUrl from "@/assets/logo.jpg"; // Pastikan path logo sudah benar

gsap.registerPlugin(ScrollTrigger);

const MilestoneSection = ({ data: initialData, activeIndex, index }) => {
  const [data, setData] = useState(initialData || null);
  const [loading, setLoading] = useState(!initialData);

  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const headerRef = useRef(null);
  const headerSubRef = useRef(null);
  const headerTitleRef = useRef(null);
  const cardsRef = useRef([]);
  const bgLogoRef = useRef(null);
  const silhouetteRefs = useRef([]);

  const isActive = activeIndex === index;

  useEffect(() => {
    if (!initialData) {
      const fetchTimeline = async () => {
        try {
          const baseUrl = import.meta.env.VITE_API_URL;
          const response = await axios.get(`${baseUrl}/sections/history`); 
          setData(response.data);
        } catch (error) {
          console.error("Error fetching timeline:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchTimeline();
    }
  }, [initialData]);

  // Animasi siluet saat scroll
  useEffect(() => {
    if (!isActive || !data) return;

    const ctx = gsap.context(() => {
      silhouetteRefs.current.forEach((el, i) => {
        if (!el) return;
        
        // Animasi siluet bergerak pelan saat scroll
        gsap.fromTo(el,
          { 
            opacity: 0,
            x: i % 2 === 0 ? -30 : 30,
            y: i % 3 === 0 ? -20 : 20,
            rotation: i % 2 === 0 ? -5 : 5
          },
          {
            opacity: 0.06,
            x: 0,
            y: 0,
            rotation: 0,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            }
          }
        );

        // Animasi tambahan: floating lembut
        gsap.to(el, {
          y: i % 2 === 0 ? 15 : -15,
          x: i % 3 === 0 ? 8 : -8,
          rotation: i % 2 === 0 ? 3 : -3,
          duration: 4 + (i % 3),
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: i * 0.2
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isActive, data]);

  useEffect(() => {
    if (!isActive || !data) return;

    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean);

      // Initial State
      gsap.set(cards, { opacity: 0, x: (i) => (i % 2 === 0 ? -40 : 40) });
      gsap.set(lineRef.current, { scaleY: 0, transformOrigin: "top center" });
      gsap.set([headerRef.current, headerSubRef.current, headerTitleRef.current], { opacity: 0, y: 30 });
      gsap.set(bgLogoRef.current, { opacity: 0, scale: 0.8, rotate: -10 });

      const tl = gsap.timeline();

      tl.to(bgLogoRef.current, {
        opacity: 0.04,
        scale: 1,
        rotate: 0,
        duration: 1.5,
        ease: "power2.out"
      })
      .to([headerRef.current, headerSubRef.current, headerTitleRef.current], {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      }, "-=1")
      .to(lineRef.current, {
        scaleY: 1,
        duration: 1,
        ease: "power2.inOut",
      }, "-=0.5")
      .to(cards, {
        opacity: 1,
        x: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "back.out(1.2)",
      }, "-=0.7");
    }, sectionRef);

    return () => ctx.revert();
  }, [isActive, data]);

  if (loading || !data) return null;

  // Komponen siluet garis (line art) terinspirasi bentuk logo
  const LineSilhouette = ({ className, delay = 0 }) => (
    <div 
      ref={el => silhouetteRefs.current.push(el)}
      className={`absolute pointer-events-none z-0 ${className}`}
      style={{ opacity: 0 }}
    >
      <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Garis dinamis terinspirasi bentuk logo */}
        <path d="M100 20 L120 60 L160 70 L130 100 L140 140 L100 120 L60 140 L70 100 L40 70 L80 60 L100 20Z" 
          stroke="#1D2B53" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M100 40 L115 70 L145 78 L120 102 L128 132 L100 115 L72 132 L80 102 L55 78 L85 70 L100 40Z" 
          stroke="#1D2B53" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
        <circle cx="100" cy="80" r="18" stroke="#1D2B53" strokeWidth="1" fill="none"/>
        <path d="M100 65 L100 95" stroke="#1D2B53" strokeWidth="1" strokeLinecap="round"/>
        <path d="M85 80 L115 80" stroke="#1D2B53" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    </div>
  );

  const AbstractLineSilhouette = ({ className, variant = 1 }) => (
    <div 
      ref={el => silhouetteRefs.current.push(el)}
      className={`absolute pointer-events-none z-0 ${className}`}
      style={{ opacity: 0 }}
    >
      <svg width="100%" height="100%" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        {variant === 1 && (
          <>
            <path d="M50 150 Q100 50 150 150 T250 150" stroke="#1D2B53" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <path d="M60 170 Q110 90 160 170 T240 170" stroke="#1D2B53" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5"/>
            <path d="M70 190 Q120 130 170 190 T230 190" stroke="#1D2B53" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.3"/>
          </>
        )}
        {variant === 2 && (
          <>
            <path d="M150 40 L180 100 L250 120 L200 170 L210 240 L150 200 L90 240 L100 170 L50 120 L120 100 L150 40Z" 
              stroke="#1D2B53" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
            <path d="M150 70 L170 110 L215 125 L185 160 L192 210 L150 185 L108 210 L115 160 L85 125 L130 110 L150 70Z" 
              stroke="#1D2B53" strokeWidth="1" fill="none" strokeLinejoin="round" opacity="0.5"/>
          </>
        )}
        {variant === 3 && (
          <>
            <path d="M40 150 C40 100 80 60 130 60 C180 60 220 100 220 150 C220 200 180 240 130 240 C80 240 40 200 40 150Z" 
              stroke="#1D2B53" strokeWidth="1.5" fill="none"/>
            <path d="M70 150 C70 115 100 90 135 90 C170 90 200 115 200 150 C200 185 170 210 135 210 C100 210 70 185 70 150Z" 
              stroke="#1D2B53" strokeWidth="1" fill="none" opacity="0.5"/>
            <path d="M100 150 C100 130 115 115 135 115 C155 115 170 130 170 150 C170 170 155 185 135 185 C115 185 100 170 100 150Z" 
              stroke="#1D2B53" strokeWidth="0.8" fill="none" opacity="0.3"/>
          </>
        )}
      </svg>
    </div>
  );

  const DiagonalLineSilhouette = ({ className }) => (
    <div 
      ref={el => silhouetteRefs.current.push(el)}
      className={`absolute pointer-events-none z-0 ${className}`}
      style={{ opacity: 0 }}
    >
      <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="20" y1="380" x2="380" y2="20" stroke="#1D2B53" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="50" y1="380" x2="380" y2="50" stroke="#1D2B53" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
        <line x1="80" y1="380" x2="380" y2="80" stroke="#1D2B53" strokeWidth="0.8" strokeLinecap="round" opacity="0.3"/>
        <line x1="20" y1="350" x2="350" y2="20" stroke="#1D2B53" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
        <line x1="20" y1="320" x2="320" y2="20" stroke="#1D2B53" strokeWidth="0.8" strokeLinecap="round" opacity="0.3"/>
      </svg>
    </div>
  );

  const WaveLineSilhouette = ({ className }) => (
    <div 
      ref={el => silhouetteRefs.current.push(el)}
      className={`absolute pointer-events-none z-0 ${className}`}
      style={{ opacity: 0 }}
    >
      <svg width="100%" height="100%" viewBox="0 0 500 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 100 Q50 40 100 100 T200 100 T300 100 T400 100 T500 100" 
          stroke="#1D2B53" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M0 120 Q50 60 100 120 T200 120 T300 120 T400 120 T500 120" 
          stroke="#1D2B53" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5"/>
        <path d="M0 80 Q50 20 100 80 T200 80 T300 80 T400 80 T500 80" 
          stroke="#1D2B53" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5"/>
        <path d="M0 140 Q50 80 100 140 T200 140 T300 140 T400 140 T500 140" 
          stroke="#1D2B53" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.3"/>
      </svg>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className="section no-snap relative overflow-hidden"
      id={`section-${index}`}
      style={{
        backgroundColor: "#FDFDFD",
        minHeight: "100vh",
        height: "auto",
        padding: "clamp(4rem, 10vh, 7rem) clamp(1rem, 5vw, 2rem)",
      }}
    >
      {/* --- SILHOUETTE LINE ART (tersebar di berbagai posisi) --- */}
      
      {/* Siluet bentuk bintang/logo di pojok kiri atas */}
      <LineSilhouette className="top-[5%] left-[3%] w-40 h-40" />
      
      {/* Siluet bentuk bintang/logo di pojok kanan bawah */}
      <LineSilhouette className="bottom-[8%] right-[2%] w-48 h-48" />
      
      {/* Siluet abstrak variant 1 - tengah kiri */}
      <AbstractLineSilhouette variant={1} className="top-1/3 left-[2%] w-56 h-56" />
      
      {/* Siluet abstrak variant 2 - tengah kanan */}
      <AbstractLineSilhouette variant={2} className="bottom-1/4 right-[5%] w-64 h-64" />
      
      {/* Siluet abstrak variant 3 - di dekat header */}
      <AbstractLineSilhouette variant={3} className="top-[18%] right-[8%] w-44 h-44" />
      
      {/* Siluet garis diagonal - pojok kiri bawah */}
      <DiagonalLineSilhouette className="bottom-[3%] left-[5%] w-72 h-48" />
      
      {/* Siluet garis diagonal - pojok kanan atas */}
      <DiagonalLineSilhouette className="top-[8%] right-[10%] w-60 h-40" />
      
      {/* Siluet garis gelombang - bawah tengah */}
      <WaveLineSilhouette className="bottom-[2%] left-1/2 transform -translate-x-1/2 w-[80%] h-32" />
      
      {/* Siluet garis gelombang - atas tengah (lebih kecil) */}
      <WaveLineSilhouette className="top-[12%] left-1/2 transform -translate-x-1/2 w-96 h-20 opacity-50" />

      {/* Siluet garis sederhana - menyebar */}
      <div ref={el => silhouetteRefs.current.push(el)} className="absolute top-[30%] right-[15%] w-32 h-32 opacity-0 pointer-events-none z-0">
        <svg viewBox="0 0 100 100" fill="none">
          <line x1="10" y1="50" x2="90" y2="50" stroke="#1D2B53" strokeWidth="1" strokeLinecap="round"/>
          <line x1="50" y1="10" x2="50" y2="90" stroke="#1D2B53" strokeWidth="1" strokeLinecap="round"/>
          <line x1="30" y1="30" x2="70" y2="70" stroke="#1D2B53" strokeWidth="0.8" strokeLinecap="round"/>
          <line x1="70" y1="30" x2="30" y2="70" stroke="#1D2B53" strokeWidth="0.8" strokeLinecap="round"/>
        </svg>
      </div>

      <div ref={el => silhouetteRefs.current.push(el)} className="absolute bottom-[20%] left-[10%] w-24 h-24 opacity-0 pointer-events-none z-0">
        <svg viewBox="0 0 80 80" fill="none">
          <path d="M40 10 L45 35 L70 40 L45 45 L40 70 L35 45 L10 40 L35 35 L40 10Z" 
            stroke="#1D2B53" strokeWidth="1" fill="none"/>
        </svg>
      </div>

      <div ref={el => silhouetteRefs.current.push(el)} className="absolute top-[60%] left-[20%] w-20 h-20 opacity-0 pointer-events-none z-0">
        <svg viewBox="0 0 60 60" fill="none">
          <circle cx="30" cy="30" r="15" stroke="#1D2B53" strokeWidth="1" fill="none"/>
          <circle cx="30" cy="30" r="8" stroke="#1D2B53" strokeWidth="0.8" fill="none"/>
        </svg>
      </div>

      {/* --- BACKGROUND ACCENTS (existing) --- */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Large Watermark Logo */}
        <div 
          ref={bgLogoRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[700px] opacity-[0.04] grayscale"
        >
          <img src={logoAsliUrl} alt="" className="w-full h-auto" />
        </div>

        {/* Geometric Shapes (Floating) */}
        <div className="absolute top-20 right-[10%] w-32 h-32 border border-[var(--color-utama)] opacity-5 rotate-12" />
        <div className="absolute bottom-40 left-[5%] w-24 h-24 rounded-full border border-[var(--color-aksen)] opacity-5" />
        
        {/* Glow Orbs */}
        <div className="absolute top-[-10%] left-[-5%] w-[40vw] h-[40vw] rounded-full blur-[120px] opacity-10" style={{ backgroundColor: "var(--color-utama)" }} />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto">
        {/* --- HEADER SECTION --- */}
        <div ref={headerRef} className="text-center mb-16 lg:mb-24">
          <div ref={headerSubRef} className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[2px] bg-[var(--color-utama)] w-12 rounded-full" />
            <span className="font-black tracking-[0.3em] uppercase text-[10px] md:text-xs text-[var(--color-utama)]">
              {data.subtitle || "Our Journey"}
            </span>
            <div className="h-[2px] bg-[var(--color-utama)] w-12 rounded-full" />
          </div>
          <h2 ref={headerTitleRef} className="font-['Playfair_Display'] font-extrabold text-[clamp(2rem,6vw,3.5rem)] text-[var(--color-teks)] mb-6">
            {data.title}
          </h2>
          <p className="max-w-[700px] mx-auto text-gray-500 font-medium text-sm md:text-base leading-relaxed italic border-l-2 border-[var(--color-aksen)] pl-4 inline-block">
            {data.description}
          </p>
        </div>

        {/* --- TIMELINE BODY --- */}
        <div className="relative max-w-[1000px] mx-auto pb-20">
          {/* Vertical Line Gradient */}
          <div 
            ref={lineRef} 
            className="absolute left-1/2 -translate-x-1/2 w-[2px] top-0 bottom-0 hidden md:block" 
            style={{ 
                background: `linear-gradient(to bottom, transparent, var(--color-utama) 15%, var(--color-utama) 85%, transparent)`
            }}
          />

          {data.layout_data?.map((item, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <div
                key={idx}
                ref={(el) => (cardsRef.current[idx] = el)}
                className={`timeline-card relative md:w-1/2 px-4 md:px-14 mb-10 md:mb-16 ${
                  isLeft ? "md:left-0 md:text-right" : "md:left-1/2 md:text-left"
                }`}
              >
                {/* Connector Dot */}
                <div className={`hidden md:flex absolute top-6 items-center justify-center w-6 h-6 z-10 ${isLeft ? "right-[-12px]" : "left-[-12px]"}`}>
                    <div className="absolute inset-0 rounded-full bg-[var(--color-utama)] opacity-20 animate-ping" />
                    <div className="w-4 h-4 rounded-full bg-white border-[3px] border-[var(--color-utama)] shadow-md relative z-10" />
                </div>

                {/* --- CARD CONTENT (GLASS) --- */}
                <div 
                  className="group relative rounded-3xl p-6 md:p-8 transition-all duration-500 hover:-translate-y-2"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.65)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255, 255, 255, 0.9)",
                    boxShadow: "0 15px 35px -15px rgba(0,0,0,0.06)"
                  }}
                >
                  {/* Hover Accent Side Line */}
                  <div className={`absolute top-0 bottom-0 w-1 transition-all duration-500 bg-[var(--color-utama)] opacity-0 group-hover:opacity-100 ${isLeft ? "right-0" : "left-0"}`} />

                  {/* Year & Icon */}
                  <div className={`flex items-center gap-3 mb-4 ${isLeft ? "md:flex-row-reverse" : "flex-row"}`}>
                    <div className="px-5 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] bg-[#1D2B53] text-[#FFC619] shadow-xl">
                      {item.timelineYear}
                    </div>
                    <div className="h-[2px] flex-grow bg-gray-100 group-hover:bg-[var(--color-utama)]/20 transition-colors" />
                  </div>

                  <h3 className="font-bold mb-3 text-[var(--color-teks)] text-xl lg:text-2xl font-['Playfair_Display']">
                    {item.timelineTitle}
                  </h3>
                  
                  <p className="leading-relaxed text-gray-500 text-sm md:text-[0.9rem] font-medium">
                    {item.timelineDescription}
                  </p>

                  {/* Footer Decorative Dot */}
                  <div className={`mt-5 flex ${isLeft ? "justify-start" : "justify-end"}`}>
                    <div className="w-2 h-2 rounded-full opacity-20 bg-[var(--color-utama)]" />
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

export default MilestoneSection;