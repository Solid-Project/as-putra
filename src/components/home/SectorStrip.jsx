import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import peternakanImage from "@/assets/img/sector1.webp";

gsap.registerPlugin(ScrollTrigger);

const SECTION_INDEX = 3; // ⚠️ WAJIB SESUAI URUTAN DI HOMEPAGE

const sectors = [
  {
    name: "Peternakan",
    desc: "Breeding, hatchery, kemitraan, dan pengelolaan peternakan terpadu.",
    bg: peternakanImage,
  },
  {
    name: "Hotel & Resort",
    desc: "Layanan hospitality premium.",
    bg: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1170&auto=format&fit=crop",
  },
  {
    name: "Property",
    desc: "Pengembangan hunian dan properti.",
    bg: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1170&auto=format&fit=crop",
  },
  {
    name: "Retail",
    desc: "Usaha ritel modern.",
    bg: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1170&auto=format&fit=crop",
  },
  {
    name: "Ekspedisi",
    desc: "Solusi logistik terpercaya.",
    bg: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1170&auto=format&fit=crop",
  },
];

const SectorStrip = ({ activeIndex }) => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const isReadyRef = useRef(false);

  useEffect(() => {
    const cards = cardsRef.current;
    if (!cards.length) return;

    // 🔥 RESET GLOBAL (AMAN)
    isReadyRef.current = false;

    if (activeIndex === SECTION_INDEX) {
      // reset posisi
      gsap.set(cards, { y: 0 });

      gsap.fromTo(
        cards,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          onComplete: () => {
            isReadyRef.current = true;
          },
        },
      );
    } else {
      gsap.set(cards, { opacity: 0, y: 80 });
    }
  }, [activeIndex]);
  // =============================
  // 🎯 ANIMASI MASUK (SNAP BASED)
  // =============================
  useEffect(() => {
    const cards = cardsRef.current;
    if (!cards.length) return;

    if (activeIndex === SECTION_INDEX) {
      // 🔥 RESET DULU semua transform
      gsap.set(cards, { y: 0 });

      // baru animasi masuk
      gsap.fromTo(
        cards,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
        },
      );
    } else {
      gsap.set(cards, { opacity: 0, y: 80 });
    }
  }, [activeIndex]);

  // =============================
  // 🌊 PARALLAX (SCROLLTRIGGER)
  // =============================
  useEffect(() => {
    const triggers = [];

    cardsRef.current.forEach((card, idx) => {
      if (!card) return;

      const isEven = idx % 2 === 0;
      const range = 50;

      const t = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          // 🔥 INI DIA LETAKNYA
          if (!isReadyRef.current) return;

          const move = isEven ? self.progress * range : -self.progress * range;

          gsap.set(card, { y: move });
        },
      });

      triggers.push(t);
    });

    return () => triggers.forEach((t) => t.kill());
  }, [activeIndex]);

  // =============================
  // 🎯 RENDER
  // =============================
  return (
    <section
      ref={sectionRef}
      className="section"
      data-title="Sektor Usaha"
      data-theme="dark"
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 w-full h-full">
        {sectors.map((sector, idx) => (
          <div
            key={idx}
            ref={(el) => (cardsRef.current[idx] = el)}
            className="relative flex flex-col justify-center text-white group"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${sector.bg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              padding: "clamp(1rem, 2vw, 2rem)",
              willChange: "transform, opacity",
              transition: "all 0.3s ease",
            }}
          >
            <h3 className="font-bold text-lg mb-2">{sector.name}</h3>

            <p className="text-sm opacity-90 mb-3">{sector.desc}</p>

            <div className="h-[3px] w-10 bg-[var(--color-aksen)] group-hover:w-16 transition-all duration-300" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SectorStrip;
