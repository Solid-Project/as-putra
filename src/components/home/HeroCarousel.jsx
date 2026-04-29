import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import heroVideo from "@/assets/202601251341.mp4";
import useSectionAnimation, { sectionAnimations } from "@/hooks/useSectionAnimation"; // Import hook

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
  { type: "image", src: "/react/img/prop2.webp" },
  { type: "image", src: "/react/img/hotel2.webp" },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  
  const videoRef = useRef(null);
  const contentRef = useRef(null);
  const intervalRef = useRef(null);
  
  // 🔥 PAKAI useSectionAnimation untuk title, line, subtitle
  const titleRef = useSectionAnimation(
    (element) => sectionAnimations.fadeInUp(element),
    { delay: 100, threshold: 0.3, once: true }
  );
  
  const lineRef = useSectionAnimation(
    (element) => {
      gsap.fromTo(element, 
        { width: 0 }, 
        { width: 80, duration: 0.5, ease: "back.out(1)" }
      );
    },
    { delay: 150, threshold: 0.3, once: true }
  );
  
  const subtitleRef = useSectionAnimation(
    (element) => sectionAnimations.fadeInUp(element),
    { delay: 200, threshold: 0.3, once: true }
  );
  
  // 🔥 Untuk buttons dengan stagger
  const buttonsRef = useSectionAnimation(
    (element) => {
      const buttons = element.querySelectorAll("a");
      gsap.fromTo(buttons, 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power2.out" }
      );
    },
    { delay: 250, threshold: 0.3, once: true }
  );

  // Preload image berikutnya
  const preloadNextImage = useCallback((nextIndex) => {
    const nextSlide = slides[nextIndex % slides.length];
    if (nextSlide.type === "image") {
      const img = new Image();
      img.src = nextSlide.src;
    }
  }, []);

  // Change slide dengan smooth transition
  const changeSlide = useCallback((newIndex) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    preloadNextImage(newIndex + 1);
    
    const currentSlide = document.querySelector(`.slide-${current}`);
    const nextSlideEl = document.querySelector(`.slide-${newIndex}`);
    
    if (nextSlideEl) {
      gsap.to(currentSlide, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => {
          setCurrent(newIndex);
          gsap.to(nextSlideEl, {
            opacity: 1,
            duration: 0.6,
            ease: "power2.inOut",
            onComplete: () => setIsAnimating(false)
          });
        }
      });
    } else {
      setCurrent(newIndex);
      setTimeout(() => setIsAnimating(false), 100);
    }
  }, [current, isAnimating, preloadNextImage]);

  // Carousel autoplay
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (!isAnimating) {
        changeSlide((current + 1) % slides.length);
      }
    }, 6000);
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [current, isAnimating, changeSlide]);

  // Handle video
  useEffect(() => {
    if (slides[current].type === "video" && videoRef.current && isVideoReady) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [current, isVideoReady]);

  // Scroll ke section berikutnya
  const scrollToNext = useCallback(() => {
    const section = titleRef.current?.closest('.section');
    const nextSection = section?.nextElementSibling;
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  }, [titleRef]);

  // Render slides dengan optimasi
  const renderedSlides = useMemo(() => slides.map((slide, idx) => {
    const isCurrent = idx === current;
    const isNearby = Math.abs(idx - current) <= 1;
    
    if (!isCurrent && !isNearby) return null;
    
    return (
      <div
        key={idx}
        className={`slide-${idx} absolute inset-0 transition-opacity duration-700 ${
          isCurrent ? "opacity-100 z-10" : "opacity-0 z-0"
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
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
            onCanPlay={() => setIsVideoReady(true)}
          />
        ) : (
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.src})` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
      </div>
    );
  }), [current]);

  return (
    <section
      className="section relative flex items-center justify-center text-center overflow-hidden bg-black"
      id="hero-section"
      data-theme="dark"
      style={{ minHeight: "100vh", height: "100vh", maxHeight: "100vh" }}
    >
      {/* Background Slides */}
      <div className="absolute inset-0 z-0">
        {renderedSlides}
      </div>

      {/* Content - Gunakan refs dari useSectionAnimation */}
      <div 
        ref={contentRef}
        className="relative z-10 w-full max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16"
      >
        <h1
          ref={titleRef}
          className="font-['Playfair_Display'] text-white drop-shadow-lg leading-tight"
          style={{
            fontSize: "clamp(2rem, 6vw, 5rem)",
            marginBottom: "clamp(0.75rem, 2vw, 1rem)",
            opacity: 0 // Awal invisible, nanti dianimasi oleh hook
          }}
        >
          Membangun <br className="sm:hidden" /> Masa Depan
        </h1>

        <div
          ref={lineRef}
          className="h-0.5 bg-[var(--color-utama)] mx-auto"
          style={{ 
            width: 0,
            marginBottom: "clamp(1.5rem, 4vw, 2.5rem)"
          }}
        />

        <p
          ref={subtitleRef}
          className="text-white/95 mx-auto leading-relaxed"
          style={{
            fontSize: "clamp(0.9rem, 2.5vw, 1.125rem)",
            maxWidth: "clamp(280px, 90%, 600px)",
            marginBottom: "clamp(1.5rem, 4vw, 2.5rem)",
            opacity: 0
          }}
        >
          Ekosistem bisnis terintegrasi yang berfokus pada keberlanjutan 
          dan nilai jangka panjang untuk kemajuan bangsa.
        </p>

        {/* Buttons container dengan ref untuk stagger animation */}
        <div ref={buttonsRef}>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center">
            <Link
              to="/sector"
              className="group relative px-6 sm:px-8 py-3 sm:py-3.5 bg-[var(--color-utama)] text-white font-medium tracking-wide rounded-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[var(--color-utama)]/30 hover:-translate-y-0.5"
              style={{ fontSize: "clamp(0.875rem, 2.5vw, 1rem)" }}
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
              style={{ fontSize: "clamp(0.875rem, 2.5vw, 1rem)" }}
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

      {/* Scroll Indicators */}
      <button
        onClick={scrollToNext}
        className="absolute z-20 hidden md:flex flex-col items-center gap-2 group cursor-pointer"
        style={{ bottom: "clamp(1rem, 5vh, 3rem)", right: "clamp(1rem, 5vw, 10%)" }}
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