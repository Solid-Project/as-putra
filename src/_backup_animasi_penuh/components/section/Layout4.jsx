import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logoAsliUrl from "@/assets/logo.jpg";

gsap.registerPlugin(ScrollTrigger);

const Layout4 = ({ data, index, isActive }) => {
  const sectionRef = useRef(null);
  const imageFrameRef = useRef(null);
  const textGroupRef = useRef(null);
  
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const typingIntervalRef = useRef(null);

  const displayTitle = data?.title || "Teknologi Modern";
  const displaySubtitle = data?.subtitle || "Aretha Farm";
  const displayDescription = data?.description || "";
  const displayImage = data?.image 
    ? `${import.meta.env.VITE_API_URL}/storage/${data.image}` 
    : "";

  const isLongText = displayDescription.length > 800;
  const sectionClass = isLongText ? "section no-snap" : "section";

  useEffect(() => {
    if (!isActive || !displaySubtitle) {
      setDisplayText("");
      return;
    }
    let currentIdx = 0;
    setIsTyping(true);
    typingIntervalRef.current = setInterval(() => {
      currentIdx++;
      setDisplayText(displaySubtitle.slice(0, currentIdx));
      if (currentIdx >= displaySubtitle.length) {
        clearInterval(typingIntervalRef.current);
        setIsTyping(false);
      }
    }, 70);
    return () => clearInterval(typingIntervalRef.current);
  }, [isActive, displaySubtitle]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          toggleActions: "play none none reverse",
        }
      });

      tl.fromTo([textGroupRef.current, imageFrameRef.current],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={`section-${index}`}
      className={`${sectionClass} relative w-full flex flex-col bg-[#0F1A3E] overflow-hidden`}
      style={{ 
        minHeight: "100vh", 
        height: isLongText ? "auto" : "100vh",
      }}
      data-theme="dark"
    >
      {/* Background Decor Logo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none -z-0">
        <img src={logoAsliUrl} alt="" className="w-[80%] h-auto rotate-12 scale-110" />
      </div>

      <div className={`w-full flex-grow flex items-center px-[8%] z-10 ${isLongText ? "py-32" : "py-10"}`}>
        <div className="w-full grid lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          
          {/* TEXT GROUP */}
          <div ref={textGroupRef} className="lg:col-span-7 flex flex-col order-2 lg:order-1">
            <div className="flex items-center mb-4 h-5">
              <span className="text-[#FFC700] font-black tracking-[0.4em] uppercase text-[10px] md:text-xs">
                {displayText || "\u00A0"}
              </span>
              {isTyping && <div className="w-[1.5px] h-3 bg-[#FFC700] ml-2 animate-blink" />}
            </div>

            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-[1.1] mb-6 tracking-tighter">
              {displayTitle}
            </h2>

            {/* Garis Aksen Gold Tetap Ada sebagai Pemisah Horizontal */}
            <div className="w-20 h-1 bg-[#FFC700] mb-8"></div>

            {/* Deskripsi: Line Dihilangkan & Sejajar Judul */}
            <div className="max-w-2xl">
              <div 
                className="text-gray-400 text-base md:text-lg leading-[1.8] font-light text-justify"
                dangerouslySetInnerHTML={{ __html: displayDescription }}
              />
            </div>
          </div>

          {/* IMAGE GROUP */}
          <div className={`lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2 ${isLongText ? "lg:self-start lg:sticky lg:top-32" : ""}`}>
            <div ref={imageFrameRef} className="relative w-full max-w-[420px]">
              <div className="absolute -inset-3 border border-[#FFC700]/20 rounded-2xl -z-10 translate-x-3 translate-y-3" />
              
              <div className="relative z-10 p-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl shadow-2xl">
                <div 
                  className="overflow-hidden rounded-xl"
                  style={{ clipPath: "polygon(0 0, 100% 0, 100% 94%, 94% 100%, 0 100%)" }}
                >
                  {displayImage && (
                    <img
                      src={displayImage}
                      alt={displayTitle}
                      className="w-full aspect-[4/5] object-cover transition-transform duration-1000 hover:scale-105"
                    />
                  )}
                </div>
              </div>
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

export default Layout4;