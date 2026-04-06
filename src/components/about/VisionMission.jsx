import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VisionMission = () => {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const bgRef = useRef(null);
  const textBgRef = useRef(null);
  const floatRef = useRef(null);

  useEffect(() => {
    // Gunakan context untuk manajemen memori yang bersih
    const ctx = gsap.context(() => {
      
      // 1. ANIMASI ENTRANCE (Hanya jalan sekali saat masuk viewport)
      // Kita pakai timeline agar lebih teratur
      const entryTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none', // Hanya play sekali agar ringan
        }
      });

      entryTl.from([leftRef.current, rightRef.current], {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
      });

      // 2. LIVE PARALLAX (DIBUAT LEBIH RINGAN DENGAN SCRUB: 1)
      
      // Typography Background (Horizontal)
      gsap.to(textBgRef.current, {
        xPercent: -20, // Menggunakan xPercent jauh lebih ringan daripada x (pixel)
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });

      // Floating Shapes (Naik)
      gsap.to(floatRef.current, {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        }
      });

      // Background Image (Turun)
      gsap.to(bgRef.current, {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section relative min-h-screen flex items-center px-6 md:px-12 py-20 overflow-hidden bg-white"
      data-title="Visi & Misi"
      data-theme="light"
    >
      {/* 1. LARGE TYPOGRAPHY BG */}
      <div 
        ref={textBgRef} 
        className="absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap opacity-[0.04] select-none pointer-events-none z-0"
        style={{ willChange: 'transform' }}
      >
        <span className="text-[180px] font-black uppercase text-blue-900">
          Visionary Reliable Sustainable Innovative
        </span>
      </div>

      {/* 2. FLOATING DECOR */}
      <div ref={floatRef} className="absolute inset-0 z-0 pointer-events-none" style={{ willChange: 'transform' }}>
        <div className="absolute top-1/4 right-[10%] w-24 h-24 border-8 border-blue-500/10 rounded-full" />
        <div className="absolute bottom-1/4 left-[5%] w-32 h-32 border border-blue-500/20 rounded-2xl rotate-12" />
      </div>

      {/* 3. BACKGROUND IMAGE + OVERLAY */}
      <div ref={bgRef} className="absolute inset-0 -z-20 h-[115%] -top-[5%]" style={{ willChange: 'transform' }}>
        <img
          src="/react/img/mission.jpg"
          alt="background"
          className="w-full h-full object-cover opacity-30" // Opacity dikurangi agar grid & text-bg terlihat
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/20 to-white/60" />
      </div>

      {/* 4. LINE GRID DECOR */}
      <div className="absolute inset-0 -z-10 opacity-[0.15] pointer-events-none">
        <div className="w-full h-full bg-[linear-gradient(to_right,#3b82f6_1px,transparent_1px),linear-gradient(to_bottom,#3b82f6_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* 5. CONTENT CONTAINER */}
      <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10 w-full">
        {/* LEFT SIDE */}
        <div ref={leftRef} className="space-y-6">
          <span className="inline-block px-4 py-1 text-xs tracking-widest uppercase bg-blue-100 text-blue-600 rounded-full font-semibold">
            Vision & Mission
          </span>
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight">
            Membangun Masa Depan <br/> Bisnis Berkelanjutan
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-lg">
            Kami berkomitmen menghadirkan inovasi dan kolaborasi strategis untuk menciptakan ekosistem bisnis yang berdampak luas.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
        </div>

        {/* RIGHT SIDE */}
        <div ref={rightRef} className="space-y-6">
          {/* VISION CARD */}
          <div className="relative group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl shadow-blue-900/5 border border-white overflow-hidden transition-transform hover:-translate-y-1">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">Visi Kami</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Menjadi ekosistem bisnis terkemuka yang berlandaskan tata kelola terbaik dan inovasi berkelanjutan bagi seluruh pemangku kepentingan.
            </p>
          </div>

          {/* MISSION CARD */}
          <div className="relative group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl shadow-blue-900/5 border border-white overflow-hidden transition-transform hover:-translate-y-1">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500" />
            <h3 className="text-xl font-bold text-gray-900 mb-4">Misi Kami</h3>
            <ul className="space-y-3">
              {[
                "Menyatukan keunggulan untuk hasil terbaik",
                "Berinovasi untuk pertumbuhan berkelanjutan",
                "Membangun kemitraan yang terpercaya",
                "Memberikan dampak yang bertanggung jawab"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold">
                    0{i + 1}
                  </div>
                  <span className="text-gray-600 text-sm font-medium">{item}</span>
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