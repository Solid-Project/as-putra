import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const OurValues = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const textBgRef = useRef(null);

  const values = [
    { number: '01', title: 'Integrated Synergy', desc: 'Kolaborasi lintas usaha yang saling menguatkan.', color: 'bg-blue-600' },
    { number: '02', title: 'Agile Empowerment', desc: 'Adaptif dan inovatif dalam perubahan pasar.', color: 'bg-indigo-600' },
    { number: '03', title: 'Foundational Trust', desc: 'Integritas sebagai fondasi utama.', color: 'bg-sky-600' },
    { number: '04', title: 'Purpose-Driven Impact', desc: 'Pertumbuhan yang memberi dampak nyata.', color: 'bg-blue-500' },
    { number: '05', title: 'Uncompromising Excellence', desc: 'Profesionalisme tinggi tanpa kompromi.', color: 'bg-indigo-500' }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. TYPOGRAPHY WATERMARK (Gerak Horizontal)
      gsap.to(textBgRef.current, {
        x: -150,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        }
      });

      // 2. KUNCI PARALLAX SEJAJAR SEMPURNA (100% PRECISION)
      cardsRef.current.forEach((card, idx) => {
        if (!card) return;
        
        // Range 80px (Cukup terlihat tapi tetap stabil)
        const range = 80;
        const startY = (idx % 2 === 0) ? range : -range;
        const endY = (idx % 2 === 0) ? -range : range;
        
        gsap.fromTo(card, 
          { y: startY }, 
          {
            y: endY,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              // KUNCI: Start & End harus simetris terhadap viewport (Tengah)
              // Ini menjamin saat section di "center", semua y = 0 (SEJAJAR)
              start: "top bottom", 
              end: "bottom top",
              scrub: 1.2,
              invalidateOnRefresh: true,
            }
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section relative py-24 md:py-32 bg-[#F8FAFC] overflow-hidden"
      id="our-values"
      data-title="Our Values"
    >
      {/* WATERMARK TEXT (UKURAN ELEGAN) */}
      <div ref={textBgRef} className="absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap opacity-[0.03] select-none pointer-events-none z-0">
        <span className="text-[100px] md:text-[130px] font-black uppercase text-blue-900 tracking-tighter">
          Excellence Trust Synergy Impact Agile
        </span>
      </div>

      {/* MARGIN KIRI KANAN (6% SESUAI ATURANMU) */}
      <div className="max-w-[1400px] mx-auto px-[6%] relative z-10">
        
        {/* HEADER PADAT */}
        <div className="mb-20 text-center lg:text-left flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-4 justify-center lg:justify-start">
              <div className="w-10 h-[2px] bg-blue-600" />
              <span className="text-blue-600 font-bold tracking-[0.3em] text-[10px] uppercase">Core Values</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-['Playfair_Display'] font-black text-slate-900 leading-none tracking-tighter">
              Our <span className="text-blue-600 italic font-light">Values.</span>
            </h2>
          </div>
          <p className="text-slate-500 text-lg font-light max-w-sm lg:border-l-2 lg:border-blue-600 lg:pl-8 leading-relaxed mx-auto lg:mx-0">
            Prinsip fundamental yang menuntun setiap inovasi di AS Putra Group.
          </p>
        </div>

        {/* GRID CARD RAMPING (5 KOLOM) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {values.map((item, idx) => (
            <div
              key={idx}
              ref={el => cardsRef.current[idx] = el}
              className="group relative bg-white p-8 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.06)] hover:shadow-2xl transition-all duration-500 rounded-sm border-b-2 h-[300px] flex flex-col justify-center text-center items-center overflow-hidden"
              style={{ borderBottomColor: idx === 0 ? '#2563eb' : idx === 2 ? '#0ea5e9' : '#4f46e5' }}
            >
              {/* LARGE BG NUMBER ACCENT */}
              <span className="absolute top-4 right-4 text-5xl font-black text-slate-50 group-hover:text-blue-50 transition-colors duration-500 select-none">
                {item.number}
              </span>

              {/* COLORED BADGE KECIL */}
              <div className={`w-11 h-11 mb-6 flex items-center justify-center text-white text-[10px] font-bold rounded-full transition-transform duration-700 group-hover:rotate-[360deg] shadow-lg ${item.color}`}>
                {item.number}
              </div>

              <h4 className="text-xl font-bold text-slate-950 mb-4 font-['Playfair_Display'] tracking-tight group-hover:text-blue-600 transition-colors duration-300">
                {item.title}
              </h4>
              
              <p className="text-[11px] text-slate-500 leading-relaxed font-light line-clamp-3 px-2">
                {item.desc}
              </p>

              {/* BOTTOM ACCENT */}
              <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-0 group-hover:w-full transition-all duration-700 ${item.color}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurValues;