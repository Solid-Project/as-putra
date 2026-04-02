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
    // ANIMASI CINEMATIC - LANGSUNG JALAN TANPA SCROLLTRIGGER
    const ctx = gsap.context(() => {
      
      // 🔥 STAGGER MASUK CINEMATIC (SAMA PERSIS KAYA DULU)
      gsap.fromTo(itemsRef.current,
        { 
          y: 100,        // Dari bawah
          opacity: 0,    // Transparan
          scale: 0.9,    // Agak kecil
          rotateX: 10    // Efek 3D
        },
        {
          y: 0,          // Ke posisi normal
          opacity: 1,    // Muncul
          scale: 1,      // Ukuran normal
          rotateX: 0,    // Rotasi normal
          stagger: 0.15, // Muncul bergantian
          duration: 1,   // Durasi 1 detik
          ease: "power3.out", // Easing halus
          delay: 0.3     // Delay sedikit setelah page load
        }
      );

      // 🔥 HOVER CINEMATIC (SAMA PERSIS KAYA DULU)
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
      className="section grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 h-auto md:h-[630px]"
      id="sector-strip"
    >
      {sectors.map((sector, idx) => (
        <div
          key={idx}
          ref={(el) => (itemsRef.current[idx] = el)}
          className="relative bg-cover bg-center p-8 flex flex-col justify-center text-white rounded-lg transition-all duration-300 cursor-pointer"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${sector.bg})`
          }}
        >
          <h3 className="text-xl font-bold mb-3">{sector.name}</h3>
          <p className="text-sm opacity-90">{sector.desc}</p>
        </div>
      ))}
    </section>
  );
};

export default SectorStrip;