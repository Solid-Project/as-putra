// src/components/layouts/IntroSection.jsx
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const IntroSection = ({ title, image }) => {
  const sectionRef = useRef(null);
  const titleWrapperRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const scrollRef = useRef(null);

  // Data Default jika props kosong (Sesuai gambar referensi)
  const displayTitle = title || "Finance Sector";
  // Ganti URL ini dengan path gambar tim AS Putra Anda
  const displayImage = image || "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1200";

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Animasi Judul (Split per kata agar menumpuk)
      gsap.fromTo(titleWrapperRef.current.children,
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.3, // Menumpuk satu per satu
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // 2. Animasi Gambar (Slide in dari kanan)
      gsap.fromTo(imageWrapperRef.current,
        { x: 150, opacity: 0 },
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

      // 3. Animasi Scroll Icon (Floating halus)
      gsap.to(scrollRef.current, {
        y: 8,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "sine.inOut"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [displayTitle]);

  // Pecah judul menjadi kata-kata untuk tata letak menumpuk
  const titleWords = displayTitle.split(' ');

  return (
    <section
      ref={sectionRef}
      className="section min-h-screen flex items-center bg-white relative overflow-hidden px-[6%] py-24"
      id="intro-sector"
      data-theme="light"
    >
      {/* 1. Teks Kecil Vertikal "Sectors" (z-Index tinggi agar tidak tertutup) */}
      <div className="absolute left-[3%] top-1/2 -translate-y-1/2 -rotate-90 hidden lg:block z-30">
        <span className="text-slate-300 font-medium tracking-[0.4em] text-[10px] uppercase">
          Sectors
        </span>
      </div>

      <div className="w-full grid lg:grid-cols-12 items-center relative z-10">
        
        {/* KOLOM KIRI: JUDUL RAKSASA (GRID 5 KOLOM) */}
        <div ref={titleWrapperRef} className="lg:col-span-5 flex flex-col gap-2 z-20">
          {titleWords.map((word, i) => (
            <h1
              key={i}
              className={`font-['Playfair_Display'] text-7xl md:text-8xl lg:text-[10rem] text-slate-900 font-black leading-[0.9] tracking-tight ${i === 1 ? 'lg:-mt-4' : ''}`}
            >
              {word}
            </h1>
          ))}
        </div>

        {/* KOLOM KANAN: GAMBAR DENGAN FADE EFFECT (GRID 7 KOLOM) */}
        <div 
          ref={imageWrapperRef}
          className="lg:col-span-7 relative h-[450px] md:h-[550px] lg:h-[700px] w-full mt-16 lg:mt-0"
        >
          <div className="w-full h-full overflow-hidden rounded-sm relative">
             <img
                src={displayImage}
                alt={displayTitle}
                className="w-full h-full object-cover"
              />
              
              {/* 🔥 FADE EFFECT: Gradasi Putih di Sisi Kiri Gambar (Sesuai Gambar 14) */}
              <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-white via-white/80 to-transparent lg:block hidden z-10" />
              <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-white via-white/60 to-transparent lg:hidden block z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;