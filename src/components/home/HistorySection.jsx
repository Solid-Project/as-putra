import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import sejarahImg from "@/assets/img/owner.jpg";

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
  if (!section) return;

  let typingInterval = null;
  let isInside = false; // 🔥 tracking masuk/keluar section

  const startTyping = () => {
    let currentIndex = 0;

    setDisplayText("");
    setIsTyping(true);

    typingInterval = setInterval(() => {
      currentIndex++;

      setDisplayText(fullText.slice(0, currentIndex));

      if (currentIndex >= fullText.length) {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, 110);
  };

  const observer = new IntersectionObserver(
    ([entry]) => {
      // 🔥 masuk ke tengah section
      if (entry.isIntersecting && !isInside) {
        isInside = true;
        startTyping();
      }

      // 🔥 keluar dari section → reset biar bisa ulang lagi
      if (!entry.isIntersecting && isInside) {
        isInside = false;

        if (typingInterval) clearInterval(typingInterval);
      }
    },
    {
      threshold: 0,
      rootMargin: "-40% 0px -40% 0px" // 🔥 area tengah viewport
    }
  );

  observer.observe(section);

  return () => {
    observer.disconnect();
    if (typingInterval) clearInterval(typingInterval);
  };
}, []);

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
              <p
  style={{
    textAlign: "justify",
    lineHeight: "1.8",
  }}
>
  Didirikan oleh{" "}
  <strong style={{ color: "var(--color-teks)" }}>
    H. Dudung Dulajid
  </strong>{" "}
  pada tahun 1984 di Kuningan, AS PUTRA berawal dari usaha peternakan ayam petelur skala kecil dengan sekitar 1.000 ekor. Berbekal visi untuk membangun kemandirian ekonomi pedesaan, beliau tidak hanya fokus pada produksi, tetapi juga berinovasi mengolah dedak menjadi komoditas bernilai tinggi. Dari titik inilah nama “AS PUTRA” lahir sebagai simbol dedikasi dan harapan masa depan.{" "}
  <br /><br />
  Seiring berjalannya waktu, fondasi yang kuat tersebut membawa perusahaan mampu bertahan bahkan tumbuh di tengah krisis moneter 1997, berkat kedisiplinan dalam pengelolaan keuangan dan komitmen menjaga kepercayaan mitra. Memasuki era 2000-an, AS PUTRA mulai melakukan diversifikasi bisnis ke berbagai sektor strategis, memperluas peran dari sekadar usaha peternakan menjadi ekosistem agribisnis dan bisnis terintegrasi.{" "}
  <br /><br />
  Kini, estafet kepemimpinan dilanjutkan oleh putranya,{" "}
  <strong style={{ color: "var(--color-teks)" }}>
    H. Aif Arifin Sidhik
  </strong>
  , yang membawa perusahaan ke fase transformasi modern. Di bawah kepemimpinannya, AS PUTRA Group berkembang menjadi holding company yang menaungi berbagai sektor—mulai dari agribisnis, energi, properti, hingga ritel dan gaya hidup—dengan tetap berpegang pada nilai utama: tumbuh bersama dan memberikan dampak nyata bagi masyarakat.
</p>
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
        .animate-blink { 
          animation: blink 0.8s step-end infinite; 
        }
      `}</style>
    </section>
  );
};

export default HistorySection;