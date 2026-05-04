import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import peternakanImage from "@/assets/img/sector1.webp";
gsap.registerPlugin(ScrollTrigger);

const sectors = [
  { name: 'Peternakan', desc: 'Breeding, hatchery, kemitraan, dan pengelolaan peternakan terpadu.', bg: peternakanImage },
  { name: 'Hotel & Resort', desc: 'Layanan hospitality premium (Cordela, Bulak Laut, Amanara, Aston).', bg: '/react/img/hotel2.webp' },
  { name: 'Property', desc: 'Pengembangan hunian dan properti (Kuningan, Cirebon, Majalengka).', bg: '/react/img/prop2.jpeg' },
  { name: 'Retail', desc: 'Usaha ritel dan layanan pendukung kebutuhan hidup.', bg: '/react/img/retail.webp' },
  { name: 'Ekspedisi', desc: 'Solusi logistik dan transportasi yang andal.', bg: '/react/img/transport.webp' }
];

const SectorStrip = () => {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. ANIMASI ENTRANCE - versi original
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
            toggleActions: "play none none none",
          }
        }
      );

      // 2. LIVE PARALLAX - versi original dengan range lebih besar
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
              scrub: 1.2,
            }
          }
        );
      });

      // 3. HOVER INTERACTION - versi original
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
        
        return () => {
          el.removeEventListener('mouseenter', handleMouseEnter);
          el.removeEventListener('mouseleave', handleMouseLeave);
        };
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
              minHeight: "clamp(350px, 45vh, 450px)",
              height: "100%",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            {/* Judul */}
            <h3 
              className="font-bold"
              style={{
                fontSize: "clamp(1.3rem, 3.5vw, 2rem)",
                marginBottom: "clamp(0.75rem, 2vh, 1.25rem)",
              }}
            >
              {sector.name}
            </h3>
            
            {/* Deskripsi dengan tinggi konsisten */}
            <div
              style={{
                minHeight: "clamp(70px, 12vh, 90px)",
              }}
            >
              <p 
                className="opacity-90 leading-relaxed"
                style={{
                  fontSize: "clamp(0.85rem, 2vw, 1rem)",
                  maxWidth: "95%",
                }}
              >
                {sector.desc}
              </p>
            </div>
            
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