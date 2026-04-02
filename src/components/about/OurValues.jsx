// src/components/about/OurValues.jsx
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const OurValues = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const titleRef = useRef(null);
  const lineRef = useRef(null);
  const subtitleRef = useRef(null);

  const values = [
    { number: '01', title: 'Integrated Synergy', desc: 'Kolaborasi lintas usaha yang saling menguatkan.' },
    { number: '02', title: 'Agile Empowerment', desc: 'Adaptif, inovatif, dan terus berkembang.' },
    { number: '03', title: 'Foundational Trust', desc: 'Integritas dan keandalan sebagai fondasi.' },
    { number: '04', title: 'Purpose-Driven Impact', desc: 'Pertumbuhan yang memberi dampak nyata.' },
    { number: '05', title: 'Uncompromising Excellence', desc: 'Profesionalisme tanpa kompromi.' }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 🔥 ANIMASI JUDUL SECTION
      gsap.fromTo(titleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "bottom 70%",
            toggleActions: "play none none reverse",
            immediateRender: false,
            invalidateOnRefresh: true
          }
        }
      );

      // 🔥 ANIMASI GARIS
      gsap.fromTo(lineRef.current,
        { width: 0 },
        {
          width: 64,
          duration: 0.6,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "bottom 70%",
            toggleActions: "play none none reverse",
            immediateRender: false,
            invalidateOnRefresh: true
          }
        }
      );

      // 🔥 ANIMASI SUBTITLE
      gsap.fromTo(subtitleRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "bottom 70%",
            toggleActions: "play none none reverse",
            immediateRender: false,
            invalidateOnRefresh: true
          }
        }
      );

      // 🔥 ANIMASI CARD - STAGGER
      gsap.fromTo(cardsRef.current,
        { 
          y: 60, 
          opacity: 0, 
          scale: 0.9 
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.12,
          duration: 0.7,
          ease: "back.out(0.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "bottom 70%",
            toggleActions: "play none none reverse",
            immediateRender: false,
            invalidateOnRefresh: true
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="section py-20 px-5 bg-[var(--color-bg-alt)] min-h-screen flex flex-col justify-center"
      id="our-values"
    >
      <div className="text-center mb-12">
        <h2 
          ref={titleRef}
          className="font-['Playfair_Display'] text-3xl md:text-4xl text-[var(--color-teks)] mb-4"
        >
          Our Values
        </h2>
        <div 
          ref={lineRef}
          className="w-16 h-0.5 bg-[var(--color-utama)] mx-auto"
          style={{ width: 0 }}
        ></div>
        <p 
          ref={subtitleRef}
          className="text-[var(--color-teks-muted)] mt-4 max-w-[600px] mx-auto"
        >
          Nilai-nilai yang menjadi fondasi setiap langkah kami
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-[1200px] mx-auto">
        {values.map((item, idx) => (
          <div
            key={idx}
            ref={el => cardsRef.current[idx] = el}
            className="relative bg-white border border-gray-100 rounded-xl p-8 pl-14 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer"
          >
            <span className="absolute left-5 top-5 text-3xl font-bold text-[var(--color-utama)] opacity-30 group-hover:opacity-100 transition-opacity">
              {item.number}
            </span>
            <h4 className="text-lg font-bold text-[var(--color-teks)] mb-2">{item.title}</h4>
            <p className="text-sm text-[var(--color-teks-muted)] leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurValues;