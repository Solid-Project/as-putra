import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import bgLayout from '@/assets/img/retail2.webp';
gsap.registerPlugin(ScrollTrigger);

const Section1 = () => {
  const sectionRef = useRef(null);
  const parallaxBgRef = useRef(null);
  const cardRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. LIVE PARALLAX BACKGROUND (Slow Motion Depth)
      // Gambar bergerak perlahan mengikuti scroll untuk kesan megah
      gsap.fromTo(parallaxBgRef.current, 
        { y: "-10%" }, 
        {
          y: "10%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          }
        }
      );

      // 2. LIVE PARALLAX TITLE (Floating Vision)
      // Teks "Visi. Global. Mandiri." bergerak naik pelan
      gsap.fromTo(titleRef.current, 
        { y: 50 }, 
        {
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          }
        }
      );

      // 3. LIVE PARALLAX CARD (Fast Lift)
      // Card putih di kanan bergerak lebih cepat agar terlihat kontras di depan background
      gsap.fromTo(cardRef.current, 
        { y: 150 }, 
        {
          y: -150,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.8, // Speed paling tinggi untuk depth maksimal
          }
        }
      );

      // 4. INITIAL REVEAL (Animasi Masuk Sekali)
      // Menjaga estetika saat section pertama kali terdeteksi
      gsap.fromTo(titleRef.current.children,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.5,
          stagger: 0.2,
          ease: "power4.out",
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
    >
      
      {/* 1. PARALLAX BACKGROUND (Depth Layer) */}
      <div className="absolute top-0 left-0 w-full lg:w-3/5 h-[130%] -z-0 overflow-hidden">
        <img 
          ref={parallaxBgRef}
          src={bgLayout} 
          alt="AS Putra Visionary Team" 
          className="w-full h-full object-cover origin-top scale-110" 
        />
        {/* Overlay Gradasi agar Sejajar dengan Grid Putih di Kanan */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-[#F8FAFC] lg:block hidden z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-[#F8FAFC] lg:hidden block z-10" />
      </div>

      <div className="container mx-auto px-[6%] relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* KOLOM KIRI: JUDUL RAKSASA (Parallax Sumbu Y) */}
          <div ref={titleRef} className="lg:col-span-6 flex flex-col gap-2 z-20">
            <span className="text-white lg:text-slate-500 font-bold tracking-[0.4em] text-[10px] uppercase mb-8 block opacity-90 lg:opacity-100">
             AS Putra
            </span>
            <h1 className="font-['Playfair_Display'] text-7xl md:text-8xl lg:text-[9rem] text-white font-black leading-[0.85] tracking-tighter">
               Retail
            </h1>
            <h1 className="font-['Playfair_Display'] text-7xl md:text-8xl lg:text-[9rem] text-white font-black leading-[0.85] tracking-tighter">
               &
            </h1>
            <h1 className="font-['Playfair_Display'] text-7xl md:text-8xl lg:text-[9rem] text-white font-black leading-[0.85] tracking-tighter">
               Distribusi
            </h1>
          </div>

          {/* KOLOM KANAN: FLOATING CLEAN CARD (Parallax Lebih Cepat) */}
          <div className="lg:col-span-5 lg:col-start-8 z-30 mt-12 lg:mt-0">
            <div 
              ref={cardRef}
              className="bg-white p-12 md:p-16 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] rounded-sm border-t-2 border-[var(--color-utama)]"
            >
              <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-slate-900 font-bold mb-8 leading-tight tracking-tight">
               Menjembatani kualitas dari hulu hingga ke tangan konsumen.
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed font-light mb-12 border-l border-slate-100 pl-8">
              Sektor retail AS Putra Group beroperasi untuk memastikan ketersediaan produk berkualitas tinggi di masyarakat, mengorkestrasi ekosistem distribusi yang efisien dengan standar pelayanan modern dan terpercaya. 
              </p>

              {/* Minimalist CTA Link */}
              
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Section1;