import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import bgImage from "@/assets/img/mission.webp";
const VisionMission = ({ activeIndex }) => {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const floatRef = useRef(null);
  const hasAnimatedRef = useRef(false);
  const SECTION_INDEX = 1; // sesuaikan urutan kamu
  const isActive = activeIndex === SECTION_INDEX;

  useEffect(() => {
    if (!leftRef.current || !rightRef.current) return;

    if (!isActive) {
      // RESET ke kondisi normal
      gsap.set([leftRef.current, rightRef.current], {
        clearProps: "all",
      });

      if (floatRef.current) {
        gsap.set(floatRef.current, { clearProps: "all" });
      }

      hasAnimatedRef.current = false;
      return;
    }

    if (hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    // ENTRY ANIMATION
    const tl = gsap.timeline();

    tl.fromTo(
      leftRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8 },
    ).fromTo(
      rightRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.5",
    );

    // FLOAT EFFECT (tanpa ScrollTrigger)
    if (floatRef.current) {
      gsap.to(floatRef.current, {
        y: -40,
        duration: 6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }
  }, [isActive]);
  return (
    <section
      ref={sectionRef}
      className="section relative min-h-screen flex items-center px-6 md:px-12 py-20 overflow-hidden"
      data-title="Visi & Misi"
      data-theme="light"
      style={{
        backgroundColor: "var(--color-bg-light)",
      }}
    >
      {/* ✅ BACKGROUND IMAGE */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.25,
          zIndex: 0,
        }}
      />

      {/* ✅ FLOATING DECOR */}
      <div
        ref={floatRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1, willChange: "transform" }}
      >
        <div
          className="absolute top-[15%] right-[10%] w-32 h-32 border-[10px] rounded-full"
          style={{ borderColor: "var(--color-utama)", opacity: 0.08 }}
        />

        <div
          className="absolute bottom-[20%] left-[5%] w-36 h-36 border rounded-3xl rotate-12"
          style={{ borderColor: "var(--color-utama)", opacity: 0.08 }}
        />

        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          className="absolute top-[45%] left-[15%] opacity-[0.05]"
        >
          <path
            d="M40 10L70 70H10L40 10Z"
            stroke="var(--color-aksen)"
            strokeWidth="3"
          />
        </svg>
      </div>
      {/* CONTENT */}
      <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10 w-full">
        {/* LEFT */}
        <div ref={leftRef} className="space-y-6">
          <span className="inline-block px-4 py-1 text-xs tracking-widest uppercase rounded-full font-semibold bg-[var(--color-bg-alt)] text-[var(--color-utama)]">
            Vision & Mission
          </span>

          <h2 className="text-4xl md:text-5xl font-semibold leading-tight text-[var(--color-teks)]">
            Membangun Masa Depan <br /> Bisnis Berkelanjutan
          </h2>

          <p className="text-lg leading-relaxed max-w-lg text-[var(--color-teks-muted)]">
            Kami berkomitmen menghadirkan inovasi dan kolaborasi strategis untuk
            menciptakan ekosistem bisnis yang berdampak luas.
          </p>

          <div className="w-24 h-1 rounded-full bg-gradient-to-r from-[var(--color-utama)] to-[var(--color-aksen)]" />
        </div>

        {/* RIGHT */}
        <div ref={rightRef} className="space-y-6">
          {/* VISION */}
          <div className="relative group bg-white/90 rounded-2xl p-8 shadow-xl border border-white/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <div className="absolute top-0 left-0 w-1.5 h-full rounded-l-2xl bg-[var(--color-utama)]" />

            <h3 className="text-xl font-bold mb-3 text-[var(--color-teks)]">
              Visi Kami
            </h3>

            <p className="text-sm leading-relaxed text-[var(--color-teks-muted)]">
              Membangun AS Putra menjadi perusahaan yang modern dan
              terpercaya...
            </p>
          </div>

          {/* MISSION */}
          <div className="relative group bg-white/90 rounded-2xl p-8 shadow-xl border border-white/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <div className="absolute top-0 left-0 w-1.5 h-full rounded-l-2xl bg-[var(--color-aksen)]" />

            <h3 className="text-xl font-bold mb-4 text-[var(--color-teks)]">
              Misi Kami
            </h3>

            <ul className="space-y-3">
              {[
                "Modernisasi Berkelanjutan",
                "Rumah Kedua yang Membanggakan",
                "Sinergi Tanpa Batas",
                "Berbagi Manfaat",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 flex items-center justify-center rounded-full text-[10px] font-bold bg-[var(--color-bg-alt)] text-[var(--color-utama)]">
                    0{i + 1}
                  </div>

                  <span className="text-sm font-medium text-[var(--color-teks-muted)]">
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
