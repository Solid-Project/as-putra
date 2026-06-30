import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);

const useFullPageSnap = ({ enabled = true } = {}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const lockRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const indexRef = useRef(0);
  const wheelTimeoutRef = useRef(null);

  const getElements = useCallback(() =>
    Array.from(document.querySelectorAll(".fullpage-wrapper > .section")),
    []);

  const scrollToElement = useCallback((targetIndex, alignBottom = false) => {
    const all = getElements();
    const targetEl = all[targetIndex];
    if (!targetEl || lockRef.current) return;

    // KUNCI INSTAN: Begitu terdeteksi, langsung kunci agar tidak ada sentuhan beruntun
    lockRef.current = true;
    isAnimatingRef.current = true;
    indexRef.current = targetIndex;
    setActiveIndex(targetIndex);

    let targetY = targetEl; // Default behavior GSAP (align ke atas elemen)

    // Jika user scroll ke atas (UP) menuju section no-snap yang tinggi, 
    // kita sejajarkan layar dengan bagian BAWAH elemen tersebut
    if (alignBottom && targetEl.offsetHeight > window.innerHeight) {
      const elTop = targetEl.getBoundingClientRect().top + window.scrollY;
      targetY = elTop + targetEl.offsetHeight - window.innerHeight;
    }

    // TATA.COM SECRET FEEL:
    // Menggunakan 'power2.inOut' agar konsisten, durasi 1.2s untuk keseimbangan antara kecepatan dan kehalusan.
    gsap.to(window, {
      duration: 1.2,
      ease: "power2.inOut",
      scrollTo: { y: targetY, autoKill: false },
      overwrite: "auto",
      onComplete: () => {
        isAnimatingRef.current = false;
        // Buka kunci jika trackpad sudah diam (inertia selesai)
        if (!wheelTimeoutRef.current) {
          lockRef.current = false;
        }
      },
    });
  }, [getElements]);

  const handleWheel = useCallback((e) => {
    if (!enabled) return;

    // Abaikan scroll event non-pixel (gesture spesifik perangkat)
    if (e.deltaMode !== 0) return;

    const all = getElements();
    if (all.length === 0) return;

    // Filter 1: Manajemen Inertia Trackpad
    if (lockRef.current) {
      e.preventDefault();

      // Perbarui timer inertia: setiap ada event wheel beruntun (inertia),
      // tunda pembukaan kunci agar tidak bergetar/memicu scroll baru.
      clearTimeout(wheelTimeoutRef.current);
      wheelTimeoutRef.current = setTimeout(() => {
        wheelTimeoutRef.current = null;
        // Hanya buka kunci jika animasi GSAP sudah selesai
        if (!isAnimatingRef.current) {
          lockRef.current = false;
        }
      }, 50); // 50ms tanpa event = trackpad dianggap sudah diam
      return;
    }

    const currentIdx = indexRef.current;
    const currentEl = all[currentIdx];
    if (!currentEl) return;

    const isDown = e.deltaY > 0;
    const rect = currentEl.getBoundingClientRect();
    const vh = window.innerHeight;

    // Cek apakah user sedang berada di area footer (di bawah batas bawah slide terakhir)
    const minValidTop = Math.min(0, vh - currentEl.offsetHeight);
    const isAtFooter = currentIdx === all.length - 1 && rect.top < minValidTop - 5;

    // Jika user di footer dan scroll KE ATAS, berikan efek snap kembali ke slide terakhir
    if (isAtFooter && !isDown) {
      e.preventDefault();
      if (Math.abs(e.deltaY) < 10) return;
      scrollToElement(currentIdx, true); // Snap ke batas bawah slide terakhir
      return;
    }

    // Bagian No-Snap
    if (currentEl.classList.contains("no-snap")) {
      const isAtBottom = rect.bottom <= vh + 1;
      const isAtTop = rect.top >= -1;

      if (isDown && !isAtBottom) return; // Biarkan konten scroll sendiri
      if (!isDown && !isAtTop) return;   // Biarkan konten scroll sendiri
    }

    const nextIdx = isDown ? currentIdx + 1 : currentIdx - 1;

    // Jika mencoba scroll ke luar batas slide GSAP (misal: scroll down di slide terakhir untuk melihat footer)
    if (nextIdx < 0 || nextIdx >= all.length) {
      return; // Biarkan browser native scroll
    }

    // CEGAH SCROLL NATIVE DALAM BATAS GSAP: 
    // Ini menghilangkan efek "patah-patah" / bentrokan dengan GSAP.
    e.preventDefault();

    // Threshold diturunkan sedikit untuk menyeimbangkan responsivitas
    if (Math.abs(e.deltaY) < 8) return;

    if (nextIdx >= 0 && nextIdx < all.length) {
      // Jika scroll UP (!isDown), aktifkan alignBottom agar snap ke bawah elemen
      scrollToElement(nextIdx, !isDown);
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
        // Simple resize handler (selalu align top saat resize untuk aman)
        window.scrollTo(0, all[indexRef.current].offsetTop);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", handleResize);
      clearTimeout(wheelTimeoutRef.current);
    };
  }, [enabled, handleWheel, getElements]);

  return {
    activeIndex,
    scrollToSection: scrollToElement
  };
};

export default useFullPageSnap;