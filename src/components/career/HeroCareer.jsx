// src/components/HeroCareer.jsx
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroCareer = () => {
  const headerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

      // Animasi judul dan subtitle masuk
      gsap.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 80%',
          toggleActions: 'play reverse play reverse',
        }
      });

      gsap.from(subtitleRef.current, {
        y: 20,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 80%',
          toggleActions: 'play reverse play reverse',
        }
      });

      // Background parallax
      gsap.to(headerRef.current, {
        backgroundPositionY: '+=50px',
        ease: 'none',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <header 
      ref={headerRef}
      className="relative h-[100vh] flex items-center justify-center text-center overflow-hidden bg-cover bg-center panel"
      style={{ 
        backgroundImage: `linear-gradient(rgba(11, 19, 43, 0.85), rgba(11, 19, 43, 0.85)), url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80')`
      }}
    >
      <div className="relative z-10 px-5">
        <h1
          ref={titleRef}
          className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl text-white mb-4 drop-shadow-lg"
        >
          Bergabunglah dengan Kami
        </h1>
        <p
          ref={subtitleRef}
          className="text-white/80 max-w-[600px] mx-auto"
        >
          Jadilah bagian dari sesuatu yang lebih besar. Bentuk masa depan bersama AS PUTRA.
        </p>
      </div>
    </header>
  );
};

export default HeroCareer;