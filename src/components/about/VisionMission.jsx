import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VisionMission = () => {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const bgRef = useRef(null);
  const floatRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const entryTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      entryTl.from([leftRef.current, rightRef.current], {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });

      gsap.to(floatRef.current, {
        yPercent: -25,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });

      gsap.to(bgRef.current, {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
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
      style={{
        backgroundImage: "url('/react/img/mission.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >

      {/* FLOATING */}
      <div
        ref={floatRef}
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ willChange: "transform" }}
      >
        <div
          className="absolute top-[15%] right-[10%] w-32 h-32 border-[12px] rounded-full"
          style={{ borderColor: "var(--color-utama)", opacity: 0.08 }}
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
          className="absolute top-[45%] left-[15%] opacity-[0.1] -rotate-12"
        >
          <path
            d="M40 10L70 70H10L40 10Z"
            stroke="var(--color-aksen)"
            strokeWidth="3"
          />
        </svg>

        <div className="absolute top-[55%] right-[18%] w-24 h-24 opacity-[0.05]">
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

      {/* BACKGROUND */}
      <div
        ref={bgRef}
        className="absolute inset-0 -z-20 h-[115%] -top-[5%]"
        style={{ willChange: "transform" }}
      >
        <img
          src="/react/img/mission.webp"
          alt="background"
          className="w-full h-full object-cover opacity-20"
        />

        {/* Overlay lebih smooth */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(
                to bottom,
                var(--color-bg-light),
                rgba(255,255,255,0.6),
                var(--color-bg-light)
              )
            `,
          }}
        />
      </div>

      {/* GRID */}
      <div className="absolute inset-0 -z-10 opacity-[0.08] pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, var(--color-utama) 1px, transparent 1px),
              linear-gradient(to bottom, var(--color-utama) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
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
            className="relative group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border overflow-hidden transition-all duration-300 hover:-translate-y-1"
            style={{
              borderColor: "rgba(255,255,255,0.6)",
            }}
          >
            <div
              className="absolute top-0 left-0 w-1.5 h-full"
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
              Menjadi ekosistem bisnis terkemuka yang berlandaskan tata kelola
              terbaik dan inovasi berkelanjutan bagi seluruh pemangku
              kepentingan.
            </p>
          </div>

          {/* MISSION */}
          <div
            className="relative group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border overflow-hidden transition-all duration-300 hover:-translate-y-1"
            style={{
              borderColor: "rgba(255,255,255,0.6)",
            }}
          >
            <div
              className="absolute top-0 left-0 w-1.5 h-full"
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
                "Menyatukan keunggulan untuk hasil terbaik",
                "Berinovasi untuk pertumbuhan berkelanjutan",
                "Membangun kemitraan yang terpercaya",
                "Memberikan dampak yang bertanggung jawab",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div
                    className="w-6 h-6 flex items-center justify-center rounded-full text-[10px] font-bold"
                    style={{
                      backgroundColor: "var(--color-bg-alt)",
                      color: "var(--color-utama)",
                    }}
                  >
                    0{i + 1}
                  </div>

                  <span
                    className="text-sm font-medium"
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