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
      className="relative flex items-center justify-center text-center min-h-[80vh] md:min-h-screen overflow-hidden bg-slate-900"
      id={`section-${index}`}
      data-theme="dark"
      data-title={displayTitle}
    >
      <OptimizedImage
        src={displayImage}
        alt="Hero Background"
        className="absolute inset-0 z-0"
        style={{
          objectFit: "cover",
          objectPosition: "center",
          width: "100%",
          height: "100%",
          filter: "brightness(0.6)",
        }}
      />
      {/* Konten Utama Tengah */}
      <div ref={contentRef} className="relative z-10 px-5">
        <h1
          ref={titleRef}
          className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-7xl text-white mb-4 drop-shadow-lg"
        >
          {displayTitle}
        </h1>
        <div
          ref={lineRef}
          className="h-1 bg-[var(--color-utama)] mx-auto mb-10"
        />
        <p
          ref={subtitleRef}
          className="text-white/95 max-w-[600px] mx-auto mb-10 text-lg md:text-xl font-light"
        >
          {displayDescription}
        </p>
      </div>
    </section>
  );
};

export default HeroSector;