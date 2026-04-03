import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const sectors = [
  { name: 'Peternakan', desc: 'Breeding, hatchery, kemitraan, dan pengelolaan peternakan terpadu.', bg: '/img/peternakan2.jpg' },
  { name: 'Hotel & Resort', desc: 'Layanan hospitality premium (Cordela, Bulak Laut, Amanara, Aston).', bg: '/img/hotel2.jpg' },
  { name: 'Property', desc: 'Pengembangan hunian dan properti (Kuningan, Cirebon, Majalengka).', bg: '/img/property.jpg' },
  { name: 'Retail', desc: 'Usaha ritel dan layanan pendukung kebutuhan hidup.', bg: 'https://plus.unsplash.com/premium_photo-1683121938935-118d0a16a469?q=80&w=1170&auto=format&fit=crop' },
  { name: 'Ekspedisi', desc: 'Solusi logistik dan transportasi yang andal.', bg: 'https://plus.unsplash.com/premium_photo-1661963219843-f1a50a6cfcd3?q=80&w=1170&auto=format&fit=crop' }
];

const SectorStrip = () => {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
          delay: 0.3
        }
      );

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
      className="section min-h-screen flex items-center justify-center"
      id="sector-strip"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 w-full h-auto md:h-[630px] max-w-[1400px] mx-auto">
        {sectors.map((sector, idx) => (
          <div
            key={idx}
            ref={(el) => (itemsRef.current[idx] = el)}
            className="relative bg-cover bg-center p-8 flex flex-col justify-center text-white rounded-lg transition-all duration-300 cursor-pointer h-full"
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