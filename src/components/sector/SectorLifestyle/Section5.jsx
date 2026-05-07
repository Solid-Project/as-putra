import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import bgLayout from '@/assets/img/rimala.webp';

gsap.registerPlugin(ScrollTrigger);

const Layout8 = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const cardRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // --- LIVE PARALLAX (HANYA BERGERAK SAAT SCROLL) ---
      // Kita gunakan 'y' sebagai offset, tapi target akhirnya WAJIB 0
      // agar posisi section aktif tetap presisi sesuai desain awal.

      // 1. Image Utama: Datang dari bawah (50px) ke posisi asli (0)
      gsap.fromTo(imageRef.current, 
        { y: 60 }, 
        { 
          y: -60, // Bergerak melintasi posisi aslinya
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          }
        }
      );

      // 2. Floating Card: Bergerak berlawanan arah agar kontras
      gsap.fromTo(cardRef.current, 
        { y: -100 }, 
        { 
          y: 100, 
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          }
        }
      );

      // --- ANIMASI MASUK (ONCE) ---
      // Tetap jalankan animasi stagger stats saat pertama kali muncul
   
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="section min-h-screen bg-[#f4f4f4] flex items-center py-24 relative overflow-hidden"
      id="eight-layout"
    >
      {/* Background Decoration - Sesuai Desain Asli */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute left-[6%] h-full w-[1px] bg-slate-900"></div>
        <div className="absolute right-[6%] h-full w-[1px] bg-slate-900"></div>
      </div>

      <div className="container mx-auto px-[6%] relative z-10">
        <div className="grid lg:grid-cols-12 gap-0 items-start">
          
          {/* KOLOM KIRI: IMAGE BESAR (Posisi asli tidak berubah) */}
          <div className="lg:col-span-7 relative group">
            <div className="overflow-hidden rounded-sm shadow-2xl aspect-[4/5] lg:aspect-[16/10]">
              <img 
                ref={imageRef}
                src={bgLayout} 
                alt="Corporate" 
                className="w-full h-full object-cover scale-110" // Scale sedikit agar tidak bocor saat parallax
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[var(--color-utama)] text-white p-8 hidden md:block shadow-xl">
               <p className="text-xs font-bold tracking-[0.3em] uppercase mb-2 opacity-80">RIMALA</p>
               <h4 className="text-4xl font-black font-['Playfair_Display']">AESTHETIC CLINIC</h4>
            </div>
          </div>

          {/* KOLOM KANAN: CONTENT CARD (Posisi asli tidak berubah) */}
          <div className="lg:col-span-5 lg:-ml-20 mt-12 lg:mt-32 z-20">
            <div 
              ref={cardRef}
              className="bg-white p-10 md:p-16 shadow-2xl border-t-4 border-[var(--color-utama)]"
            >
              <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl text-slate-900 font-bold mb-8 leading-tight">
               Solusi Dermatologi & Estetika Profesional
              </h2>
              <p className="text-slate-600 leading-relaxed mb-12 text-lg font-light">
               Kami percaya setiap kulit unik dan berharga. Melalui konsultasi mendalam dengan tenaga ahli, Rimala memberikan solusi perawatan yang dipersonalisasi untuk menjaga kesehatan kulit sekaligus memancarkan kecantikan alami Anda secara optimal.
              </p>

            
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Layout8;