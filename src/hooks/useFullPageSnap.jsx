import { useEffect, useRef, useState } from "react";

const useFullPageSnap = () => {
  const sectionsRef = useRef([]);
  const activeIndexRef = useRef(0);
  const isAnimating = useRef(false);
  const touchStartY = useRef(0);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    sectionsRef.current = Array.from(
      document.querySelectorAll(".section")
    );

    // 🔥 easing natural (smooth & tidak kaku)
    const easeOutExpo = (t) => {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    };

    // 🔥 ANIMASI SCROLL NATURAL
    const smoothScrollTo = (targetY) => {
      const startY = window.scrollY;
      const distance = targetY - startY;

      let startTime = null;

      // 🔥 durasi adaptif (biar tidak terasa dipaksa)
      const baseDuration = 1200;
      const extra = Math.min(Math.abs(distance) * 0.3, 600);
      const duration = baseDuration + extra;

      isAnimating.current = true;

      const animation = (currentTime) => {
        if (!startTime) startTime = currentTime;

        const elapsed = currentTime - startTime;
        let progress = Math.min(elapsed / duration, 1);

        const eased = easeOutExpo(progress);

        window.scrollTo(0, startY + distance * eased);

        if (progress < 1) {
          requestAnimationFrame(animation);
        } else {
          // 🔥 snap halus biar presisi
          window.scrollTo(0, targetY);
          isAnimating.current = false;
        }
      };

      requestAnimationFrame(animation);
    };

    // 🔥 pindah section
    const scrollToIndex = (index) => {
      if (index < 0 || index >= sectionsRef.current.length)
        return;

      if (isAnimating.current) return;

      activeIndexRef.current = index;
      setActiveIndex(index);

      const targetY =
        sectionsRef.current[index].offsetTop;

      // 🔥 micro delay biar natural (tidak kaget)
      setTimeout(() => {
        smoothScrollTo(targetY);
      }, 40);
    };

    // 🔥 WHEEL (desktop)
    const handleWheel = (e) => {
      if (isAnimating.current) return;

      e.preventDefault();

      if (Math.abs(e.deltaY) < 30) return;

      const direction = e.deltaY > 0 ? 1 : -1;

      scrollToIndex(activeIndexRef.current + direction);
    };

    // 🔥 TOUCH (mobile)
    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (isAnimating.current) return;

      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY.current - touchEndY;

      if (Math.abs(deltaY) < 50) return;

      const direction = deltaY > 0 ? 1 : -1;

      scrollToIndex(activeIndexRef.current + direction);
    };

    // 🔥 KEYBOARD
    const handleKey = (e) => {
      if (isAnimating.current) return;

      if (e.key === "ArrowDown") {
        scrollToIndex(activeIndexRef.current + 1);
      } else if (e.key === "ArrowUp") {
        scrollToIndex(activeIndexRef.current - 1);
      }
    };

    window.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    window.addEventListener("keydown", handleKey);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return { activeIndex };
};

export default useFullPageSnap;