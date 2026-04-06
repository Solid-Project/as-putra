// src/components/layouts/IntroSection.jsx
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const IntroSection = ({ title, image }) => {
  const sectionRef = useRef(null);
  const titleWrapperRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const parallaxImgRef = useRef(null); // Ref baru untuk gambar parallax

  const displayTitle = title || "Finance Sector";
  const displayImage = image || "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1200";

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Animasi Judul (Stagger masuk)
      gsap.fromTo(titleWrapperRef.current.children,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.5,
          stagger: 0.3,
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
        { x: 150, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          }
        }
      );

      // 3. 🔥 EFEK PARALLAX GAMBAR
      // Gambar akan bergerak sedikit lebih lambat saat user scroll
      gsap.to(parallaxImgRef.current, {
        yPercent: 20, // Bergerak 20% ke atas/bawah
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom", 
          end: "bottom top",
          scrub: true, // Menyesuaikan dengan kecepatan scroll
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [displayTitle]);

  const titleWords = displayTitle.split(' ');

  return (
    <section
      ref={sectionRef}
      className="section min-h-screen flex items-center bg-white relative overflow-hidden px-[6%] py-24"
      id="intro-section"
      data-theme="light"
    >
      {/* Label Vertikal "Sectors" */}
      <div className="absolute left-[3%] top-1/2 -translate-y-1/2 -rotate-90 hidden lg:block z-30 pointer-events-none">
        <span className="text-slate-300 font-medium tracking-[0.4em] text-[10px] uppercase">
          Sectors
        </span>
      </div>

      <div className="w-full grid lg:grid-cols-12 items-center relative z-10">
        
        {/* KOLOM KIRI: JUDUL RAKSASA */}
        <div ref={titleWrapperRef} className="lg:col-span-5 flex flex-col gap-2 z-20 pointer-events-none">
          {titleWords.map((word, i) => (
            <h1
              key={i}
              className={`font-['Playfair_Display'] text-7xl md:text-8xl lg:text-[10rem] text-slate-900 font-black leading-[0.85] tracking-tighter ${i === 1 ? 'lg:-mt-4' : ''}`}
            >
              {word}
            </h1>
          ))}
        </div>

        {/* KOLOM KANAN: GAMBAR DENGAN PARALLAX & FADE */}
        <div 
          ref={imageWrapperRef}
          className="lg:col-span-7 relative h-[500px] md:h-[600px] lg:h-[750px] w-full mt-16 lg:mt-0"
        >
          {/* Container Gambar dengan overflow hidden agar parallax tidak keluar frame */}
          <div className="w-full h-full overflow-hidden rounded-sm relative">
             <img
                ref={parallaxImgRef}
                src={displayImage}
                alt={displayTitle}
                className="w-full h-[130%] object-cover scale-110 origin-top" // h-[130%] memberikan ruang untuk bergerak
              />
              
              {/* Fade Effect: Gradasi Putih Sisi Kiri (Sesuai Referensi) */}
              <div className="absolute inset-y-0 left-0 w-3/4 bg-gradient-to-r from-white via-white/70 to-transparent lg:block hidden z-10 pointer-events-none" />
              <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-white via-white/50 to-transparent lg:hidden block z-10 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;