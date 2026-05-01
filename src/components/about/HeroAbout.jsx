import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import aboutMe from '@/assets/img/aboutme.webp';

gsap.registerPlugin(ScrollTrigger);

const HeroAbout = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const lineRef = useRef(null);
  const subtitleRef = useRef(null);
  const scrollBtnRef = useRef(null);
  const ctxRef = useRef(null);

  const scrollToNext = () => {
    const nextSection = sectionRef.current?.nextElementSibling;
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    // Bersihkan ScrollTrigger sebelumnya
    if (ctxRef.current) {
      ctxRef.current.revert();
    }

    const ctx = gsap.context(() => {
      // Buat timeline untuk entrance (sekali jalan, gak reverse)
      const entranceTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true, // 🔥 Hanya sekali, gak reverse
        }
      });

      // 1. Animasi Title
      entranceTimeline.fromTo(titleRef.current, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );

      // 2. Animasi Line
      entranceTimeline.fromTo(lineRef.current, 
        { width: 0 },
        { width: 80, duration: 0.6, ease: "back.out(1.2)" },
        "-=0.4" // overlap dikit
      );

      // 3. Animasi Subtitle
      entranceTimeline.fromTo(subtitleRef.current, 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      );

      // 4. Animasi Buttons Stagger - pakai fromTo langsung
      entranceTimeline.fromTo(contentRef.current.querySelectorAll("a"), 
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.15, 
          duration: 0.8, 
          ease: "power3.out",
        },
        "-=0.2"
      );

      // 🔥 Animasi Scroll Button (fade in saja, tanpa scrollTrigger)
      gsap.fromTo(scrollBtnRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 1.2, ease: "power2.out" }
      );

    }, sectionRef);

    ctxRef.current = ctx;

    return () => {
      if (ctxRef.current) {
        ctxRef.current.revert();
      }
      // Bersihkan semua ScrollTrigger yang terkait
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  // 🔥 Preload image saat component mount
  useEffect(() => {
    const img = new Image();
    img.src = aboutMe;
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="section relative h-screen flex items-center justify-center text-center overflow-hidden"
      style={{
        // 🔥 Optimasi: background image di-load dengan will-change
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${aboutMe})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        willChange: 'transform', // Hint untuk browser
        transform: 'translateZ(0)', // Force hardware acceleration
      }}
      data-theme="dark"
      data-title="Tentang Kami"
    >
      {/* Overlay lebih tipis dan simple */}
      <div className="absolute inset-0 bg-black/30" />
      
      <div ref={contentRef} className="relative z-10 px-5">
        {/* Title */}
        <h1 
          ref={titleRef}
          className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl text-white mb-4 drop-shadow-lg"
          style={{ opacity: 0 }} // Initial state
        >
          Dari Pondasi Sederhana Menuju Ekosistem Bisnis Terintegrasi
        </h1>

        {/* Line */}
        <div 
          ref={lineRef}
          className="h-0.5 bg-[var(--color-utama)] mx-auto mb-10"
          style={{ width: 0 }}
        />

        {/* Subtitle */}
        <p 
          ref={subtitleRef}
          className="text-white/90 max-w-[600px] mx-auto mb-10 text-base sm:text-lg leading-relaxed"
          style={{ opacity: 0 }}
        >
          Berawal dari langkah kecil di Kuningan, AS Putra tumbuh menjadi grup usaha lintas sektor yang saling terhubung, menciptakan pertumbuhan berkelanjutan dan dampak nyata bagi masyarakat.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <Link
            to="/about"
            className="group relative px-6 sm:px-8 py-3 bg-[var(--color-utama)] text-white font-medium tracking-wide rounded-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[var(--color-utama)]/30 hover:-translate-y-0.5"
            style={{ opacity: 0 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Pelajari Lebih Lanjut
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Link>

          <Link
            to="/career"
            className="group relative px-6 sm:px-8 py-3 bg-white/20 backdrop-blur-sm border border-white/40 text-white font-medium tracking-wide rounded-full overflow-hidden transition-all duration-300 hover:bg-white/30 hover:-translate-y-0.5"
            style={{ opacity: 0 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Karir Kami
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </Link>
        </div>
      </div>

      {/* Scroll Indicator - disederhanakan animasinya */}
      <button
        ref={scrollBtnRef}
        onClick={scrollToNext}
        className="absolute bottom-8 right-[5%] z-20 hidden lg:flex flex-col items-center gap-2 group cursor-pointer"
        style={{ opacity: 0 }}
      >
        <span className="vertical-text text-[10px] font-black uppercase tracking-[0.5em] text-white/40 group-hover:text-[var(--color-utama)] transition-colors duration-300">
          SCROLL
        </span>

        <div className="flex flex-col items-center">
          <svg
            className="w-6 h-6 text-[var(--color-utama)] animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M19 13l-7 7-7-7"
            />
          </svg>
        </div>
      </button>
    </section>
  );
};

export default HeroAbout;