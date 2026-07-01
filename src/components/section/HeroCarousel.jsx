import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { useSectionAnimation } from "@/hooks/useSectionAnimation";

const ASSET_URL = import.meta.env.VITE_API_URL;

const HeroCarousel = ({ data, isActive, index }) => {
  const location = useLocation();

  const slides = useMemo(() => {
    return (
      data?.layout_data?.map((item) => ({
        type: item.type || "image",
        src: item.path,
        caption: item.caption || "",
      })) || []
    );
  }, [data]);

  // LOGIKA TOMBOL STATIS DAN PREMIUM SESUAI PAGE YANG AKTIF
  const activeButtons = useMemo(() => {
    switch (location.pathname) {
      // 1. Halaman Home
      case "/":
      case "/beranda":
        return [
          { label: "Sektor Bisnis", to: "/sector", primary: true },
          { label: "Tentang Kami", to: "/tentang", primary: false },
        ];
      
      // 2. Halaman Tentang Kami
      case "/tentang":
        return [
          { label: "Career AS Putra", to: "/karir", primary: true },
          { label: "Berita & Event", to: "/news", primary: false },
        ];
      
      // 3. Halaman Karir (Tanpa Button)
      case "/karir":
        return [];
      
      // 4. Halaman Berita (Tanpa Button)
      case "/news":
      case "/berita":
        return [];
      
      // Halaman Lain / Fallback
      default:
        return [];
    }
  }, [location.pathname]);

  const [current, setCurrent] = useState(0);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [isFirstLoaded, setIsFirstLoaded] = useState(false);

  const videoRef = useRef(null);
  const intervalRef = useRef(null);
  const isReadyRef = useRef(false);

  const titleRef = useRef(null);
  const lineRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);
  const sectionRef = useRef(null);

  const currentSlide = slides[current] || {};
  const isVideo = currentSlide?.type?.startsWith("video");

  // Preload Images (optimasi: hanya preload 1 gambar pertama, sisanya lazy)
  useEffect(() => {
    if (!slides.length) return;

    const images = slides.filter((s) => !s.type.startsWith("video"));
    if (images.length === 0) {
      setIsInitialLoading(false);
      return;
    }

    // Hanya preload slide pertama, sisanya biarkan loading="lazy" yang handle
    const img = new Image();
    img.src = `${ASSET_URL}/storage/${images[0].src}`;
    img.onload = () => setIsInitialLoading(false);
    img.onerror = () => setIsInitialLoading(false);
  }, [slides]);

  // Delay Content
  useEffect(() => {
    if (!isInitialLoading) {
      const timer = setTimeout(() => setShowContent(true), 300);
      return () => clearTimeout(timer);
    }
  }, [isInitialLoading]);

  // Autoplay
  const startAutoPlay = useCallback(() => {
    clearInterval(intervalRef.current);
    if (slides.length <= 1) return;

    intervalRef.current = setInterval(() => {
      if (isReadyRef.current && !document.hidden) {
        setCurrent((prev) => (prev + 1) % slides.length);
      }
    }, 6000);
  }, [slides.length]);

  const stopAutoPlay = useCallback(() => {
    clearInterval(intervalRef.current);
  }, []);

  useSectionAnimation(sectionRef, () => {
    if (!isActive || !showContent || isFirstLoaded) return;
    const tl = gsap.timeline({
      onComplete: () => {
        isReadyRef.current = true;
        startAutoPlay();
        setIsFirstLoaded(true);
      },
    });

    tl.fromTo(titleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power4.out", force3D: true });
    
    if (lineRef.current) {
      tl.fromTo(lineRef.current, { width: 0 }, { width: 80, duration: 0.6, ease: "power2.inOut", force3D: true }, "-=0.5");
    }

    tl.fromTo(subtitleRef.current, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, force3D: true }, "-=0.4");
    
    if (activeButtons.length > 0 && buttonsRef.current?.children?.length) {
      tl.fromTo(
        buttonsRef.current.children,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: "power2.out", force3D: true },
        "-=0.3"
      );
    }
  }, [isActive, showContent, isFirstLoaded, startAutoPlay, activeButtons]);

  // Video Handler
  useEffect(() => {
    if (!isVideo || !videoRef.current || !isActive) return;

    const video = videoRef.current;
    video.currentTime = 0;
    video.play().catch(() => console.log("Autoplay video tertahan browser"));

    const handleEnded = () => {
      setCurrent((prev) => (prev + 1) % slides.length);
    };

    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, [current, isVideo, slides.length, isActive]);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  if (!slides.length) return null;

  return (
    <section 
      ref={sectionRef}
      className="relative block h-dvh w-full text-center overflow-hidden bg-black snap-start"
      id={`section-${index}`}
      data-title={data?.title || "Hero"}
      data-theme="dark"
    >
      {/* Media Wrapper */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          {slides.map((slide, idx) => {
            const prevIdx = current === 0 ? slides.length - 1 : current - 1;
            const nextIdx = current === slides.length - 1 ? 0 : current + 1;
            const needImage = idx === current || idx === prevIdx || idx === nextIdx;

            return (
            <div
              key={idx}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                idx === current ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              {slide.type?.startsWith("video") ? (
                <video
                  ref={idx === current ? videoRef : null}
                  src={`${ASSET_URL}/storage/${slide.src}`}
                  muted
                  playsInline
                  className="w-full h-full object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                />
              ) : needImage ? (
                <img
                  src={`${ASSET_URL}/storage/${slide.src}`}
                  className="w-full h-full object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  alt=""
                />
              ) : null}
              <div className="absolute inset-0 bg-black/30 md:bg-gradient-to-b md:from-black/40 md:via-black/20 md:to-black/50" />
            </div>
            );
          })}
      </div>

      {/* Main Content */}
      <div className={`absolute inset-0 z-20 flex flex-col items-center justify-center w-full max-w-[1100px] mx-auto px-6 transition-opacity duration-700 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        
        <h1
          ref={titleRef}
          className="text-white font-bold text-3xl md:text-7xl leading-tight mb-3 md:mb-6 drop-shadow-lg"
        >
          {data?.title || "Membangun Masa Depan"}
        </h1>

        <div
          ref={lineRef}
          className="hidden md:block h-[3px] bg-[var(--color-utama)] mx-auto mb-8 rounded-full shadow-[0_0_10px_var(--color-utama)]"
          style={{ width: 0 }}
        />

        <p
          ref={subtitleRef}
          className="text-white/90 text-sm md:text-xl max-w-[300px] md:max-w-2xl mx-auto font-light leading-relaxed mb-6 md:mb-12 line-clamp-3 md:line-clamp-none"
        >
          {currentSlide.caption || "Deskripsi singkat perusahaan"}
        </p>

        {/* Dynamic Premium Buttons Render */}
        {activeButtons.length > 0 && (
          <div
            ref={buttonsRef}
            className="flex flex-row justify-center items-center gap-4 md:gap-5"
          >
            {activeButtons.map((btn, bIdx) => (
              <Link
                key={bIdx}
                to={btn.to}
                onClick={stopAutoPlay}
                className={
                  btn.primary
                    ? "relative px-7 md:px-9 py-3 md:py-4 rounded-full bg-[var(--color-utama)] text-white text-sm md:text-base font-bold tracking-wide transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.15)] hover:shadow-[0_0_25px_var(--color-utama)] hover:scale-105 active:scale-95 overflow-hidden group"
                    : "relative px-7 md:px-9 py-3 md:py-4 rounded-full bg-black/30 backdrop-blur-md text-white border border-white/30 text-sm md:text-base font-semibold tracking-wide transition-all duration-300 hover:border-white/60 hover:text-black hover:scale-105 active:scale-95 overflow-hidden group"
                }
              >
                {/* Background Animation Sliding Layer */}
                <span className={`absolute inset-0 w-full h-full transition-transform duration-300 ease-out -translate-x-full group-hover:translate-x-0 -z-10 ${
                  btn.primary ? 'bg-white/10' : 'bg-white'
                }`} />
                
                {/* Text Node */}
                <span className="relative z-10">{btn.label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-12 md:bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-1.5 md:gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-1 md:h-1.5 transition-all duration-500 rounded-full ${
              idx === current ? "w-5 md:w-8 bg-[var(--color-utama)]" : "w-1.5 md:w-2 bg-white/30"
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 md:hidden flex flex-col items-center gap-0.5 opacity-70 pointer-events-none">
        <span className="text-[9px] text-white/50 uppercase tracking-widest font-medium">Scroll</span>
        <div className="flex flex-col items-center -space-y-1">
          <div className="w-2 h-2 border-b-2 border-r-2 border-white/60 rotate-45 animate-arrow-1"></div>
          <div className="w-2 h-2 border-b-2 border-r-2 border-white/60 rotate-45 animate-arrow-2"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;