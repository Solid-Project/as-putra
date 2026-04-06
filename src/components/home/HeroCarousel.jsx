import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroVideo from "@/assets/202601251341.mp4";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    type: "video",
    src: heroVideo,
    poster: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1920&q=80",
  },
  {
    type: "image",
    src: "https://plus.unsplash.com/premium_photo-1661930553507-59420df08d82?q=80&w=1074&auto=format&fit=crop",
  },
  { type: "image", src: "/img/prop2.jpeg" },
  { type: "image", src: "/img/hotel2.jpg" },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const bgRef = useRef(null);
  const scrollBtnRef = useRef(null);
    const scrollToNext = () => {
      // Mencari section berikutnya setelah hero untuk scroll otomatis
      const nextSection = sectionRef.current?.nextElementSibling;
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" });
      }
    };

  // Carousel auto-play
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Handle video play
  useEffect(() => {
    if (slides[current].type === "video" && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [current]);

  // ANIMASI HERO - DI MODIF UNTUK LENIS
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animation
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.3,
        }
      );

      // Animasi button stagger
      gsap.fromTo(
        contentRef.current.querySelectorAll("a"),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.6,
        }
      );

      // Floating effect - tetap jalan
      gsap.to(contentRef.current, {
        y: "-=12",
        repeat: -1,
        yoyo: true,
        duration: 3.5,
        ease: "sine.inOut",
      });

      // ⚠️ PARALLAX - MODIF untuk Lenis (gunakan scrub: true tetap aman dengan Lenis)
      gsap.to(bgRef.current, {
        y: 100,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5, // Lebih smooth
          invalidateOnRefresh: true, // Biar refresh saat resize
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="section min-h-screen relative overflow-hidden"
      id="hero-section" data-title="AS Putra" data-theme="dark"
    >
      {/* BACKGROUND */}
      <div ref={bgRef} className="absolute inset-0 z-0">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              idx === current ? "opacity-100" : "opacity-0"
            }`}
          >
            {slide.type === "video" ? (
              <video
                ref={idx === current ? videoRef : null}
                src={slide.src}
                poster={slide.poster}
                autoPlay={idx === current}
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.src})` }}
              />
            )}
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}
      </div>

      {/* CONTENT */}
      <div
        ref={contentRef}
        className="relative z-10 h-full flex items-center justify-center text-center px-5 min-h-screen"
      >
        <div>
          <h1 className="font-['Playfair_Display'] text-4xl md:text-6xl lg:text-7xl text-white mb-4 drop-shadow-lg">
            Membangun Masa Depan
          </h1>

          <p className="text-white/90 max-w-[600px] mx-auto mb-10 text-base md:text-lg">
            AS Putra merupakan grup usaha yang bergerak di berbagai sektor,
            dengan fokus pada pengembangan bisnis yang berkelanjutan dan
            bernilai jangka panjang.
          </p>

          {/* BUTTON MODERN & PROFESIONAL */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            {/* Button Primary */}
            <Link
              to="/sector"
              className="group relative px-8 py-3.5 bg-[var(--color-utama)] text-white font-medium tracking-wide rounded-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[var(--color-utama)]/20 hover:-translate-y-0.5"
            >
              <span className="relative z-10 flex items-center gap-2">
                Sektor Kami
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>

            {/* Button Secondary */}
            <Link
              to="/about"
              className="group relative px-8 py-3.5 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-medium tracking-wide rounded-full overflow-hidden transition-all duration-300 hover:bg-white/20 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <span className="relative z-10 flex items-center gap-2">
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
            </Link>
          </div>
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

export default HeroCarousel;