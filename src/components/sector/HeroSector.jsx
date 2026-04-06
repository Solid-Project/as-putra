import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import sectorBg from '@/assets/img/sektor.webp';

gsap.registerPlugin(ScrollTrigger);

const HeroSector = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const lineRef = useRef(null);
  const subtitleRef = useRef(null);
  const scrollBtnRef = useRef(null);

  const scrollToNext = () => {
    // Mencari section berikutnya setelah hero untuk scroll otomatis
    const nextSection = sectionRef.current?.nextElementSibling;
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animasi Judul
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Animasi Garis Aksen
      gsap.fromTo(
        lineRef.current,
        { width: 0 },
        {
          width: 80,
          duration: 0.6,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        },
      );

      // Animasi Tombol Scroll (Masuk pelan)
      gsap.fromTo(
        scrollBtnRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          delay: 1,
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section relative h-screen flex items-center justify-center text-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(${sectorBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      data-theme="dark"
      data-title="Unit Bisnis Kami"
    >
      {/* Konten Utama Tengah */}
      <div ref={contentRef} className="relative z-10 px-5">
        <h1
          ref={titleRef}
          className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-7xl text-white mb-4 drop-shadow-lg"
        >
          Unit Bisnis Kami
        </h1>
        <div
          ref={lineRef}
          className="h-1 bg-[var(--color-utama)] mx-auto mb-10"
        />
        <p
          ref={subtitleRef}
          className="text-white/95 max-w-[600px] mx-auto mb-10 text-lg md:text-xl font-light"
        >
          Beragam lini usaha dalam satu ekosistem terintegrasi
        </p>

        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <Link
            to="/sector"
            className="group relative px-8 py-3.5 bg-[var(--color-utama)] text-white font-medium tracking-wide rounded-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[var(--color-utama)]/30 hover:-translate-y-0.5"
          >
            <span className="relative z-10 flex items-center gap-2">
              Lihat Semua Sektor
            </span>
          </Link>
          <Link
            to="/about"
            className="group relative px-8 py-3.5 bg-white/20 backdrop-blur-sm border border-white/40 text-white font-medium tracking-wide rounded-full overflow-hidden transition-all duration-300 hover:bg-white/30 hover:-translate-y-0.5"
          >
            <span className="relative z-10 flex items-center gap-2">
              Tentang Kami
            </span>
          </Link>
        </div>
      </div>

      <button
        ref={scrollBtnRef}
        onClick={scrollToNext}
        className="absolute bottom-12 right-[10%] z-20 hidden lg:flex flex-col items-center gap-2 group cursor-pointer"
      >
        {/* Teks Scroll yang lebih besar & berjarak */}
        <span className="vertical-text text-[11px] font-black uppercase tracking-[0.5em] text-white/40 group-hover:text-[var(--color-utama)] transition-colors duration-500 mb-4">
          Scroll
        </span>

        {/* Stack Panah (Tanpa Line) */}
        <div className="flex flex-col items-center -space-y-2">
          <svg
            className="w-8 h-8 text-[var(--color-utama)] animate-arrow-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M19 9l-7 7-7-7"
            />
          </svg>
          <svg
            className="w-8 h-8 text-[var(--color-utama)] animate-arrow-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M19 9l-7 7-7-7"
            />
          </svg>
          <svg
            className="w-8 h-8 text-[var(--color-utama)] animate-arrow-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>
    </section>
  );
};

export default HeroSector;
