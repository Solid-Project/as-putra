import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const sectors = [
  { name: 'Peternakan', desc: 'Breeding, hatchery, kemitraan, dan pengelolaan peternakan terpadu.', bg: '/react/img/peternakan.webp' },
  { name: 'Hotel & Resort', desc: 'Layanan hospitality premium (Cordela, Bulak Laut, Amanara, Aston).', bg: '/react/img/hotel2.webp' },
  { name: 'Property', desc: 'Pengembangan hunian dan properti (Kuningan, Cirebon, Majalengka).', bg: '/react/img/property.webp' },
  { name: 'Retail', desc: 'Usaha ritel dan layanan pendukung kebutuhan hidup.', bg: 'https://plus.unsplash.com/premium_photo-1683121938935-118d0a16a469?q=80&w=1170&auto=format&fit=crop' },
  { name: 'Ekspedisi', desc: 'Solusi logistik dan transportasi yang andal.', bg: 'https://plus.unsplash.com/premium_photo-1661963219843-f1a50a6cfcd3?q=80&w=1170&auto=format&fit=crop' }
];

const SectorStrip = () => {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. ANIMASI ENTRANCE
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
            start: "top 85%",
          }
        }
      );

      // 2. LIVE PARALLAX
      itemsRef.current.forEach((el, idx) => {
        if (!el) return;
        
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
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            }
          }
        );
      });

      // 3. HOVER INTERACTION
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
      className="section overflow-hidden"
      id="sector-strip" 
      data-title="Sektor Usaha" 
      data-theme="light"
      style={{ 
        backgroundColor: "var(--color-bg-light)",
        minHeight: "100vh",
        height: "auto",
        display: "flex",
      }}
    >
      {/* GRID - FULL FIT, TANPA GAP, TANPA PADDING */}
      <div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 w-full"
        style={{ margin: 0 }}
      >
        {sectors.map((sector, idx) => (
          <div
            key={idx}
            ref={(el) => (itemsRef.current[idx] = el)}
            className="relative bg-cover bg-center flex flex-col justify-center text-white transition-all duration-300 cursor-pointer"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${sector.bg})`,
              padding: "clamp(1.25rem, 4vw, 2rem)",
              minHeight: "100%",
            }}
          >
            {/* Judul - DIPERBESAR */}
            <h3 
              className="font-bold"
              style={{
                fontSize: "clamp(1.5rem, 4vw, 2.2rem)",
                marginBottom: "clamp(0.75rem, 2vh, 1.25rem)",
              }}
            >
              {sector.name}
            </h3>
            
            {/* Deskripsi - DIPERBESAR */}
            <p 
              className="opacity-90 leading-relaxed"
              style={{
                fontSize: "clamp(0.9rem, 2.2vw, 1.1rem)",
                maxWidth: "95%",
              }}
            >
              {sector.desc}
            </p>
            
            {/* Garis aksen */}
            <div 
              style={{
                width: "clamp(40px, 10vw, 60px)",
                height: "clamp(2px, 0.5vw, 4px)",
                backgroundColor: "var(--color-aksen)",
                marginTop: "clamp(1rem, 2.5vh, 1.5rem)",
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SectorStrip;