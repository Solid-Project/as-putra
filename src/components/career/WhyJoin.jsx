import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { 
  ChartBarIcon, 
  UserGroupIcon, 
  GlobeAltIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";

const whyJoinData = [
  {
    id: 1,
    title: "Pertumbuhan",
    description:
      "Kami berinvestasi pada masa depan Anda melalui program pengembangan profesional dan jenjang karir yang terukur.",
    icon: ChartBarIcon,
  },
  {
    id: 2,
    title: "Budaya",
    description:
      "Lingkungan kolaboratif yang inklusif, di mana setiap ide dihargai dan setiap individu adalah keluarga.",
    icon: UserGroupIcon,
  },
  {
    id: 3,
    title: "Dampak",
    description:
      "Berkontribusi pada proyek strategis yang memberikan dampak nyata bagi industri dan komunitas sekitar.",
    icon: GlobeAltIcon,
  },
];

const WhyJoin = ({ activeIndex }) => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const SECTION_INDEX = 2; 
  const isActive = activeIndex === SECTION_INDEX;

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!isActive) return;

      const tl = gsap.timeline();

      tl.fromTo(titleRef.current, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
      )
      .fromTo(
        cardsRef.current,
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: "expo.out",
        },
        "-=0.6"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isActive]);

  return (
    <section
      ref={sectionRef}
      className="section no-snap py-24 px-6 bg-[#050A1A] relative overflow-hidden" // Konsisten dengan Navy Gelap
      id="why-join-section"
    >
      {/* Dekorasi Background agar tidak kosong */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-[var(--color-utama)] rounded-full blur-[120px]"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-600 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* ✨ Title Section: Bold & Editorial */}
        <div ref={titleRef} className="text-center mb-20">
          <div className="flex items-center justify-center gap-2 text-[var(--color-utama)] mb-4">
            <SparklesIcon className="w-5 h-5" />
            <span className="text-xs font-black uppercase tracking-[0.4em]">The Value</span>
          </div>
          <h2 className="font-['Playfair_Display'] text-4xl md:text-6xl text-white mb-6">
            Mengapa <span className="text-[var(--color-utama)] italic font-medium">AS PUTRA?</span>
          </h2>
          <div className="w-24 h-1 bg-[var(--color-utama)] mx-auto mb-8 rounded-full"></div>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            Temukan alasan mengapa para profesional berbakat memilih untuk membangun mimpi dan berkembang bersama kami.
          </p>
        </div>

        {/* 📋 Cards: High Contrast & Readability */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {whyJoinData.map((item, index) => {
            const Icon = item.icon;
            
            return (
              <div
                key={item.id}
                ref={(el) => (cardsRef.current[index] = el)}
                className="group relative bg-white/5 border border-white/10 rounded-[2rem] p-10 text-center transition-all duration-500 hover:bg-white/[0.08] hover:border-[var(--color-utama)]/40 shadow-2xl"
              >
                {/* Icon Container: Navy on Yellow for visibility */}
                <div className="w-20 h-20 bg-[var(--color-utama)] rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-[var(--color-utama)]/20 rotate-3 group-hover:rotate-0 transition-transform duration-500">
                  <Icon className="w-10 h-10 text-[#050A1A] stroke-[1.5px]" />
                </div>

                {/* Content: Putih & Gray-200 agar nyaman dibaca */}
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[var(--color-utama)] transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-300 leading-relaxed text-sm font-medium">
                  {item.description}
                </p>

                {/* Decorative Accent */}
                <div className="mt-8 flex justify-center opacity-20 group-hover:opacity-100 transition-opacity">
                  <div className="flex gap-1">
                    <div className="w-1 h-1 rounded-full bg-[var(--color-utama)]"></div>
                    <div className="w-8 h-[1px] bg-[var(--color-utama)] self-center"></div>
                    <div className="w-1 h-1 rounded-full bg-[var(--color-utama)]"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyJoin;