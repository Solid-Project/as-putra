import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FirstLayout = ({ data }) => {
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
      // Logo animasi memanjang
      gsap.fromTo(logoRef.current, 
        { scaleX: 0, opacity: 0, rotation: -90 }, 
        {
          scaleX: 1,
          opacity: 1,
          rotation: 0,
          duration: 1.5,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            end: "bottom 60%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // Extreme parallax layers
      parallaxLayersRef.current.forEach((layer, i) => {
        gsap.to(layer, {
          y: `-=200`,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: i * 0.3, // Different scrub for extreme effect
          }
        });
      });

      // Original animations...
      gsap.fromTo(numberRef.current, { scale: 0, opacity: 0, rotation: -180 }, {
        scale: 1,
        opacity: 0.15,
        rotation: 0,
        duration: 1,
        ease: "back.out(1.2)",
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

      gsap.fromTo(titleRef.current, { x: -60, opacity: 0 }, {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          end: "bottom 70%",
          toggleActions: "play none none reverse",
        }
      });

      gsap.fromTo(descRef.current, { x: -40, opacity: 0 }, {
        x: 0,
        opacity: 1,
        duration: 0.6,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          end: "bottom 70%",
          toggleActions: "play none none reverse",
        }
      });

      gsap.fromTo(imageRef.current, { scale: 0.9, opacity: 0, rotateY: 30 }, {
        scale: 1,
        opacity: 1,
        rotateY: 0,
        duration: 1,
        delay: 0.3,
        ease: "back.out(0.8)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          end: "bottom 70%",
          toggleActions: "play none none reverse",
        }
      });

      gsap.fromTo(itemsRef.current, { y: 40, opacity: 0 }, {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.5,
        delay: 0.5,
        ease: "power3.out",
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
        duration: 0.5,
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
      className="section relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen"
      id={data.id}
    >
      {/* Extreme Parallax Layers */}
      <div ref={el => parallaxLayersRef.current[0] = el} className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[var(--color-utama)] rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-[var(--color-utama)]/50 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, var(--color-utama) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      {/* Logo Area */}
      <div className="relative z-20 text-center py-12">
        <div ref={logoRef} className="inline-block mx-auto mb-8">
          <svg className="w-32 h-16 md:w-48 md:h-24 fill-current text-[var(--color-utama)]" viewBox="0 0 200 80">
            <rect className="w-full h-full" rx="12" fill="currentColor" />
            <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" className="font-bold text-xl md:text-2xl fill-white drop-shadow-lg">AS PUTRA</text>
            <path d="M10 10 L20 20 L10 30 Z" fill="rgba(255,255,255,0.3)" />
          </svg>
        </div>
        <h3 className="text-2xl md:text-3xl font-semibold text-white/90">Official Partner</h3>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div>
            <div className="relative mb-8">
              <span 
                ref={numberRef}
                className="absolute -top-10 -left-10 text-[12rem] md:text-[15rem] font-bold text-[var(--color-utama)] opacity-15 pointer-events-none"
              >
                {data.number}
              </span>
              <span 
                ref={subtitleRef}
                className="inline-block px-3 py-1 rounded-full bg-[var(--color-utama)]/20 text-[var(--color-utama)] text-sm font-semibold mb-3"
              >
                {data.subtitle}
              </span>
              <h2 
                ref={titleRef}
                className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl text-white relative z-10"
              >
                {data.title}
              </h2>
            </div>
            
            <p 
              ref={descRef}
              className="text-white/70 text-lg leading-relaxed mb-8 max-w-lg"
            >
              {data.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.items.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.link}
                  ref={el => itemsRef.current[idx] = el}
                  className="group flex items-start gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-[var(--color-utama)]/50 transition-all duration-300 hover:-translate-y-1"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h4 className="font-semibold text-white group-hover:text-[var(--color-utama)] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-sm text-white/50">{item.description}</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            {data.cta && (
              <div ref={ctaRef} className="mt-8">
                <Link 
                  to={data.cta.link}
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-utama)] text-white font-medium rounded-full hover:shadow-xl hover:shadow-[var(--color-utama)]/30 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <span>{data.cta.text}</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            )}
          </div>

          {/* Right Image */}
          <div 
            ref={imageRef}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-utama)]/20 to-[var(--color-utama)]/5 rounded-2xl blur-xl opacity-75"></div>
            <div className="relative overflow-hidden rounded-2xl shadow-2xl ring-2 ring-[var(--color-utama)]/20">
              <img
                src={data.image}
                alt={data.title}
                className="w-full h-96 object-cover transition-all duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent" />
            </div>
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-[var(--color-utama)]/20 border-2 border-[var(--color-utama)] rounded-full"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FirstLayout;

