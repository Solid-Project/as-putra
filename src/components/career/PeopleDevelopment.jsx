import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  AcademicCapIcon, 
  BriefcaseIcon, 
  GlobeAltIcon 
} from "@heroicons/react/24/outline";

gsap.registerPlugin(ScrollTrigger);

const developmentData = [
  {
    id: 1,
    icon: AcademicCapIcon,
    title: "Future Leaders Gen-5",
    description:
      "Program Management Trainee (MT) intensif 12 bulan untuk mencetak pemimpin masa depan dengan rotasi lintas sektor.",
  },
  {
    id: 2,
    icon: BriefcaseIcon,
    title: "Workshop Manajerial",
    description:
      "Pelatihan kepemimpinan rutin bagi level supervisor dan manajer untuk mempertajam skill pengambilan keputusan strategis.",
  },
  {
    id: 3,
    icon: GlobeAltIcon,
    title: "Scholarship Program",
    description:
      "Kami mendukung karyawan berprestasi untuk melanjutkan studi S2 atau sertifikasi profesional.",
  },
];

const PeopleDevelopment = ({ isActive }) => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    if (!isActive) return;

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.2,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
              immediateRender: false,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div ref={sectionRef}>
      {/* Title Section - SAMA DENGAN HISTORY TIMELINE */}
      <div className="text-center mb-12">
        <h3 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold text-[var(--color-teks)] mb-4">
          Tumbuh Bersama
        </h3>
        <div className="w-16 h-0.5 bg-[var(--color-utama)] mx-auto mb-4"></div>
        <p className="text-[var(--color-teks-muted)] max-w-2xl mx-auto">
          Investasi terbesar kami adalah sumber daya manusia. Kami berkomitmen untuk pengembangan berkelanjutan.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {developmentData.map((item, index) => {
          const Icon = item.icon;
          
          return (
            <div
              key={item.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group bg-[var(--color-bg-alt)] rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 text-center"
            >
              <div className="w-16 h-16 bg-[var(--color-utama)] rounded-full flex items-center justify-center mx-auto mb-4 shadow-md group-hover:scale-110 transition-transform duration-300">
                <Icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--color-teks)] mb-3 group-hover:text-[var(--color-utama)] transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-[var(--color-teks-muted)] text-sm leading-relaxed">
                {item.description}
              </p>
              <div className="mt-6">
                <div className="w-12 h-0.5 bg-[var(--color-utama)] group-hover:w-24 transition-all duration-300 mx-auto" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PeopleDevelopment;