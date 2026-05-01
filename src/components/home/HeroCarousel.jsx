import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import heroVideo from "@/assets/202601251341.mp4";
import carousel1 from "@/assets/img/Carousel/herocarousel1.webp";
import carousel2 from "@/assets/img/Carousel/herocarousel2.webp";
import carousel3 from "@/assets/img/Carousel/herocarousel3.webp";
import carousel4 from "@/assets/img/Carousel/herocarousel4.jpg";
import carousel5 from "@/assets/img/Carousel/herocarousel5.webp";
import carousel6 from "@/assets/img/Carousel/herocarousel6.webp";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  { type: "video", src: heroVideo },
  { type: "image", src: carousel1 },
  { type: "image", src: carousel2 },
  { type: "image", src: carousel3 },
  { type: "image", src: carousel4 },
  { type: "image", src: carousel5 },
  { type: "image", src: carousel6 },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);

  const videoRef = useRef(null);
  const contentRef = useRef(null);
  const intervalRef = useRef(null);
  const ctxRef = useRef(null);

  // =========================
  // REFS TEKS
  // =========================
  const titleRef = useRef(null);
  const lineRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);
  const scrollBtnRef = useRef(null);

  // =========================
  // SCROLL KE SECTION BERIKUTNYA
  // =========================
  const scrollToNext = useCallback(() => {
    const section = document.querySelector(".section");
    const nextSection = section?.nextElementSibling;
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // =========================
  // ANIMASI DENGAN GSAP + SCROLLTRIGGER
  // =========================
  useEffect(() => {
    // Bersihkan ScrollTrigger sebelumnya
    if (ctxRef.current) {
      ctxRef.current.revert();
    }

    const section = document.querySelector(".section");

    const ctx = gsap.context(() => {
      // Buat timeline untuk entrance (sekali jalan, gak reverse)
      const entranceTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          once: true,
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
        "-=0.4"
      );

      // 3. Animasi Subtitle
      entranceTimeline.fromTo(subtitleRef.current, 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      );

      // 4. Animasi Buttons Stagger
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

      // Animasi Scroll Button
      gsap.fromTo(scrollBtnRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 1.2, ease: "power2.out" }
      );

    });

    ctxRef.current = ctx;

    return () => {
      if (ctxRef.current) {
        ctxRef.current.revert();
      }
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, []);

  // =========================
  // AUTOPLAY SLIDES
  // =========================
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (!isAnimating) {
        setCurrent((prev) => (prev + 1) % slides.length);
      }
    }, 6000);

    return () => clearInterval(intervalRef.current);
  }, [isAnimating]);

  // =========================
  // VIDEO CONTROL
  // =========================
  useEffect(() => {
    if (slides[current].type === "video" && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [current]);

  // =========================
  // SLIDES RENDER
  // =========================
  const renderedSlides = useMemo(
    () =>
      slides.map((slide, idx) => {
        const isActive = idx === current;

        return (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-700 ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {slide.type === "video" ? (
              <video
                ref={idx === current ? videoRef : null}
                src={slide.src}
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
                onCanPlay={() => setIsVideoReady(true)}
              />
            ) : (
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.src})` }}
              />
            )}

            <div className="absolute inset-0 bg-black/50" />
          </div>
        );
      }),
    [current]
  );

  return (
    <section
      className="section relative h-screen flex items-center justify-center text-center overflow-hidden bg-black"
      id="hero-section"
      data-theme="dark"
    >
      {/* BACKGROUND SLIDES */}
      <div className="absolute inset-0 z-0">
        {renderedSlides}
      </div>

      {/* CONTENT */}
      <div 
        ref={contentRef}
        className="relative z-10 w-full max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16"
      >
        {/* TITLE */}
        <h1
          ref={titleRef}
          className="font-['Playfair_Display'] text-white drop-shadow-lg leading-tight"
          style={{
            fontSize: "clamp(2rem, 6vw, 5rem)",
            marginBottom: "clamp(0.75rem, 2vw, 1rem)",
            opacity: 0,
            transform: "translateY(50px)"
          }}
        >
          Membangun <br className="sm:hidden" /> Masa Depan
        </h1>

        {/* LINE */}
        <div
          ref={lineRef}
          className="h-0.5 bg-[var(--color-utama)] mx-auto"
          style={{ 
            width: 0,
            marginBottom: "clamp(1.5rem, 4vw, 2.5rem)"
          }}
        />

        {/* SUBTITLE */}
        <p
          ref={subtitleRef}
          className="text-white/95 mx-auto leading-relaxed"
          style={{
            fontSize: "clamp(0.9rem, 2.5vw, 1.125rem)",
            maxWidth: "clamp(280px, 90%, 600px)",
            marginBottom: "clamp(1.5rem, 4vw, 2.5rem)",
            opacity: 0,
            transform: "translateY(20px)"
          }}
        >
          Bermula dari langkah sederhana, AS Putra berkembang menjadi perusahaan modern yang terus berinovasi dan berkontribusi dalam mendukung ketahanan pangan serta pembangunan berkelanjutan di Indonesia
        </p>

        {/* BUTTONS */}
        <div ref={buttonsRef}>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center">
            <Link
              to="/sector"
              className="group relative px-6 sm:px-8 py-3 sm:py-3.5 bg-[var(--color-utama)] text-white font-medium tracking-wide rounded-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[var(--color-utama)]/30 hover:-translate-y-0.5"
              style={{ 
                fontSize: "clamp(0.875rem, 2.5vw, 1rem)",
                opacity: 0,
                transform: "translateY(30px)"
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Sektor Kami
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>

            <Link
              to="/about"
              className="group relative px-6 sm:px-8 py-3 sm:py-3.5 bg-white/20 backdrop-blur-sm border border-white/40 text-white font-medium tracking-wide rounded-full overflow-hidden transition-all duration-300 hover:bg-white/30 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/20"
              style={{ 
                fontSize: "clamp(0.875rem, 2.5vw, 1rem)",
                opacity: 0,
                transform: "translateY(30px)"
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Tentang Kami
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* SCROLL INDICATOR (DESKTOP) */}
      <button
        ref={scrollBtnRef}
        onClick={scrollToNext}
        className="absolute z-20 hidden md:flex flex-col items-center gap-2 group cursor-pointer"
        style={{ 
          bottom: "clamp(1rem, 5vh, 3rem)", 
          right: "clamp(1rem, 5vw, 10%)",
          opacity: 0,
          transform: "translateY(20px)"
        }}
      >
        <span className="vertical-text text-[11px] font-black uppercase tracking-[0.5em] text-white/40 group-hover:text-[var(--color-utama)] transition-colors duration-500 mb-4">
          Scroll
        </span>
        <div className="flex flex-col items-center -space-y-2">
          {[1, 2, 3].map((i) => (
            <svg
              key={i}
              className="w-6 h-6 text-[var(--color-utama)] animate-bounce"
              style={{ opacity: 1 - (i * 0.2), animationDelay: `${i * 0.1}s` }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          ))}
        </div>
      </button>

      {/* SCROLL INDICATOR (MOBILE) */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 md:hidden flex flex-col items-center gap-1 group cursor-pointer"
      >
        <span className="text-[10px] font-medium uppercase tracking-widest text-white/50">Scroll</span>
        <svg className="w-5 h-5 text-white/60 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </section>
  );
};

export default HeroCarousel;