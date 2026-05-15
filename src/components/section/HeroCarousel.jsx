import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

const ASSET_URL = import.meta.env.VITE_API_URL;

const HeroCarousel = ({ data, isActive, index }) => {
  // Parsing slides dari layout_data yang dikirim dari API
  const slides = useMemo(() => {
    return (
      data?.layout_data?.map((item) => ({
        type: item.type || "image",
        src: item.path,
        caption: item.caption || "",
      })) || []
    );
  }, [data]);

  const [current, setCurrent] = useState(0);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [isFirstLoaded, setIsFirstLoaded] = useState(false);

  const videoRef = useRef(null);
  const intervalRef = useRef(null);
  const isReadyRef = useRef(false);

  // Refs untuk Animasi GSAP
  const titleRef = useRef(null);
  const lineRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);

  const currentSlide = slides[current] || {};
  const isVideo = currentSlide?.type?.startsWith("video");

  // 1. PRELOAD IMAGES untuk menghindari flickering
  useEffect(() => {
    if (!slides.length) return;

    const images = slides.filter((s) => !s.type.startsWith("video"));
    if (images.length === 0) {
      setIsInitialLoading(false);
      return;
    }

    let loadedCount = 0;
    images.forEach((slide) => {
      const img = new Image();
      img.src = `${ASSET_URL}/storage/${slide.src}`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === images.length) setIsInitialLoading(false);
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === images.length) setIsInitialLoading(false);
      };
    });
  }, [slides]);

  // 2. Delay tampilkan konten setelah loading selesai
  useEffect(() => {
    if (!isInitialLoading) {
      const timer = setTimeout(() => setShowContent(true), 300);
      return () => clearTimeout(timer);
    }
  }, [isInitialLoading]);

  // 3. Autoplay Logic
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

  // 4. GSAP Entrance Animation (Hanya jalan saat section AKTIF)
  useEffect(() => {
    if (!isActive || !showContent || isFirstLoaded) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          isReadyRef.current = true;
          startAutoPlay();
          setIsFirstLoaded(true);
        },
      });

      tl.fromTo(titleRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power4.out" })
        .fromTo(lineRef.current, { width: 0 }, { width: 80, duration: 0.8, ease: "power2.inOut" }, "-=0.6")
        .fromTo(subtitleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.4")
        .fromTo(
          buttonsRef.current.children,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.2, duration: 0.6 },
          "-=0.3"
        );
    });

    return () => ctx.revert();
  }, [isActive, showContent, isFirstLoaded, startAutoPlay]);

  // 5. Animasi teks saat slide berubah
  useEffect(() => {
    if (isActive && showContent && isFirstLoaded) {
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [current, isActive, showContent, isFirstLoaded]);

  // 6. Video Handler (Play/Pause & Auto-next)
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
      className="relative h-screen w-full flex items-center justify-center text-center overflow-hidden bg-black"
      id={`section-${index}`}
      data-title={data?.title || "Hero"}
      data-theme="dark"
    >
      {/* Skeleton Overlay */}
      <div
        className={`absolute inset-0 z-30 bg-gray-950 transition-opacity duration-1000 ${
          isInitialLoading ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Media Slides */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${
              idx === current ? "opacity-100" : "opacity-0"
            }`}
          >
            {slide.type?.startsWith("video") ? (
              <video
                ref={idx === current ? videoRef : null}
                src={`${ASSET_URL}/storage/${slide.src}`}
                muted
                playsInline
                className="w-full h-full object-cover scale-105"
              />
            ) : (
              <img
                src={`${ASSET_URL}/storage/${slide.src}`}
                className="w-full h-full object-cover scale-105"
                alt=""
              />
            )}
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
          </div>
        ))}
      </div>

      {/* Content Container */}
      <div className={`relative z-20 w-full max-w-[1100px] mx-auto px-6 transition-opacity duration-700 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        
        <h1
          ref={titleRef}
          className="text-white font-bold text-4xl sm:text-6xl md:text-7xl leading-tight mb-6 drop-shadow-lg"
        >
          {data?.title || "Membangun Masa Depan"}
        </h1>

        <div
          ref={lineRef}
          className="h-[3px] bg-[var(--color-utama)] mx-auto mb-8 rounded-full shadow-[0_0_15px_var(--color-utama)]"
          style={{ width: 0 }}
        />

        <div className="min-h-[3rem] mb-12">
          <p
            ref={subtitleRef}
            className="text-white/90 text-base sm:text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed"
          >
            {currentSlide.caption || "Deskripsi singkat perusahaan"}
          </p>
        </div>

        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row justify-center items-center gap-5"
        >
          <Link
            to="/sektor"
            onClick={stopAutoPlay}
            className="group relative px-8 py-4 rounded-full bg-[var(--color-utama)] text-white font-bold overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl"
          >
            <span className="relative z-10">Sektor Kami</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Link>

          <Link
            to="/tentang"
            onClick={stopAutoPlay}
            className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/30 font-medium hover:bg-white/20 transition-all hover:scale-105"
          >
            Tentang Kami
          </Link>
        </div>
      </div>

      {/* Pagination Dots (Optional Visual) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-1.5 transition-all duration-500 rounded-full ${
              idx === current ? "w-8 bg-[var(--color-utama)]" : "w-2 bg-white/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;