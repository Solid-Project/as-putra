import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bgOffice from "@/assets/img/property.webp"; 

gsap.registerPlugin(ScrollTrigger);

const Layout3 = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const contentRef = useRef(null);
  const bgRef = useRef(null);
  const [activeDot, setActiveDot] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // --- 1. LIVE PARALLAX: BACKGROUND IMAGE (ZOOM & MOVE) ---
      gsap.fromTo(bgRef.current, 
        { scale: 1.2, y: "-10%" }, 
        {
          scale: 1,
          y: "10%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );

      // --- 2. LIVE PARALLAX: FLOATING CARD ---
      gsap.fromTo(cardRef.current, 
        { y: 100 }, 
        {
          y: -100,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          }
        }
      );

      // --- 3. ANIMASI MASUK AWAL ---
      gsap.fromTo(contentRef.current.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section relative min-h-screen w-full overflow-hidden flex items-center"
      id="three-layout"
      data-theme="dark"
      style={{
        backgroundColor: "var(--color-footer-bg)",
      }}
    >
      {/* 1. BACKGROUND IMAGE (LIVE PARALLAX) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          ref={bgRef}
          src={bgOffice}
          alt="AS Putra Office"
          className="w-full h-[120%] object-cover"
          style={{ opacity: 0.6 }}
        />
        <div 
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.2))",
          }}
        />
      </div>

      {/* 2. FLOATING WHITE CARD (LIVE PARALLAX) */}
      <div className="container mx-auto z-10" style={{ paddingLeft: "clamp(1rem, 6%, 6rem)", paddingRight: "clamp(1rem, 6%, 6rem)" }}>
        <div
          ref={cardRef}
          className="bg-white w-full max-w-[550px] shadow-2xl relative rounded-sm"
          style={{
            padding: "clamp(2rem, 8vw, 5rem)",
            boxShadow: "0 50px 100px -20px rgba(0,0,0,0.5)",
          }}
        >
          <div ref={contentRef} className="flex flex-col" style={{ gap: "clamp(1.5rem, 4vh, 2rem)" }}>
            <h2 
              className="font-['Playfair_Display'] font-bold tracking-tighter leading-tight"
              style={{
                color: "var(--color-teks)",
                fontSize: "clamp(2rem, 6vw, 3.5rem)",
              }}
            >
              AS Putra Group
            </h2>

            <div 
              className="mb-2"
              style={{
                width: "clamp(48px, 10vw, 64px)",
                height: "clamp(3px, 0.6vh, 4px)",
                backgroundColor: "var(--color-utama)",
              }}
            />

            <div className="space-y-6" style={{ gap: "clamp(1.5rem, 3vh, 2rem)" }}>
              <div className="group transition-all duration-300">
                <span 
                  className="font-black block mb-2 tracking-widest text-xs uppercase"
                  style={{ color: "var(--color-teks)" }}
                >
                  01. Pengembangan Berkelanjutan
                </span>
                <p 
                  className="font-light transition-colors"
                  style={{
                    color: "var(--color-teks-muted)",
                    borderLeftWidth: "2px",
                    borderLeftColor: "var(--color-bg-alt)",
                    paddingLeft: "clamp(1rem, 3vw, 1.5rem)",
                  }}
                >
                  Fokus pada model bisnis yang adaptif dan bernilai jangka panjang untuk masa depan Indonesia.
                </p>
              </div>

              <div className="group transition-all duration-300">
                <span 
                  className="font-black block mb-2 tracking-widest text-xs uppercase"
                  style={{ color: "var(--color-teks)" }}
                >
                  02. Investasi Strategis
                </span>
                <p 
                  className="font-light transition-colors"
                  style={{
                    color: "var(--color-teks-muted)",
                    borderLeftWidth: "2px",
                    borderLeftColor: "var(--color-bg-alt)",
                    paddingLeft: "clamp(1rem, 3vw, 1.5rem)",
                  }}
                >
                  Menjalin kemitraan kuat untuk mendukung pertumbuhan industri dan ekonomi nasional.
                </p>
              </div>

              <div className="group transition-all duration-300">
                <span 
                  className="font-black block mb-2 tracking-widest text-xs uppercase"
                  style={{ color: "var(--color-teks)" }}
                >
                  03. Inovasi & Integritas
                </span>
                <p 
                  className="font-light transition-colors"
                  style={{
                    color: "var(--color-teks-muted)",
                    borderLeftWidth: "2px",
                    borderLeftColor: "var(--color-bg-alt)",
                    paddingLeft: "clamp(1rem, 3vw, 1.5rem)",
                  }}
                >
                  Menggabungkan keandalan tradisional dengan solusi teknologi modern yang transparan.
                </p>
              </div>
            </div>

            {/* CTA & PAGINATION */}
            <div className="mt-8 flex flex-col" style={{ gap: "clamp(1.5rem, 4vh, 2.5rem)" }}>
              <Link
                to="/about"
                className="group flex items-center gap-4 transition-colors duration-300 uppercase tracking-[0.3em] text-[10px] font-black"
                style={{ color: "var(--color-teks-muted)" }}
              >
                <span 
                  className="transition-all duration-500"
                  style={{
                    width: "clamp(24px, 5vw, 32px)",
                    height: "1px",
                    backgroundColor: "var(--color-teks-muted)",
                  }}
                />
                Explore Corporate
              </Link>

              <div className="flex gap-4">
                {[0, 1].map((dot) => (
                  <button
                    key={dot}
                    onClick={() => setActiveDot(dot)}
                    className={`transition-all duration-500 rounded-full ${
                      activeDot === dot ? "w-8" : "w-2"
                    }`}
                    style={{
                      height: "clamp(6px, 1.5vh, 8px)",
                      backgroundColor: activeDot === dot ? "var(--color-utama)" : "var(--color-teks-muted)",
                      opacity: activeDot === dot ? 1 : 0.3,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Layout3;