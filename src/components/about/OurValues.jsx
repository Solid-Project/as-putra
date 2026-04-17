import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Handshake, Zap, Shield, Target, Trophy } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const OurValues = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const floatRef = useRef(null);

  const values = [
    {
      number: "01",
      title: "Integrated Synergy",
      desc: "Kolaborasi lintas usaha yang saling menguatkan untuk menciptakan value lebih bagi seluruh pemangku kepentingan.",
      icon: Handshake,
    },
    {
      number: "02",
      title: "Agile Empowerment",
      desc: "Adaptif dan inovatif dalam merespon perubahan pasar serta memberdayakan setiap individu untuk berkembang.",
      icon: Zap,
    },
    {
      number: "03",
      title: "Foundational Trust",
      desc: "Integritas sebagai fondasi utama dalam setiap hubungan bisnis dan keputusan yang diambil.",
      icon: Shield,
    },
    {
      number: "04",
      title: "Purpose-Driven Impact",
      desc: "Pertumbuhan berkelanjutan yang memberi dampak nyata bagi masyarakat dan lingkungan sekitar.",
      icon: Target,
    },
    {
      number: "05",
      title: "Uncompromising Excellence",
      desc: "Profesionalisme tinggi tanpa kompromi dalam memberikan pelayanan dan produk terbaik.",
      icon: Trophy,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const shapes = floatRef.current?.children;
      if (!shapes) return;

      if (shapes[0]) {
        gsap.to(shapes[0], {
          yPercent: -50,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, scrub: 2 },
        });
      }
      if (shapes[1]) {
        gsap.to(shapes[1], {
          yPercent: 30,
          rotate: 45,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, scrub: 1 },
        });
      }
      if (shapes[2]) {
        gsap.to(shapes[2], {
          yPercent: -80,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, scrub: 1.5 },
        });
      }
      if (shapes[3]) {
        gsap.to(shapes[3], {
          yPercent: 40,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, scrub: 2.5 },
        });
      }

      cardsRef.current.forEach((card, idx) => {
        if (!card) return;

        const range = 40;
        const startY = idx % 2 === 0 ? range : -range;
        const endY = idx % 2 === 0 ? -range : range;

        gsap.fromTo(
          card,
          { y: startY },
          {
            y: endY,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
              invalidateOnRefresh: true,
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section relative overflow-hidden bg-gradient-to-b from-white to-gray-50"
      id="our-values"
      style={{
        minHeight: "auto",
        paddingTop: "clamp(3rem, 8vh, 6rem)",
        paddingBottom: "clamp(4rem, 10vh, 7rem)",
      }}
    >
      {/* BACKGROUND SHAPES */}
      <div ref={floatRef} className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute rounded-full blur-3xl"
          style={{
            backgroundColor: "var(--color-utama)",
            opacity: 0.08,
            width: "min(50vw, 400px)",
            height: "min(50vw, 400px)",
            top: "10%",
            left: "-5%",
          }}
        />

        <div
          className="absolute bottom-0 right-0 rounded-full blur-3xl"
          style={{
            backgroundColor: "var(--color-aksen)",
            opacity: 0.06,
            width: "min(40vw, 350px)",
            height: "min(40vw, 350px)",
            bottom: "-5%",
            right: "-3%",
          }}
        />

        <div
          className="absolute rotate-12 rounded-2xl opacity-60 hidden lg:block"
          style={{
            border: "1px solid var(--color-utama)",
            width: "min(15vw, 120px)",
            height: "min(15vw, 120px)",
            top: "20%",
            right: "10%",
          }}
        />

        <div
          className="absolute opacity-20 hidden md:block"
          style={{
            backgroundImage:
              "radial-gradient(var(--color-utama) 1.5px, transparent 1.5px)",
            backgroundSize: "15px 15px",
            width: "min(25vw, 160px)",
            height: "min(25vw, 160px)",
            bottom: "15%",
            left: "5%",
          }}
        />
      </div>

      <div 
        className="mx-auto relative z-10"
        style={{
          maxWidth: "1280px",
          paddingLeft: "clamp(1rem, 5vw, 2rem)",
          paddingRight: "clamp(1rem, 5vw, 2rem)",
        }}
      >
        {/* HEADER */}
        <div 
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-8 mb-12 lg:mb-16"
        >
          <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
            <div className="flex items-center gap-3 mb-4 justify-center lg:justify-start">
              <div
                className="h-0.5 rounded-full"
                style={{ 
                  backgroundColor: "var(--color-utama)",
                  width: "clamp(30px, 5vw, 48px)",
                }}
              />
              <span
                className="font-semibold tracking-[0.2em] uppercase text-xs md:text-sm"
                style={{ color: "var(--color-utama)" }}
              >
                Core Values
              </span>
            </div>

            <h2
              className="font-['Playfair_Display'] font-bold leading-tight"
              style={{ 
                color: "var(--color-teks)",
                fontSize: "clamp(2rem, 6vw, 3rem)",
              }}
            >
              Our <span style={{ color: "var(--color-utama)" }}>Values</span>
            </h2>
          </div>

          <p
            className="font-light max-w-md mx-auto lg:mx-0 text-center lg:text-left lg:border-l-2 lg:pl-8 leading-relaxed"
            style={{
              color: "var(--color-teks-muted)",
              borderColor: "var(--color-utama)",
              fontSize: "clamp(0.875rem, 2vw, 1rem)",
            }}
          >
            Prinsip fundamental yang menuntun setiap inovasi dan keputusan bisnis di AS Putra Group.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-7 lg:gap-6">
          {values.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                ref={(el) => (cardsRef.current[idx] = el)}
                className="group relative bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 rounded-2xl border border-gray-100 hover:border-gray-200 flex flex-col overflow-hidden"
                style={{
                  minHeight: "320px",
                }}
              >
                {/* Gradient background on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${idx % 2 === 0 ? 'var(--color-utama)' : 'var(--color-aksen)'}05, transparent)`,
                  }}
                />

                {/* Decorative circle background */}
                <div
                  className="absolute rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                  style={{
                    backgroundColor: idx % 2 === 0 ? "var(--color-utama)" : "var(--color-aksen)",
                    width: "min(150px, 40vw)",
                    height: "min(150px, 40vw)",
                    top: "-20%",
                    right: "-20%",
                  }}
                />

                {/* Content Container */}
                <div className="relative z-10 flex flex-col h-full p-6 md:p-7">
                  {/* Icon & Number Row */}
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className="flex items-center justify-center rounded-2xl shadow-md transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl"
                      style={{
                        backgroundColor: idx % 2 === 0 ? "var(--color-utama)" : "var(--color-aksen)",
                        width: "clamp(52px, 12vw, 60px)",
                        height: "clamp(52px, 12vw, 60px)",
                      }}
                    >
                      <IconComponent 
                        className="text-white"
                        size={28}
                        strokeWidth={1.5}
                      />
                    </div>
                    
                    <span
                      className="font-black select-none opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                      style={{ 
                        color: idx % 2 === 0 ? "var(--color-utama)" : "var(--color-aksen)",
                        fontSize: "clamp(2.5rem, 8vw, 3.5rem)",
                        lineHeight: 1,
                      }}
                    >
                      {item.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h4
                    className="font-bold tracking-tight mb-3"
                    style={{ 
                      color: "var(--color-teks)",
                      fontSize: "clamp(1.125rem, 3.5vw, 1.35rem)",
                    }}
                  >
                    {item.title}
                  </h4>

                  {/* Description */}
                  <p
                    className="leading-relaxed flex-grow"
                    style={{ 
                      color: "var(--color-teks-muted)",
                      fontSize: "clamp(0.8rem, 2.5vw, 0.875rem)",
                      lineHeight: "1.6",
                    }}
                  >
                    {item.desc}
                  </p>

                  {/* Decorative Line */}
                  <div
                    className="mt-5 h-0.5 rounded-full transition-all duration-500 group-hover:w-full"
                    style={{
                      backgroundColor: idx % 2 === 0 ? "var(--color-utama)" : "var(--color-aksen)",
                      width: "40px",
                      opacity: 0.4,
                    }}
                  />
                </div>

                {/* Bottom accent bar */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  style={{
                    backgroundColor: idx % 2 === 0 ? "var(--color-utama)" : "var(--color-aksen)",
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurValues;