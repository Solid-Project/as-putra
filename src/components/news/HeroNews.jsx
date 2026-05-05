import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import newsBg from "@/assets/img/news.webp";

const HeroNews = ({ activeIndex }) => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const lineRef = useRef(null);
  const subtitleRef = useRef(null);

  const SECTION_INDEX = 0; // ⬅️ sesuaikan urutan section kamu
  const isActive = activeIndex === SECTION_INDEX;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const links = contentRef.current?.querySelectorAll("a") || [];

      // ❗ kalau tidak aktif → reset (biar gak hilang)
      if (!isActive) {
        gsap.set(
          [titleRef.current, subtitleRef.current, ...links],
          { opacity: 1, y: 0 }
        );
        gsap.set(lineRef.current, { width: "120px" });
        return;
      }

      // 🔥 INITIAL STATE
      gsap.set(
        [titleRef.current, subtitleRef.current, ...links],
        { opacity: 0, y: 40 }
      );

      gsap.set(lineRef.current, { width: 0 });

      // 🔥 ANIMATION
      const tl = gsap.timeline();

      tl.to(titleRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      })
        .to(
          lineRef.current,
          {
            width: "120px",
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .to(
          subtitleRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
          },
          "-=0.3"
        )
        .to(
          links,
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.7,
          },
          "-=0.2"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [isActive]);

  const scrollToNext = () => {
    const nextSection = sectionRef.current?.nextElementSibling;
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="section relative h-screen flex items-center justify-center text-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(${newsBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/50" />

      <div ref={contentRef} className="relative z-10 px-5">
        <h1
          ref={titleRef}
          className="text-4xl md:text-5xl lg:text-6xl text-white mb-4"
        >
          Berita & Aktivitas
        </h1>

        <div
          ref={lineRef}
          className="h-0.5 bg-[var(--color-utama)] mx-auto mb-10"
          style={{ width: "120px" }} // fallback penting
        />

        <p
          ref={subtitleRef}
          className="text-white/95 max-w-[600px] mx-auto mb-10 text-lg"
        >
          Update terbaru tentang kegiatan, pencapaian, dan perkembangan AS PUTRA
          Group
        </p>

        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <Link
            to="/news"
            className="px-8 py-3.5 bg-[var(--color-utama)] text-white rounded-full"
          >
            Semua Berita
          </Link>

          <Link
            to="/about"
            className="px-8 py-3.5 bg-white/20 text-white rounded-full"
          >
            Tentang Kami
          </Link>
        </div>
      </div>

      <button
        onClick={scrollToNext}
        className="absolute bottom-12 right-[10%] hidden lg:flex flex-col items-center"
      >
        <span className="text-xs text-white/40 mb-4">Scroll</span>
      </button>
    </section>
  );
};

export default HeroNews;