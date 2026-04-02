import { useEffect } from "react";
import gsap from "gsap";

const useFullpageSnap = (config = {}) => {
  const { duration = 0.6, ease = "power2.out", enabled = true } = config;

  useEffect(() => {
    if (!enabled) {
      console.log("useFullpageSnap disabled");
      return;
    }

    console.log("🔥 useFullpageSnap activated!");

    const sections = document.querySelectorAll(".section");
    if (sections.length === 0) {
      console.log("No .section found");
      return;
    }
    console.log(`Found ${sections.length} sections`);

    let isScrolling = false;
    let scrollAnimation = null;

    const getCurrentIndex = (scrollY) => {
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const nextSection = sections[i + 1];
        const sectionEnd = nextSection ? nextSection.offsetTop : Infinity;
        if (scrollY >= section.offsetTop && scrollY < sectionEnd) {
          return i;
        }
      }
      return 0;
    };

    const scrollToSection = (index) => {
      const target = sections[index];
      if (!target || isScrolling) return;

      console.log(`Snapping to section ${index}:`, target.id || target.className);

      // Kill animasi sebelumnya jika ada
      if (scrollAnimation) {
        scrollAnimation.kill();
      }

      isScrolling = true;

      // 🔥🔥🔥 INI KODE BARU - MANUAL ANIMATION TANPA SCROLLTOPLUGIN 🔥🔥🔥
      const startY = window.scrollY;
      const targetY = target.offsetTop;
      const distance = targetY - startY;
      const startTime = performance.now();

      const animateScroll = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(1, elapsed / (duration * 1000));
        
        // Easing function: power2.out
        const easeProgress = 1 - Math.pow(1 - progress, 2);
        
        const currentY = startY + (distance * easeProgress);
        window.scrollTo(0, currentY);
        
        if (progress < 1) {
          scrollAnimation = requestAnimationFrame(animateScroll);
        } else {
          window.scrollTo(0, targetY);
          isScrolling = false;
          scrollAnimation = null;
          console.log("Snap complete");
        }
      };

      if (scrollAnimation) {
        cancelAnimationFrame(scrollAnimation);
      }
      scrollAnimation = requestAnimationFrame(animateScroll);
    };

    const handleWheel = (e) => {
      if (isScrolling) {
        e.preventDefault();
        return;
      }

      const scrollY = window.scrollY;
      const currentIndex = getCurrentIndex(scrollY);
      const currentSection = sections[currentIndex];

      console.log(`Wheel deltaY: ${e.deltaY}, currentIndex: ${currentIndex}, no-snap: ${currentSection?.classList.contains("no-snap")}`);

      if (currentSection?.classList.contains("no-snap")) {
        console.log("No-snap detected - natural scroll");
        return;
      }

      e.preventDefault();

      if (e.deltaY > 0) {
        const nextIndex = Math.min(currentIndex + 1, sections.length - 1);
        if (nextIndex !== currentIndex) {
          scrollToSection(nextIndex);
        }
      } else {
        const prevIndex = Math.max(currentIndex - 1, 0);
        if (prevIndex !== currentIndex) {
          scrollToSection(prevIndex);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      if (scrollAnimation) {
        cancelAnimationFrame(scrollAnimation);
      }
      window.removeEventListener("wheel", handleWheel);
      console.log("useFullpageSnap cleanup");
    };
  }, [duration, ease, enabled]);
};

export default useFullpageSnap;