import React, { useEffect, useState, useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const SectionNavigation = () => {
  const [sections, setSections] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showLabel, setShowLabel] = useState(false);
  const location = useLocation();
  const timerRef = useRef(null);

  const refreshSections = useCallback(() => {
    const secs = Array.from(document.querySelectorAll(".section"));
    setSections(secs);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(refreshSections, 600);
    return () => clearTimeout(timeout);
  }, [location.pathname, refreshSections]);

  useEffect(() => {
    const handleScroll = () => {
      if (sections.length === 0) return;
      const vh = window.innerHeight;
      let current = 0;

      sections.forEach((section, i) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < vh / 2 && rect.bottom > vh / 2) {
          current = i;
        }
      });

      if (current !== activeIndex) {
        setActiveIndex(current);
        
        // EFEK MUNCUL SEBENTAR (KHUSUS AKTIF)
        setShowLabel(true);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          setShowLabel(false);
        }, 1500); 
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [sections, activeIndex]);

  const scrollToSection = (index) => {
    const target = sections[index];
    if (!target) return;
    const targetPos = target.getBoundingClientRect().top + window.pageYOffset;

    gsap.to(window, {
      scrollTo: { y: targetPos, autoKill: false },
      duration: 1.2,
      ease: "expo.inOut",
      overwrite: true,
    });
  };

  if (sections.length <= 1) return null;

  return (
    <div className="fixed right-5 xl:right-8 top-1/2 -translate-y-1/2 z-[999] hidden md:flex flex-col gap-3">
      {sections.map((section, i) => {
        const title = section.dataset.title || `Section ${i + 1}`;
        const isActive = activeIndex === i;

        return (
          <div
            key={i}
            onClick={() => scrollToSection(i)}
            className="group flex items-center gap-2 flex-row-reverse cursor-pointer"
          >
            {/* BAR INDIKATOR - Dibuat Lebih Pendek & Tipis */}
            <div
              className={`h-5 w-[3px] border transition-all duration-500 ${
                isActive
                  ? "bg-[var(--color-utama)] border-black/10 scale-y-125 shadow-[0_0_6px_var(--color-utama)]"
                  : "bg-black/10 border-transparent group-hover:bg-black/20"
              }`}
            />

            {/* LABEL TEKS - Super Kecil & Tipis */}
            <div className="overflow-hidden">
              <span
                className={`text-[8px] font-bold tracking-[0.2em] uppercase transition-all duration-1000 whitespace-nowrap block pointer-events-none
                px-2 py-1 backdrop-blur-[1px]
                ${
                  isActive && showLabel
                    ? "opacity-100 translate-x-0 bg-black/30 border border-white/5 text-white/90" 
                    : "opacity-0 translate-x-2 bg-transparent border-transparent text-transparent"
                }
                `}
                style={{ borderRadius: '0px' }} 
              >
                {title}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SectionNavigation;