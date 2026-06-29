import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useSectionAnimation } from "@/hooks/useSectionAnimation";

// Import 2 Logo
import logoAsliUrl from "@/assets/logo-teks-asli.png";
import logoVarianUrl from "@/assets/logo.jpg";

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
  const scatteredLogosRef = useRef([]);
  const backgroundLinesRef = useRef(null);

  const isActive = activeIndex === index;

  // Generate 20 data posisi acak dengan ukuran yang lebih besar dan opacity lebih tajam
  const scatteredPositions = useRef([...Array(20)].map(() => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    rotation: Math.random() * 360,
    scale: 0.6 + Math.random() * 0.7, // Skala diperbesar
    opacity: 0.08 + Math.random() * 0.07 // Opacity ditingkatkan agar lebih tajam
  })));

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

  useSectionAnimation(sectionRef, () => {
    if (!data) return;

    // 1. ANIMASI CARD MUNCUL PER SATU SAAT SCROLL
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(card,
        { opacity: 0, y: 60, x: i % 2 === 0 ? -40 : 40 },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // 2. PARALLAX UNTUK 20 LOGO VARIAN (Lebih Dinamis)
    scatteredLogosRef.current.forEach((logo, i) => {
      if (!logo) return;
      const speed = (i % 5 + 1) * 60;
      gsap.to(logo, {
        y: -speed * 2.5,
        rotation: "+=30",
        force3D: true,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        }
      });
    });

    // 3. ANIMASI LINE CENTRAL TIMELINE
    gsap.fromTo(lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        transformOrigin: "top",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 30%",
          end: "bottom 70%",
          scrub: true
        }
      }
    );

  }, [data]);

  if (loading || !data) return null;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      id={`section-${index}`}
      style={{
        backgroundColor: "#F9F9F9",
        minHeight: "100vh",
        height: "auto",
        padding: "clamp(4rem, 10vh, 7rem) clamp(1rem, 5vw, 2rem)",
      }}
    >
      {/* --- BACKGROUND ELEMENTS --- */}

      {/* 1. Dot Grid Texture (Navy) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{ backgroundImage: `radial-gradient(#1D2B53 1.5px, transparent 1.5px)`, backgroundSize: '45px 45px' }} />

      {/* 2. Logo Utama (Stay di Tengah - Warna Asli) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] opacity-[0.06] pointer-events-none z-0">
        <img src={logoAsliUrl} alt="Logo Utama" className="w-full h-auto" />
      </div>

      {/* 3. 20 Scattered Logo Varian (Warna Asli - Lebih Besar & Tajam) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {scatteredPositions.current.map((pos, i) => (
          <div
            key={i}
            ref={el => scatteredLogosRef.current[i] = el}
            className="absolute w-24 md:w-40 pointer-events-none" // Ukuran diperbesar
            style={{
              top: pos.top,
              left: pos.left,
              transform: `rotate(${pos.rotation}deg) scale(${pos.scale})`,
              opacity: pos.opacity // Opacity lebih tajam
            }}
          >
            <img src={logoVarianUrl} alt="Logo Varian" className="w-full h-auto" />
          </div>
        ))}
      </div>

      {/* 4. Abstract Line Art (Aksen Warna Logo) */}
      <svg ref={backgroundLinesRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.12]" viewBox="0 0 1000 1000" preserveAspectRatio="none">
        <path d="M0,250 Q250,150 500,250 T1000,250" stroke="#1D2B53" strokeWidth="1.5" fill="none" />
        <path d="M1000,750 Q750,850 500,750 T0,750" stroke="#FFC619" strokeWidth="1.5" fill="none" />
      </svg>

      <div className="relative z-10 max-w-[1200px] mx-auto">
        {/* --- HEADER (ORIGINAL) --- */}
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
          <div ref={lineRef} className="absolute left-1/2 -translate-x-1/2 w-[2px] top-0 bottom-0 hidden md:block -z-10"
            style={{ background: `linear-gradient(to bottom, transparent, var(--color-utama) 15%, var(--color-utama) 85%, transparent)` }} />

          {data.layout_data?.map((item, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <div
                key={idx}
                ref={(el) => (cardsRef.current[idx] = el)}
                className={`timeline-card relative md:w-1/2 px-4 md:px-14 mb-10 md:mb-16 ${isLeft ? "md:left-0 md:text-right" : "md:left-1/2 md:text-left"
                  }`}
              >
                <div className={`hidden md:flex absolute top-6 items-center justify-center w-6 h-6 z-10 ${isLeft ? "right-[-12px]" : "left-[-12px]"}`}>
                  <div className="absolute inset-0 rounded-full bg-[var(--color-utama)] opacity-20 animate-ping" />
                  <div className="w-4 h-4 rounded-full bg-white border-[3px] border-[var(--color-utama)] shadow-md relative z-10" />
                </div>

                {/* --- CARD CONTENT --- */}
                <div 
                  className="group relative rounded-2xl p-6 md:p-8 border border-slate-100 bg-white/80 backdrop-blur-sm shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                >
                  <div className={`absolute top-0 bottom-0 w-1.5 transition-all duration-500 bg-gradient-to-b from-[var(--color-utama)] to-[#FFC619] opacity-100 ${isLeft ? "left-0 rounded-r-none rounded-l-full" : "right-0 rounded-l-none rounded-r-full"}`} />

                  <div className={`flex items-center gap-6 mb-5 ${isLeft ? "md:flex-row-reverse" : "flex-row"}`}>
                    <span className="text-[var(--color-utama)] text-3xl lg:text-4xl font-bauer-bodoni font-semibold italic tracking-tight">
                      {item.timelineYear}
                    </span>
                    <div className="flex-grow h-[1px] bg-gradient-to-r from-[var(--color-utama)] to-transparent opacity-40" />
                  </div>

                  <h3 className="font-bold mb-4 text-[var(--color-teks)] text-xl lg:text-2xl font-['Playfair_Display']">
                    {item.timelineTitle}
                  </h3>
                  
                  <p className="leading-relaxed text-slate-600 text-sm md:text-[0.95rem] font-medium italic text-left">
                    {item.timelineDescription}
                  </p>
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