import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useSectionAnimation } from "@/hooks/useSectionAnimation";
import logoBg from "@/assets/logo-trans.png";

const VissionMission = ({ data, isActive, index }) => {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const bgElementsRef = useRef(null);

  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const typingIntervalRef = useRef(null);

  const COLOR_NAVY = "#1D2B53";
  const COLOR_GOLD = "#FFC619";

  useEffect(() => {
    if (!isActive || !data?.subtitle) {
      setDisplayText("");
      return;
    }
    const fullText = data.subtitle;
    let currentIdx = 0;
    setDisplayText("");
    setIsTyping(true);

    typingIntervalRef.current = setInterval(() => {
      currentIdx++;
      setDisplayText(fullText.slice(0, currentIdx));
      if (currentIdx >= fullText.length) {
        clearInterval(typingIntervalRef.current);
        setIsTyping(false);
      }
    }, 70);

    return () => clearInterval(typingIntervalRef.current);
  }, [isActive, data?.subtitle]);

  useSectionAnimation(sectionRef, () => {
    if (!isActive || !data) return;

      gsap.fromTo(".bg-accent",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 2, stagger: 0.3, ease: "power2.out", force3D: true }
      );

      gsap.fromTo(".logo-bg",
        { opacity: 0, scale: 1.15, rotate: 5 },
        { opacity: 0.09, scale: 1, rotate: 12, duration: 2.2, ease: "power2.out", force3D: true }
      );

      gsap.to(".floating-shape", {
        y: 20, x: 10, duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut", force3D: true
      });
  }, [isActive, data]);

  if (!data) return null;

  const titleParts = data.title ? data.title.split(/\r?\n/) : ["", ""];
  const imageUrl = data.image ? `${import.meta.env.VITE_API_URL}/storage/${data.image}` : null;

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[100vh] flex items-center justify-center bg-white overflow-hidden"
      id={`section-${index}`}
      data-theme="light"
    >
      {/* --- ENHANCED BACKGROUND DESIGN --- */}
      
      {/* 1. Subtle Image Backdrop (Tekstur halus) */}
      <div
        className="absolute inset-0 z-0 opacity-[0.04] grayscale"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* 2. Logo AS Putra - Didesain khusus untuk VissionMission (di sebelah kiri bawah teks) */}
      <div className="logo-bg absolute top-[20%] left-[2%] md:left-[5%] w-full max-w-[320px] md:max-w-[450px] opacity-0 pointer-events-none z-0">
        <img src={logoBg} alt="" loading="lazy" className="w-full h-auto object-contain filter drop-shadow-[0_15px_35px_rgba(29,43,83,0.06)]" />
      </div>

      {/* 3. Geometric Branding Accents */}
      <div ref={bgElementsRef} className="absolute inset-0 pointer-events-none z-0">
        
        {/* Elemen Sudut Navy di Kanan Atas */}
        <div 
          className="bg-accent floating-shape absolute -top-20 -right-20 w-[40vw] h-[40vw] rounded-full border-[1.5px] border-[#1D2B53]/10"
        />
        
        {/* Garis Aksen Diagonal Emas (Meniru garis di Logo Anda) */}
        <div 
          className="bg-accent absolute top-0 left-[45%] w-[150px] h-[150vh] bg-gradient-to-b from-[#FFC619]/20 via-transparent to-transparent -rotate-[35deg] translate-x-[-50%]"
        />

        {/* Pola Lingkaran konsentris halus */}
        <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] rounded-full border border-[#1D2B53]/5 flex items-center justify-center">
            <div className="w-[70%] h-[70%] rounded-full border border-[#FFC619]/10" />
        </div>

        {/* Semburat Cahaya (Glow) agar Putih tidak terlihat Flat */}
        <div className="absolute top-[20%] right-[10%] w-96 h-96 bg-[#1D2B53]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] left-[10%] w-80 h-80 bg-[#FFC619]/10 rounded-full blur-[100px]" />
      </div>

      {/* --- CONTENT CONTAINER --- */}
      <div className="w-full max-w-[1300px] h-full max-h-[85vh] mx-auto px-6 md:px-12 z-10 flex items-center">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
          
          {/* LEFT: TEXT CONTENT */}
          <div ref={leftRef} className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-8 h-[2px]" style={{ backgroundColor: COLOR_GOLD }} />
              <span className="text-[#1D2B53] font-black tracking-[0.4em] uppercase text-[10px] md:text-xs">
                {displayText || "\u00A0"}
              </span>
              {isTyping && <div className="w-1 h-4 bg-[#1D2B53] animate-pulse" />}
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-['Playfair_Display'] font-extrabold text-[#1D2B53] leading-tight">
              {titleParts[0]} <br />
              <span className="text-[#FFC619] italic font-medium">{titleParts[1]}</span>
            </h2>

            <div className="max-w-md">
              <p className="text-gray-600 text-sm md:text-base leading-relaxed text-justify font-medium">
                {data.description}
              </p>
            </div>

            <div className="flex gap-2">
                <div className="w-12 h-1 rounded-full" style={{ backgroundColor: COLOR_NAVY }} />
                <div className="w-4 h-1 rounded-full" style={{ backgroundColor: COLOR_GOLD }} />
            </div>
          </div>

          {/* RIGHT: ELEGANT CARDS */}
          <div ref={rightRef} className="space-y-6 relative">
            
            {/* VISION CARD - Lebih clean tapi bertekstur */}
            <div className="mission-card relative bg-white border border-[#1D2B53]/10 p-8 rounded-2xl shadow-[0_15px_40px_rgba(29,43,83,0.08)] transition-all duration-500 hover:border-[#1D2B53]/30">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#1D2B53] rounded-l-2xl" />
              <h3 className="text-[#1D2B53] font-bold text-xl mb-3 flex items-center gap-3 italic">
                Visi Kami
              </h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed font-medium">
                "{data.layout_data?.visi_text}"
              </p>
            </div>

            {/* MISSION CARD */}
            <div className="mission-card relative bg-white border border-[#FFC619]/20 p-8 rounded-2xl shadow-[0_15px_40px_rgba(255,198,25,0.08)] transition-all duration-500 hover:border-[#FFC619]/50">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#FFC619] rounded-l-2xl" />
              <h3 className="text-[#1D2B53] font-bold text-xl mb-5 flex items-center gap-3 italic">
                Misi Kami
              </h3>
              
              <ul className="space-y-4">
                {data.layout_data?.misi_text?.map((item, i) => (
                  <li key={i} className="flex items-start gap-3.5">
                    <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-md bg-[#1D2B53] text-[#FFC619] text-[10px] font-black mt-[1px]">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-700 leading-snug text-justify">
                        {item}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .animate-blink { animation: blink 0.8s step-end infinite; }
      `}</style>
    </section>
  );
};

export default VissionMission;