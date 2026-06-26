// src/components/layouts/IntroSection.jsx
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import livestockImg from '@/assets/img/herocarousel6.webp';

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
        gsap.to(shapes[0], { y: 30, duration: 10, repeat: -1, yoyo: true, ease: "sine.inOut", force3D: true });
        gsap.to(shapes[1], { x: -20, duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut", force3D: true });
      }

      // Animasi Judul
      gsap.fromTo(titleWrapperRef.current.children,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power4.out", force3D: true,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            toggleActions: "play none none reverse",
          }
        }
      );

      // Animasi Gambar
      gsap.fromTo(imageWrapperRef.current,
        { scale: 1.05, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 1.8, ease: "expo.out", force3D: true,
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
      // OPTIMASI: h-auto di mobile agar tidak memaksa full-screen kosong, tetap h-screen di desktop
      className="section relative bg-[#FDFDFD] overflow-hidden w-full h-auto lg:h-screen flex flex-col"
      id={`section-${index}`}
      data-theme="light"
    >
      {/* BACKGROUND DECORATIVE (Ditambah tekstur dot lembut agar tidak polos) */}
      <div ref={floatRef} className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute rounded-full blur-3xl opacity-[0.03] w-[70vw] md:w-[50vw] h-[70vw] md:h-[50vw] -top-20 -right-20 bg-[#1e3a8a]" />
        <div className="absolute opacity-[0.12]"
          style={{
            backgroundImage: "radial-gradient(#1D2B53 1.5px, transparent 1.5px)",
            backgroundSize: "24px 24px",
            width: "100%", height: "100%"
          }}
        />
      </div>

      {/* 
        PERUBAHAN UTAMA:
        - `justify-start`: Memaksa semua komponen di mobile menumpuk rapat ke atas.
        - `items-start lg:items-stretch`: Mencegah gambar ditarik melebar kaku ke bawah.
      */}
      <div className="relative z-10 w-full flex flex-col lg:flex-row justify-start items-start lg:items-stretch flex-grow">

        {/* SISI KIRI: TEXT AREA */}
        {/* Mengubah `justify-center` menjadi `justify-start` di mobile dan memadatkan padding bawah (`pb-4`) */}
        <div className="w-full lg:w-[45%] flex flex-col justify-start lg:justify-center pt-16 pb-4 lg:py-0 px-6 sm:px-12 lg:px-[8%] lg:pr-4">
          <div ref={titleWrapperRef} className="flex flex-col">
            {titleWords.map((word, i) => (
              <h1
                key={i}
                className="font-['Playfair_Display'] font-black leading-[0.95] md:leading-[0.9] tracking-tighter text-[#1D2B53]"
                style={{
                  fontSize: "clamp(2.2rem, 6vw, 6.5rem)",
                }}
              >
                {word}
              </h1>
            ))}

            <div className="h-[2px] md:h-[3px] w-12 md:w-16 bg-[#1D2B53] my-4 lg:my-8" />

            <p className="text-slate-500 text-sm md:text-base lg:text-lg leading-relaxed max-w-sm">
              Mendorong kemandirian pangan melalui pengelolaan sektor peternakan yang berkelanjutan dan modern.
            </p>
          </div>
        </div>

        {/* SISI KANAN: IMAGE AREA (SEKARANG NAIK MERAPAT) */}
        {/* 
          - Mengubah `mt-auto` menjadi `mt-4` agar menempel rapi di bawah paragraf teks teks tanpa jeda jauh.
          - Mengganti `h-[35vh]` kaku menjadi `aspect-[4/3] sm:aspect-[16/9] lg:h-full` agar gambar proporsional.
        */}
        <div className="w-full lg:w-[55%] aspect-[4/3] sm:aspect-[16/9] lg:h-full relative p-6 sm:p-8 lg:p-12 mt-4 lg:mt-0 flex-shrink-0">
          <div ref={imageWrapperRef} className="w-full h-full relative group">

            {/* Frame Aksentuasi */}
            <div className="absolute -top-2 -left-2 w-10 h-10 border-t-2 border-l-2 opacity-30" style={{ borderColor: COLOR_NAVY }} />
            <div className="absolute -bottom-2 -right-2 w-10 h-10 border-b-2 border-r-2 opacity-50" style={{ borderColor: COLOR_GOLD }} />

            {/* Container Gambar */}
            <div className="w-full h-full overflow-hidden shadow-xl lg:shadow-2xl rounded-sm">
              <img
                src={displayImage}
                alt={displayTitle}
                className="w-full h-full object-cover transition-transform duration-1000 lg:group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#1D2B53]/5 pointer-events-none" />
            </div>
          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
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