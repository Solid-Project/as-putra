// src/components/layouts/IntroSection.jsx
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const IntroSection = ({ title, image }) => {
  const sectionRef = useRef(null);
  const titleWrapperRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const parallaxImgRef = useRef(null);

  const displayTitle = title || "Finance Sector";
  const displayImage = image || "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1200";

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Animasi Judul (Stagger masuk) - Menggunakan y agar lebih smooth
      gsap.fromTo(titleWrapperRef.current.children,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // 2. Animasi Slide-in Container Gambar
      gsap.fromTo(imageWrapperRef.current,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          }
        }
      );

      // 3. Efek Parallax Gambar (Optimasi GPU)
      gsap.to(parallaxImgRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom", 
          end: "bottom top",
          scrub: 1, // Menggunakan angka untuk smoothing
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [displayTitle]);

  const titleWords = displayTitle.split(' ');

  return (
    <section
      ref={sectionRef}
      className="section h-screen min-h-[600px] flex items-center bg-white relative overflow-hidden px-[6%]"
      id="intro-section"
      data-theme="light"
      data-title={displayTitle}
    >
      {/* Label Vertikal "Sectors" - Identik dengan Hero */}
      <div className="absolute left-[3%] top-1/2 -translate-y-1/2 -rotate-90 hidden lg:block z-30 pointer-events-none">
        <span className="text-slate-300 font-black tracking-[0.5em] text-[11px] uppercase">
          Sectors
        </span>
      </div>

      <div className="w-full grid lg:grid-cols-12 items-center relative z-10 h-full">
        
        {/* KOLOM KIRI: JUDUL RAKSASA */}
        <div 
          ref={titleWrapperRef} 
          className="lg:col-span-5 flex flex-col justify-center h-full z-20 pointer-events-none"
        >
          {titleWords.map((word, i) => (
            <h1
              key={i}
              className={`font-['Playfair_Display'] text-6xl md:text-8xl lg:text-[9rem] text-slate-900 font-black leading-[0.85] tracking-tighter ${i !== 0 ? 'lg:-mt-4' : ''}`}
            >
              {word}
            </h1>
          ))}
        </div>

        {/* KOLOM KANAN: GAMBAR DENGAN PARALLAX & FADE */}
        <div 
          ref={imageWrapperRef}
          className="lg:col-span-7 relative h-[60%] lg:h-[85%] w-full flex items-center"
        >
          {/* Container Gambar */}
          <div className="w-full h-full overflow-hidden rounded-sm relative shadow-2xl">
              <img
                ref={parallaxImgRef}
                src={displayImage}
                alt={displayTitle}
                className="w-full h-[120%] object-cover scale-110 will-change-transform" 
                style={{ objectPosition: 'center 20%' }}
              />
              
              {/* Fade Effect: Sisi Kiri - Memberikan ruang untuk teks */}
              <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-white via-white/40 to-transparent hidden lg:block z-10 pointer-events-none" />
              
              {/* Overlay Tipis untuk Mobile agar teks tetap terbaca */}
              <div className="absolute inset-0 bg-white/20 lg:hidden block z-10 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;