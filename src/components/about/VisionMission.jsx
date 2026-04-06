import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VisionMission = () => {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const bgRef = useRef(null);
  const lineRef = useRef(null);
  const glowRef = useRef(null);
  const textBgRef = useRef(null);
  const floatRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // 1. ANIMASI ENTRANCE (ASLI KAMU)
      gsap.from(leftRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      });

      gsap.from(rightRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      });

      // 2. LIVE PARALLAX (DIBUAT SIMETRIS & MENGISI RUANG)
      
      // Typography Background meluncur horizontal
      gsap.to(textBgRef.current, {
        x: -150,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });

      // Floating Shapes meluncur naik
      gsap.fromTo(floatRef.current, 
        { y: 100 }, 
        {
          y: -100,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          }
        }
      );

      // Content (Left & Right) tetap meluncur naik (Range 80px agar terasa)
      gsap.fromTo([leftRef.current, rightRef.current], 
        { y: 80 }, 
        {
          y: -80,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          }
        }
      );

      // Background Image meluncur turun
      gsap.fromTo(bgRef.current, 
        { y: -50 }, 
        {
          y: 50,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section relative min-h-screen flex items-center px-6 md:px-12 overflow-hidden"
      style={{ 
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1), rgba(255,255,255,0.1)), url('/react/img/mission.jpg')`,
        backgroundPosition: `center`,
        backgroundSize: `cover`
      }}
      data-title="Visi & Misi"
      data-theme="light"
    >
      {/* 🔥 ADDITION 1: LARGE TYPOGRAPHY BG (Mengisi kekosongan) */}
      <div 
        ref={textBgRef} 
        className="absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap opacity-[0.03] select-none pointer-events-none z-0"
      >
        <span className="text-[200px] font-black uppercase text-blue-900">
          Visionary Reliable Sustainable Innovative
        </span>
      </div>

      {/* 🔥 ADDITION 2: FLOATING DECOR (Mengisi kekosongan samping) */}
      <div ref={floatRef} className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 right-[10%] w-24 h-24 border-8 border-blue-500/10 rounded-full" />
        <div className="absolute bottom-1/4 left-[5%] w-32 h-32 border border-blue-500/20 rounded-2xl rotate-12" />
      </div>

      {/* 🔥 BACKGROUND IMAGE + OVERLAY (ASLI KAMU) */}
      <div ref={bgRef} className="absolute inset-0 -z-20 h-[120%] -top-[10%]">
        <img
          src="/react/img/mission.jpg"
          alt="background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/40 to-white/30" />
      </div>

      {/* 🔥 LINE GRID DECOR (ASLI KAMU) */}
      <div ref={lineRef} className="absolute inset-0 -z-10 opacity-20">
        <div className="w-full h-full bg-[linear-gradient(to_right,#3b82f6_1px,transparent_1px),linear-gradient(to_bottom,#3b82f6_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* 🔥 SOFT GLOW BLUR (ASLI KAMU) */}
      <div ref={glowRef} className="absolute inset-0 -z-10">
        <div className="absolute top-[-120px] left-[-120px] w-[420px] h-[420px] bg-blue-300/30 blur-[140px] rounded-full" />
        <div className="absolute bottom-[-120px] right-[-120px] w-[420px] h-[420px] bg-indigo-300/30 blur-[140px] rounded-full" />
      </div>

      {/* 🔥 CONTENT (ASLI KAMU) */}
      <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10 w-full">

        {/* LEFT SIDE */}
        <div ref={leftRef} className="space-y-6">
          <span className="inline-block px-4 py-1 text-xs tracking-widest uppercase bg-blue-100 text-blue-600 rounded-full font-semibold">
            Vision & Mission
          </span>

          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight">
            Membangun Masa Depan Bisnis yang Berkelanjutan
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed">
            Kami berkomitmen menghadirkan inovasi dan kolaborasi strategis untuk menciptakan ekosistem bisnis yang berdampak luas dan berkelanjutan.
          </p>

          <div className="w-24 h-[3px] bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
        </div>

        {/* RIGHT SIDE */}
        <div ref={rightRef} className="space-y-8">

          {/* VISION CARD */}
          <div className="relative group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-500 to-indigo-500 rounded-l-2xl" />
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-100 rounded-full blur-2xl opacity-40 group-hover:scale-125 transition duration-700" />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Visi Kami
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Menjadi ekosistem bisnis terkemuka yang berlandaskan tata kelola terbaik dan inovasi berkelanjutan, untuk menghadirkan kemajuan bagi seluruh pemangku kepentingan.
            </p>
          </div>

          {/* MISSION CARD */}
          <div className="relative group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-indigo-500 to-blue-500 rounded-l-2xl" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-100 rounded-full blur-2xl opacity-40 group-hover:scale-125 transition duration-700" />
            <h3 className="text-xl font-semibold text-gray-900 mb-5">
              Misi Kami
            </h3>
            <ul className="space-y-4">
              {[
                "Menyatukan keunggulan untuk hasil terbaik",
                "Berinovasi untuk pertumbuhan berkelanjutan",
                "Membangun kemitraan yang terpercaya",
                "Memberikan dampak yang bertanggung jawab",
                "Berorientasi pada keberlanjutan lingkungan"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 group/item">
                  <div className="relative">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-white text-sm font-semibold shadow-md">
                      {i + 1}
                    </div>
                  </div>
                  <span className="text-gray-600 leading-relaxed group-hover/item:text-gray-900 transition">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};

export default VisionMission;