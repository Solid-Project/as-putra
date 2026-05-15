import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

const useFullPageSnap = ({ enabled = true } = {}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const lockRef = useRef(false);
  const scrollTimeout = useRef(null);

  const getElements = useCallback(() => 
    Array.from(document.querySelectorAll(".fullpage-wrapper > .section")), 
  []);

  const scrollToElement = useCallback((targetIndex) => {
    const all = getElements();
    const targetEl = all[targetIndex];
    if (!targetEl || lockRef.current) return;

    lockRef.current = true;
    setActiveIndex(targetIndex);

    // Tata.com Feel: Menggunakan scrollTo dengan durasi sedikit lebih lama 
    // dan ease yang sangat halus (expo atau power4)
    gsap.to(window, {
      duration: 1.2,
      ease: "expo.inOut",
      scrollTo: { y: targetEl, autoKill: false },
      onComplete: () => {
        // Jeda setelah animasi untuk meredam momentum trackpad
        setTimeout(() => {
          lockRef.current = false;
        }, 600);
      },
    });
  }, [getElements]);

  const handleWheel = useCallback((e) => {
    if (!enabled) return;

    const all = getElements();
    if (all.length === 0) return;

    // Filter 1: Jika sedang animasi, blokir total
    if (lockRef.current) {
      e.preventDefault();
      return;
    }

    // Filter 2: Threshold - Abaikan scroll halus (mencegah ghost scroll)
    if (Math.abs(e.deltaY) < 30) return;

    const scrollY = window.scrollY;
    const vh = window.innerHeight;
    
    // Cari index saat ini
    let currentIdx = 0;
    all.forEach((el, i) => {
      if (scrollY >= el.offsetTop - 100) currentIdx = i;
    });

    const currentEl = all[currentIdx];
    const isDown = e.deltaY > 0;
    const rect = currentEl.getBoundingClientRect();

    // Logika No-Snap (Konten panjang)
    if (currentEl.classList.contains("no-snap")) {
      if (isDown) {
        if (rect.bottom > vh + 5) return; 
      } else {
        if (rect.top < -5) return;
      }
    }

    // Eksekusi Pindah Section
    const nextIdx = isDown ? currentIdx + 1 : currentIdx - 1;
    
    if (nextIdx >= 0 && nextIdx < all.length) {
      e.preventDefault();
      scrollToElement(nextIdx);
    }
  }, [enabled, getElements, scrollToElement]);

  useEffect(() => {
    if (!enabled) return;

    // Paksa browser untuk tidak menyimpan posisi scroll saat refresh (F5)
    // Ini perilaku standar situs premium seperti Tata
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [enabled, handleWheel]);

  return { 
    activeIndex, 
    scrollToSection: scrollToElement 
  };
};

export default useFullPageSnap;