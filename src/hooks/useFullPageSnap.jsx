import { useEffect, useRef, useState, useCallback } from "react";

const useFullPageSnap = () => {
  const sectionsRef = useRef([]);
  const activeIndexRef = useRef(0);
  const isAnimating = useRef(false);
  const touchStartY = useRef(0);
  const animationIdRef = useRef(null);
  const wheelTimeoutRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);

  // 🔥 stop animasi yang sedang berjalan
  const stopCurrentAnimation = useCallback(() => {
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
      animationIdRef.current = null;
    }
    isAnimating.current = false;
  }, []);

  // 🔥 easing yang lebih ringan
  const easeOutCubic = useCallback((t) => {
    return 1 - Math.pow(1 - t, 3);
  }, []);

  // 🔥 ANIMASI SCROLL YANG LEBIH EFISIEN
  const smoothScrollTo = useCallback((targetY) => {
    // Hentikan animasi sebelumnya
    stopCurrentAnimation();
    
    const startY = window.scrollY;
    const distance = targetY - startY;
    
    // Jika jaraknya terlalu kecil, langsung scroll tanpa animasi
    if (Math.abs(distance) < 5) {
      window.scrollTo(0, targetY);
      return;
    }

    let startTime = null;
    
    // Durasi lebih pendek untuk responsivitas
    const duration = Math.min(800, Math.max(400, Math.abs(distance) * 0.5));
    
    isAnimating.current = true;

    const animation = (currentTime) => {
      if (!startTime) startTime = currentTime;
      
      const elapsed = currentTime - startTime;
      let progress = Math.min(elapsed / duration, 1);
      
      const eased = easeOutCubic(progress);
      
      window.scrollTo(0, startY + distance * eased);
      
      if (progress < 1) {
        animationIdRef.current = requestAnimationFrame(animation);
      } else {
        window.scrollTo(0, targetY);
        isAnimating.current = false;
        animationIdRef.current = null;
      }
    };

    animationIdRef.current = requestAnimationFrame(animation);
  }, [easeOutCubic, stopCurrentAnimation]);

  // 🔥 pindah section dengan throttle
  const scrollToIndex = useCallback((index) => {
    if (isAnimating.current) return;
    if (index < 0 || index >= sectionsRef.current.length) return;
    
    // Throttle: cegah spam panggilan
    if (wheelTimeoutRef.current) return;
    
    activeIndexRef.current = index;
    setActiveIndex(index);
    
    const targetY = sectionsRef.current[index].offsetTop;
    
    // Gunakan requestAnimationFrame untuk performa lebih baik
    requestAnimationFrame(() => {
      smoothScrollTo(targetY);
    });
    
    // Throttle 500ms
    wheelTimeoutRef.current = setTimeout(() => {
      wheelTimeoutRef.current = null;
    }, 500);
  }, [smoothScrollTo]);

  // 🔥 WHEEL (desktop) dengan deteksi yang lebih baik
  const handleWheel = useCallback((e) => {
    if (isAnimating.current) return;
    
    // Cegah default hanya jika perlu
    const isScrollingUp = e.deltaY < 0;
    const isScrollingDown = e.deltaY > 0;
    const canScrollUp = isScrollingUp && activeIndexRef.current > 0;
    const canScrollDown = isScrollingDown && activeIndexRef.current < sectionsRef.current.length - 1;
    
    if (canScrollUp || canScrollDown) {
      e.preventDefault();
      
      // Threshold lebih besar untuk mencegah scroll sensitif
      if (Math.abs(e.deltaY) < 50) return;
      
      const direction = e.deltaY > 0 ? 1 : -1;
      scrollToIndex(activeIndexRef.current + direction);
    }
  }, [scrollToIndex]);

  // 🔥 TOUCH (mobile) dengan optimasi
  const handleTouchStart = useCallback((e) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e) => {
    if (isAnimating.current) return;
    
    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchStartY.current - touchEndY;
    
    // Threshold lebih besar untuk mencegah scroll sensitif
    if (Math.abs(deltaY) < 70) return;
    
    const direction = deltaY > 0 ? 1 : -1;
    scrollToIndex(activeIndexRef.current + direction);
  }, [scrollToIndex]);

  // 🔥 KEYBOARD dengan throttle
  const handleKey = useCallback((e) => {
    if (isAnimating.current) return;
    if (wheelTimeoutRef.current) return;
    
    if (e.key === "ArrowDown") {
      e.preventDefault();
      scrollToIndex(activeIndexRef.current + 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      scrollToIndex(activeIndexRef.current - 1);
    }
  }, [scrollToIndex]);

  // 🔥 Resize handler untuk update posisi section
  const handleResize = useCallback(() => {
    if (!isAnimating.current && sectionsRef.current[activeIndexRef.current]) {
      const targetY = sectionsRef.current[activeIndexRef.current].offsetTop;
      window.scrollTo(0, targetY);
    }
  }, []);

  // 🔥 Observer untuk mendeteksi perubahan DOM
  useEffect(() => {
    const updateSections = () => {
      sectionsRef.current = Array.from(document.querySelectorAll(".section"));
      
      // Validasi active index
      if (activeIndexRef.current >= sectionsRef.current.length) {
        activeIndexRef.current = sectionsRef.current.length - 1;
        setActiveIndex(activeIndexRef.current);
      }
    };
    
    updateSections();
    
    // Gunakan MutationObserver untuk mendeteksi perubahan DOM
    const observer = new MutationObserver(updateSections);
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Event listeners
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKey);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("resize", handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("resize", handleResize);
      
      observer.disconnect();
      stopCurrentAnimation();
      
      if (wheelTimeoutRef.current) {
        clearTimeout(wheelTimeoutRef.current);
      }
    };
  }, [handleWheel, handleKey, handleTouchStart, handleTouchEnd, handleResize, stopCurrentAnimation]);

  return { activeIndex };
};

export default useFullPageSnap;