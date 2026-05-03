import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bgImage from "@/assets/img/mission.webp";

gsap.registerPlugin(ScrollTrigger);

const VisionMission = () => {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const floatRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Bersihkan semua ScrollTrigger sebelumnya
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars.trigger === section) {
        trigger.kill();
      }
    });

    // SET INITIAL STATE - HIDDEN
    gsap.set([leftRef.current, rightRef.current], {
      y: 50,
      opacity: 0
    });

    // INTERSECTION OBSERVER UNTUK DETEKSI SECTION AKTIF
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true;
            
            // ENTRANCE ANIMATION
            gsap.to([leftRef.current, rightRef.current], {
              y: 0,
              opacity: 1,
              stagger: 0.15,
              duration: 0.8,
              ease: "power3.out",
              overwrite: true
            });
          } else if (!entry.isIntersecting && hasAnimatedRef.current) {
            // RESET SAAT SECTION KELUAR
            hasAnimatedRef.current = false;
            gsap.set([leftRef.current, rightRef.current], {
              y: 50,
              opacity: 0
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(section);

    // PARALLAX FLOATING 
    if (floatRef.current) {
      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const moveY = -15 * progress;
          floatRef.current.style.transform = `translate3d(0, ${moveY}%, 0)`;
        }
      });
    }

    return () => {
      observer.disconnect();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === section) {
          trigger.kill();
        }
      });
      gsap.killTweensOf([leftRef.current, rightRef.current]);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section relative min-h-screen flex items-center px-6 md:px-12 py-20 overflow-hidden"
      data-title="Visi & Misi"
      data-theme="light"
      style={{
        backgroundColor: "var(--color-bg-light)",
        position: "relative",
      }}
    >
      {/* BACKGROUND IMAGE UTAMA */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.2,
          zIndex: 0,
        }}
      />

      {/* Overlay Gradient tipis biar image tetap keliatan */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            linear-gradient(
              to bottom,
              rgba(255,255,255,0.85) 0%,
              rgba(255,255,255,0.7) 30%,
              rgba(255,255,255,0.6) 50%,
              rgba(255,255,255,0.7) 70%,
              rgba(255,255,255,0.85) 100%
            )
          `,
        }}
      />

      {/* FLOATING DECORATIONS */}
      <div
        ref={floatRef}
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ willChange: "transform" }}
      >
        <div
          className="absolute top-[15%] right-[10%] w-32 h-32 border-[12px] rounded-full"
          style={{ borderColor: "var(--color-utama)", opacity: 0.1 }}
        />

        <div
          className="absolute bottom-[20%] left-[5%] w-40 h-40 border-2 rounded-3xl rotate-12"
          style={{ borderColor: "var(--color-utama)", opacity: 0.12 }}
        />

        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          className="absolute top-[45%] left-[15%] opacity-[0.08] -rotate-12"
        >
          <path
            d="M40 10L70 70H10L40 10Z"
            stroke="var(--color-aksen)"
            strokeWidth="3"
          />
        </svg>

        <div className="absolute top-[55%] right-[18%] w-24 h-24 opacity-[0.06]">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "linear-gradient(135deg, var(--color-utama) 1px, transparent 1px)",
              backgroundSize: "10px 10px",
            }}
          />
        </div>

        <div
          className="absolute top-[25%] left-[25%] w-6 h-6 rounded-full"
          style={{ backgroundColor: "var(--color-aksen)", opacity: 0.25 }}
        />
      </div>

      {/* GRID LINES - tipis aja, bukan background utama */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, var(--color-utama) 1px, transparent 1px),
              linear-gradient(to bottom, var(--color-utama) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* CONTENT */}
      <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10 w-full">

        {/* LEFT */}
        <div ref={leftRef} className="space-y-6">
          <span
            className="inline-block px-4 py-1 text-xs tracking-widest uppercase rounded-full font-semibold"
            style={{
              backgroundColor: "var(--color-bg-alt)",
              color: "var(--color-utama)",
            }}
          >
            Vision & Mission
          </span>

          <h2
            className="text-4xl md:text-5xl font-semibold leading-tight"
            style={{
              color: "var(--color-teks)",
              letterSpacing: "-0.02em",
            }}
          >
            Membangun Masa Depan <br /> Bisnis Berkelanjutan
          </h2>

          <p
            className="text-lg leading-relaxed max-w-lg"
            style={{
              color: "var(--color-teks-muted)",
              lineHeight: "1.8",
            }}
          >
            Kami berkomitmen menghadirkan inovasi dan kolaborasi strategis untuk
            menciptakan ekosistem bisnis yang berdampak luas.
          </p>

          <div
            className="w-24 h-1 rounded-full"
            style={{
              background:
                "linear-gradient(to right, var(--color-utama), var(--color-aksen))",
            }}
          />
        </div>

        {/* RIGHT */}
        <div ref={rightRef} className="space-y-6">

          {/* VISION */}
          <div
            className="relative group bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            style={{
              borderColor: "rgba(255,255,255,0.3)",
            }}
          >
            <div
              className="absolute top-0 left-0 w-1.5 h-full rounded-l-2xl"
              style={{ backgroundColor: "var(--color-utama)" }}
            />

            <h3
              className="text-xl font-bold mb-3"
              style={{ color: "var(--color-teks)" }}
            >
              Visi Kami
            </h3>

            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--color-teks-muted)" }}
            >
              Membangun AS Putra menjadi perusahaan yang modern dan terpercaya, tempat kita semua tumbuh, bahagia, bangga berkarya, dan memberikan manfaat terluas bagi lingkungan.
            </p>
          </div>

          {/* MISSION */}
          <div
            className="relative group bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            style={{
              borderColor: "rgba(255,255,255,0.3)",
            }}
          >
            <div
              className="absolute top-0 left-0 w-1.5 h-full rounded-l-2xl"
              style={{ backgroundColor: "var(--color-aksen)" }}
            />

            <h3
              className="text-xl font-bold mb-4"
              style={{ color: "var(--color-teks)" }}
            >
              Misi Kami
            </h3>

            <ul className="space-y-3">
              {[
                "Modernisasi Berkelanjutan",
                "Rumah Kedua yang Membanggakan",
                "Sinergi Tanpa Batas",
                "Berbagi Manfaat",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 group/item">
                  <div
                    className="w-6 h-6 flex items-center justify-center rounded-full text-[10px] font-bold transition-all duration-300 group-hover/item:scale-110"
                    style={{
                      backgroundColor: "var(--color-bg-alt)",
                      color: "var(--color-utama)",
                    }}
                  >
                    0{i + 1}
                  </div>

                  <span
                    className="text-sm font-medium transition-all duration-300 group-hover/item:pl-1"
                    style={{ color: "var(--color-teks-muted)" }}
                  >
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