import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const useFullPageSnap = ({ enabled = true } = {}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const lockRef = useRef(false);

  // Ambil semua elemen yang punya kelas .section di dalam wrapper
  const getElements = useCallback(() => 
    Array.from(document.querySelectorAll(".fullpage-wrapper > .section")), 
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

    const all = getElements();
    if (all.length === 0) return;

    const scrollY = window.scrollY;
    const vh = window.innerHeight;
    
    let currentIdx = 0;
    all.forEach((el, i) => {
      if (scrollY >= el.offsetTop - 120) currentIdx = i;
    });

    const currentEl = all[currentIdx];
    const isDown = e.deltaY > 0;
    const rect = currentEl.getBoundingClientRect();

    // Logika pengaman untuk section yang tingginya bebas (no-snap)
    if (currentEl.classList.contains("no-snap")) {
      if (isDown) {
        // Kalau bagian bawah section bebas belum mentok atas layar, biarkan scroll normal dulu
        if (rect.bottom > vh + 10) return; 
      } else {
        // Kalau bagian atas section bebas belum nempel atas layar, biarkan scroll naik normal dulu
        if (rect.top < -10) return;
      }
    }

    // Cari target berikutnya
    const nextIdx = isDown ? currentIdx + 1 : currentIdx - 1;
    const nextEl = all[nextIdx];

    if (nextEl) {
      e.preventDefault();
      scrollToElement(nextEl, nextIdx);
    }
  }, [enabled, getElements, scrollToElement]);

  const refreshIndex = useCallback(() => {
    const all = getElements();
    const scrollY = window.scrollY;
    let current = 0;
    
    all.forEach((el, i) => {
      if (scrollY >= el.offsetTop - 120) current = i;
    });

    if (all[current]) {
      setActiveIndex(current);
    }
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
      const all = getElements();
      scrollToElement(all[idx], idx);
    } 
  };
};

export default useFullPageSnap;