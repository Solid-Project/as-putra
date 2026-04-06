import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_DATA = {
  id: "corporate-stats",
  title: "Eksistensi Nyata dalam Membangun Bangsa",
  description: "Sejak didirikan, AS Putra Group konsisten menjaga integritas dan inovasi di setiap lini bisnis, mulai dari ketahanan pangan hingga sektor properti.",
  statValue: 25, 
  statLabel: "Tahun Dedikasi Membangun Kepercayaan",
  partners: [
    { name: "Google", url: "https://cdn.simpleicons.org/google/94a3b8" },
    { name: "Pertamina", url: "https://cdn.simpleicons.org/pertamina/94a3b8" },
    { name: "Bank Mandiri", url: "https://cdn.simpleicons.org/bankmandiri/94a3b8" },
    { name: "Toyota", url: "https://cdn.simpleicons.org/toyota/94a3b8" },
    { name: "Samsung", url: "https://cdn.simpleicons.org/samsung/94a3b8" },
    { name: "Indofood", url: "https://cdn.simpleicons.org/indofood/94a3b8" },
  ]
};

const SecondLayout = ({ data }) => {
  const displayData = { ...DEFAULT_DATA, ...data };
  
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const centerColRef = useRef(null);
  const rightColRef = useRef(null);
  const statsRef = useRef(null);
  const partnersRef = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // --- REFINED LIVE PARALLAX (Lebih Berat & Ke Bawah) ---
      // Start: Elemen berada agak di bawah (y: 80-150)
      // End: Elemen bergerak pelan ke atas sedikit saja

      // 1. Kolom Kiri (Teks)
      gsap.fromTo(leftColRef.current, 
        { y: 50 }, 
        {
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          }
        }
      );

      // 2. Kolom Tengah (Counter Card) - Efek Floating yang lebih tenang
      gsap.fromTo(centerColRef.current, 
        { y: 120 }, // Mulai lebih rendah
        {
          y: -80,  // Berakhir tidak terlalu tinggi
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          }
        }
      );

      // 3. Kolom Kanan (Partners)
      gsap.fromTo(rightColRef.current, 
        { y: 80 }, 
        {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          }
        }
      );

      // --- ANIMASI COUNTER (Tetap Jalan Otomatis) ---
      const targetValue = parseInt(displayData.statValue);
      const cont = { val: 0 };
      gsap.to(cont, {
        val: targetValue,
        duration: 2.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        onUpdate: () => {
          if (statsRef.current) {
            statsRef.current.innerText = Math.floor(cont.val) + "+";
          }
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [displayData]);

  return (
    <section
      ref={sectionRef}
      className="section min-h-screen flex items-center py-48 px-[6%] bg-[#fcfcfc] relative overflow-hidden"
      id={displayData.id}
    >
      <div className="w-full relative z-10">
        <div className="grid lg:grid-cols-3 gap-16 lg:gap-24 items-stretch">
          
          {/* KOLOM 1: BRAND STORY */}
          <div ref={leftColRef} className="flex flex-col justify-center">
            <div className="inline-block w-fit px-5 py-2 mb-8 text-[11px] font-black tracking-[0.4em] uppercase bg-slate-900 text-white rounded-full">
              Identity
            </div>
            <h2 className="font-['Playfair_Display'] text-5xl md:text-6xl lg:text-7xl text-slate-900 mb-10 font-bold leading-[1.05] tracking-tighter">
              {displayData.title}
            </h2>
            <p className="text-slate-500 text-xl md:text-2xl leading-relaxed font-light border-l-2 border-slate-100 pl-8">
              {displayData.description}
            </p>
          </div>

          {/* KOLOM 2: CENTER COUNTER */}
          <div 
            ref={centerColRef} 
            className="flex flex-col items-center justify-center py-20 px-10 bg-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.06)] rounded-[40px] relative border border-slate-50"
          >
            <div className="absolute -top-10 bg-[var(--color-utama)] p-6 rounded-3xl shadow-2xl shadow-[var(--color-utama)]/30">
              <CurrencyDollarIcon className="w-12 h-12 text-white" />
            </div>
            
            <div
              ref={statsRef}
              className="text-[10rem] md:text-[13rem] font-black text-slate-900 tracking-tighter leading-none italic font-['Playfair_Display']"
            >
              0+
            </div>
            
            <div className="text-slate-400 font-bold text-xs uppercase tracking-[0.5em] mt-8 text-center max-w-[200px] leading-loose">
              {displayData.statLabel}
            </div>
          </div>

          {/* KOLOM 3: PARTNERS LOGO */}
          <div ref={rightColRef} className="flex flex-col justify-center">
            <div className="mb-8">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">Strategic Partners</span>
                <div className="h-[1px] w-12 bg-[var(--color-utama)] mt-2"></div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {displayData.partners?.map((partner, idx) => (
                <div
                  key={idx}
                  ref={(el) => (partnersRef.current[idx] = el)}
                  className="group aspect-square flex items-center justify-center p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  <img 
                    src={partner.url} 
                    alt={partner.name}
                    className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 opacity-40 group-hover:opacity-100"
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SecondLayout;