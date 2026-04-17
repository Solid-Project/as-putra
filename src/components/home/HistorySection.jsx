import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import sejarahImg from "@/assets/img/sejarah.webp";

gsap.registerPlugin(ScrollTrigger);

const HistorySection = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasTyped, setHasTyped] = useState(false);

  const fullText = "Our History";

  // Efek mengetik - hanya sekali saat section masuk viewport
  useEffect(() => {
    const section = sectionRef.current;
    
    const startTyping = () => {
      if (hasTyped) return;
      
      let currentIndex = 0;
      setDisplayText("");
      setIsTyping(true);

      const typingInterval = setInterval(() => {
        if (currentIndex < fullText.length) {
          setDisplayText(fullText.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
          setHasTyped(true);
        }
      }, 120);

      return () => clearInterval(typingInterval);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTyped) {
            startTyping();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, [hasTyped]);

  useEffect(() => {
    const section = sectionRef.current;

    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current, 
        { y: 60 }, 
        {
          y: -60,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          }
        }
      );

      gsap.fromTo(imageRef.current, 
        { y: -60 }, 
        {
          y: 60,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section relative overflow-hidden flex items-center"
      id="history-section" 
      data-theme="light" 
      data-title="Sejarah Kami"
      style={{
        height: "100vh",
        maxHeight: "100vh",
        background: `linear-gradient(to bottom, var(--color-bg-light), var(--color-bg-alt))`,
      }}
    >
      {/* Decorative Background */}
      <div 
        className="absolute top-0 right-0 rounded-full blur-3xl -z-10"
        style={{
          backgroundColor: "var(--color-utama)",
          opacity: 0.05,
          width: "clamp(200px, 40vw, 500px)",
          height: "clamp(200px, 40vw, 500px)",
        }}
      />
      <div 
        className="absolute bottom-0 left-0 rounded-full blur-3xl -z-10"
        style={{
          backgroundColor: "var(--color-utama)",
          opacity: 0.05,
          width: "clamp(200px, 40vw, 500px)",
          height: "clamp(200px, 40vw, 500px)",
        }}
      />

      {/* Container yang mengisi penuh tinggi section */}
      <div 
        className="w-full h-full flex flex-col justify-center"
        style={{
          paddingTop: "clamp(0.5rem, 2vh, 1.5rem)",
          paddingBottom: "clamp(0.5rem, 2vh, 1.5rem)",
          paddingLeft: "clamp(1rem, 4vw, 2.5rem)",
          paddingRight: "clamp(1rem, 4vw, 2.5rem)",
        }}
      >
        <div 
          className="max-w-[1300px] mx-auto w-full grid md:grid-cols-2 items-center"
          style={{
            gap: "clamp(1rem, 3vw, 2.5rem)",
          }}
        >
          {/* TEXT CONTENT */}
          <div ref={contentRef} className="order-2 md:order-1">
            <div style={{ marginBottom: "clamp(0.25rem, 1vh, 0.75rem)" }}>
              <div className="inline-flex items-center min-h-[1.5rem]">
                <span
                  className="font-semibold tracking-wider uppercase"
                  style={{
                    color: "var(--color-utama)",
                    fontSize: "clamp(0.65rem, 1.8vw, 0.9rem)",
                    paddingRight: !isTyping && displayText ? "clamp(3px, 0.8vw, 6px)" : "0",
                    borderRightWidth: !isTyping && displayText ? "clamp(1.5px, 0.3vw, 2.5px)" : "0",
                    borderRightStyle: "solid",
                    borderRightColor: "var(--color-utama)",
                  }}
                >
                  {displayText || "\u00A0"}
                </span>
                {isTyping && (
                  <span 
                    className="ml-1 animate-blink"
                    style={{ 
                      backgroundColor: "var(--color-utama)",
                      width: "clamp(1.5px, 0.25vw, 2px)",
                      height: "clamp(0.8rem, 2.2vw, 1.1rem)",
                    }}
                  />
                )}
              </div>
            </div>

            <h2 
              className="font-['Playfair_Display'] leading-tight font-bold"
              style={{
                color: "var(--color-teks)",
                fontSize: "clamp(1.6rem, 5vw, 2.8rem)",
                marginBottom: "clamp(0.5rem, 1.5vh, 1rem)",
              }}
            >
              Sejarah{" "}
              <span 
                className="relative inline-block"
                style={{ color: "var(--color-utama)" }}
              >
                AS PUTRA
              </span>
            </h2>

            <div 
              className="space-y-[clamp(0.35rem,1vh,0.75rem)] leading-relaxed"
              style={{ 
                color: "var(--color-teks-muted)",
                fontSize: "clamp(0.75rem, 1.8vw, 0.95rem)" 
              }}
            >
              <p>
                Didirikan oleh{" "}
                <strong style={{ color: "var(--color-teks)" }}>
                  H. Dudung Dulajid
                </strong>
                , AS PUTRA Group memulai perjalanannya di Kuningan dengan visi untuk memberdayakan ekonomi lokal melalui peternakan unggas.
              </p>
              <p>
                Hari ini, perjuangan tersebut berlanjut di bawah kepemimpinan putranya,{" "}
                <strong style={{ color: "var(--color-teks)" }}>
                  H. Aif Arifin Sidhik
                </strong>
                . Sebagai CEO, Aif telah memperluas cakrawala grup ke berbagai bidang strategis.
              </p>
            </div>

            <div style={{ marginTop: "clamp(1rem, 2.5vh, 1.5rem)" }}>
              <Link
                to="/about"
                className="group relative inline-flex items-center gap-2 font-medium tracking-wide rounded-full overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: "var(--color-utama)",
                  color: "white",
                  paddingTop: "clamp(0.5rem, 1.5vh, 0.8rem)",
                  paddingBottom: "clamp(0.5rem, 1.5vh, 0.8rem)",
                  paddingLeft: "clamp(1rem, 3vw, 1.8rem)",
                  paddingRight: "clamp(1rem, 3vw, 1.8rem)",
                  fontSize: "clamp(0.75rem, 1.8vw, 0.95rem)",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 20px 25px -5px var(--color-utama)40`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = `0 4px 6px -1px rgb(0 0 0 / 0.1)`;
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Baca Selengkapnya
                  <svg 
                    className="group-hover:translate-x-1 transition-transform duration-300"
                    style={{ width: "clamp(12px, 1.5vw, 16px)", height: "clamp(12px, 1.5vw, 16px)" }}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div 
                  className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                  style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                />
              </Link>
            </div>
          </div>

          {/* IMAGE CONTENT */}
          <div ref={imageRef} className="relative group order-1 md:order-2">
            <div 
              className="absolute rounded-full z-0"
              style={{
                borderWidth: "clamp(1px, 0.25vw, 2px)",
                borderStyle: "solid",
                borderColor: "var(--color-utama)",
                opacity: 0.2,
                width: "clamp(50px, 16vw, 110px)",
                height: "clamp(50px, 16vw, 110px)",
                top: "clamp(-8px, -2vw, -18px)",
                right: "clamp(-8px, -2vw, -18px)",
              }}
            />
            <div 
              className="absolute rounded-full z-0"
              style={{
                borderWidth: "clamp(1px, 0.25vw, 2px)",
                borderStyle: "solid",
                borderColor: "var(--color-utama)",
                opacity: 0.2,
                width: "clamp(65px, 20vw, 140px)",
                height: "clamp(65px, 20vw, 140px)",
                bottom: "clamp(-8px, -2vw, -18px)",
                left: "clamp(-8px, -2vw, -18px)",
              }}
            />

            <div 
              className="relative z-10 overflow-hidden shadow-2xl transition-all duration-500 group-hover:shadow-3xl group-hover:scale-[1.01]"
              style={{ 
                borderRadius: "clamp(10px, 2vw, 16px)",
                maxWidth: "90%",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <img
                src={sejarahImg}
                alt="H. Dudung Dulajid & H. Aif Arifin Sidhik"
                className="w-full relative z-0 transition-transform duration-700 group-hover:scale-105"
                style={{ 
                  aspectRatio: "4/3", 
                  objectFit: "cover",
                }}
              />
            </div>

            <div 
              className="relative z-10 text-center"
              style={{ marginTop: "clamp(0.5rem, 2vh, 1rem)" }}
            >
              <div 
                className="inline-block backdrop-blur-sm rounded-full shadow-md"
                style={{
                  backgroundColor: "rgba(255,255,255,0.8)",
                  paddingTop: "clamp(0.25rem, 1vh, 0.4rem)",
                  paddingBottom: "clamp(0.25rem, 1vh, 0.4rem)",
                  paddingLeft: "clamp(0.7rem, 2.5vw, 1.2rem)",
                  paddingRight: "clamp(0.7rem, 2.5vw, 1.2rem)",
                }}
              >
                <p 
                  className="font-medium whitespace-nowrap"
                  style={{ 
                    color: "var(--color-utama)",
                    fontSize: "clamp(0.6rem, 1.6vw, 0.8rem)" 
                  }}
                >
                  H. Dudung Dulajid & H. Aif Arifin Sidhik
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink { 
          0%, 100% { opacity: 1; } 
          50% { opacity: 0; } 
        }
        .animate-blink { 
          animation: blink 0.8s step-end infinite; 
        }
      `}</style>
    </section>
  );
};

export default HistorySection;