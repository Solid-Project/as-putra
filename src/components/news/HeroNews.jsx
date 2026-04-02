import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroNews = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const lineRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1), rgba(255,255,255,0.1)), url('/img/prop2.jpeg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/50" />
      
      <div ref={contentRef} className="relative z-10 px-5">
        <h1 
          ref={titleRef}
          className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl text-white mb-4 drop-shadow-lg"
        >
          Berita & Aktivitas
        </h1>
        <div 
          ref={lineRef}
          className="h-0.5 bg-[var(--color-utama)] mx-auto mb-10"
          style={{ width: 0 }}
        />
        <p 
          ref={subtitleRef}
          className="text-white/95 max-w-[600px] mx-auto mb-10 text-lg"
        >
          Update terbaru tentang kegiatan, pencapaian, dan perkembangan AS PUTRA Group
        </p>

        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <Link
            to="/news"
            className="group relative px-8 py-3.5 bg-[var(--color-utama)] text-white font-medium tracking-wide rounded-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[var(--color-utama)]/30 hover:-translate-y-0.5"
          >
            <span className="relative z-10 flex items-center gap-2">
              Semua Berita
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Link>
          <Link
            to="/about"
            className="group relative px-8 py-3.5 bg-white/20 backdrop-blur-sm border border-white/40 text-white font-medium tracking-wide rounded-full overflow-hidden transition-all duration-300 hover:bg-white/30 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/20"
          >
            <span className="relative z-10 flex items-center gap-2">
              Tentang Kami
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroNews;

