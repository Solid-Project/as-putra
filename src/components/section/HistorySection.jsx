import React, { useEffect, useRef, useState, useCallback } from "react";
import logoAsliUrl from "@/assets/logo.jpg";

const HistorySection = ({ data, isActive, index }) => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const bgLogoRef = useRef(null);
  const imageRef = useRef(null);

  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const typingIntervalRef = useRef(null);
  const animationFrameRef = useRef(null);
  const currentIndexRef = useRef(0);
  const isMountedRef = useRef(true);

  // Logic Typing Effect
  useEffect(() => {
    if (!isActive || !data?.subtitle) {
      setDisplayText("");
      return;
    }

    let isCancelled = false;
    const fullText = data.subtitle;

    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    
    currentIndexRef.current = 0;
    setDisplayText("");
    setIsTyping(true);

    typingIntervalRef.current = setInterval(() => {
      if (isCancelled || !isMountedRef.current) return;
      currentIndexRef.current += 1;
      const nextText = fullText.slice(0, currentIndexRef.current);
      setDisplayText(nextText);

      if (currentIndexRef.current >= fullText.length) {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
        setIsTyping(false);
      }
    }, 80);

    return () => {
      isCancelled = true;
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    };
  }, [isActive, data?.subtitle]);

  // Logic Parallax yang lebih subtle agar tidak mendorong konten keluar viewport
  const updateParallax = useCallback(() => {
    if (!contentRef.current || !imageRef.current || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const scrollPercentage = (viewportHeight - rect.top) / (viewportHeight + rect.height);
    const progress = Math.max(0, Math.min(1, scrollPercentage));
    
    // Range pergerakan diperkecil agar tetap di dalam 100vh
    const contentY = -15 + (progress * 30);
    const imageY = 15 - (progress * 30);
    
    contentRef.current.style.transform = `translate3d(0, ${contentY}px, 0)`;
    imageRef.current.style.transform = `translate3d(0, ${imageY}px, 0)`;
  }, []);

  const handleScroll = useCallback(() => {
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    animationFrameRef.current = requestAnimationFrame(updateParallax);
  }, [updateParallax]);

  useEffect(() => {
    isMountedRef.current = true;
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    updateParallax();
    
    return () => {
      isMountedRef.current = false;
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [handleScroll, updateParallax]);

  if (!data) return null;

  const imageUrl = data.layout_data?.image 
    ? `${import.meta.env.VITE_API_URL}/storage/${data.layout_data.image}`
    : null;

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[100vh] flex items-center justify-center bg-[#0F1A3E] overflow-hidden"
      id={`section-${index}`}
      data-title={data?.title || "History"}
    >
      {/* Background Decor */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none -z-0">
        <img src={logoAsliUrl} alt="" className="w-[80%] h-auto rotate-12 scale-110" />
      </div>

      {/* Main Content Container - Menggunakan h-full agar grid bisa mengatur ruang dengan baik */}
      <div className="w-full max-w-[1300px] h-full max-h-[85vh] mx-auto px-6 md:px-12 z-10 flex items-center">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center w-full">
          
          {/* TEXT CONTENT */}
          <div ref={contentRef} className="order-2 md:order-1 will-change-transform flex flex-col justify-center">
            {/* Typing Subtitle */}
            <div className="flex items-center mb-3 h-4">
              <span className="text-[#FFC700] font-black tracking-[0.4em] uppercase text-[10px] md:text-xs">
                {displayText || "\u00A0"}
              </span>
              {isTyping && <div className="w-[1.5px] h-3 bg-[#FFC700] ml-2 animate-blink" />}
            </div>

            {/* Judul Utama - Ukuran yang "Safe" untuk layar laptop/tablet */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-['Playfair_Display'] font-bold text-white mb-4 leading-tight">
              {data.title} <br/>
              <span className="text-[#FFC700] italic">{data.more_text}</span>
            </h2>

            {/* Deskripsi - Menggunakan clamp untuk membatasi tinggi teks */}
            <div className="max-w-xl">
              <p className="text-gray-400 leading-relaxed text-justify text-sm md:text-base">
                {data.description}
              </p>
            </div>
          </div>

          {/* IMAGE CONTENT */}
          <div ref={imageRef} className="order-1 md:order-2 relative group will-change-transform flex justify-center items-center">
            {/* Frame & Image Container - Dibatasi tinggi maksimalnya */}
            <div className="relative w-full max-w-[420px]">
              <div className="absolute -inset-3 border border-[#FFC700]/20 rounded-2xl -z-10 translate-x-3 translate-y-3" />
              
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-2">
                <div 
                  className="overflow-hidden rounded-xl"
                  style={{ clipPath: "polygon(0 0, 100% 0, 100% 94%, 94% 100%, 0 100%)" }}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={data.layout_data?.caption || "Gallery"}
                      className="w-full aspect-square md:aspect-[4/5] object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full aspect-square bg-[#1a2a4e] flex items-center justify-center text-gray-500 italic text-xs">
                      AS PUTRA
                    </div>
                  )}
                </div>
              </div>

              {/* Caption Box - Dibuat lebih kecil agar tidak makan tempat */}
              {data.layout_data?.caption && (
                <div className="absolute -bottom-3 -right-2 z-20 bg-[#FFC700] text-[#0F1A3E] px-5 py-2.5 shadow-xl rounded-tr-[20px] rounded-bl-[20px]">
                  <p className="font-black text-[8px] uppercase tracking-widest leading-none mb-1 opacity-70">Legacy</p>
                  <p className="font-bold text-xs md:text-sm whitespace-nowrap">{data.layout_data.caption}</p>
                </div>
              )}
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

export default HistorySection;