// src/components/layouts/IntroSection.jsx
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import livestockImg from '@/assets/img/Carousel/herocarousel6.webp';

gsap.registerPlugin(ScrollTrigger);

const IntroSection = ({ title, image }) => {
  const sectionRef = useRef(null);
  const titleWrapperRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const parallaxImgRef = useRef(null);
  const floatRef = useRef(null);

  const displayTitle = title || "Sektor Ekspedisi";
  const displayImage = image || livestockImg;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const shapes = floatRef.current?.children;
      if (shapes) {
        if (shapes[0]) {
          gsap.to(shapes[0], {
            y: 40, x: 30, rotate: 15, duration: 12, repeat: -1, yoyo: true, ease: "sine.inOut",
          });
        }
        if (shapes[1]) {
          gsap.to(shapes[1], {
            y: -30, x: -20, rotate: -10, duration: 10, repeat: -1, yoyo: true, ease: "sine.inOut",
          });
        }
        if (shapes[2]) {
          gsap.to(shapes[2], {
            y: 25, x: -15, rotate: 8, duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut",
          });
        }
      }

      gsap.fromTo(titleWrapperRef.current.children,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current, start: "top 70%", toggleActions: "play none none reverse",
          }
        }
      );

      gsap.fromTo(imageWrapperRef.current,
        { x: 100, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1.5, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" }
        }
      );

      gsap.to(parallaxImgRef.current, {
        yPercent: 15, ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1 }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [displayTitle]);

  const titleWords = displayTitle.split(' ');

  return (
    <section
      ref={sectionRef}
      className="section relative bg-white overflow-hidden"
      id="intro-section"
      data-theme="light"
      data-title={displayTitle}
      style={{
        height: "100vh",
        minHeight: "600px",
        maxHeight: "1080px",
        paddingLeft: "clamp(1rem, 6%, 6rem)",
        paddingRight: "clamp(1rem, 6%, 6rem)",
      }}
    >
      {/* BACKGROUND SHAPES */}
      <div ref={floatRef} className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute rounded-full blur-3xl"
          style={{
            backgroundColor: "var(--color-utama)",
            opacity: 0.06,
            width: "min(60vw, 600px)",
            height: "min(60vw, 600px)",
            top: "-15%",
            right: "-10%",
          }}
        />
        <div
          className="absolute rounded-full blur-2xl"
          style={{
            backgroundColor: "var(--color-aksen)",
            opacity: 0.05,
            width: "min(40vw, 400px)",
            height: "min(40vw, 400px)",
            bottom: "-10%",
            left: "-5%",
          }}
        />
        <div
          className="absolute opacity-30 hidden lg:block"
          style={{
            backgroundImage: "radial-gradient(var(--color-utama) 2px, transparent 2px)",
            backgroundSize: "clamp(16px, 3vw, 24px) clamp(16px, 3vw, 24px)",
            width: "min(30vw, 250px)",
            height: "min(30vw, 250px)",
            top: "20%",
            left: "10%",
          }}
        />
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(to right, var(--color-utama) 1px, transparent 1px),
                linear-gradient(to bottom, var(--color-utama) 1px, transparent 1px)
              `,
              backgroundSize: "clamp(30px, 5vw, 50px) clamp(30px, 5vw, 50px)",
            }}
          />
        </div>
      </div>

      {/* Label Vertikal */}
      <div className="absolute left-[clamp(1rem,3%,3rem)] top-1/2 -translate-y-1/2 -rotate-90 hidden lg:block z-30 pointer-events-none">
        <span 
          className="font-black tracking-[0.5em] uppercase"
          style={{
            color: "var(--color-teks-muted)",
            opacity: 0.3,
            fontSize: "clamp(10px, 1.5vw, 12px)",
          }}
        >
          Sectors
        </span>
      </div>

      <div className="relative z-10 w-full h-full flex items-center">
        <div className="w-full grid lg:grid-cols-12 items-center">
          
          {/* KOLOM KIRI: JUDUL */}
          <div ref={titleWrapperRef} className="lg:col-span-5 flex flex-col justify-center z-20 pointer-events-none">
            {titleWords.map((word, i) => (
              <h1
                key={i}
                className="font-['Playfair_Display'] font-black leading-[0.85] tracking-tighter"
                style={{
                  color: "var(--color-teks)",
                  fontSize: `clamp(2.5rem, ${i === 0 ? '12vw' : '10vw'}, ${i === 0 ? '8rem' : '7rem'})`,
                  marginTop: i !== 0 ? "clamp(-0.25rem, -1vw, -0.5rem)" : 0,
                }}
              >
                {word}
              </h1>
            ))}
          </div>

          {/* KOLOM KANAN: GAMBAR */}
          <div 
            ref={imageWrapperRef}
            className="lg:col-span-7 relative flex items-center justify-end"
            style={{ height: "clamp(300px, 60vh, 85%)" }}
          >
            <div className="w-full h-full overflow-hidden rounded-sm relative shadow-2xl">
              <img
                ref={parallaxImgRef}
                src={displayImage}
                alt={displayTitle}
                className="w-full h-[120%] object-cover scale-110 will-change-transform" 
                style={{ objectPosition: 'center 20%' }}
              />
              <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-white via-white/40 to-transparent hidden lg:block z-10 pointer-events-none" />
              <div className="absolute inset-0 bg-white/20 lg:hidden block z-10 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;