import { useEffect, useRef, useState, useCallback } from "react";

const useFullPageSnap = () => {
  const sectionsRef = useRef([]);
  const activeIndexRef = useRef(0);
  const isAnimating = useRef(false);
  const touchStartY = useRef(0);
  const animationIdRef = useRef(null);
  const wheelLockRef = useRef(false);
  const lastWheelTime = useRef(0);
  const scrollTimeoutRef = useRef(null);
  const isManualScrolling = useRef(false);

  const [activeIndex, setActiveIndex] = useState(0);

  // 🔥 stop animasi
  const stopCurrentAnimation = useCallback(() => {
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
      animationIdRef.current = null;
    }
    isAnimating.current = false;
  }, []);

  // 🔥 easing premium (berat & natural)
  const easePremium = (t) => {
    const start = Math.pow(t, 1.8);
    const mid = 1 - Math.pow(1 - t, 3);
    return start * 0.4 + mid * 0.6;
  };

  // 🔥 smooth scroll TANPA kejut
  const smoothScrollTo = useCallback((targetY, onUpdate, customDuration = 1800) => {
  stopCurrentAnimation();

  const startY = window.scrollY;
  const distance = targetY - startY;

  if (Math.abs(distance) < 2) {
    window.scrollTo(0, targetY);
    isAnimating.current = false;
    isManualScrolling.current = false;
    return;
  }

  let startTime = null;
  const duration = customDuration;

  isAnimating.current = true;
  isManualScrolling.current = true;

  const animate = (time) => {
    if (!startTime) startTime = time;

    const elapsed = time - startTime;
    let progress = Math.min(elapsed / duration, 1);

    // 🔥 EASING KONTINU (NO BREAK, NO HOLD)
    const eased = 1 - Math.pow(1 - progress, 3.2);

    // 🔥 tambahan "feather" biar akhir super halus TANPA nahan
    const feather = 1 - 0.015 * Math.sin(progress * Math.PI);

    const currentY = startY + distance * eased * feather;

    window.scrollTo(0, currentY);

    if (onUpdate) onUpdate(progress);

    if (progress < 1) {
      animationIdRef.current = requestAnimationFrame(animate);
    } else {
      // 🔥 TANPA HOLD / TANPA DELAY
      window.scrollTo(0, targetY);

      isAnimating.current = false;
      isManualScrolling.current = false;
      animationIdRef.current = null;
    }
  };

  animationIdRef.current = requestAnimationFrame(animate);
}, [stopCurrentAnimation]);

  // 🔥 pindah section
  const scrollToIndex = useCallback((index, onUpdate, skipLock = false) => {
    if (isAnimating.current) return;
    if (index < 0 || index >= sectionsRef.current.length) return;
    if (!skipLock && wheelLockRef.current) return;

    const target = sectionsRef.current[index];
    if (!target) return;

    activeIndexRef.current = index;
    setActiveIndex(index);

    smoothScrollTo(target.offsetTop, onUpdate);

    if (!skipLock) {
      wheelLockRef.current = true;
      setTimeout(() => {
        wheelLockRef.current = false;
      }, 800);
    }
  }, [smoothScrollTo]);

  // 🔥 deteksi section aktif
  const getCurrentSectionIndex = useCallback(() => {
    const scrollPos = window.scrollY + window.innerHeight / 2;

    for (let i = sectionsRef.current.length - 1; i >= 0; i--) {
      const sec = sectionsRef.current[i];
      if (!sec) continue;

      const top = sec.offsetTop;
      const bottom = top + sec.offsetHeight;

      if (scrollPos >= top && scrollPos < bottom) return i;
    }

    return 0;
  }, []);

  const updateActiveIndex = useCallback(() => {
    if (isManualScrolling.current) return;

    const idx = getCurrentSectionIndex();
    if (idx !== activeIndexRef.current) {
      activeIndexRef.current = idx;
      setActiveIndex(idx);
    }
  }, [getCurrentSectionIndex]);

  const isInFooterArea = useCallback(() => {
    const footer = document.querySelector("footer");
    if (!footer) return false;

    const footerTop = footer.offsetTop;
    return window.scrollY + window.innerHeight > footerTop + 50;
  }, []);

  const snapBackToLastSection = useCallback(() => {
    if (isAnimating.current) return;

    const last = sectionsRef.current[sectionsRef.current.length - 1];
    if (!last) return;

    smoothScrollTo(last.offsetTop, null, 900);

    setTimeout(() => {
      activeIndexRef.current = sectionsRef.current.length - 1;
      setActiveIndex(sectionsRef.current.length - 1);
    }, 950);
  }, [smoothScrollTo]);

  // 🔥 wheel
  const handleWheel = useCallback((e) => {
    const now = Date.now();

    if (now - lastWheelTime.current < 200 && isAnimating.current) {
      e.preventDefault();
      return;
    }

    lastWheelTime.current = now;

    if (isAnimating.current) {
      e.preventDefault();
      return;
    }

    const delta = e.deltaY;
    if (Math.abs(delta) < 50) return;

    const down = delta > 0;
    const up = delta < 0;

    if (up && isInFooterArea()) {
      e.preventDefault();
      snapBackToLastSection();
      return;
    }

    const current = getCurrentSectionIndex();
    const next = down ? current + 1 : current - 1;

    if (next >= 0 && next < sectionsRef.current.length) {
      e.preventDefault();
      scrollToIndex(next);
    }
  }, [scrollToIndex, snapBackToLastSection, isInFooterArea, getCurrentSectionIndex]);

  // 🔥 touch
  const handleTouchStart = useCallback((e) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e) => {
    if (isAnimating.current) return;

    const delta = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(delta) < 50) return;

    const down = delta > 0;

    if (!down && isInFooterArea()) {
      snapBackToLastSection();
      return;
    }

    const current = getCurrentSectionIndex();
    const next = down ? current + 1 : current - 1;

    if (next >= 0 && next < sectionsRef.current.length) {
      scrollToIndex(next);
    }
  }, [scrollToIndex, snapBackToLastSection, isInFooterArea, getCurrentSectionIndex]);

  // 🔥 keyboard
  const handleKeyDown = useCallback((e) => {
    if (isAnimating.current || wheelLockRef.current) return;

    const current = getCurrentSectionIndex();

    if (e.key === "ArrowDown") {
      e.preventDefault();
      scrollToIndex(current + 1);
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      scrollToIndex(current - 1);
    }
  }, [scrollToIndex, getCurrentSectionIndex]);

  // 🔥 init
  useEffect(() => {
    const updateSections = () => {
      const all = Array.from(document.querySelectorAll(".section"));

      sectionsRef.current = all.filter(
        (el) => !el.closest("footer") && el.tagName !== "FOOTER"
      );

      const idx = getCurrentSectionIndex();
      activeIndexRef.current = idx;
      setActiveIndex(idx);
    };

    const handleScroll = () => {
      if (!isManualScrolling.current && !isAnimating.current) {
        clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(updateActiveIndex, 100);
      }
    };

    updateSections();

    const observer = new MutationObserver(updateSections);
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      observer.disconnect();
      clearTimeout(scrollTimeoutRef.current);
      stopCurrentAnimation();
    };
  }, [handleWheel, handleKeyDown, handleTouchStart, handleTouchEnd, updateActiveIndex, getCurrentSectionIndex, stopCurrentAnimation]);

  return { activeIndex, scrollToIndex };
};

export default useFullPageSnap;