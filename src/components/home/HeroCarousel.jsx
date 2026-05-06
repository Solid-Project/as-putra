import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

const HeroCarousel = ({ isActive, data }) => {
  const slides = useMemo(() => {
    return (
      data?.layout_data?.map((item) => ({
        type: item.type,
        src: item.path,
        caption: item.caption || "",
      })) || []
    );
  }, [data]);

  const [current, setCurrent] = useState(0);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isFirstLoaded, setIsFirstLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const videoRef = useRef(null);
  const intervalRef = useRef(null);
  const isReadyRef = useRef(false);

  const titleRef = useRef(null);
  const lineRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);
  const scrollBtnRef = useRef(null);

  const currentSlide = slides[current] || {};
  const isVideo = currentSlide?.type?.startsWith("video");

  // 🔥 PRELOAD IMAGE (sekali saja)
  useEffect(() => {
    if (!slides.length) return;

    let loaded = 0;
    const total = slides.filter(s => !s.type.startsWith("video")).length;

    if (total === 0) {
      setIsInitialLoading(false);
      return;
    }

    slides.forEach((slide) => {
      if (!slide.type.startsWith("video")) {
        const img = new Image();
        img.src = `http://localhost:8000/storage/${slide.src}`;
        img.onload = () => {
          loaded++;
          if (loaded === total) {
            setIsInitialLoading(false);
          }
        };
      }
    });
  }, [slides]);

  // 🔥 delay biar skeleton fade dulu
  useEffect(() => {
    if (!isInitialLoading) {
      const t = setTimeout(() => setShowContent(true), 400);
      return () => clearTimeout(t);
    }
  }, [isInitialLoading]);

  const startAutoPlay = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (isReadyRef.current && !document.hidden) {
        setCurrent((prev) => (prev + 1) % slides.length);
      }
    }, 6000);
  }, [slides.length]);

  const stopAutoPlay = useCallback(() => {
    clearInterval(intervalRef.current);
  }, []);

  // 🔥 GSAP hanya sekali
  useEffect(() => {
    if (!isActive) return;
    if (!showContent) return;
    if (isFirstLoaded) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          isReadyRef.current = true;
          startAutoPlay();
          setIsFirstLoaded(true);
        },
      });

      tl.fromTo(titleRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
        .fromTo(lineRef.current, { width: 0 }, { width: 80, duration: 0.6 }, "-=0.4")
        .fromTo(subtitleRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.3")
        .fromTo(buttonsRef.current.children, { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.15, duration: 0.8 }, "-=0.2");

      gsap.fromTo(scrollBtnRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, delay: 1.2 });
    });

    return () => ctx.revert();
  }, [isActive, showContent]);

  // 🔥 subtitle animasi saat slide ganti
  useEffect(() => {
    if (isActive && showContent) {
      gsap.fromTo(subtitleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 });
    }
  }, [current, isActive, showContent]);

  // 🔥 video handler
  useEffect(() => {
    if (!isVideo || !videoRef.current) return;

    const video = videoRef.current;
    video.currentTime = 0;
    video.play().catch(() => {});

    const handleEnded = () =>
      setCurrent((prev) => (prev + 1) % slides.length);

    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, [current, isVideo]);

  useEffect(() => () => clearInterval(intervalRef.current), []);

  if (!slides.length) return null;

  return (
    <section className="section relative h-screen flex items-center justify-center text-center overflow-hidden bg-black">

      {/* 🔥 SKELETON (ONLY ONCE) */}
      <div
        className={`absolute inset-0 z-20 transition-all duration-700 ${
          isInitialLoading
            ? "opacity-100"
            : "opacity-0 pointer-events-none blur-sm"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />

        <div className="absolute inset-0 overflow-hidden">
          <div className="w-[200%] h-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
            <div className="h-[60px] w-[60%] bg-white/10 mx-auto rounded mb-4" />
            <div className="h-[2px] w-[80px] bg-white/20 mx-auto mb-6" />
            <div className="h-[20px] w-[50%] bg-white/10 mx-auto rounded mb-8" />
            <div className="flex justify-center gap-4">
              <div className="h-[48px] w-[140px] bg-white/10 rounded-full" />
              <div className="h-[48px] w-[140px] bg-white/10 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* 🔥 SLIDES */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              idx === current ? "opacity-100 z-10" : "opacity-0"
            }`}
          >
            {slide.type?.startsWith("video") ? (
              <video
                ref={idx === current ? videoRef : null}
                src={`http://localhost:8000/storage/${slide.src}`}
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={`http://localhost:8000/storage/${slide.src}`}
                className="w-full h-full object-cover"
                alt=""
              />
            )}
            <div className="absolute inset-0 bg-black/50" />
          </div>
        ))}
      </div>

      {/* 🔥 CONTENT */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        <h1 ref={titleRef} className="text-white text-4xl md:text-6xl mb-4">
          {data?.title || "Membangun Masa Depan"}
        </h1>

        <div ref={lineRef} className="h-0.5 bg-[var(--color-utama)] mx-auto mb-6" style={{ width: 0 }} />

        <p ref={subtitleRef} className="text-white/90 mb-8">
          {currentSlide.caption || "Deskripsi singkat perusahaan"}
        </p>

        <div ref={buttonsRef} className="flex justify-center gap-4">
          <Link to="/sector" onClick={stopAutoPlay} className="bg-[var(--color-utama)] px-6 py-3 rounded-full text-white">
            Sektor Kami
          </Link>
          <Link to="/about" onClick={stopAutoPlay} className="bg-white/20 px-6 py-3 rounded-full text-white">
            Tentang Kami
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;