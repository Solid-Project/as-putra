import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { target: 40, suffix: "+", label: "Tahun Pengalaman" },
  { target: 20, suffix: "", label: "Total Unit Usaha" },
  { target: 15000, suffix: "+", label: "Man Power" },
  { target: 200, suffix: "+", label: "CSR Partner" },
];

const cards = [
  {
    icon: "✦",
    title: "Integritas",
    desc: "Kami menjunjung tinggi kejujuran dan standar moral dalam setiap keputusan. Integritas adalah fondasi kepercayaan yang kami bangun bersama mitra dan seluruh pemangku kepentingan untuk menciptakan ekosistem bisnis yang transparan dan akuntabel.",
  },
  {
    icon: "★",
    title: "Keunggulan",
    desc: "Berkomitmen untuk melampaui ekspektasi melalui inovasi berkelanjutan dan dedikasi terhadap kualitas. Kami percaya bahwa kesempurnaan adalah proses, itulah sebabnya kami terus mengasah keahlian dan mengadopsi teknologi mutakhir.",
  },
  {
    icon: "♥",
    title: "Kolaborasi",
    desc: "Kekuatan kami terletak pada sinergi. Kami membina lingkungan kerja yang inklusif di mana setiap ide dihargai dan setiap individu diberdayakan. Melalui kerja sama lintas unit usaha, kami tumbuh bersama sebagai satu kesatuan.",
  },
];

// Sub-komponen Counter yang dioptimasi (Tanpa useState = No Re-render)
const Counter = ({ target, suffix, label, parentRef }) => {
  const numberRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const obj = { value: 0 };
      gsap.to(obj, {
        value: target,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: parentRef.current,
          start: "top 85%",
          // Animasinya akan reset saat discroll balik ke atas (Play - Reverse - Play - Reverse)
          toggleActions: "play reverse play reverse", 
        },
        onUpdate: () => {
          if (numberRef.current) {
            // Update teks langsung ke DOM, sangat ringan untuk CPU
            numberRef.current.innerText = Math.floor(obj.value).toLocaleString();
          }
        },
      });
    });
    return () => ctx.revert();
  }, [target, parentRef]);

  return (
    <div className="text-center px-4">
      <h3 className="text-3xl md:text-5xl text-[var(--color-utama)] font-bold mb-1">
        <span ref={numberRef}>0</span>{suffix}
      </h3>
      <p className="text-[var(--color-teks-muted)] text-[10px] md:text-xs font-semibold uppercase tracking-widest">
        {label}
      </p>
    </div>
  );
};

const AboutSummary = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal Animation: Pakai scrub: 1 agar gerakan lebih halus/tidak kaku
      gsap.fromTo(".reveal-content", 
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.1, 
          duration: 0.8, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section relative min-h-screen flex flex-col justify-center bg-white px-[5%] py-12 md:py-16 overflow-hidden"
      id="about-summary"
    >
      <div className="max-w-[1200px] mx-auto w-full flex flex-col h-full">
        
        {/* --- HEADER --- */}
        <div className="reveal-content text-center mb-8 md:mb-12" style={{ willChange: "transform, opacity" }}>
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-[var(--color-teks)] mb-3">
            Budaya & Nilai Kami
          </h2>
          <div className="h-0.5 bg-[var(--color-utama)] mx-auto mb-4 w-16" />
          <p className="text-[var(--color-teks-muted)] max-w-[700px] mx-auto text-sm md:text-base leading-relaxed">
            Fondasi yang membentuk identitas kami dalam berkarya dan memberikan dampak positif.
          </p>
        </div>

        {/* --- CARDS --- */}
        <div className="grid md:grid-cols-3 gap-6 mb-10 md:mb-14">
          {cards.map((item, idx) => (
            <div
              key={idx}
              className="reveal-content flex flex-col text-center p-8 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              style={{ willChange: "transform, opacity" }}
            >
              <div className="text-4xl text-[var(--color-utama)] mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-[var(--color-teks)] mb-3">
                {item.title}
              </h3>
              <p className="text-[var(--color-teks-muted)] text-sm leading-relaxed flex-grow italic">
                "{item.desc}"
              </p>
            </div>
          ))}
        </div>

        {/* --- STATS SECTION --- */}
        <div className="reveal-content border-t border-gray-100 pt-8 md:pt-12" style={{ willChange: "transform, opacity" }}>
          <div className="flex flex-wrap justify-center gap-y-8 gap-x-12 md:gap-x-20">
            {stats.map((stat, idx) => (
              <Counter
                key={idx}
                target={stat.target}
                suffix={stat.suffix}
                label={stat.label}
                parentRef={sectionRef}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSummary;