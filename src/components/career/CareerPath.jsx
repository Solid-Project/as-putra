import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  RocketLaunchIcon, 
  ChartBarIcon, 
  BriefcaseIcon, 
  StarIcon
} from "@heroicons/react/24/outline";

gsap.registerPlugin(ScrollTrigger);

const careerPathData = [
  {
    id: 1,
    level: "01",
    title: "Entry Level / Staff",
    description:
      "Memulai karir, belajar budaya kerja, dan mengasah skill teknis.",
    icon: RocketLaunchIcon,
  },
  {
    id: 2,
    level: "02",
    title: "Supervisor",
    description:
      "Memimpin tim kecil dan bertanggung jawab atas operasional harian.",
    icon: ChartBarIcon,
  },
  {
    id: 3,
    level: "03",
    title: "Managerial",
    description:
      "Mengelola departemen/divisi dan mengambil keputusan strategis.",
    icon: BriefcaseIcon, // Mengganti TargetIcon dengan BriefcaseIcon
  },
  {
    id: 4,
    level: "04",
    title: "Executive / GM",
    description:
      "Menentukan arah bisnis perusahaan dan pengembangan jangka panjang.",
    icon: StarIcon,
  },
];

const CareerPath = () => {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item, index) => {
        gsap.fromTo(
          item,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            delay: index * 0.15,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              toggleActions: "play none none reverse",
              immediateRender: false,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="mb-20">
      {/* Title Section */}
      <div className="text-center mb-12">
        <h3 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold text-[var(--color-teks)] mb-4">
          Jenjang Karir yang Jelas
        </h3>
        <div className="w-16 h-0.5 bg-[var(--color-utama)] mx-auto mb-4"></div>
        <p className="text-[var(--color-teks-muted)] max-w-2xl mx-auto">
          Kami menyediakan jalur karir yang transparan dan kesempatan untuk terus berkembang
        </p>
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Timeline Line */}
        <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-[var(--color-utama)] hidden md:block" />

        <div className="space-y-8">
          {careerPathData.map((item, index) => {
            const Icon = item.icon;
            const isLeft = index % 2 === 0;
            
            return (
              <div
                key={item.id}
                ref={(el) => (itemsRef.current[index] = el)}
                className={`relative flex flex-col md:flex-row items-start ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                } gap-6 md:gap-12`}
              >
                {/* Timeline Dot */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-white border-4 border-[var(--color-utama)] rounded-full z-10 shadow-md" />

                {/* Icon Mobile */}
                <div className="md:hidden absolute left-0 w-10 h-10 bg-[var(--color-utama)] rounded-full flex items-center justify-center text-white shadow-md">
                  <Icon className="w-5 h-5" />
                </div>

                {/* Content */}
                <div
                  className={`w-full md:w-5/12 ${
                    isLeft ? "md:pr-8" : "md:pl-8"
                  } pl-14 md:pl-0`}
                >
                  <div className="bg-[var(--color-bg-alt)] rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="hidden md:flex w-12 h-12 bg-[var(--color-utama)] rounded-full items-center justify-center text-white shadow-md">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[var(--color-utama)] font-bold text-lg">
                          {item.level}
                        </span>
                        <h4 className="text-lg font-semibold text-[var(--color-teks)] group-hover:text-[var(--color-utama)] transition-colors duration-300">
                          {item.title}
                        </h4>
                      </div>
                    </div>
                    <p className="text-[var(--color-teks-muted)] text-sm leading-relaxed pl-0 md:pl-16">
                      {item.description}
                    </p>
                    <div className="mt-4 pl-0 md:pl-16">
                      <div className="w-12 h-0.5 bg-[var(--color-utama)] group-hover:w-24 transition-all duration-300" />
                    </div>
                  </div>
                </div>

                {/* Empty space for alignment */}
                <div className="hidden md:block w-5/12" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CareerPath;