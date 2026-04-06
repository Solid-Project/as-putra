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
  { type: "image", src: "/react/img/prop2.webp" },
  { type: "image", src: "/react/img/hotel2.webp" },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const lineRef = useRef(null);
  const subtitleRef = useRef(null);
  const scrollBtnRef = useRef(null);
  const bgRef = useRef(null);

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
      // 1. Animasi Title (Sesuai HeroNews)
      gsap.fromTo(titleRef.current, { y: 50, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          end: "bottom 70%",
          toggleActions: "play none none reverse",
          immediateRender: false,
          invalidateOnRefresh: true
        }
      });

      // 2. Animasi Line (Sesuai HeroNews)
      gsap.fromTo(lineRef.current, { width: 0 }, {
        width: 80,
        duration: 0.6,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          end: "bottom 70%",
          toggleActions: "play none none reverse",
          immediateRender: false,
          invalidateOnRefresh: true
        }
      });

      // 3. Animasi Subtitle (Sesuai HeroNews)
      gsap.fromTo(subtitleRef.current, { y: 20, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          end: "bottom 70%",
          toggleActions: "play none none reverse",
          immediateRender: false,
          invalidateOnRefresh: true
        }
      });

      // 4. Animasi Buttons Stagger (Sesuai HeroNews)
      gsap.fromTo(contentRef.current.querySelectorAll("a"), { y: 30, opacity: 0 }, {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.6,
      });

      // 5. Parallax Background
      gsap.to(bgRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section min-h-screen relative flex items-center justify-center text-center overflow-hidden bg-black"
      id="hero-section"
      data-theme="dark"
      data-title="AS Putra"
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
                muted loop autoPlay playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.src})` }}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/50" />
          </div>
        ))}
      </div>

      {/* CONTENT LAYER */}
      <div ref={contentRef} className="relative z-10 px-5">
        <h1
          ref={titleRef}
          className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl text-white mb-4 drop-shadow-lg leading-[1.1]"
        >
          Membangun <br /> Masa Depan
        </h1>

        <div
          ref={lineRef}
          className="h-0.5 bg-[var(--color-utama)] mx-auto mb-10"
          style={{ width: 0 }}
        />

        <p
          ref={subtitleRef}
          className="text-white/95 max-w-[600px] mx-auto mb-10 text-lg leading-relaxed"
        >
          Ekosistem bisnis terintegrasi yang berfokus pada keberlanjutan 
          dan nilai jangka panjang untuk kemajuan bangsa.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <Link
            to="/sector"
            className="group relative px-8 py-3.5 bg-[var(--color-utama)] text-white font-medium tracking-wide rounded-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[var(--color-utama)]/30 hover:-translate-y-0.5"
          >
            <span className="relative z-10 flex items-center gap-2">
              Sektor Kami
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Link>

          <Link
            to="/about"
            className="group relative px-8 py-3.5 bg-white/20 backdrop-blur-sm border border-white/40 text-white font-medium tracking-wide rounded-full overflow-hidden transition-all duration-300 hover:bg-white/30 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/20"
          >
            <span className="relative z-10 flex items-center gap-2">
              Tentang Kami
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </Link>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <button
        ref={scrollBtnRef}
        onClick={scrollToNext}
        className="absolute bottom-12 right-[10%] z-20 hidden lg:flex flex-col items-center gap-2 group cursor-pointer"
      >
        <span className="vertical-text text-[11px] font-black uppercase tracking-[0.5em] text-white/40 group-hover:text-[var(--color-utama)] transition-colors duration-500 mb-4">
          Scroll
        </span>

        <div className="flex flex-col items-center -space-y-2">
          {[1, 2, 3].map((i) => (
            <svg
              key={i}
              className={`w-8 h-8 text-[var(--color-utama)] animate-bounce opacity-${100 - (i * 20)}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{ animationDelay: `${i * 0.2}s` }}
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