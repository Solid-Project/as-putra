// src/components/about/OurValues.jsx
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const OurValues = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const lineRef = useRef(null);

  const values = [
    { number: '01', title: 'Integrated Synergy', desc: 'Kolaborasi lintas usaha yang saling menguatkan.' },
    { number: '02', title: 'Agile Empowerment', desc: 'Adaptif, inovatif, dan terus berkembang.' },
    { number: '03', title: 'Foundational Trust', desc: 'Integritas dan keandalan sebagai fondasi.' },
    { number: '04', title: 'Purpose-Driven Impact', desc: 'Pertumbuhan yang memberi dampak nyata.' },
    { number: '05', title: 'Uncompromising Excellence', desc: 'Profesionalisme tanpa kompromi.' }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animasi judul
      gsap.from(titleRef.current, { y: 40, opacity: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 85%" }});
      gsap.from(subtitleRef.current, { y: 20, opacity: 0, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 85%" }});

      // Animasi cards stagger
      cardsRef.current.forEach((card, idx) => {
        gsap.from(card, {
          y: 50,
          opacity: 0,
          scale: 0.95,
          duration: 0.7,
          delay: idx * 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 90%", toggleActions: "play none none reverse" }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section relative py-24 px-6 bg-[var(--color-bg-alt)] overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.12), rgba(255,255,255,0.12)), url('/react/img/ourvalues.jpg')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
      id="our-values"
      data-bg="light"
      data-title="Nilai Perusahaan"
    >
      {/* Background decor circles */}
      <div className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] bg-blue-200/20 blur-[140px] rounded-full -z-10" />
      <div className="absolute bottom-[-140px] right-[-140px] w-[450px] h-[450px] bg-indigo-200/20 blur-[160px] rounded-full -z-10" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
        <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold text-[var(--color-teks)] mb-4 font-['Playfair_Display']">
          Our Values
        </h2>
        <div ref={lineRef} className="w-20 h-1 bg-[var(--color-utama)] mx-auto mb-4" />
        <p ref={subtitleRef} className="text-[var(--color-teks-muted)] text-lg md:text-xl">
          Nilai-nilai inti yang menjadi fondasi setiap langkah dan keputusan perusahaan kami.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto relative z-10">
        {values.map((item, idx) => (
          <div
            key={idx}
            ref={el => cardsRef.current[idx] = el}
            className={`relative bg-white rounded-2xl p-8 flex flex-col gap-4 shadow-lg transition-all duration-500 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl cursor-pointer overflow-hidden`}
          >
            {/* Custom number badge */}
            <div className="relative w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-white font-bold text-lg">
              <span>{item.number}</span>
              <div className="absolute w-10 h-10 border-2 border-white rounded-full -top-2 -left-2 opacity-30 animate-pulse"></div>
            </div>

            {/* Card Content */}
            <h4 className="text-xl font-bold text-[var(--color-teks)]">{item.title}</h4>
            <p className="text-[var(--color-teks-muted)] leading-relaxed">{item.desc}</p>

            {/* Subtle accent shape */}
            <div className="absolute -top-10 -right-10 w-28 h-28 bg-blue-100 rounded-full blur-2xl opacity-30 group-hover:scale-125 transition-all duration-700" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurValues;