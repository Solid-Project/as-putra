import React, { useEffect, useRef} from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import careerBg from "@/assets/img/karir.webp";

const HeroCareer = ({ activeIndex }) => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const lineRef = useRef(null);
  const subtitleRef = useRef(null);
  const scrollBtnRef = useRef(null);
  const statsRef = useRef([]);
  const SECTION_INDEX = 0; // sesuaikan urutan kamu
  const isActive = activeIndex === SECTION_INDEX;

  const scrollToNext = () => {
    const nextSection = sectionRef.current?.nextElementSibling;
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const links = contentRef.current.querySelectorAll("a");
      const stats = statsRef.current;

      // ❗ kalau tidak aktif → tampil normal
      if (!isActive) {
        gsap.set([titleRef.current, subtitleRef.current, ...links, ...stats], {
          opacity: 1,
          y: 0,
        });
        gsap.set(lineRef.current, { width: 80 });
        return;
      }

      // 🔥 INITIAL STATE
      gsap.set(titleRef.current, { y: 50, opacity: 0 });
      gsap.set(lineRef.current, { width: 0 });
      gsap.set(subtitleRef.current, { y: 30, opacity: 0 });

      gsap.set([...links, ...stats], {
        y: 30,
        opacity: 0,
      });

      // 🔥 TIMELINE
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
            ease: "power2.out",
          },
          "-=0.4",
        )
        .to(
          subtitleRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.3",
        )
        .to(
          [...links, ...stats],
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.2",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [isActive]);

  // Counter animation logic
  useEffect(() => {
    if (!isActive) return;

    const counters = document.querySelectorAll(".stat-counter");

    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-target"));
      let current = 0;
      const increment = target / 50;

      const updateCounter = () => {
        if (current < target) {
          current += increment;
          counter.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };

      updateCounter();
    });
  }, [isActive]);

  return (
    <section
      ref={sectionRef}
      className="section relative h-screen flex items-center justify-center text-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1), rgba(255,255,255,0.1)), url(${careerBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      data-theme="dark"
      data-title="Karir"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/50" />

      <div ref={contentRef} className="relative z-10 px-5">
        <h1
          ref={titleRef}
          className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl text-white mb-4 drop-shadow-lg"
        >
          Bangun Karir <br /> Bersama AS PUTRA
        </h1>

        <div
          ref={lineRef}
          className="h-0.5 bg-[var(--color-utama)] mx-auto mb-10"
          style={{ width: 0 }}
        />

        <p
          ref={subtitleRef}
          className="text-white/95 max-w-[600px] mx-auto mb-10 text-lg leading-relaxed"
        >
          Bergabunglah dengan tim yang berdedikasi untuk menciptakan dampak
          positif melalui inovasi dan kolaborasi.
        </p>

        {/* Buttons - Identik dengan HeroNews */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center mb-16">
          <Link
            to="#career-section"
            className="group relative px-8 py-3.5 bg-[var(--color-utama)] text-white font-medium tracking-wide rounded-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[var(--color-utama)]/30 hover:-translate-y-0.5"
          >
            <span className="relative z-10 flex items-center gap-2">
              Lihat Lowongan
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
            to="/about"
            className="group relative px-8 py-3.5 bg-white/20 backdrop-blur-sm border border-white/40 text-white font-medium tracking-wide rounded-full overflow-hidden transition-all duration-300 hover:bg-white/30 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/20"
          >
            <span className="relative z-10 flex items-center gap-2">
              Tentang Perusahaan
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

        {/* Stats Grid - Dipertahankan namun dengan styling transparan yang konsisten */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { label: "Karyawan", target: 500 },
            { label: "Tahun", target: 25 },
            { label: "Cabang", target: 15 },
            { label: "Training", target: 100 },
          ].map((stat, index) => (
            <div
              key={stat.label}
              ref={(el) => (statsRef.current[index] = el)}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 transition-all hover:bg-white/20"
            >
              <div className="text-2xl font-bold text-white">
                <span className="stat-counter" data-target={stat.target}>
                  0
                </span>
                +
              </div>
              <div className="text-white/60 text-xs uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator - Identik dengan HeroNews */}
      <button
        ref={scrollBtnRef}
        onClick={scrollToNext}
        className="absolute bottom-12 right-[10%] z-20 hidden lg:flex flex-col items-center gap-2 group cursor-pointer"
      >
        <span className="vertical-text text-[11px] font-black uppercase tracking-[0.5em] text-white/40 group-hover:text-[var(--color-utama)] transition-colors duration-500 mb-4">
          Scroll
        </span>

        <div className="flex flex-col items-center -space-y-2">
          {[1, 2, 3].map((i) => (
            <svg
              key={i}
              className={`w-8 h-8 text-[var(--color-utama)] animate-bounce opacity-${100 - i * 20}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{ animationDelay: `${i * 0.2}s` }}
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
    </section>
  );
};

export default HeroCareer;
