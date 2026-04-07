import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const OurValues = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const floatRef = useRef(null);

  const values = [
    { number: '01', title: 'Integrated Synergy', desc: 'Kolaborasi lintas usaha yang saling menguatkan.', color: 'bg-blue-600' },
    { number: '02', title: 'Agile Empowerment', desc: 'Adaptif dan inovatif dalam perubahan pasar.', color: 'bg-indigo-600' },
    { number: '03', title: 'Foundational Trust', desc: 'Integritas sebagai fondasi utama.', color: 'bg-sky-600' },
    { number: '04', title: 'Purpose-Driven Impact', desc: 'Pertumbuhan yang memberi dampak nyata.', color: 'bg-blue-500' },
    { number: '05', title: 'Uncompromising Excellence', desc: 'Profesionalisme tinggi tanpa kompromi.', color: 'bg-indigo-500' }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. SHAPES PARALLAX (Efek Melayang di Background)
      const shapes = floatRef.current.children;
      gsap.to(shapes[0], { yPercent: -50, ease: "none", scrollTrigger: { trigger: sectionRef.current, scrub: 2 } }); // Lingkaran besar
      gsap.to(shapes[1], { yPercent: 30, rotate: 45, ease: "none", scrollTrigger: { trigger: sectionRef.current, scrub: 1 } }); // Kotak outline
      gsap.to(shapes[2], { yPercent: -80, ease: "none", scrollTrigger: { trigger: sectionRef.current, scrub: 1.5 } }); // Dot pattern
      gsap.to(shapes[3], { yPercent: 40, ease: "none", scrollTrigger: { trigger: sectionRef.current, scrub: 2.5 } }); // Lingkaran kecil

      // 2. KUNCI PARALLAX KARTU (Sejajar Sempurna)
      cardsRef.current.forEach((card, idx) => {
        if (!card) return;
        const range = 60;
        const startY = (idx % 2 === 0) ? range : -range;
        const endY = (idx % 2 === 0) ? -range : range;
        
        gsap.fromTo(card, 
          { y: startY }, 
          {
            y: endY,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
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
    >
      {/* DECORATIVE SHAPES (PENGGANTI TEKS) */}
      <div ref={floatRef} className="absolute inset-0 pointer-events-none z-0">
        {/* Shape 1: Gradient Blob */}
        <div className="absolute top-[10%] -left-20 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl" />
        
        {/* Shape 2: Floating Outline Square */}
        <div className="absolute top-[20%] right-[15%] w-32 h-32 border border-blue-200 rotate-12 rounded-2xl opacity-60" />
        
        {/* Shape 3: Dot Pattern Custom */}
        <div className="absolute bottom-[15%] left-[10%] w-40 h-40 opacity-20" 
             style={{ backgroundImage: 'radial-gradient(#2563eb 1.5px, transparent 1.5px)', backgroundSize: '15px 15px' }} />
        
        {/* Shape 4: Accent Circle */}
        <div className="absolute bottom-[10%] right-[5%] w-20 h-20 bg-indigo-50 rounded-full border-4 border-indigo-100/50" />
      </div>

      <div className="max-w-[1400px] mx-auto px-[6%] relative z-10">
        
        {/* HEADER */}
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

        {/* GRID CARD */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {values.map((item, idx) => (
            <div
              key={idx}
              ref={el => cardsRef.current[idx] = el}
              className="group relative bg-white/80 backdrop-blur-sm p-8 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.06)] hover:shadow-2xl transition-all duration-500 rounded-sm border-b-2 h-[320px] flex flex-col justify-center text-center items-center overflow-hidden"
              style={{ borderBottomColor: idx % 2 === 0 ? '#2563eb' : '#4f46e5' }}
            >
              {/* LARGE BG NUMBER ACCENT */}
              <span className="absolute -top-2 -right-2 text-6xl font-black text-slate-50 group-hover:text-blue-50/50 transition-colors duration-500 select-none">
                {item.number}
              </span>

              {/* COLORED BADGE */}
              <div className={`w-12 h-12 mb-6 flex items-center justify-center text-white text-xs font-bold rounded-xl transition-all duration-700 group-hover:rotate-[360deg] group-hover:rounded-full shadow-lg ${item.color}`}>
                {item.number}
              </div>

              <h4 className="text-xl font-bold text-slate-950 mb-4 font-['Playfair_Display'] tracking-tight group-hover:text-blue-600 transition-colors duration-300">
                {item.title}
              </h4>
              
              <p className="text-[11px] text-slate-500 leading-relaxed font-light line-clamp-4 px-2 italic">
                "{item.desc}"
              </p>

              {/* INTERACTIVE HOVER ACCENT */}
              <div className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-700 ${item.color}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurValues;