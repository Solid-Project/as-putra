// hooks/useFullpageSnap.js
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const useFullpageSnap = (options = {}) => {
  const {
    enabled = true,
    duration = 0.6,
    ease = "power2.inOut",
    sectionSelector = ".section",
  } = options;

  const isScrollingRef = useRef(false);
  const sectionsRef = useRef([]);

  useEffect(() => {
    if (!enabled) return;

    const sections = document.querySelectorAll(sectionSelector);
    if (sections.length === 0) {
      console.warn(`No elements found with selector: ${sectionSelector}`);
      return;
    }

    sectionsRef.current = sections;

    // Ambil index section yang sedang aktif berdasarkan posisi scroll
    const getActiveIndex = () => {
      const scrollY = window.scrollY;
      const viewportCenter = scrollY + window.innerHeight / 2;

      let activeIndex = 0;
      let minDistance = Infinity;

      sections.forEach((section, idx) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionCenter = (sectionTop + sectionBottom) / 2;
        const distance = Math.abs(viewportCenter - sectionCenter);

        if (distance < minDistance) {
          minDistance = distance;
          activeIndex = idx;
        }
      });

      console.log("Active index:", activeIndex, "ScrollY:", scrollY); // debug
      return activeIndex;
    };

    const scrollToSection = (index) => {
      if (isScrollingRef.current) return;
      if (index < 0 || index >= sections.length) return;

      const targetSection = sections[index];
      if (!targetSection) return;

      console.log("Scrolling to index:", index);
      isScrollingRef.current = true;

      gsap.to(window, {
        duration: duration,
        scrollTo: {
          y: targetSection.offsetTop,
          autoKill: false,
        },
        ease: ease,
        onComplete: () => {
          isScrollingRef.current = false;
          console.log("Scroll complete at index:", getActiveIndex());
        },
        onUpdate: () => {
          // Optional: log progress
        },
      });
    };

    let wheelTimeout = null;
    let lastDelta = 0;

    const handleWheel = (e) => {
      // Clear timeout sebelumnya
      if (wheelTimeout) clearTimeout(wheelTimeout);

      // Akumulasi delta untuk mencegah terlalu sensitif
      lastDelta += e.deltaY;

      wheelTimeout = setTimeout(() => {
        lastDelta = 0;
      }, 200);

      // Cek apakah akumulasi cukup besar (minimal 30px)
      if (Math.abs(lastDelta) < 30) {
        return;
      }

      if (isScrollingRef.current) {
        e.preventDefault();
        return;
      }

      const activeIndex = getActiveIndex();
      console.log("Wheel - activeIndex:", activeIndex, "lastDelta:", lastDelta);

      // Scroll ke bawah
      if (lastDelta > 0 && activeIndex < sections.length - 1) {
        e.preventDefault();
        scrollToSection(activeIndex + 1);
        lastDelta = 0;
      }
      // Scroll ke atas
      else if (lastDelta < 0 && activeIndex > 0) {
        e.preventDefault();
        scrollToSection(activeIndex - 1);
        lastDelta = 0;
      }
    };

    // Keyboard handler
    const handleKeyDown = (e) => {
      if (isScrollingRef.current) return;

      const activeIndex = getActiveIndex();

      if (e.key === "ArrowDown" && activeIndex < sections.length - 1) {
        e.preventDefault();
        scrollToSection(activeIndex + 1);
      } else if (e.key === "ArrowUp" && activeIndex > 0) {
        e.preventDefault();
        scrollToSection(activeIndex - 1);
      }
    };

    // Touch handler untuk mobile
    let touchStartY = 0;
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (isScrollingRef.current) return;

      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;
      
      if (Math.abs(diff) < 50) return;
      
      const activeIndex = getActiveIndex();

      if (diff > 0 && activeIndex < sections.length - 1) {
        scrollToSection(activeIndex + 1);
      } else if (diff < 0 && activeIndex > 0) {
        scrollToSection(activeIndex - 1);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      if (wheelTimeout) clearTimeout(wheelTimeout);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [enabled, duration, ease, sectionSelector]);
};

export default useFullpageSnap;