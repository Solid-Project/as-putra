import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const sectors = [
  { name: 'Peternakan', desc: 'Breeding, hatchery, kemitraan, dan pengelolaan peternakan terpadu.', bg: '/react/img/property.jpg' },
  { name: 'Hotel & Resort', desc: 'Layanan hospitality premium (Cordela, Bulak Laut, Amanara, Aston).', bg: '/react/img/hotel2.jpg' },
  { name: 'Property', desc: 'Pengembangan hunian dan properti (Kuningan, Cirebon, Majalengka).', bg: '/react/img/property.jpg' },
  { name: 'Retail', desc: 'Usaha ritel dan layanan pendukung kebutuhan hidup.', bg: 'https://plus.unsplash.com/premium_photo-1683121938935-118d0a16a469?q=80&w=1170&auto=format&fit=crop' },
  { name: 'Ekspedisi', desc: 'Solusi logistik dan transportasi yang andal.', bg: 'https://plus.unsplash.com/premium_photo-1661963219843-f1a50a6cfcd3?q=80&w=1170&auto=format&fit=crop' }
];

const SectorStrip = () => {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. ANIMASI ENTRANCE (ASLI KAMU)
      // Kita buat trigger animasi masuk ini selesai tepat di posisi y: 0
      gsap.fromTo(itemsRef.current,
        { 
          y: 100,
          opacity: 0,
          scale: 0.9,
          rotateX: 10
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotateX: 0,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%", // Mulai muncul sebelum section masuk penuh
          }
        }
      );

      // 2. LIVE PARALLAX (DIPERBAIKI AGAR SEJAJAR SAAT AKTIF)
      itemsRef.current.forEach((el, idx) => {
        if (!el) return;
        
        // Offset range yang sama (60px)
        // Kita gunakan start dan end yang simetris dari tengah (0)
        const range = 60;
        const fromY = idx % 2 === 0 ? range : -range;
        const toY = idx % 2 === 0 ? -range : range;

        gsap.fromTo(el, 
          { y: fromY }, 
          {
            y: toY,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              // KUNCI UTAMA: start dan end harus simetris terhadap viewport
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            }
          }
        );
      });

      // 3. HOVER INTERACTION (ASLI KAMU)
      itemsRef.current.forEach(el => {
        if (!el) return;
        const handleMouseEnter = () => {
          gsap.to(el, { 
            scale: 1.05, 
            zIndex: 10, 
            boxShadow: "0 20px 40px rgba(0,0,0,0.3)", 
            duration: 0.4, 
            ease: "power2.out" 
          });
        };
        const handleMouseLeave = () => {
          gsap.to(el, { 
            scale: 1, 
            zIndex: 1, 
            boxShadow: "0 0 0 rgba(0,0,0,0)", 
            duration: 0.4, 
            ease: "power2.out" 
          });
        };
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section min-h-screen flex items-center justify-center bg-white overflow-hidden"
      id="sector-strip" data-title="Sektor Usaha" data-theme="light"
    >
      {/* GRID FIT TANPA ROUNDED & TANPA GAP */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 w-full h-auto md:h-[630px] max-w-[1400px] mx-auto">
        {sectors.map((sector, idx) => (
          <div
            key={idx}
            ref={(el) => (itemsRef.current[idx] = el)}
            className="relative bg-cover bg-center p-8 flex flex-col justify-center text-white transition-all duration-300 cursor-pointer h-full"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${sector.bg})`
            }}
          >
            <h3 className="text-xl font-bold mb-3">{sector.name}</h3>
            <p className="text-sm opacity-90">{sector.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SectorStrip;