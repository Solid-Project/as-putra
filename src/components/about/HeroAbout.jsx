import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroAbout = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const lineRef = useRef(null);
  const subtitleRef = useRef(null);
  const scrollBtnRef = useRef(null);
  const bgImageRef = useRef(null); // Ref baru untuk handle parallax image lebih bersih

  const scrollToNext = () => {
    const nextSection = sectionRef.current?.nextElementSibling;
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. ANIMASI MASUK (REVEAL) - TETAP ASLI
      gsap.fromTo(titleRef.current, { y: 50, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.3,
      });
      
      gsap.fromTo(lineRef.current, { width: 0 }, {
        width: 64,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.8");

      gsap.fromTo(subtitleRef.current, { y: 20, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      }, "-=0.6");

      gsap.fromTo(contentRef.current.querySelectorAll("a"), { y: 30, opacity: 0 }, {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.6,
      });

      // 2. LIVE PARALLAX: BACKGROUND IMAGE
      // Gambar meluncur turun perlahan (y: 20%)
      gsap.to(bgImageRef.current, {
        y: '20%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // 3. LIVE PARALLAX: CONTENT WRAPPER
      // Teks meluncur naik (y: -100px) untuk efek depth
      gsap.to(contentRef.current, {
        y: -100,
        opacity: 0.6, // Memudar pelan agar fokus ke section bawah
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section relative h-screen overflow-hidden bg-black"
      id="hero-about"
      data-theme="dark"
      data-title="Tentang Kami"
    >
      {/* BACKGROUND IMAGE LAYER - Terpisah agar Parallax Halus */}
      <div 
        ref={bgImageRef}
        className="absolute inset-0 z-0 h-[120%] w-full"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url('/react/img/team.jpeg')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      />

      {/* OVERLAY GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/60 z-[1]" />
      
      {/* CONTENT LAYER */}
      <div ref={contentRef} className="relative z-10 h-full flex items-center justify-center text-center px-5">
        <div>
          <h1 ref={titleRef} className="font-['Playfair_Display'] text-5xl md:text-7xl lg:text-8xl text-white mb-6 drop-shadow-2xl font-bold">
            Tentang Kami
          </h1>

          <div ref={lineRef} className="w-16 h-1 bg-[var(--color-utama)] mx-auto mb-10" />

          <p ref={subtitleRef} className="text-white/95 max-w-[650px] mx-auto mb-12 text-lg md:text-xl font-light leading-relaxed">
            Membangun warisan melalui inovasi, integritas, dan komitmen <br className="hidden md:block"/> untuk masa depan yang lebih baik.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/about"
              className="group relative px-10 py-4 bg-[var(--color-utama)] text-white font-bold tracking-widest text-[10px] uppercase rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[var(--color-utama)]/40 hover:-translate-y-1"
            >
              <span className="relative z-10 flex items-center gap-2">
                Pelajari Lebih Lanjut
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
            
            <Link
              to="/career"
              className="group relative px-10 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold tracking-widest text-[10px] uppercase rounded-full transition-all duration-300 hover:bg-white hover:text-black hover:-translate-y-1"
            >
              Bergabung Bersama Kami
            </Link>
          </div>
        </div>
      </div>

      {/* SCROLL BUTTON */}
      <button
        ref={scrollBtnRef}
        onClick={scrollToNext}
        className="absolute bottom-12 right-[10%] z-20 hidden lg:flex flex-col items-center gap-4 group cursor-pointer"
      >
        <span className="vertical-text text-[10px] font-black uppercase tracking-[0.5em] text-white/40 group-hover:text-[var(--color-utama)] transition-colors duration-500">
          Scroll
        </span>
        <div className="flex flex-col items-center -space-y-3">
          <svg className="w-8 h-8 text-[var(--color-utama)] animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
          <svg className="w-8 h-8 text-[var(--color-utama)] animate-bounce opacity-50" style={{ animationDelay: '0.2s' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
    </section>
  );
};

export default HeroAbout;