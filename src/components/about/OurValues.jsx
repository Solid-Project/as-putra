import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Handshake, Zap, Shield, Target, Trophy } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const OurValues = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const floatRef = useRef(null);
  const headerRef = useRef(null);
  const descriptionRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  const values = [
    {
      number: "01",
      title: "Berinovasi untuk Terus Bertumbuh",
      desc: "Terbuka terhadap teknologi dan pembaruan di setiap lini usaha untuk meningkatkan kualitas dan efisiensi.",
      icon: Handshake,
    },
    {
      number: "02",
      title: "Menjaga Amanah dengan Sepenuh Hati",
      desc: "Menjalankan bisnis dengan jujur, bertanggung jawab, dan menjaga kualitas serta tujuan perusahaan.",
      icon: Zap,
    },
    {
      number: "03",
      title: "Berkarya dengan Hati, Bekerja dengan Kebanggaan",
      desc: "Bekerja dengan bangga, penuh tanggung jawab, dan memberikan kontribusi terbaik di setiap peran.",
      icon: Shield,
    },
    {
      number: "04",
      title: "Tumbuh Bersama, Menguatkan Satu Sama Lain",
      desc: "Membangun kolaborasi antar lini usaha dan lingkungan untuk menciptakan pertumbuhan yang berkelanjutan.",
      icon: Target,
    },
    {
      number: "05",
      title: "Memberi Dampak Nyata bagi Sesama",
      desc: "Menghadirkan dampak positif bagi masyarakat dan lingkungan melalui setiap aktivitas bisnis.",
      icon: Trophy,
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Bersihkan ScrollTrigger sebelumnya
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars.trigger === section) {
        trigger.kill();
      }
    });

    // SET INITIAL STATE - HIDDEN
    gsap.set(cardsRef.current, {
      y: 50,
      opacity: 0
    });
    gsap.set([headerRef.current, descriptionRef.current], {
      y: 30,
      opacity: 0
    });

    // INTERSECTION OBSERVER UNTUK DETEKSI SECTION AKTIF
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true;
            
            // ENTRANCE ANIMATION
            gsap.to([headerRef.current, descriptionRef.current], {
              y: 0,
              opacity: 1,
              stagger: 0.1,
              duration: 0.7,
              ease: "power3.out",
              overwrite: true
            });
            
            gsap.to(cardsRef.current, {
              y: 0,
              opacity: 1,
              stagger: 0.08,
              duration: 0.8,
              ease: "power3.out",
              delay: 0.2,
              overwrite: true
            });
          } else if (!entry.isIntersecting && hasAnimatedRef.current) {
            // RESET SAAT SECTION KELUAR
            hasAnimatedRef.current = false;
            gsap.set(cardsRef.current, {
              y: 50,
              opacity: 0
            });
            gsap.set([headerRef.current, descriptionRef.current], {
              y: 30,
              opacity: 0
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(section);

    // PARALLAX CARDS - Lebih ringan
    cardsRef.current.forEach((card, idx) => {
      if (!card) return;

      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.8,
        onUpdate: (self) => {
          const progress = self.progress;
          const range = 25;
          const direction = idx % 2 === 0 ? 1 : -1;
          const moveY = direction * (progress * range);
          card.style.transform = `translate3d(0, ${moveY}px, 0)`;
        }
      });
    });

    // PARALLAX SHAPES - Lebih ringan
    const shapes = floatRef.current?.children;
    if (shapes) {
      const shapeParallax = (el, range, rotate = false) => {
        if (!el) return;
        ScrollTrigger.create({
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
          onUpdate: (self) => {
            const progress = self.progress;
            const moveY = -range * progress;
            el.style.transform = `translate3d(0, ${moveY}%, 0)${rotate ? ` rotate(${45 * progress}deg)` : ''}`;
          }
        });
      };

      if (shapes[0]) shapeParallax(shapes[0], 40);
      if (shapes[1]) shapeParallax(shapes[1], 30, true);
      if (shapes[2]) shapeParallax(shapes[2], 60);
      if (shapes[3]) shapeParallax(shapes[3], 35);
    }

    return () => {
      observer.disconnect();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === section) {
          trigger.kill();
        }
      });
      gsap.killTweensOf([cardsRef.current, headerRef.current, descriptionRef.current]);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section relative overflow-hidden"
      id="our-values"
      style={{
        minHeight: "auto",
        paddingTop: "clamp(3rem, 8vh, 6rem)",
        paddingBottom: "clamp(4rem, 10vh, 7rem)",
        backgroundColor: "var(--color-bg-light)",
      }}
    >
      {/* BACKGROUND IMAGE - ringan */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/react/img/mission.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.08,
          zIndex: 0,
        }}
      />

      {/* OVERLAY GRADIENT - ringan */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              to bottom,
              var(--color-bg-light) 0%,
              rgba(255,255,255,0.9) 20%,
              rgba(255,255,255,0.7) 50%,
              rgba(255,255,255,0.9) 80%,
              var(--color-bg-light) 100%
            )
          `,
          zIndex: 1,
        }}
      />

      {/* BACKGROUND SHAPES */}
      <div ref={floatRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
        <div
          className="absolute rounded-full blur-3xl"
          style={{
            backgroundColor: "var(--color-utama)",
            opacity: 0.06,
            width: "min(40vw, 350px)",
            height: "min(40vw, 350px)",
            top: "10%",
            left: "-5%",
          }}
        />

        <div
          className="absolute bottom-0 right-0 rounded-full blur-3xl"
          style={{
            backgroundColor: "var(--color-aksen)",
            opacity: 0.05,
            width: "min(35vw, 300px)",
            height: "min(35vw, 300px)",
            bottom: "-5%",
            right: "-3%",
          }}
        />

        <div
          className="absolute rotate-12 rounded-2xl opacity-40 hidden lg:block"
          style={{
            border: "1px solid var(--color-utama)",
            width: "min(12vw, 100px)",
            height: "min(12vw, 100px)",
            top: "20%",
            right: "8%",
          }}
        />

        <div
          className="absolute opacity-15 hidden md:block"
          style={{
            backgroundImage:
              "radial-gradient(var(--color-utama) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            width: "min(20vw, 150px)",
            height: "min(20vw, 150px)",
            bottom: "15%",
            left: "3%",
          }}
        />
      </div>

      {/* GRID LINES - tipis */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ zIndex: 2 }}>
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

      <div 
        className="mx-auto relative"
        style={{
          maxWidth: "1280px",
          paddingLeft: "clamp(1rem, 5vw, 2rem)",
          paddingRight: "clamp(1rem, 5vw, 2rem)",
          zIndex: 10,
        }}
      >
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-8 mb-12 lg:mb-16">
          <div ref={headerRef} className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
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
              The Principles That Guide Our <span style={{ color: "var(--color-utama)" }}>Growth</span>
            </h2>
          </div>

          <p
            ref={descriptionRef}
            className="font-light max-w-md mx-auto lg:mx-0 text-center lg:text-left lg:border-l-2 lg:pl-8 leading-relaxed"
            style={{
              color: "var(--color-teks-muted)",
              borderColor: "var(--color-utama)",
              fontSize: "clamp(0.875rem, 2vw, 1rem)",
            }}
          >
            Nilai-nilai ini menjadi pondasi dalam setiap langkah AS Putra dalam bekerja, berinovasi, dan membangun setiap sektor bisnis secara berkelanjutan.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-7 lg:gap-6">
          {values.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                ref={(el) => {
                  if (el) cardsRef.current[idx] = el;
                }}
                className="group relative bg-white/95 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl border border-gray-100 hover:border-gray-200 flex flex-col overflow-hidden hover:-translate-y-1"
                style={{
                  minHeight: "320px",
                }}
              >
                {/* Gradient background on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${idx % 2 === 0 ? 'var(--color-utama)' : 'var(--color-aksen)'}08, transparent)`,
                  }}
                />

                {/* Decorative circle background */}
                <div
                  className="absolute rounded-full opacity-10 group-hover:opacity-15 transition-opacity duration-300"
                  style={{
                    backgroundColor: idx % 2 === 0 ? "var(--color-utama)" : "var(--color-aksen)",
                    width: "min(130px, 35vw)",
                    height: "min(130px, 35vw)",
                    top: "-20%",
                    right: "-20%",
                  }}
                />

                {/* Content Container */}
                <div className="relative z-10 flex flex-col h-full p-6 md:p-7">
                  {/* Icon & Number Row */}
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className="flex items-center justify-center rounded-2xl shadow-md transition-all duration-300 group-hover:scale-105"
                      style={{
                        backgroundColor: idx % 2 === 0 ? "var(--color-utama)" : "var(--color-aksen)",
                        width: "clamp(48px, 10vw, 56px)",
                        height: "clamp(48px, 10vw, 56px)",
                      }}
                    >
                      <IconComponent 
                        className="text-white"
                        size={24}
                        strokeWidth={1.5}
                      />
                    </div>
                    
                    <span
                      className="font-black select-none opacity-10 group-hover:opacity-15 transition-opacity duration-300"
                      style={{ 
                        color: idx % 2 === 0 ? "var(--color-utama)" : "var(--color-aksen)",
                        fontSize: "clamp(2rem, 7vw, 3rem)",
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
                      fontSize: "clamp(1rem, 3vw, 1.25rem)",
                    }}
                  >
                    {item.title}
                  </h4>

                  {/* Description */}
                  <p
                    className="leading-relaxed flex-grow"
                    style={{ 
                      color: "var(--color-teks-muted)",
                      fontSize: "clamp(0.75rem, 2vw, 0.875rem)",
                      lineHeight: "1.6",
                    }}
                  >
                    {item.desc}
                  </p>

                  {/* Decorative Line */}
                  <div
                    className="mt-5 h-0.5 rounded-full transition-all duration-300 group-hover:w-full"
                    style={{
                      backgroundColor: idx % 2 === 0 ? "var(--color-utama)" : "var(--color-aksen)",
                      width: "40px",
                      opacity: 0.4,
                    }}
                  />
                </div>

                {/* Bottom accent bar */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
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