import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import sejarahImg from "@/assets/img/owner.jpg";

const HistorySection = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const typingIntervalRef = useRef(null);
  const animationFrameRef = useRef(null);
  const observerRef = useRef(null);
  const currentIndexRef = useRef(0);
  const isMountedRef = useRef(true);

  const fullText = "Our History";

  // Fungsi untuk memulai efek mengetik
  const startTyping = useCallback(() => {
    // Bersihkan interval yang sedang berjalan
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }

    if (!isMountedRef.current) return;
    
    // Reset state
    currentIndexRef.current = 0;
    setDisplayText("");
    setIsTyping(true);

    // Fungsi untuk mengetik huruf berikutnya
    const typeNextChar = () => {
      if (!isMountedRef.current) {
        if (typingIntervalRef.current) {
          clearInterval(typingIntervalRef.current);
          typingIntervalRef.current = null;
        }
        return;
      }
      
      currentIndexRef.current++;
      const newText = fullText.slice(0, currentIndexRef.current);
      setDisplayText(newText);

      if (currentIndexRef.current >= fullText.length) {
        // Selesai mengetik
        if (typingIntervalRef.current) {
          clearInterval(typingIntervalRef.current);
          typingIntervalRef.current = null;
        }
        setIsTyping(false);
      }
    };

    // Mulai interval typing
    typingIntervalRef.current = setInterval(typeNextChar, 110);
  }, [fullText]);

  // Reset dan mulai ulang typing
  const resetAndStartTyping = useCallback(() => {
    // Hentikan interval yang sedang berjalan
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }
    
    // Reset semua state
    currentIndexRef.current = 0;
    setDisplayText("");
    setIsTyping(false);
    
    // Mulai typing baru
    setTimeout(() => {
      if (isMountedRef.current) {
        startTyping();
      }
    }, 150);
  }, [startTyping]);

  // Efek untuk observer - jalan setiap kali section active
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Bersihkan observer sebelumnya
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log("Section visible, starting typing effect"); // Debug
            // Reset dan mulai typing dari awal setiap kali section terlihat
            resetAndStartTyping();
          }
        });
      },
      { threshold: 0.3, rootMargin: "50px" }
    );

    observerRef.current.observe(section);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
    };
  }, [resetAndStartTyping]);

  // Efek Parallax
  const updateParallax = useCallback(() => {
    if (!contentRef.current || !imageRef.current || !sectionRef.current) return;
    
    const rect = sectionRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const sectionHeight = rect.height;
    
    let progress = 0;
    const scrollPercentage = (viewportHeight - rect.top) / (viewportHeight + sectionHeight);
    progress = Math.max(0, Math.min(1, scrollPercentage));
    
    const easedProgress = progress < 0.5 
      ? 4 * progress * progress * progress 
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;
    
    const contentY = -80 + (easedProgress * 160);
    const imageY = 80 - (easedProgress * 160);
    
    contentRef.current.style.transform = `translate3d(0, ${contentY}px, 0)`;
    imageRef.current.style.transform = `translate3d(0, ${imageY}px, 0)`;
  }, []);

  const handleScroll = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    animationFrameRef.current = requestAnimationFrame(() => {
      updateParallax();
    });
  }, [updateParallax]);

  useEffect(() => {
    isMountedRef.current = true;
    updateParallax();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    
    return () => {
      isMountedRef.current = false;
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
    };
  }, [handleScroll, updateParallax]);

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
        overflow: 'hidden',
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
          willChange: 'transform',
        }}
      />
      <div 
        className="absolute bottom-0 left-0 rounded-full blur-3xl -z-10"
        style={{
          backgroundColor: "var(--color-utama)",
          opacity: 0.05,
          width: "clamp(200px, 40vw, 500px)",
          height: "clamp(200px, 40vw, 500px)",
          willChange: 'transform',
        }}
      />

      {/* Container */}
      <div 
        className="w-full h-full flex flex-col justify-center relative"
        style={{
          paddingTop: "clamp(0.5rem, 2vh, 1.5rem)",
          paddingBottom: "clamp(0.5rem, 2vh, 1.5rem)",
          paddingLeft: "clamp(1rem, 4vw, 2.5rem)",
          paddingRight: "clamp(1rem, 4vw, 2.5rem)",
          overflow: 'visible',
        }}
      >
        <div 
          className="max-w-[1300px] mx-auto w-full grid md:grid-cols-2 items-center"
          style={{
            gap: "clamp(1rem, 3vw, 2.5rem)",
          }}
        >
          {/* TEXT CONTENT */}
          <div 
            ref={contentRef} 
            className="order-2 md:order-1 relative"
            style={{ 
              willChange: 'transform',
              transform: 'translate3d(0, 0, 0)',
            }}
          >
            <div style={{ marginBottom: "clamp(0.25rem, 1vh, 0.75rem)" }}>
              <div className="inline-flex items-center min-h-[1.5rem]">
                <span
                  className="font-semibold tracking-wider uppercase"
                  style={{
                    color: "var(--color-utama)",
                    fontSize: "clamp(0.65rem, 1.8vw, 0.9rem)",
                  }}
                >
                  {displayText || "\u00A0"}
                </span>
                {isTyping && (
                  <span 
                    className="ml-1"
                    style={{ 
                      backgroundColor: "var(--color-utama)",
                      width: "clamp(1.5px, 0.25vw, 2px)",
                      height: "clamp(0.8rem, 2.2vw, 1.1rem)",
                      animation: 'blink 0.8s step-end infinite',
                      display: 'inline-block',
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
              <p
                style={{
                  textAlign: "justify",
                  lineHeight: "1.8",
                }}
              >
                AS Putra adalah perusahaan yang berawal dari usaha peternakan ayam petelur
                yang didirikan oleh Bapak H. Dudung Dulajid pada tahun 1985, dibangun dari
                pemanfaatan sumber daya lokal dengan prinsip kejujuran, kerja keras, dan
                konsistensi. Dalam perjalanannya, perusahaan berkembang dengan memperluas
                bisnis ke sektor ayam broiler sejak tahun 1997, serta menunjukkan
                ketangguhan dalam menghadapi dinamika industri, termasuk krisis ekonomi,
                melalui pengelolaan yang disiplin dan komitmen terhadap kepercayaan mitra.
                Kini, AS Putra telah bertransformasi menjadi grup usaha yang modern dan
                terintegrasi, dengan lini bisnis yang mencakup peternakan, energi, properti,
                dan hospitality, serta terus berinovasi untuk memberikan nilai berkelanjutan
                bagi masyarakat dan mendukung ketahanan pangan nasional.
              </p>
            </div>
          </div>

          {/* IMAGE CONTENT */}
          <div 
            ref={imageRef} 
            className="relative group order-1 md:order-2"
            style={{ 
              willChange: 'transform',
              transform: 'translate3d(0, 0, 0)',
            }}
          >
            {/* Decorative circles */}
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

            {/* Image container */}
            <div 
              className="relative z-10 overflow-hidden shadow-2xl transition-all duration-500 group-hover:shadow-3xl group-hover:scale-[1.01]"
              style={{ 
                borderRadius: "clamp(10px, 2vw, 16px)",
                maxWidth: "90%",
                marginLeft: "auto",
                marginRight: "auto",
                transform: 'translate3d(0, 0, 0)',
              }}
            >
              <img
                src={sejarahImg}
                alt="H. Dudung Dulajid & H. Aif Arifin Sidhik"
                className="w-full relative z-0 transition-transform duration-700 group-hover:scale-105"
                style={{ 
                  aspectRatio: "4/3", 
                  objectFit: "cover",
                  willChange: 'transform',
                }}
                loading="eager"
              />
            </div>

            {/* Caption */}
            <div 
              className="relative z-10 text-center"
              style={{ marginTop: "clamp(0.5rem, 2vh, 1rem)" }}
            >
              <div 
                className="inline-block backdrop-blur-sm rounded-full shadow-md"
                style={{
                  backgroundColor: "rgba(255,255,255,0.9)",
                  paddingTop: "clamp(0.25rem, 1vh, 0.4rem)",
                  paddingBottom: "clamp(0.25rem, 1vh, 0.4rem)",
                  paddingLeft: "clamp(0.7rem, 2.5vw, 1.2rem)",
                  paddingRight: "clamp(0.7rem, 2.5vw, 1.2rem)",
                }}
              >
                <p 
                  className="font-medium"
                  style={{ 
                    color: "var(--color-utama)",
                    fontSize: "clamp(0.6rem, 1.6vw, 0.8rem)" 
                  }}
                >
                  H. Dudung Dulajid
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
      `}</style>
    </section>
  );
};

export default HistorySection;