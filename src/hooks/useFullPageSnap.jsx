import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const useFullPageSnap = () => {
  const allSectionsRef = useRef([]); // Semua section
  const snapSectionsRef = useRef([]); // Hanya section yang di-snap
  const indexRef = useRef(0);
  const lockRef = useRef(false);
  const wheelTimeoutRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const getAllSections = () => {
    return Array.from(document.querySelectorAll(".section"));
  };

  const getSnapSections = () => {
    return Array.from(document.querySelectorAll(".section:not(.no-snap)"));
  };

  // Cek apakah section memiliki class no-snap
  const isNoSnapSection = useCallback((element) => {
    return element?.classList?.contains("no-snap") || false;
  }, []);

  // Cek apakah section saat ini adalah no-snap
  const isCurrentSectionNoSnap = useCallback(() => {
    const currentSection = allSectionsRef.current[indexRef.current];
    return isNoSnapSection(currentSection);
  }, [isNoSnapSection]);

  const scrollToSection = useCallback((index, immediate = false) => {
    const sections = snapSectionsRef.current;
    if (!sections.length) return;
    if (index < 0 || index >= sections.length) return;
    if (lockRef.current && !immediate) return;

    lockRef.current = true;
    
    // Update index berdasarkan snap sections
    const targetSection = sections[index];
    const targetIndexInAllSections = allSectionsRef.current.findIndex(s => s === targetSection);
    indexRef.current = targetIndexInAllSections;
    setActiveIndex(targetIndexInAllSections);

    const scrollConfig = {
      duration: immediate ? 0.8 : 1.2,
      ease: "power2.inOut",
      scrollTo: {
        y: targetSection,
        autoKill: false,
        offsetY: 0
      },
      onComplete: () => {
        setTimeout(() => {
          lockRef.current = false;
        }, 100);
      },
      onUpdate: () => {
        if (window.scrollY < 0 || window.scrollY > document.body.scrollHeight - window.innerHeight) {
          lockRef.current = false;
        }
      }
    };

    gsap.to(window, scrollConfig);
  }, []);

  // Scroll ke section berikutnya/sebelumnya (hanya snap sections)
  const scrollToAdjacentSnap = useCallback((direction) => {
    const currentSnapIndex = snapSectionsRef.current.findIndex(s => s === allSectionsRef.current[indexRef.current]);
    
    let nextSnapIndex = direction === 'down' 
      ? currentSnapIndex + 1 
      : currentSnapIndex - 1;
    
    if (nextSnapIndex >= 0 && nextSnapIndex < snapSectionsRef.current.length) {
      scrollToSection(nextSnapIndex);
      return true;
    }
    return false;
  }, [scrollToSection]);

  // Handler untuk wheel event
  const handleWheel = useCallback((e) => {
    // Jika section saat ini adalah no-snap, biarkan scroll normal
    if (isCurrentSectionNoSnap()) {
      // Biarkan browser handle scroll normal
      return;
    }

    if (lockRef.current) {
      e.preventDefault();
      return;
    }

    const delta = e.deltaY;
    const absDelta = Math.abs(delta);
    
    if (absDelta < 50) return;

    if (wheelTimeoutRef.current) {
      clearTimeout(wheelTimeoutRef.current);
    }

    e.preventDefault();

    wheelTimeoutRef.current = setTimeout(() => {
      const direction = delta > 0 ? 'down' : 'up';
      scrollToAdjacentSnap(direction);
      wheelTimeoutRef.current = null;
    }, 100);
  }, [scrollToAdjacentSnap, isCurrentSectionNoSnap]);

  // Handler untuk keyboard
  const handleKeyDown = useCallback((e) => {
    if (isCurrentSectionNoSnap()) return;
    if (lockRef.current) return;
    
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const direction = e.key === 'ArrowDown' ? 'down' : 'up';
      scrollToAdjacentSnap(direction);
    }
  }, [scrollToAdjacentSnap, isCurrentSectionNoSnap]);

  // Update sections saat resize
  const handleResize = useCallback(() => {
    allSectionsRef.current = getAllSections();
    snapSectionsRef.current = getSnapSections();
  }, []);

  // Update active index saat scroll manual (di no-snap section)
  useEffect(() => {
    const handleScroll = () => {
      if (lockRef.current) return;
      
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      let newIndex = 0;
      
      for (let i = 0; i < allSectionsRef.current.length; i++) {
        const section = allSectionsRef.current[i];
        if (!section) continue;
        
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          newIndex = i;
          break;
        }
      }
      
      if (newIndex !== indexRef.current) {
        indexRef.current = newIndex;
        setActiveIndex(newIndex);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Inisialisasi sections
    allSectionsRef.current = getAllSections();
    snapSectionsRef.current = getSnapSections();
    
    // Update initial index
    const currentScrollY = window.scrollY;
    let initialIndex = 0;
    for (let i = 0; i < allSectionsRef.current.length; i++) {
      const section = allSectionsRef.current[i];
      if (section && section.offsetTop <= currentScrollY + 100) {
        initialIndex = i;
      }
    }
    indexRef.current = initialIndex;
    setActiveIndex(initialIndex);

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
    scrollToSection: (index) => scrollToSection(index),
  };
};

export default useFullPageSnap;