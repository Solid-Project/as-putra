import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);

const useFullPageSnap = ({ enabled = true } = {}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const lockRef = useRef(false);
  const indexRef = useRef(0);

  const getElements = useCallback(() => 
    Array.from(document.querySelectorAll(".fullpage-wrapper > .section")), 
  []);

  const scrollToElement = useCallback((targetIndex) => {
    const all = getElements();
    const targetEl = all[targetIndex];
    if (!targetEl || lockRef.current) return;

    // KUNCI INSTAN: Begitu terdeteksi, langsung kunci agar tidak ada sentuhan beruntun
    lockRef.current = true;
    indexRef.current = targetIndex;
    setActiveIndex(targetIndex);

    // TATA.COM SECRET FEEL:
    // 1. Menggunakan 'power3.inOut' -> Kecepatan awal naik secara perlahan (tidak bikin kaget),
    //    lalu meluncur konstan, dan mengerem dengan sangat presisi & lembut di akhir.
    // 2. Durasi dinaikkan ke 1.35s agar pergerakan sinematik dan anggunnya terasa nyata.
    gsap.to(window, {
      duration: 1.35,
      ease: "power3.inOut",
      scrollTo: { y: targetEl, autoKill: false },
      overwrite: "auto",
      onComplete: () => {
        // Meredam sisa inersia trackpad MacBook / Mouse mahal secara total
        setTimeout(() => {
          lockRef.current = false;
        }, 500);
      },
    });
  }, [getElements]);

  const handleWheel = useCallback((e) => {
    if (!enabled) return;

    const all = getElements();
    if (all.length === 0) return;

    // Filter 1: Jika animasi sedang berjalan, kunci total & abaikan sisa geseran jari
    if (lockRef.current) {
      e.preventDefault();
      return;
    }

    // Filter 2: Threshold ditingkatkan ke 40 agar scroll yang tidak sengaja/terlalu pelan
    // tidak memicu kejutan perpindahan halaman. Harus ada niat geser yang jelas.
    if (Math.abs(e.deltaY) < 40) return;

    const currentIdx = indexRef.current;
    const currentEl = all[currentIdx];
    if (!currentEl) return;

    const isDown = e.deltaY > 0;
    const rect = currentEl.getBoundingClientRect();
    const vh = window.innerHeight;

    // Logika No-Snap milikmu tetap aman untuk area konten panjang
    if (currentEl.classList.contains("no-snap")) {
      if (isDown) {
        if (rect.bottom > vh + 5) return; 
      } else {
        if (rect.top < -5) return;
      }
    }

    const nextIdx = isDown ? currentIdx + 1 : currentIdx - 1;
    
    if (nextIdx >= 0 && nextIdx < all.length) {
      // Kunci default scroll native agar browser tidak ikut menggerakkan layar secara kasar
      e.preventDefault();
      scrollToElement(nextIdx);
    }
  }, [enabled, getElements, scrollToElement]);

  useEffect(() => {
    if (!enabled) return;

    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    window.addEventListener("wheel", handleWheel, { passive: false });
    
    const handleResize = () => {
      const all = getElements();
      if (all[indexRef.current]) {
        window.scrollTo(0, all[indexRef.current].offsetTop);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", handleResize);
    };
  }, [enabled, handleWheel, getElements]);

  return { 
    activeIndex, 
    scrollToSection: scrollToElement 
  };
};

export default useFullPageSnap;