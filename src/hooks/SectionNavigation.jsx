import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";

const SectionNavigation = () => {
  const [sections, setSections] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const location = useLocation();

  // ambil section saat pindah halaman
  useEffect(() => {
    const timeout = setTimeout(() => {
      const secs = Array.from(document.querySelectorAll(".section"));
      setSections(secs);
      setActiveIndex(0);
    }, 100);

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  // detect active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      let current = 0;

      sections.forEach((section, i) => {
        if (scrollY >= section.offsetTop - vh / 2) {
          current = i;
        }
      });

      setActiveIndex(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = (index) => {
    const target = sections[index];
    if (!target) return;

    gsap.to(window, {
      scrollTo: target.offsetTop,
      duration: 1,
      ease: "expo.inOut",
    });
  };

  if (sections.length <= 1) return null;

  return (
    <div className="fixed right-4 xl:right-8 2xl:right-12 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-4">
      
      {sections.map((section, i) => {
        const title = section.dataset.title || `Section ${i + 1}`;

        return (
          <div
            key={i}
            onClick={() => scrollToSection(i)}
            className="group flex items-center gap-3 flex-row-reverse cursor-pointer"
          >
            {/* SEGMENT BAR */}
            <div
              className={`h-8 w-[3px] rounded-full border transition-all duration-300 ${
                activeIndex === i
                  ? "bg-[var(--color-utama)] border-[var(--color-utama)] shadow-[0_0_10px_var(--color-utama)] scale-y-110"
                  : "bg-white/20 border-white/30 group-hover:bg-white/40"
              }`}
            />

            {/* LABEL */}
            <span
              className={`text-xs px-3 py-1 rounded-md backdrop-blur-md transition-all duration-300 whitespace-nowrap
              ${
                activeIndex === i
                  ? "opacity-100 translate-x-0 bg-black/70 text-white"
                  : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 bg-black/70 text-white"
              }`}
            >
              {title}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default SectionNavigation;