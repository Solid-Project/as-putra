import OptimizedImage from "@/components/ui/OptimizedImage";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import sectorBg from '@/assets/img/sektor.webp';

gsap.registerPlugin(ScrollTrigger);

const HeroSector = ({ data, index }) => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const lineRef = useRef(null);
  const subtitleRef = useRef(null);

  // Data Binding dari JSON
  const displayTitle = data?.title || "Unit Bisnis Kami";
  const displayDescription = data?.description || "";
  const displayImage = data?.image 
    ? `${import.meta.env.VITE_API_URL}/storage/${data.image}` 
    : sectorBg;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animasi Judul
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Animasi Garis Aksen
      gsap.fromTo(
        lineRef.current,
        { width: 0 },
        {
          width: 80,
          duration: 0.6,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section relative block h-screen w-full text-center overflow-hidden bg-black snap-start"
      id={`section-${index}`}
      data-theme="dark"
      data-title={displayTitle}
      data-hide-nav="true"
    >
      {/* Background Media */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-slate-900">
        <OptimizedImage
          src={displayImage}
          alt="Hero Background"
          className="w-full h-full object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ filter: "brightness(0.8)" }}
        />
        <div className="absolute inset-0 bg-black/30 md:bg-gradient-to-b md:from-black/40 md:via-black/20 md:to-black/50" />
      </div>

      {/* Konten Utama Tengah */}
      <div ref={contentRef} className="absolute inset-0 z-20 flex flex-col items-center justify-center w-full max-w-[1100px] mx-auto px-6">
        <h1
          ref={titleRef}
          className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-7xl text-white mb-4 drop-shadow-lg"
        >
          {displayTitle}
        </h1>
        <div
          ref={lineRef}
          className="h-[3px] bg-[var(--color-utama)] mx-auto mb-8 rounded-full shadow-[0_0_10px_var(--color-utama)]"
          style={{ width: 0 }}
        />
        <p
          ref={subtitleRef}
          className="text-white/95 max-w-[600px] md:max-w-2xl mx-auto mb-10 text-lg md:text-xl font-light leading-relaxed"
        >
          {displayDescription}
        </p>
      </div>
    </section>
  );
};

export default HeroSector;