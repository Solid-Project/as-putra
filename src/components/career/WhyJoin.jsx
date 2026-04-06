import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  ChartBarIcon, 
  UserGroupIcon, 
  GlobeAltIcon,
  ArrowRightIcon,
  EnvelopeIcon
} from "@heroicons/react/24/outline";

gsap.registerPlugin(ScrollTrigger);

const whyJoinData = [
  {
    id: 1,
    title: "Pertumbuhan",
    description:
      "Peluang untuk pengembangan profesional dan kemajuan karir yang berkelanjutan.",
    icon: ChartBarIcon,
  },
  {
    id: 2,
    title: "Budaya",
    description:
      "Lingkungan kolaboratif dan inklusif di mana setiap suara dihargai dan didengar.",
    icon: UserGroupIcon,
  },
  {
    id: 3,
    title: "Dampak",
    description:
      "Bekerja pada proyek-proyek yang membuat perbedaan nyata di dunia dan komunitas sekitar.",
    icon: GlobeAltIcon,
  },
];

const WhyJoin = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title Animation - SAMA DENGAN HISTORY TIMELINE
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            end: "bottom 70%",
            toggleActions: "play none none reverse",
            immediateRender: false,
            invalidateOnRefresh: true,
          },
        }
      );

      // Cards Animation
      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.15,
            ease: "power3.out",
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
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section no-snap py-20 px-5 bg-white"
      id="why-join-section"
      data-title="Mengapa Bergabung"
      data-theme="light"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Title Section - SAMA DENGAN HISTORY TIMELINE */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-[var(--color-teks)] mb-4">
            Mengapa{" "}
            <span className="text-[var(--color-utama)]">AS PUTRA?</span>
          </h2>
          <div className="w-16 h-0.5 bg-[var(--color-utama)] mx-auto mb-4"></div>
          <p className="text-[var(--color-teks-muted)] max-w-2xl mx-auto">
            Temukan mengapa ribuan profesional memilih untuk tumbuh dan berkembang bersama kami
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyJoinData.map((item, index) => {
            const Icon = item.icon;
            
            return (
              <div
                key={item.id}
                ref={(el) => (cardsRef.current[index] = el)}
                className="group bg-[var(--color-bg-alt)] rounded-xl p-8 text-center shadow-md hover:shadow-lg transition-all duration-300"
              >
                {/* Icon Container */}
                <div className="w-20 h-20 bg-[var(--color-utama)] rounded-full flex items-center justify-center mx-auto mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-10 h-10 text-white" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-[var(--color-teks)] mb-4 group-hover:text-[var(--color-utama)] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-[var(--color-teks-muted)] leading-relaxed text-sm">
                    {item.description}
                  </p>
                </div>

                {/* Decorative Line */}
                <div className="mt-6">
                  <div className="w-12 h-0.5 bg-[var(--color-utama)] group-hover:w-24 transition-all duration-300 mx-auto" />
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-16">
          <a
            href="mailto:recruitment@asputra.com"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-utama)] text-white font-medium rounded-lg transition-all duration-300 hover:bg-opacity-80 hover:gap-3"
          >
            <EnvelopeIcon className="w-5 h-5" />
            <span>Kirim Lamaran Sekarang</span>
            <ArrowRightIcon className="w-5 h-5" />
          </a>
          <p className="text-[var(--color-teks-muted)] text-sm mt-4">
            Atau kirim CV langsung ke{" "}
            <a
              href="mailto:recruitment@asputra.com"
              className="text-[var(--color-utama)] hover:underline transition-colors"
            >
              recruitment@asputra.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyJoin;