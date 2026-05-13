import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const useFullPageSnap = () => {
  const allSectionsRef = useRef([]); // Semua (Section + Footer)
  const navSectionsRef = useRef([]); // Hanya Section (untuk navigasi)
  const indexRef = useRef(0);
  const lockRef = useRef(false);

  const [activeIndex, setActiveIndex] = useState(0);

  // Selector baru: Navigasi hanya untuk .section yang BUKAN .footer
  const getNavSections = () => Array.from(document.querySelectorAll(".section:not(.footer-snap)"));
  const getAllElements = () => Array.from(document.querySelectorAll(".section, .footer-snap"));

  const isNoSnap = (el) => el?.classList?.contains("no-snap") || false;
  const isFooter = (el) => el?.classList?.contains("footer-snap") || false;

  const scrollToElement = useCallback((targetEl, realIdx, isNavigational = true) => {
    if (!targetEl || lockRef.current) return;

    lockRef.current = true;
    
    // Jika itu section navigasi, update activeIndex. Jika footer, tetap di index terakhir.
    if (isNavigational) {
      setActiveIndex(realIdx);
    }
    indexRef.current = realIdx;

    gsap.to(window, {
      duration: 0.8,
      ease: "power2.inOut",
      scrollTo: { y: targetEl, autoKill: false },
      onComplete: () => {
        if (window.ScrollTrigger) window.ScrollTrigger.refresh();
        setTimeout(() => { lockRef.current = false; }, 300);
      },
    });
  }, []);

  const handleWheel = useCallback((e) => {
    if (lockRef.current) {
      e.preventDefault();
      return;
    }

    const delta = e.deltaY;
    if (Math.abs(delta) < 40) return;

    const direction = delta > 0 ? "down" : "up";
    const all = getAllElements();
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    // Cari elemen saat ini
    let currentIndex = 0;
    all.forEach((el, i) => {
      if (scrollY >= el.offsetTop - 100) currentIndex = i;
    });

    const currentEl = all[currentIndex];

    // =========================================================
    // 🔥 LOGIKA FOOTER ATAU NO-SNAP
    // =========================================================
    if (isNoSnap(currentEl) || isFooter(currentEl)) {
      const rect = currentEl.getBoundingClientRect();

      if (direction === "up" && rect.top >= -10) {
        e.preventDefault();
        const prevEl = all[currentIndex - 1];
        if (prevEl) {
          // Balik ke section sebelumnya (bisa snap atau no-snap)
          const isNav = !isFooter(prevEl);
          // Cari index navigasi yang sesuai
          const navIdx = getNavSections().indexOf(prevEl);
          scrollToElement(prevEl, navIdx !== -1 ? navIdx : activeIndex, isNav);
        }
        return;
      }
      
      if (direction === "down" && rect.bottom <= windowHeight + 10) {
        const nextEl = all[currentIndex + 1];
        if (nextEl) {
          e.preventDefault();
          const navIdx = getNavSections().indexOf(nextEl);
          scrollToElement(nextEl, navIdx !== -1 ? navIdx : activeIndex, !isFooter(nextEl));
        }
        return;
      }
      return; // Biarkan native scroll
    }

    // =========================================================
    // 🔥 LOGIKA SNAP BIASA
    // =========================================================
    if (direction === "down") {
      const nextEl = all[currentIndex + 1];
      if (nextEl) {
        e.preventDefault();
        const navIdx = getNavSections().indexOf(nextEl);
        scrollToElement(nextEl, navIdx !== -1 ? navIdx : activeIndex, !isFooter(nextEl));
      }
    } else {
      const prevEl = all[currentIndex - 1];
      if (prevEl) {
        e.preventDefault();
        const navIdx = getNavSections().indexOf(prevEl);
        scrollToElement(prevEl, navIdx !== -1 ? navIdx : 0, !isFooter(prevEl));
      }
    }
  }, [scrollToElement, activeIndex]);

  useEffect(() => {
    const init = () => {
      allSectionsRef.current = getAllElements();
      navSectionsRef.current = getNavSections();
    };
    setTimeout(init, 500);
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("resize", init);
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", init);
    };
  }, [handleWheel]);

  return { activeIndex, scrollToSection: (idx) => scrollToElement(getNavSections()[idx], idx, true) };
};

export default useFullPageSnap;