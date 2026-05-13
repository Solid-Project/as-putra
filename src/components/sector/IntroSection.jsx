// src/components/layouts/IntroSection.jsx
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import livestockImg from '@/assets/img/Carousel/herocarousel6.webp';

gsap.registerPlugin(ScrollTrigger);

const IntroSection = ({ data, isActive, index }) => {
  const sectionRef = useRef(null);
  const titleWrapperRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const floatRef = useRef(null);

  const displayTitle = data?.title || "Peternakan";
  const displayImage = data?.image 
    ? `${import.meta.env.VITE_API_URL}/storage/${data.image}` 
    : livestockImg;

  const COLOR_NAVY = "#1D2B53";
  const COLOR_GOLD = "#FFC619";

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animasi Floating Background (Halus)
      const shapes = floatRef.current?.children;
      if (shapes) {
        gsap.to(shapes[0], { y: 30, duration: 10, repeat: -1, yoyo: true, ease: "sine.inOut" });
        gsap.to(shapes[1], { x: -20, duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut" });
      }

      // Animasi Judul: Muncul dari bawah dengan elegan
      gsap.fromTo(titleWrapperRef.current.children,
        { y: 100, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            toggleActions: "play none none reverse",
          }
        }
      );

      // Animasi Gambar: Scale Up halus
      gsap.fromTo(imageWrapperRef.current,
        { scale: 1.1, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 1.8, ease: "expo.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top center" }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [displayTitle]);

  const titleWords = displayTitle.split(' ');

  return (
    <section
      ref={sectionRef}
      className="section relative bg-white overflow-hidden w-full"
      id={`section-${index}`}
      style={{ height: "100vh" }} // LOCK 100VH
      data-theme="light"
    >
      {/* BACKGROUND DECORATIVE (TETAP DI PERTAHANKAN) */}
      <div ref={floatRef} className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute rounded-full blur-3xl opacity-[0.04] w-[50vw] h-[50vw] -top-20 -right-20 bg-[#1e3a8a]" />
        <div className="absolute opacity-20 hidden lg:block"
          style={{
            backgroundImage: "radial-gradient(#1e3a8a 2px, transparent 2px)",
            backgroundSize: "30px 30px",
            width: "200px", height: "200px", top: "10%", left: "5%"
          }}
        />
      </div>

      <div className="relative z-10 w-full h-full flex flex-col lg:flex-row items-center">
        
        {/* SISI KIRI: TEXT AREA (KITA KUNCI LEBARNYA AGAR TIDAK NABRAK) */}
        <div className="w-full lg:w-[45%] h-full flex flex-col justify-center px-[8%] lg:pr-4">
          <div ref={titleWrapperRef} className="flex flex-col">
            <span className="text-[#FFC619] font-bold tracking-[0.3em] uppercase text-xs mb-4 block">
              Overview Sector
            </span>
            
            {titleWords.map((word, i) => (
              <h1
                key={i}
                className="font-['Playfair_Display'] font-black leading-[0.9] tracking-tighter text-[#1D2B53]"
                style={{
                  fontSize: "clamp(3rem, 7vw, 6.5rem)", // Ukuran dikecilkan sedikit agar rapi
                }}
              >
                {word}
              </h1>
            ))}

            <div className="h-[3px] w-16 bg-[#1D2B53] my-8" />
            
            <p className="text-slate-500 text-base lg:text-lg leading-relaxed max-w-sm">
              Mendorong kemandirian pangan melalui pengelolaan sektor peternakan yang berkelanjutan dan modern.
            </p>
          </div>
        </div>

        {/* SISI KANAN: IMAGE AREA (BERSIH & MEWAH) */}
        <div className="w-full lg:w-[55%] h-[50vh] lg:h-full relative p-6 lg:p-12">
          <div ref={imageWrapperRef} className="w-full h-full relative group">
            
            {/* Frame Aksentuasi */}
            <div className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 opacity-30" style={{ borderColor: COLOR_NAVY }} />
            <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-2 border-r-2 opacity-50" style={{ borderColor: COLOR_GOLD }} />

            {/* Container Gambar */}
            <div className="w-full h-full overflow-hidden shadow-2xl rounded-sm">
              <img
                src={displayImage}
                alt={displayTitle}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              {/* Overlay halus untuk menyatukan warna */}
              <div className="absolute inset-0 bg-[#1D2B53]/5 pointer-events-none" />
            </div>

            {/* Elemen Floating Kecil untuk Detail Mewah */}
            <div className="absolute bottom-10 -left-10 bg-white p-6 shadow-xl hidden xl:block animate-bounce-slow">
               <div className="text-[#1D2B53] font-bold text-2xl">01.</div>
               <div className="text-[10px] tracking-widest uppercase text-slate-400">High Quality Standard</div>
            </div>
          </div>
        </div>

      </div>

      {/* CSS KHUSUS UNTUK SKELETON & ANIMASI */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow { animation: bounce-slow 4s ease-in-out infinite; }
      `}} />
    </section>
  );
};

export default IntroSection;