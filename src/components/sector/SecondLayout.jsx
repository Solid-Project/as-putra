import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_DATA = {
  id: "corporate-stats",
  title: "Eksistensi Nyata dalam Membangun Bangsa",
  description: "Sejak didirikan, AS Putra Group konsisten menjaga integritas dan inovasi di setiap lini bisnis, mulai dari ketahanan pangan hingga sektor properti.",
  statValue: 25, // Gunakan angka murni (Integer) agar bisa dianimasikan
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
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const statsRef = useRef(null);
  const partnersRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      // 1. Animasi Teks Kiri
      tl.fromTo([titleRef.current, descRef.current], 
        { y: 60, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power4.out" }
      );

      // 2. 🔥 ANIMASI COUNTER (TENGAH)
      // Kita buat object dummy untuk menampung nilai angka
      const targetValue = parseInt(displayData.statValue);
      const cont = { val: 0 };

      tl.to(cont, {
        val: targetValue,
        duration: 2,
        ease: "power3.out",
        onUpdate: () => {
          if (statsRef.current) {
            // Update teks secara manual setiap frame, tambahkan tanda "+" di akhir
            statsRef.current.innerText = Math.floor(cont.val) + "+";
          }
        }
      }, "-=0.8"); // Mulai sedikit lebih awal sebelum teks kiri selesai

      // 3. Animasi Logo Partner (Kanan)
      tl.fromTo(partnersRef.current, 
        { scale: 0.8, opacity: 0, y: 20 }, 
        { scale: 1, opacity: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" }, 
        "-=1.2"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [displayData]);

  return (
    <section
      ref={sectionRef}
      className="section min-h-screen flex items-center py-32 px-[5%] bg-[#fcfcfc] relative overflow-hidden"
      id={displayData.id}
      data-theme="light"
    >
      {/* BACKGROUND DECORATION */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-[var(--color-utama)] rounded-full blur-[180px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-slate-500 rounded-full blur-[150px]" />
      </div>

      <div className="w-full relative z-10">
        <div className="grid lg:grid-cols-3 gap-20 items-stretch">
          
          {/* KOLOM 1: BRAND STORY */}
          <div className="flex flex-col justify-center border-b lg:border-b-0 pb-12 lg:pb-0">
            <div className="inline-block w-fit px-5 py-2 mb-8 text-[11px] font-black tracking-[0.4em] uppercase bg-slate-900 text-white rounded-full">
              Identity
            </div>
            <h2 ref={titleRef} className="font-['Playfair_Display'] text-5xl md:text-6xl lg:text-7xl text-slate-900 mb-10 font-bold leading-[1.05]">
              {displayData.title}
            </h2>
            <p ref={descRef} className="text-slate-500 text-xl md:text-2xl leading-relaxed font-light">
              {displayData.description}
            </p>
          </div>

          {/* KOLOM 2: CENTER PIECE (COUNTER ANIMATION) */}
          <div className="flex flex-col items-center justify-center py-16 px-10 bg-white shadow-[0_30px_100px_-20px_rgba(0,0,0,0.06)] rounded-[40px] relative">
            <div className="absolute -top-10 bg-[var(--color-utama)] p-6 rounded-3xl shadow-2xl shadow-[var(--color-utama)]/30">
              <CurrencyDollarIcon className="w-12 h-12 text-white" />
            </div>
            
            {/* Element ref statsRef ini yang akan diisi angka oleh GSAP */}
            <div
              ref={statsRef}
              className="text-[10rem] md:text-[13rem] font-black text-slate-900 tracking-tighter leading-none"
            >
              0+
            </div>
            
            <div className="text-slate-400 font-bold text-xs uppercase tracking-[0.5em] mt-8 text-center max-w-[200px] leading-loose text-balance">
              {displayData.statLabel}
            </div>
          </div>

          {/* KOLOM 3: PARTNERS LOGO GRID */}
          <div className="flex flex-col justify-center">
            <div className="mb-8">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">Strategic Partners</span>
                <div className="h-[1px] w-12 bg-[var(--color-utama)] mt-2"></div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {displayData.partners?.map((partner, idx) => (
                <div
                  key={idx}
                  ref={(el) => (partnersRef.current[idx] = el)}
                  className="group aspect-square flex items-center justify-center p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-2 transition-all duration-500"
                >
                  <img 
                    src={partner.url} 
                    alt={partner.name}
                    className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100 group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
            <p className="mt-10 text-slate-400 text-sm italic font-light">
              Telah dipercaya oleh berbagai institusi nasional maupun internasional.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SecondLayout;