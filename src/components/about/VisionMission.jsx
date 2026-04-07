import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VisionMission = () => {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const bgRef = useRef(null);
  // textBgRef dihapus
  const floatRef = useRef(null); // Ref untuk semua elemen melayang

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. ANIMASI ENTRANCE (Hanya jalan sekali)
      const entryTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        }
      });

      entryTl.from([leftRef.current, rightRef.current], {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
      });

      // 2. LIVE PARALLAX

      // Semua Floating Shapes (Naik perlahan saat scroll down)
      // Scrub dibuat sedikit lambat (2) agar terasa halus
      gsap.to(floatRef.current, {
        yPercent: -25, // Bergerak naik sejauh 25% dari tingginya
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        }
      });

      // Background Image (Turun sedikit saat scroll down)
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
      {/* 1. LARGE TYPOGRAPHY BG - DIHAPUS */}

      {/* 2. FLOATING DECOR CONTAINER (Semua elemen di sini kena efek Parallax) */}
      <div ref={floatRef} className="absolute inset-0 z-0 pointer-events-none" style={{ willChange: 'transform' }}>
        
        {/* --- SHAPES ASLI (Dipertahankan) --- */}
        {/* Lingkaran Besar Kanan Atas */}
        <div className="absolute top-[15%] right-[10%] w-32 h-32 border-[12px] border-blue-500/10 rounded-full" />
        
        {/* Kotak Berputar Kiri Bawah */}
        <div className="absolute bottom-[20%] left-[5%] w-40 h-40 border-2 border-blue-500/15 rounded-3xl rotate-12" />

        {/* --- TAMBAHAN SHAPES BARU (Untuk mengisi kekosongan) --- */}
        
        {/* Segitiga Outline Tengah Kiri */}
        <svg 
          width="80" 
          height="80" 
          viewBox="0 0 80 80" 
          fill="none" 
          className="absolute top-[45%] left-[15%] opacity-[0.12] -rotate-12"
        >
          <path d="M40 10L70 70H10L40 10Z" stroke="#3b82f6" strokeWidth="4"/>
        </svg>

        {/* Pola Garis Diagonal Kanan Tengah */}
        <div className="absolute top-[55%] right-[18%] w-24 h-24 opacity-[0.08]">
          <div className="w-full h-full bg-[linear-gradient(135deg,#3b82f6_1px,transparent_1px)] bg-[size:10px_10px]" />
        </div>

        {/* Lingkaran Kecil Solid Kiri Atas */}
        <div className="absolute top-[25%] left-[25%] w-6 h-6 bg-blue-400/20 rounded-full" />
      </div>

      {/* 3. BACKGROUND IMAGE + OVERLAY */}
      <div ref={bgRef} className="absolute inset-0 -z-20 h-[115%] -top-[5%]" style={{ willChange: 'transform' }}>
        <img
          src="/react/img/mission.jpg"
          alt="background"
          className="w-full h-full object-cover opacity-25" // Sedikit kurangi opacity agar shapes menonjol
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/30 to-white/70" />
      </div>

      {/* 4. LINE GRID DECOR */}
      <div className="absolute inset-0 -z-10 opacity-[0.12] pointer-events-none">
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