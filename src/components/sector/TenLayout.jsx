import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";

gsap.registerPlugin(ScrollTrigger);

const TenLayout = () => {
  const sectionRef = useRef(null);
  const parallaxBgRef = useRef(null);
  const cardRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Animasi Parallax Background (Bergerak pelan ke atas saat scroll)
      gsap.to(parallaxBgRef.current, {
        yPercent: 30, // Bergerak 30% dari tingginya
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom", // Mulai saat top section masuk bottom viewport
          end: "bottom top",   // Selesai saat bottom section keluar top viewport
          scrub: true,         // Animasi mengikuti scrollbar
        }
      });

      // 2. Animasi Judul Menumpuk (Slide in dari kiri)
      gsap.fromTo(titleRef.current.children,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.5,
          stagger: 0.3,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // 3. Animasi Card Kanan (Fade In Up halus)
      gsap.fromTo(cardRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          delay: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="section min-h-screen flex items-center bg-[#F8FAFC] py-32 md:py-40 relative overflow-hidden"
      id="ten-layout"
      data-theme="light"
    >
      
      {/* 1. PARALLAX BACKGROUND IMAGE (Sisi Kiri, Full-Height) */}
      <div className="absolute top-0 left-0 w-full lg:w-3/5 h-[120%] -z-0 overflow-hidden">
        <img 
          ref={parallaxBgRef}
          src="/react/img/team2.jpeg" 
          alt="AS Putra Farming Landscape" 
          className="w-full h-full object-cover origin-top"
        />
        {/* Overlay gradasi halus agar menyatu ke putih di kanan */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-[#F8FAFC] lg:block hidden z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#F8FAFC] lg:hidden block z-10" />
      </div>

      <div className="container mx-auto px-[6%] relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* KOLOM KIRI: JUDUL RAKSASA (GRID 6 KOLOM) */}
          {/* Sejajar sempurna dengan margin kiri kamu */}
          <div ref={titleRef} className="lg:col-span-6 flex flex-col gap-2 z-20">
            <span className="text-white lg:text-slate-500 font-bold tracking-[0.4em] text-[10px] uppercase mb-8 block opacity-80 lg:opacity-100 fade-up">
              Future Vision
            </span>
            <h1 className="font-['Playfair_Display'] text-7xl md:text-8xl lg:text-9xl text-white font-black leading-[0.9] tracking-tight">
               Visi.
            </h1>
            <h1 className="font-['Playfair_Display'] text-7xl md:text-8xl lg:text-9xl text-white font-black leading-[0.9] tracking-tight lg:-mt-4">
               Global.
            </h1>
            <h1 className="font-['Playfair_Display'] text-7xl md:text-8xl lg:text-9xl text-white font-black leading-[0.9] tracking-tight lg:-mt-4">
               Mandiri.
            </h1>
          </div>

          {/* KOLOM KANAN: FLOATING CLEAN CARD (GRID 5 KOLOM + OFFSET 1) */}
          <div className="lg:col-span-5 lg:col-start-8 z-30 mt-12 lg:mt-0">
            <div 
              ref={cardRef}
              className="bg-white p-12 md:p-16 shadow-2xl shadow-slate-300 rounded-sm border-t-2 border-[var(--color-utama)]"
            >
              <h2 className="font-['Playfair_Display'] text-4xl text-slate-900 font-bold mb-8 leading-tight tracking-tight">
                Membangun Kemandirian Nasional Melalui Sektor Terintegrasi.
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed font-light mb-12">
                Hingga tahun 2030, AS Putra Group berkomitmen untuk menjadikan setiap unit bisnis di sektor ini sebagai model operasional yang efisien, berkelanjutan, dan berdaya saing global untuk mendukung kedaulatan pangan dan ekonomi Indonesia.
              </p>

              {/* Minimalist CTA Link (Sangat Premium) */}
              <Link 
                to="/vision" 
                className="group inline-flex items-center gap-4 text-[var(--color-utama)] font-bold tracking-[0.2em] text-xs uppercase"
              >
                 Pelajari Road Map Visi Kami
                 <div className="w-10 group-hover:w-20 h-[1px] bg-[var(--color-utama)] transition-all duration-500"></div>
                 <ArrowLongRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TenLayout;