import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import aboutMe from "@/assets/img/aboutme.webp";

const HeroAbout = ({ activeIndex }) => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const lineRef = useRef(null);
  const subtitleRef = useRef(null);
  const scrollBtnRef = useRef(null);
  const buttonsRef = useRef([]);
  const hasAnimatedRef = useRef(false);
  const SECTION_INDEX = 0;
  const isActive = activeIndex === SECTION_INDEX;

  const scrollToNext = () => {
    const nextSection = sectionRef.current?.nextElementSibling;
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (!isActive) {
      // RESET ke initial state
      gsap.set(
        [
          titleRef.current,
          subtitleRef.current,
          ...buttonsRef.current,
          scrollBtnRef.current,
        ],
        { opacity: 0, y: 30 },
      );

      gsap.set(lineRef.current, { width: 0 });

      hasAnimatedRef.current = false;
      return;
    }

    if (hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    const tl = gsap.timeline();

    tl.to(titleRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
    })
      .to(
        lineRef.current,
        {
          width: 80,
          duration: 0.6,
        },
        "-=0.4",
      )
      .to(
        subtitleRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
        },
        "-=0.3",
      )
      .to(
        buttonsRef.current,
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
        },
        "-=0.2",
      )
      .to(
        scrollBtnRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
        },
        "-=0.2",
      );
  }, [isActive]);

  // Preload image
  useEffect(() => {
    const img = new Image();
    img.src = aboutMe;
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section relative h-screen flex items-center justify-center text-center overflow-hidden"
      style={{
        backgroundImage: `url(${aboutMe})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        willChange: "transform",
      }}
      data-theme="dark"
      data-title="Tentang Kami"
    >
      {/* Overlay minimal */}
      <div className="absolute inset-0 bg-black/20" />

      <div
        ref={contentRef}
        className="relative z-10 px-5 w-full max-w-[1200px] mx-auto"
      >
        {/* Title */}
        <h1
          ref={titleRef}
          className="font-['Playfair_Display'] text-white drop-shadow-lg leading-tight"
          style={{
            fontSize: "clamp(1.8rem, 5vw, 3.5rem)",
            marginBottom: "clamp(0.75rem, 2vw, 1rem)",
          }}
        >
          Dari Pondasi Sederhana Menuju <br className="hidden sm:block" />
          Ekosistem Bisnis Terintegrasi
        </h1>

        {/* Line */}
        <div
          ref={lineRef}
          className="h-0.5 bg-[var(--color-utama)] mx-auto"
          style={{
            marginBottom: "clamp(1.5rem, 4vw, 2.5rem)",
          }}
        />

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-white/90 mx-auto leading-relaxed"
          style={{
            fontSize: "clamp(0.9rem, 2.5vw, 1.125rem)",
            maxWidth: "clamp(280px, 90%, 700px)",
            marginBottom: "clamp(1.5rem, 4vw, 2.5rem)",
          }}
        >
          Berawal dari langkah kecil di Kuningan, AS Putra tumbuh menjadi grup
          usaha lintas sektor yang saling terhubung, menciptakan pertumbuhan
          berkelanjutan dan dampak nyata bagi masyarakat.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center">
          <Link
            to="/about"
            ref={(el) => {
              if (el) buttonsRef.current[0] = el;
            }}
            className="group relative px-6 sm:px-8 py-3 sm:py-3.5 bg-[var(--color-utama)] text-white font-medium tracking-wide rounded-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[var(--color-utama)]/30 hover:-translate-y-0.5"
            style={{ fontSize: "clamp(0.875rem, 2.5vw, 1rem)" }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Pelajari Lebih Lanjut
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Link>

          <Link
            to="/career"
            ref={(el) => {
              if (el) buttonsRef.current[1] = el;
            }}
            className="group relative px-6 sm:px-8 py-3 sm:py-3.5 bg-white/20 backdrop-blur-sm border border-white/40 text-white font-medium tracking-wide rounded-full overflow-hidden transition-all duration-300 hover:bg-white/30 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/20"
            style={{ fontSize: "clamp(0.875rem, 2.5vw, 1rem)" }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Karir Kami
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
          </Link>
        </div>
      </div>

      {/* Scroll Indicator Desktop */}
      <button
        ref={scrollBtnRef}
        onClick={scrollToNext}
        className="absolute z-20 hidden md:flex flex-col items-center gap-2 group cursor-pointer"
        style={{
          bottom: "clamp(1rem, 5vh, 3rem)",
          right: "clamp(1rem, 5vw, 10%)",
        }}
      >
        <span className="vertical-text text-[11px] font-black uppercase tracking-[0.5em] text-white/40 group-hover:text-[var(--color-utama)] transition-colors duration-500 mb-4">
          Scroll
        </span>
        <div className="flex flex-col items-center -space-y-2">
          {[1, 2, 3].map((i) => (
            <svg
              key={i}
              className="w-6 h-6 text-[var(--color-utama)]"
              style={{
                opacity: 1 - i * 0.2,
                animation: `bounce 1.5s ease-in-out ${i * 0.1}s infinite`,
              }}
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
          ))}
        </div>
      </button>

      {/* Scroll Indicator Mobile */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 md:hidden flex flex-col items-center gap-1 group cursor-pointer"
      >
        <span className="text-[10px] font-medium uppercase tracking-widest text-white/50">
          Scroll
        </span>
        <svg
          className="w-5 h-5 text-white/60 animate-bounce"
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
      </button>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}</style>
    </section>
  );
};

export default HeroAbout;
