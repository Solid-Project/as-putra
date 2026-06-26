import React, { useEffect, useRef, useState, useCallback } from "react";
import logoAsliUrl from "@/assets/logo.jpg";

const HistorySection = ({ data, isActive, index }) => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const imageMobileRef = useRef(null);

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

  // Logic Parallax
  const updateParallax = useCallback(() => {
    if (!contentRef.current || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const scrollPercentage = (viewportHeight - rect.top) / (viewportHeight + rect.height);
    const progress = Math.max(0, Math.min(1, scrollPercentage));

    const contentY = -15 + (progress * 30);
    const imageY = 15 - (progress * 30);

    contentRef.current.style.transform = `translate3d(0, ${contentY}px, 0)`;

    if (imageRef.current && window.innerWidth >= 768) {
      imageRef.current.style.transform = `translate3d(0, ${imageY}px, 0)`;
    }
    if (imageMobileRef.current && window.innerWidth < 768) {
      imageMobileRef.current.style.transform = `translate3d(0, ${imageY * 0.4}px, 0)`;
    }
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

  // Reusable Image Card
  const ImageCard = ({ innerRef, isMobile = false }) => (
    /* PERBAIKAN 1: Hilangkan max-w-[340px], paksa w-full dan max-w-full agar gambar melebar maksimal di mobile */
    <div ref={innerRef} className={`relative group will-change-transform flex justify-center items-center ${isMobile ? "my-6 w-full max-w-full mx-auto" : "w-full max-w-[420px]"}`}>
      <div className="relative w-full">
        <div className="absolute -inset-2.5 md:-inset-3 border border-[#FFC700]/20 rounded-2xl -z-10 translate-x-2.5 translate-y-2.5 md:translate-x-3 md:translate-y-3" />

        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-2">
          <div
            className="overflow-hidden rounded-xl"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 94%, 94% 100%, 0 100%)" }}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={data.layout_data?.caption || "Gallery"}
                loading="lazy"
                /* PERBAIKAN 2: Gunakan aspect-[4/5] yang tegak, tinggi, dan gagah baik di mobile maupun desktop sesuai arahan */
                className="w-full aspect-[4/5] object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            ) : (
              <div className="w-full aspect-[4/5] bg-[#1a2a4e] flex items-center justify-center text-gray-500 italic text-xs">
                AS PUTRA
              </div>
            )}
          </div>
        </div>

        {data.layout_data?.caption && (
          <div className="absolute -bottom-2 -right-1 md:-bottom-3 md:-right-2 z-20 bg-[#FFC700] text-[#0F1A3E] px-4 py-1.5 md:px-5 md:py-2.5 shadow-xl rounded-tr-[16px] rounded-bl-[16px] md:rounded-tr-[20px] md:rounded-bl-[20px]">
            <p className="font-bold text-[10px] md:text-sm whitespace-nowrap">{data.layout_data.caption}</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      /* PERBAIKAN 3: Gunakan min-h-screen agar layout fleksibel menampung gambar berukuran besar di mobile tanpa tumpang tindih */
      className="relative w-full min-h-screen md:h-[100vh] py-16 md:py-0 flex items-center justify-center bg-[#0F1A3E] overflow-hidden"
      id={`section-${index}`}
      data-title={data?.title || "History"}
    >
      {/* Background Decor */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none -z-0">
        <img src={logoAsliUrl} alt="" loading="lazy" className="w-[80%] h-auto rotate-12 scale-110" />
      </div>

      {/* Main Content Container */}
      <div className="w-full max-w-[1300px] h-full md:max-h-[85vh] mx-auto px-6 md:px-12 z-10 flex items-center">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-8 lg:gap-16 items-center w-full">

          {/* TEXT CONTENT CONTAINER */}
          <div ref={contentRef} className="will-change-transform flex flex-col justify-center w-full">
            {/* Typing Subtitle */}
            <div className="flex items-center mb-2 md:mb-3 h-4">
              <span className="text-[#FFC700] font-black tracking-[0.4em] uppercase text-[9px] md:text-xs">
                {displayText || "\u00A0"}
              </span>
              {isTyping && <div className="w-[1.5px] h-3 bg-[#FFC700] ml-2 animate-blink" />}
            </div>

            {/* Judul Utama */}
            <h2
              data-translate-group="true"
              className="text-2xl md:text-4xl lg:text-5xl font-['Playfair_Display'] font-bold text-white mb-2 md:mb-4 leading-tight"
            >
              {data.title} <br />
              <span className="text-[#FFC700] italic">{data.more_text}</span>
            </h2>
            {/* Gambar Versi Mobile (Tepat di bawah H2, Aspek Rasio Penuh & Besar) */}
            <div className="block md:hidden w-full">
              <ImageCard innerRef={imageMobileRef} isMobile={true} />
            </div>

            {/* Deskripsi */}
            <div className="max-w-xl">
              <p className="text-gray-400 leading-relaxed text-justify text-xs md:text-base">
                {data.description}
              </p>
            </div>
          </div>

          {/* IMAGE CONTENT CONTAINER (DESKTOP ONLY) */}
          <div className="hidden md:flex justify-center items-center">
            <ImageCard innerRef={imageRef} isMobile={false} />
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