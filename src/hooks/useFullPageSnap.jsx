import { useEffect, useRef, useState } from "react";
import Lenis from "@studio-freight/lenis";

const useFullpageSnap = () => {
  const sectionsRef = useRef([]);
  const isAnimating = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 2.2,
      easing: (t) => 1 - Math.pow(1 - t, 5),
      smooth: true,
      smoothTouch: true
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // ambil semua section
    const getSections = () => {
      sectionsRef.current = Array.from(
        document.querySelectorAll(".section")
      );
    };

    // 🔥 ACTIVE SECTION PALING AKURAT (VISIBLE AREA)
    const getActiveSectionIndex = () => {
      let maxVisible = 0;
      let index = 0;

      sectionsRef.current.forEach((section, i) => {
        const rect = section.getBoundingClientRect();

        const visibleTop = Math.max(rect.top, 0);
        const visibleBottom = Math.min(
          rect.bottom,
          window.innerHeight
        );

        const visibleHeight = Math.max(
          0,
          visibleBottom - visibleTop
        );

        if (visibleHeight > maxVisible + 10) {
          maxVisible = visibleHeight;
          index = i;
        }
      });

      return index;
    };

    // update active index (sinkron dengan Lenis)
    const updateActive = () => {
      const index = getActiveSectionIndex();
      setActiveIndex((prev) =>
        prev === index ? prev : index
      );
    };

    // scroll ke section
    const scrollToIndex = (index) => {
      if (index < 0 || index >= sectionsRef.current.length)
        return;

      isAnimating.current = true;

      lenis.scrollTo(sectionsRef.current[index], {
        duration: 2.2,
        lock: true
      });

      setTimeout(() => {
        isAnimating.current = false;
      }, 1600);
    };

    // handle wheel
    const handleWheel = (e) => {
      if (isAnimating.current) return;
      if (Math.abs(e.deltaY) < 20) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      const nextIndex = activeIndex + direction;

      if (
        nextIndex < 0 ||
        nextIndex >= sectionsRef.current.length
      )
        return;

      scrollToIndex(nextIndex);
    };

    // keyboard
    const handleKey = (e) => {
      if (isAnimating.current) return;

      if (e.key === "ArrowDown") {
        scrollToIndex(activeIndex + 1);
      } else if (e.key === "ArrowUp") {
        scrollToIndex(activeIndex - 1);
      }
    };

    setTimeout(() => {
      getSections();
      updateActive();
    }, 100);

    lenis.on("scroll", updateActive);

    window.addEventListener("wheel", handleWheel);
    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKey);
      lenis.destroy();
    };
  }, [activeIndex]);

  return { activeIndex };
};

export default useFullpageSnap;