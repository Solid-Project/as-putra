import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  BuildingOffice2Icon, 
  UsersIcon, 
  CircleStackIcon, 
  GlobeAltIcon 
} from "@heroicons/react/24/outline";

gsap.registerPlugin(ScrollTrigger);

const Layout5 = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const leftColRef = useRef(null);
  const rightGridRef = useRef(null);
  const statsRefs = useRef([]);
  const hasAnimatedCounter = useRef(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // --- 1. EFEK LIVE PARALLAX: SHATTER TO REASSEMBLE ---
      const tlShatter = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "top top",
          scrub: 1.5,
        }
      });

      tlShatter.fromTo(titleRef.current, 
        { 
          x: -150, 
          y: 100, 
          rotation: -10, 
          filter: "blur(15px)", 
          opacity: 0 
        },
        { 
          x: 0, 
          y: 0, 
          rotation: 0, 
          filter: "blur(0px)", 
          opacity: 1, 
          ease: "power2.out" 
        }
      );

      // --- 2. LIVE PARALLAX: DUA ARAH (KIRI & KANAN) ---
      gsap.fromTo(leftColRef.current, 
        { y: 80 }, 
        { 
          y: -80, 
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        }
      );

      gsap.fromTo(rightGridRef.current, 
        { y: 150 }, 
        { 
          y: -150, 
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2
          }
        }
      );

      // --- 3. ANIMASI COUNTER (Berjalan Setiap Section Aktif) ---
      const statsData = [
        { target: 100, suffix: "%" },
        { target: 0, suffix: "%" },

      ];

      // Reset counter ke 0 saat section masuk
      const resetCounters = () => {
        statsData.forEach((stat, idx) => {
          if (statsRefs.current[idx]) {
            statsRefs.current[idx].innerText = "0" + stat.suffix;
          }
        });
      };

      // Animasi counter
      const animateCounters = () => {
        statsData.forEach((stat, idx) => {
          const obj = { val: 0 };
          gsap.killTweensOf(obj); // Hentikan animasi sebelumnya jika ada
          gsap.to(obj, {
            val: stat.target,
            duration: 2,
            ease: "expo.out",
            onUpdate: () => {
              if (statsRefs.current[idx]) {
                let value = stat.isDecimal ? obj.val.toFixed(1) : Math.floor(obj.val);
                statsRefs.current[idx].innerText = value + stat.suffix;
              }
            },
          });
        });
      };

      // ScrollTrigger untuk counter - berulang setiap section aktif
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        onEnter: () => {
          if (!hasAnimatedCounter.current) {
            resetCounters();
            animateCounters();
            hasAnimatedCounter.current = true;
          }
        },
        onLeaveBack: () => {
          // Reset flag saat scroll ke atas
          hasAnimatedCounter.current = false;
          resetCounters();
        },
        onEnterBack: () => {
          // Animasi lagi saat scroll ke bawah kembali
          if (!hasAnimatedCounter.current) {
            resetCounters();
            animateCounters();
            hasAnimatedCounter.current = true;
          }
        },
      });

    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section min-h-screen flex items-center py-32 px-[8%] bg-white relative overflow-hidden"
      id="fifth-layout"
    >
      {/* Dekorasi Background - TIDAK DIUBAH */}
      <div className="absolute top-0 right-0 w-1/4 h-full bg-slate-50/50 -z-0" />

      <div className="w-full grid lg:grid-cols-2 gap-24 items-center relative z-10">
        
        {/* KOLOM KIRI: NARASI - TIDAK DIUBAH */}
        <div ref={leftColRef} className="max-w-[600px]">
          <h2 
            ref={titleRef} 
            className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl text-slate-900 leading-[1.1] mb-12 font-bold tracking-tighter"
          >
           Komitmen Kesegaran Terukur
          </h2>
          <p className="text-slate-600 text-lg md:text-xl leading-relaxed font-light border-l-2 border-blue-600 pl-8">
           Melalui standar operasional prima dan manajemen rantai pasok yang efisien, kami menjamin perputaran produk berlangsung cepat untuk mengamankan kualitas kesegaran pada tingkat tertinggi setiap harinya.
          </p>
        </div>

        {/* KOLOM KANAN: GRID STATISTIK - TIDAK DIUBAH */}
        <div ref={rightGridRef} className="grid grid-cols-2 gap-x-12 gap-y-24 relative">
          {/* Garis Vertikal - TIDAK DIUBAH */}
          <div className="absolute left-1/2 top-0 w-[1px] h-full bg-blue-50 hidden md:block" />

          {/* Item 1 - TIDAK DIUBAH */}
          <div className="flex flex-col gap-6">
            <BuildingOffice2Icon className="w-10 h-10 text-blue-600/40" />
            <span ref={(el) => (statsRefs.current[0] = el)} className="text-6xl md:text-8xl font-['Playfair_Display'] font-bold text-slate-900 tracking-tighter">100 %</span>
            <span className="text-[10px] uppercase tracking-[0.4em] text-slate-400 font-black">Tingkat Kesegaran Harian</span>
          </div>

          {/* Item 2 - TIDAK DIUBAH */}
          <div className="flex flex-col gap-6 md:pl-12">
            <UsersIcon className="w-10 h-10 text-blue-600/40" />
            <span ref={(el) => (statsRefs.current[1] = el)} className="text-6xl md:text-8xl font-['Playfair_Display'] font-bold text-slate-900 tracking-tighter">0+</span>
            <span className="text-[10px] uppercase tracking-[0.4em] text-slate-400 font-black">Tanpa Bahan Pengawet</span>
          </div>

          {/* Item 3 - TIDAK DIUBAH */}
          <div className="flex flex-col gap-6">
            <CircleStackIcon className="w-10 h-10 text-blue-600/40" />
            <span className="text-6xl md:text-8xl font-['Playfair_Display'] font-bold text-slate-900 ">QC</span>
            <span className="text-[10px] uppercase tracking-[0.4em] text-slate-400 font-black">Quality Terjaga</span>
          </div>

          {/* Item 4 - TIDAK DIUBAH */}
          <div className="flex flex-col gap-6 md:pl-12">
            <GlobeAltIcon className="w-10 h-10 text-blue-600/40" />
            <span className="text-6xl md:text-8xl font-['Playfair_Display'] font-bold text-slate-900 ">A+</span>
            <span className="text-[10px] uppercase tracking-[0.4em] text-slate-400 font-black">Standar Nutrisi Premium</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Layout5;