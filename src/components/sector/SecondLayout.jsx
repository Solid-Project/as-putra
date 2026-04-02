import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SecondLayout = ({ data }) => {
  const sectionRef = useRef(null);
  const logoRef = useRef(null);
  const numberRef = useRef(null);
  const subtitleRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const imageRef = useRef(null);
  const itemsRef = useRef([]);
  const ctaRef = useRef(null);
  const parallaxLayersRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Logo memanjang animasi
      gsap.fromTo(logoRef.current, 
        { scaleX: 0, opacity: 0, rotationX: 90 }, 
        {
          scaleX: 1,
          opacity: 1,
          rotationX: 0,
          duration: 1.8,
          ease: "elastic.out(1, 0.4)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            end: "bottom 60%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // Extreme multi-layer parallax
      parallaxLayersRef.current.forEach((layer, i) => {
        gsap.to(layer, {
          y: `-=250`,
          rotation: i % 2 ? 2 : -2,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: (i + 1) * 0.25,
          }
        });
      });

      // Original animations enhanced
      gsap.fromTo(numberRef.current, { y: 50, opacity: 0 }, {
        y: 0,
        opacity: 0.1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          end: "bottom 70%",
          toggleActions: "play none none reverse",
        }
      });

      gsap.fromTo(subtitleRef.current, { y: 20, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          end: "bottom 70%",
          toggleActions: "play none none reverse",
        }
      });

      gsap.fromTo(titleRef.current, { y: 60, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "back.out(0.8)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          end: "bottom 70%",
          toggleActions: "play none none reverse",
        }
      });

      gsap.fromTo(descRef.current, { y: 30, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          end: "bottom 70%",
          toggleActions: "play none none reverse",
        }
      });

      gsap.fromTo(imageRef.current, { scale: 1.1, opacity: 0 }, {
        scale: 1,
        opacity: 1,
        duration: 1.4,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          end: "bottom 70%",
          toggleActions: "play none none reverse",
        }
      });

      gsap.fromTo(itemsRef.current, { y: 40, opacity: 0, scale: 0.95 }, {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.12,
        duration: 0.7,
        delay: 0.5,
        ease: "back.out(0.8)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          end: "bottom 70%",
          toggleActions: "play none none reverse",
        }
      });

      gsap.fromTo(ctaRef.current, { y: 20, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        delay: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          end: "bottom 70%",
          toggleActions: "play none none reverse",
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="section relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-orange-50 min-h-screen"
      id={data.id}
    >
      {/* Extreme Parallax Background Layers */}
      <div ref={el => parallaxLayersRef.current[0] = el} className="absolute inset-0">
        <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-gradient-to-br from-[var(--color-utama)]/5 to-transparent rounded-full blur-3xl"></div>
      </div>
      <div ref={el => parallaxLayersRef.current[1] = el} className="absolute inset-0">
        <div className="absolute bottom-[-10%] right-[-10%] w-[120%] h-[120%] bg-[var(--color-utama)]/3 rounded-full blur-2xl rotate-12"></div>
      </div>

      {/* Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 25px 25px, var(--color-utama) 2px, transparent 2px)', backgroundSize: '50px 50px' }}></div>

      {/* Logo Section */}
      <div className="relative z-20 text-center py-16">
        <div ref={logoRef} className="inline-block mx-auto mb-10">
          <svg className="w-36 h-20 md:w-52 md:h-28 fill-current text-[var(--color-utama)] drop-shadow-xl" viewBox="0 0 220 90">
            <rect className="w-full h-full rx='16' ry='16'" fill="currentColor" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>
            <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" className="font-bold text-2xl md:text-3xl fill-white drop-shadow-2xl tracking-[0.1em]">AS PUTRA</text>
            <circle cx="20" cy="20" r="8" fill="rgba(255,255,255,0.4)" />
            <circle cx="200" cy="70" r="6" fill="rgba(255,255,255,0.3)" />
          </svg>
        </div>
        <div className="text-[var(--color-utama)] font-semibold text-lg md:text-xl tracking-wide">Trusted Excellence Since 1984</div>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Image */}
          <div 
            ref={imageRef}
            className="relative group order-2 lg:order-1"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-utama)]/10 to-transparent rounded-3xl blur-xl group-hover:opacity-100 transition-opacity"></div>
            <div className="relative overflow-hidden rounded-3xl shadow-2xl ring ring-[var(--color-utama)]/20 hover:ring-[var(--color-utama)]/40 transition-all duration-500">
              <img src={data.image} alt={data.title} className="w-full h-[500px] object-cover transition-all duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent" />
            </div>
            <div className="absolute -inset-2 bg-gradient-to-r from-[var(--color-utama)]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
          </div>

          {/* Right Content */}
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <div className="relative mb-12">
              <span 
                ref={numberRef}
                className="absolute top-0 -right-16 lg:-right-24 text-[12rem] md:text-[16rem] font-bold text-[var(--color-utama)] opacity-10 pointer-events-none"
              >
                {data.number}
              </span>
              <span 
                ref={subtitleRef}
                className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-[var(--color-utama)]/20 to-[var(--color-utama)]/10 text-[var(--color-utama)] text-sm font-semibold tracking-wider uppercase mb-6"
              >
                {data.subtitle}
              </span>
              <h2 
                ref={titleRef}
                className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl text-[var(--color-teks)] relative z-10 leading-tight"
              >
                {data.title}
              </h2>
            </div>
            
            <p 
              ref={descRef}
              className="text-[var(--color-teks-muted)] text-lg leading-relaxed mb-12 max-w-xl"
            >
              {data.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              {data.items.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.link}
                  ref={el => itemsRef.current[idx] = el}
                  className="group flex items-center gap-4 p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:border-[var(--color-utama)]/40 hover:shadow-2xl hover:shadow-[var(--color-utama)]/10 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02]"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-utama)]/20 group-hover:from-[var(--color-utama)] group-hover:to-white/20 flex items-center justify-center text-xl transition-all duration-500 group-hover:scale-110">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white group-hover:text-[var(--color-utama)] transition-all duration-300 text-lg">
                      {item.title}
                    </h4>
                    <p className="text-white/60 group-hover:text-white/80 text-sm">{item.description}</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* CTA */}
            {data.cta && (
              <div ref={ctaRef} className="text-center lg:text-left">
                <Link 
                  to={data.cta.link}
                  className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[var(--color-utama)] to-[var(--color-utama)]/80 text-white font-semibold rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-[var(--color-utama)]/50 hover:-translate-y-2 hover:scale-105 transition-all duration-500 overflow-hidden"
                >
                  <span>{data.cta.text}</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  <div className="absolute inset-0 bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default SecondLayout;

