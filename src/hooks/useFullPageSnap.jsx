import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const useFullPageSnap = ({ enabled = true } = {}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const lockRef = useRef(false);

  const getElements = useCallback(() => 
    Array.from(document.querySelectorAll(".fullpage-wrapper > .section, .fullpage-wrapper > .footer-snap")), 
  []);

  const scrollToElement = useCallback((targetEl, navIndex) => {
    if (!targetEl || lockRef.current) return;

    lockRef.current = true;
    if (navIndex !== -1) setActiveIndex(navIndex);

    gsap.to(window, {
      duration: 0.8,
      ease: "power2.inOut",
      scrollTo: { y: targetEl, autoKill: false },
      onComplete: () => {
        setTimeout(() => { lockRef.current = false; }, 200);
      },
    });
  }, []);

  const handleWheel = useCallback((e) => {
  if (!enabled || lockRef.current) return;

  const all = Array.from(document.querySelectorAll(".fullpage-wrapper > .section"));
  const scrollY = window.scrollY;
  const vh = window.innerHeight;
  
  let currentIdx = 0;
  all.forEach((el, i) => {
    if (scrollY >= el.offsetTop - 100) currentIdx = i;
  });

  const currentEl = all[currentIdx];
  const isDown = e.deltaY > 0;
  const rect = currentEl.getBoundingClientRect();

  if (currentEl.classList.contains("no-snap")) {
    if (isDown) {
      if (rect.bottom > vh + 5) return; 
    } else {
      if (rect.top < -5) return;
    }
  }

  // Cari target berikutnya
  const nextIdx = isDown ? currentIdx + 1 : currentIdx - 1;
  const nextEl = all[nextIdx];

  if (nextEl) {
    if (!nextEl.classList.contains("no-snap") || isDown) {
       e.preventDefault();
       scrollToElement(nextEl, nextIdx);
    }
  }
}, [enabled, scrollToElement]);

  // Sinkronisasi index saat resize atau refresh manual
  const refreshIndex = useCallback(() => {
    const all = getElements();
    const navElements = Array.from(document.querySelectorAll(".fullpage-wrapper > .section"));
    const scrollY = window.scrollY;
    let current = 0;
    
    all.forEach((el, i) => {
      if (scrollY >= el.offsetTop - 100) current = i;
    });

    const currentEl = all[current];
    const navIdx = navElements.indexOf(currentEl);
    if (navIdx !== -1) setActiveIndex(navIdx);
  }, [getElements]);

  useEffect(() => {
    if (!enabled) return;

    const timer = setTimeout(refreshIndex, 500);
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("resize", refreshIndex);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", refreshIndex);
      clearTimeout(timer);
    };
  }, [enabled, handleWheel, refreshIndex]);

  return { 
    activeIndex, 
    scrollToSection: (idx) => {
      const navElements = Array.from(document.querySelectorAll(".fullpage-wrapper > .section"));
      scrollToElement(navElements[idx], idx);
    } 
  };
};

export default useFullPageSnap;