import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import peternakanImage from "@/assets/img/sector1.webp";

gsap.registerPlugin(ScrollTrigger);

const sectors = [
  { name: 'Peternakan', desc: 'Breeding, hatchery, kemitraan, dan pengelolaan peternakan terpadu.', bg: peternakanImage },
  { name: 'Hotel & Resort', desc: 'Layanan hospitality premium (Cordela, Bulak Laut, Amanara, Aston).', bg: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1170&auto=format&fit=crop' },
  { name: 'Property', desc: 'Pengembangan hunian dan properti (Kuningan, Cirebon, Majalengka).', bg: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1170&auto=format&fit=crop' },
  { name: 'Retail', desc: 'Usaha ritel dan layanan pendukung kebutuhan hidup.', bg: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1170&auto=format&fit=crop' },
  { name: 'Ekspedisi', desc: 'Solusi logistik dan transportasi yang andal.', bg: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1170&auto=format&fit=crop' }
];

const SectorStrip = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // BERSIHAN SCROLLTRIGGER SEBELUMNYA
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // SET INITIAL STATE - SEMUA CARD HIDDEN
    gsap.set(cardsRef.current, {
      opacity: 0,
      y: 80
    });

    // FUNGSI UNTUK ANIMASI MASUK
    const animateEntrance = () => {
      if (hasAnimatedRef.current) return;
      hasAnimatedRef.current = true;
      
      gsap.to(cardsRef.current, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      });
    };

    // FUNGSI UNTUK RESET
    const resetAnimation = () => {
      hasAnimatedRef.current = false;
      gsap.set(cardsRef.current, {
        opacity: 0,
        y: 80
      });
    };

    // INTERSECTION OBSERVER - SOLUSI UNTUK SCROLL DARI BAWAH
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Section masuk viewport - jalanin animasi
            animateEntrance();
          } else {
            // Section keluar viewport - reset
            resetAnimation();
          }
        });
      },
      { threshold: 0.2 } // 20% section visible
    );

    observer.observe(section);

    // PARALLAX EFFECT - PAKAI SCROLLTRIGGER TAPI TIDAK MENGANGGU
    cardsRef.current.forEach((card, idx) => {
      if (!card) return;
      
      const isEven = idx % 2 === 0;
      const range = 50;
      
      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const moveY = isEven ? progress * range : -progress * range;
          // Hanya update transform jika card sudah visible
          if (card.style.opacity !== '0') {
            card.style.transform = `translateY(${moveY}px)`;
          }
        }
      });
    });

    // HOVER EFFECT
    const handleMouseEnter = (card) => {
      card.style.transform = `${card.style.transform} scale(1.02)`;
      card.style.zIndex = '10';
      card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
      card.style.transition = 'all 0.3s ease';
    };
    
    const handleMouseLeave = (card) => {
      card.style.transform = card.style.transform.replace(' scale(1.02)', '');
      card.style.zIndex = '1';
      card.style.boxShadow = 'none';
    };

    const mouseHandlers = cardsRef.current.map(card => {
      if (!card) return null;
      const onEnter = () => handleMouseEnter(card);
      const onLeave = () => handleMouseLeave(card);
      card.addEventListener('mouseenter', onEnter);
      card.addEventListener('mouseleave', onLeave);
      return { card, onEnter, onLeave };
    });

    return () => {
      observer.disconnect();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      mouseHandlers.forEach(handler => {
        if (handler?.card) {
          handler.card.removeEventListener('mouseenter', handler.onEnter);
          handler.card.removeEventListener('mouseleave', handler.onLeave);
        }
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section"
      id="sector-strip"
      style={{ 
        backgroundColor: "var(--color-bg-light)",
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 w-full h-full">
        {sectors.map((sector, idx) => (
          <div
            key={idx}
            ref={el => { if (el) cardsRef.current[idx] = el; }}
            className="relative flex flex-col justify-center text-white cursor-pointer"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${sector.bg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              padding: "clamp(1rem, 2vw, 2rem)",
              height: "100%",
              width: "100%",
              willChange: "transform, opacity",
            }}
          >
            <h3 
              className="font-bold"
              style={{
                fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
                marginBottom: "clamp(0.5rem, 1.5vh, 1rem)",
              }}
            >
              {sector.name}
            </h3>
            
            <p 
              className="opacity-90 leading-relaxed"
              style={{
                fontSize: "clamp(0.75rem, 1.5vw, 0.9rem)",
                maxWidth: "90%",
              }}
            >
              {sector.desc}
            </p>
            
            <div 
              className="sector-line"
              style={{
                width: "clamp(30px, 8vw, 50px)",
                height: "3px",
                backgroundColor: "var(--color-aksen)",
                marginTop: "clamp(0.75rem, 2vh, 1.25rem)",
                transition: "width 0.3s ease",
              }}
            />
          </div>
        ))}
      </div>

      <style>{`
        [class*="grid"] > div:hover .sector-line {
          width: clamp(50px, 12vw, 70px);
        }
      `}</style>
    </section>
  );
};

export default SectorStrip;