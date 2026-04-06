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

  const scrollToNext = () => {
    const nextSection = sectionRef.current?.nextElementSibling;
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Animasi Title
      gsap.fromTo(titleRef.current, { y: 50, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          end: "bottom 70%",
          toggleActions: "play none none reverse",
          immediateRender: false,
          invalidateOnRefresh: true
        }
      });

      // 2. Animasi Line
      gsap.fromTo(lineRef.current, { width: 0 }, {
        width: 80,
        duration: 0.6,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          end: "bottom 70%",
          toggleActions: "play none none reverse",
          immediateRender: false,
          invalidateOnRefresh: true
        }
      });

      // 3. Animasi Subtitle
      gsap.fromTo(subtitleRef.current, { y: 20, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          end: "bottom 70%",
          toggleActions: "play none none reverse",
          immediateRender: false,
          invalidateOnRefresh: true
        }
      });

      // 4. Animasi Buttons Stagger
      gsap.fromTo(contentRef.current.querySelectorAll("a"), { y: 30, opacity: 0 }, {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.6,
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="section relative h-screen flex items-center justify-center text-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1), rgba(255,255,255,0.1)), url('/react/img/team.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
      data-theme="dark"
      data-title="Tentang Kami"
    >
      {/* Overlay Gelap */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/50" />
      
      <div ref={contentRef} className="relative z-10 px-5">
        {/* Title disamakan dengan HeroNews */}
        <h1 
          ref={titleRef}
          className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl text-white mb-4 drop-shadow-lg"
        >
          Tentang <br /> AS PUTRA Group
        </h1>

        {/* Line disamakan dengan HeroNews */}
        <div 
          ref={lineRef}
          className="h-0.5 bg-[var(--color-utama)] mx-auto mb-10"
          style={{ width: 0 }}
        />

        {/* Subtitle disamakan dengan HeroNews */}
        <p 
          ref={subtitleRef}
          className="text-white/95 max-w-[600px] mx-auto mb-10 text-lg leading-relaxed"
        >
          Membangun masa depan melalui inovasi, integritas, dan komitmen berkelanjutan untuk kemajuan bangsa.
        </p>

        {/* Buttons disamakan dengan HeroNews */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <Link
            to="/about"
            className="group relative px-8 py-3.5 bg-[var(--color-utama)] text-white font-medium tracking-wide rounded-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[var(--color-utama)]/30 hover:-translate-y-0.5"
          >
            <span className="relative z-10 flex items-center gap-2">
              Pelajari Lebih Lanjut
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Link>

          <Link
            to="/career"
            className="group relative px-8 py-3.5 bg-white/20 backdrop-blur-sm border border-white/40 text-white font-medium tracking-wide rounded-full overflow-hidden transition-all duration-300 hover:bg-white/30 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/20"
          >
            <span className="relative z-10 flex items-center gap-2">
              Karir Kami
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </Link>
        </div>
      </div>

      {/* Scroll Indicator disamakan dengan HeroNews */}
      <button
        ref={scrollBtnRef}
        onClick={scrollToNext}
        className="absolute bottom-12 right-[10%] z-20 hidden lg:flex flex-col items-center gap-2 group cursor-pointer"
      >
        <span className="vertical-text text-[11px] font-black uppercase tracking-[0.5em] text-white/40 group-hover:text-[var(--color-utama)] transition-colors duration-500 mb-4">
          Scroll
        </span>

        <div className="flex flex-col items-center -space-y-2">
          {[1, 2, 3].map((i) => (
            <svg
              key={i}
              className={`w-8 h-8 text-[var(--color-utama)] animate-arrow-${i}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          ))}
        </div>
      </button>
    </section>
  );
};

export default HeroAbout;