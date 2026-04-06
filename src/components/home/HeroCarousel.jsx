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
  { type: "image", src: "/react/img/prop2.jpeg" },
  { type: "image", src: "/react/img/hotel2.jpg" },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const contentRef = useRef(null);
  const bgRef = useRef(null);
  const scrollBtnRef = useRef(null);

  const scrollToNext = () => {
    const nextSection = sectionRef.current?.nextElementSibling;
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Carousel auto-play
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Handle video play
  useEffect(() => {
    if (slides[current].type === "video" && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [current]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. INITIAL REVEAL (Animasi Masuk)
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.5, ease: "expo.out", delay: 0.5 }
      );

      // 2. LIVE PARALLAX: BACKGROUND (Slight Zoom & Drift)
      // Background bergerak turun sedikit saat di-scroll
      gsap.to(bgRef.current, {
        yPercent: 15,
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // 3. LIVE PARALLAX: CONTENT (Lifting Effect)
      // Konten bergerak naik lebih cepat (kontras dengan BG)
      gsap.to(contentRef.current, {
        y: -100,
        opacity: 0.5,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // 4. FLOATING IDLE (Gerakan melayang halus saat diam)
      gsap.to(contentRef.current, {
        y: "-=10",
        repeat: -1,
        yoyo: true,
        duration: 3,
        ease: "sine.inOut",
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section min-h-screen relative overflow-hidden bg-black"
      id="hero-section" 
      data-title="AS Putra" 
      data-theme="dark"
    >
      {/* BACKGROUND LAYER */}
      <div ref={bgRef} className="absolute inset-0 z-0 scale-110">
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
            {/* Overlay Gradient Premium */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/60" />
          </div>
        ))}
      </div>

      {/* CONTENT LAYER */}
      <div
        ref={contentRef}
        className="relative z-10 h-full flex items-center justify-center text-center px-5 min-h-screen"
      >
        <div className="max-w-4xl">
          <h1 className="font-['Playfair_Display'] text-5xl md:text-7xl lg:text-8xl text-white mb-6 drop-shadow-2xl font-bold leading-[1.1]">
            Membangun <br /> Masa Depan
          </h1>

          <p className="text-white/80 max-w-[650px] mx-auto mb-12 text-lg md:text-xl font-light leading-relaxed">
            Ekosistem bisnis terintegrasi yang berfokus pada keberlanjutan 
            dan nilai jangka panjang untuk kemajuan bangsa.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to="/sector"
              className="group relative px-10 py-4 bg-[var(--color-utama)] text-white font-bold tracking-widest text-[10px] uppercase rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_rgba(var(--color-utama-rgb),0.3)]"
            >
              <span className="relative z-10">Sektor Kami</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </Link>

            <Link
              to="/about"
              className="group relative px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold tracking-widest text-[10px] uppercase rounded-full transition-all duration-500 hover:bg-white hover:text-black"
            >
              Tentang Kami
            </Link>
          </div>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <button
        ref={scrollBtnRef}
        onClick={scrollToNext}
        className="absolute bottom-12 right-[8%] z-20 hidden lg:flex flex-col items-center gap-4 group cursor-pointer"
      >
        <span className="vertical-text text-[10px] font-black uppercase tracking-[0.6em] text-white/30 group-hover:text-[var(--color-utama)] transition-colors duration-500">
          Scroll
        </span>
        <div className="flex flex-col items-center -space-y-3">
          {[1, 2, 3].map((i) => (
            <svg
              key={i}
              className={`w-8 h-8 text-[var(--color-utama)] animate-bounce opacity-${100 - (i * 20)}`}
              style={{ animationDelay: `${i * 0.2}s` }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          ))}
        </div>
      </button>
    </section>
  );
};

export default HeroCarousel;