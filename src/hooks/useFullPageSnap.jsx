import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const useFullPageSnap = () => {
  const allSectionsRef = useRef([]);
  const snapSectionsRef = useRef([]);
  const indexRef = useRef(0);
  const lockRef = useRef(false);
  const wheelTimeoutRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const getAllSections = () =>
    Array.from(document.querySelectorAll(".section"));

  const getSnapSections = () =>
    Array.from(document.querySelectorAll(".section:not(.no-snap)"));

  const isNoSnapSection = useCallback((el) => {
    return el?.classList?.contains("no-snap") || false;
  }, []);

  const getCurrentSectionIndex = () => {
    const all = allSectionsRef.current;
    const pos = window.scrollY + window.innerHeight / 2;

    for (let i = 0; i < all.length; i++) {
      const el = all[i];
      if (!el) continue;

      const top = el.offsetTop;
      const bottom = top + el.offsetHeight;

      if (pos >= top && pos < bottom) {
        return i;
      }
    }

    return 0;
  };

  const scrollToSection = useCallback((snapIndex, immediate = false) => {
    const sections = snapSectionsRef.current;
    if (!sections.length) return;
    if (snapIndex < 0 || snapIndex >= sections.length) return;
    if (lockRef.current && !immediate) return;

    lockRef.current = true;

    const targetSection = sections[snapIndex];
    const realIndex = allSectionsRef.current.findIndex(
      (s) => s === targetSection,
    );

    indexRef.current = realIndex;
    setActiveIndex(realIndex);

    gsap.to(window, {
      duration: 0.8,
      ease: "power2.inOut",
      overwrite: "auto",
      scrollTo: {
        y: targetSection,
        autoKill: false,
      },
      onComplete: () => {
        // 🔥 sync parallax
        if (window.ScrollTrigger) {
          window.ScrollTrigger.refresh();
        }

        setTimeout(() => {
          lockRef.current = false;
        }, 200);
      },
      onUpdate: () => {
        const maxScroll =
          document.documentElement.scrollHeight - window.innerHeight;

        if (window.scrollY <= 0 || window.scrollY >= maxScroll) {
          lockRef.current = false;
        }
      },
    });
  }, []);

  useEffect(() => {
    allSectionsRef.current = getAllSections();
    snapSectionsRef.current = getSnapSections();
  }, []);

  const scrollToAdjacentSnap = useCallback(
    (direction) => {
      const all = allSectionsRef.current;
      const snaps = snapSectionsRef.current;
      const realIndex = getCurrentSectionIndex();
      const current = all[realIndex];

      let currentSnapIndex = snaps.findIndex((s) => s === current);

      // 🔥 HANDLE FOOTER / NO-SNAP
      if (currentSnapIndex === -1) {
        const currentAllIndex = realIndex;

        if (direction === "up") {
          for (let i = currentAllIndex - 1; i >= 0; i--) {
            const idx = snaps.findIndex((s) => s === all[i]);
            if (idx !== -1) {
              scrollToSection(idx);
              return true;
            }
          }
        }

        if (direction === "down") {
          for (let i = currentAllIndex + 1; i < all.length; i++) {
            const idx = snaps.findIndex((s) => s === all[i]);
            if (idx !== -1) {
              scrollToSection(idx);
              return true;
            }
          }
        }

        return false;
      }

      let next =
        direction === "down" ? currentSnapIndex + 1 : currentSnapIndex - 1;

      if (next >= 0 && next < snaps.length) {
        scrollToSection(next);
        return true;
      }

      return false;
    },
    [scrollToSection],
  );

  const handleWheel = useCallback(
  (e) => {
    if (lockRef.current) {
      e.preventDefault();
      return;
    }

    const delta = e.deltaY;
    const abs = Math.abs(delta);
    if (abs < 60) return;

    const direction = delta > 0 ? "down" : "up";

    const all = allSectionsRef.current;
    const snaps = snapSectionsRef.current;

    // 🔥 pakai posisi REAL (bukan indexRef doang)
    const pos = window.scrollY + window.innerHeight / 2;

    let realIndex = 0;
    for (let i = 0; i < all.length; i++) {
      const el = all[i];
      if (!el) continue;

      const top = el.offsetTop;
      const bottom = top + el.offsetHeight;

      if (pos >= top && pos < bottom) {
        realIndex = i;
        break;
      }
    }

    const current = all[realIndex];

    // =========================================================
    // 🔥 CASE 1: lagi di NO-SNAP → cari SNAP terdekat
    // =========================================================
    if (isNoSnapSection(current)) {
      if (direction === "up") {
        for (let i = realIndex - 1; i >= 0; i--) {
          if (!isNoSnapSection(all[i])) {
            e.preventDefault();

            lockRef.current = true;

            gsap.to(window, {
              duration: 0.8,
              ease: "power2.inOut",
              scrollTo: {
                y: all[i],
                autoKill: false,
              },
              onComplete: () => {
                indexRef.current = i;
                setActiveIndex(i);
                lockRef.current = false;
              },
            });

            return;
          }
        }
      }

      if (direction === "down") {
        for (let i = realIndex + 1; i < all.length; i++) {
          if (!isNoSnapSection(all[i])) {
            e.preventDefault();

            lockRef.current = true;

            gsap.to(window, {
              duration: 0.8,
              ease: "power2.inOut",
              scrollTo: {
                y: all[i],
                autoKill: false,
              },
              onComplete: () => {
                indexRef.current = i;
                setActiveIndex(i);
                lockRef.current = false;
              },
            });

            return;
          }
        }
      }

      // gak ada snap → bebas scroll
      return;
    }

    // =========================================================
    // 🔥 CASE 2: normal SNAP → SNAP berikutnya
    // =========================================================
    const currentSnapIndex = snaps.findIndex((s) => s === current);

    let nextSnapIndex =
      direction === "down"
        ? currentSnapIndex + 1
        : currentSnapIndex - 1;

    if (nextSnapIndex >= 0 && nextSnapIndex < snaps.length) {
      e.preventDefault();
      scrollToSection(nextSnapIndex);
      return;
    }

    // =========================================================
    // 🔥 CASE 3: dari SNAP ke NO-SNAP (footer dll)
    // =========================================================
    if (direction === "down") {
      for (let i = realIndex + 1; i < all.length; i++) {
        if (isNoSnapSection(all[i])) {
          e.preventDefault();

          lockRef.current = true;

          gsap.to(window, {
            duration: 0.8,
            ease: "power2.inOut",
            scrollTo: {
              y: all[i],
              autoKill: false,
            },
            onComplete: () => {
              indexRef.current = i;
              setActiveIndex(i);
              lockRef.current = false;
            },
          });

          return;
        }
      }
    }

    if (direction === "up") {
      for (let i = realIndex - 1; i >= 0; i--) {
        if (isNoSnapSection(all[i])) {
          e.preventDefault();

          lockRef.current = true;

          gsap.to(window, {
            duration: 0.8,
            ease: "power2.inOut",
            scrollTo: {
              y: all[i],
              autoKill: false,
            },
            onComplete: () => {
              indexRef.current = i;
              setActiveIndex(i);
              lockRef.current = false;
            },
          });

          return;
        }
      }
    }
  },
  [scrollToSection, isNoSnapSection],
);

  const handleKeyDown = useCallback(
    (e) => {
      const current = allSectionsRef.current[indexRef.current];
      if (isNoSnapSection(current)) return;
      if (lockRef.current) return;

      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const dir = e.key === "ArrowDown" ? "down" : "up";
        scrollToAdjacentSnap(dir);
      }
    },
    [scrollToAdjacentSnap, isNoSnapSection],
  );

  const handleResize = useCallback(() => {
    allSectionsRef.current = getAllSections();
    snapSectionsRef.current = getSnapSections();

    if (window.ScrollTrigger) {
      requestAnimationFrame(() => {
        window.ScrollTrigger.refresh();
      });
    }
  }, []);

  // update index saat scroll bebas (footer)
  useEffect(() => {
    const handleScroll = () => {
      if (lockRef.current) return;

      const pos = window.scrollY + window.innerHeight / 3;

      for (let i = 0; i < allSectionsRef.current.length; i++) {
        const s = allSectionsRef.current[i];
        if (!s) continue;

        const top = s.offsetTop;
        const bottom = top + s.offsetHeight;

        if (pos >= top && pos < bottom) {
          if (i !== indexRef.current) {
            indexRef.current = i;
            setActiveIndex(i);
          }
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    allSectionsRef.current = getAllSections();
    snapSectionsRef.current = getSnapSections();

    // init index
    const y = window.scrollY;
    let idx = 0;

    for (let i = 0; i < allSectionsRef.current.length; i++) {
      const s = allSectionsRef.current[i];
      if (s && s.offsetTop <= y + 100) {
        idx = i;
      }
    }

    indexRef.current = idx;
    setActiveIndex(idx);

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);

      if (wheelTimeoutRef.current) {
        clearTimeout(wheelTimeoutRef.current);
      }

      gsap.killTweensOf(window);
    };
  }, [handleWheel, handleKeyDown, handleResize]);

  return {
    activeIndex,
    scrollToSection,
  };
};

export default useFullPageSnap;
