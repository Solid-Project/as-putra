// src/hooks/useLenisScroll.js
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const useLenisScroll = (options = {}) => {
  const {
    enabled = true,
    snapEnabled = true,
    sectionSelector = ".section",
    snapDuration = 0.35,
    wheelThreshold = 15, // Lebih kecil = lebih sensitif
  } = options;

  const lenisRef = useRef(null);
  const isSnappingRef = useRef(false);
  const sectionsRef = useRef([]);

  useEffect(() => {
    if (!enabled) return;

    // INIT LENIS
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: true,
      wheelMultiplier: 0.5,
      touchMultiplier: 1,
      infinite: false,
    });

    lenisRef.current = lenis;

    // SINCRONISASI DENGAN GSAP SCROLLTRIGGER
    lenis.on("scroll", () => {
      ScrollTrigger.update();
      // Update active dot
      updateActiveDot();
    });

    // ANIMATION LOOP
    let rafId = null;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // AMBIL SEMUA SECTION
    const getSections = () => {
      return Array.from(document.querySelectorAll(sectionSelector));
    };
    sectionsRef.current = getSections();

    // MENDAPATKAN INDEX SECTION YANG SEDANG AKTIF
    const getCurrentSectionIndex = () => {
      const sections = getSections();
      if (sections.length === 0) return 0;
      
      const scrollY = lenis.scroll;
      const viewportCenter = scrollY + window.innerHeight / 2;
      
      let currentIndex = 0;
      let minDistance = Infinity;
      
      sections.forEach((section, idx) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionCenter = (sectionTop + sectionBottom) / 2;
        const distance = Math.abs(viewportCenter - sectionCenter);
        
        if (distance < minDistance) {
          minDistance = distance;
          currentIndex = idx;
        }
      });
      
      return currentIndex;
    };

    // UPDATE ACTIVE DOT
    const updateActiveDot = () => {
      const activeIndex = getCurrentSectionIndex();
      const dots = document.querySelectorAll('.nav-dot');
      dots.forEach((dot, idx) => {
        if (idx === activeIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    };

    // SCROLL KE SECTION TERTENTU
    const scrollToSection = (index) => {
      const sections = getSections();
      if (isSnappingRef.current) return;
      if (index < 0 || index >= sections.length) return;
      
      isSnappingRef.current = true;
      
      lenis.scrollTo(sections[index], {
        offset: 0,
        immediate: false,
        duration: snapDuration,
        easing: (t) => 1 - Math.pow(1 - t, 2),
        onComplete: () => {
          isSnappingRef.current = false;
          updateActiveDot();
        },
      });
    };

    // HANDLE WHEEL / MOUSE SCROLL
    let wheelTimeout = null;
    let accumulatedDelta = 0;
    
    const handleWheel = (e) => {
      if (!snapEnabled) return;
      if (isSnappingRef.current) {
        e.preventDefault();
        return;
      }
      
      // Akumulasi delta
      accumulatedDelta += e.deltaY;
      
      // Reset akumulasi setelah beberapa saat
      if (wheelTimeout) clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(() => {
        accumulatedDelta = 0;
      }, 150);
      
      // Cek apakah sudah melewati threshold
      if (Math.abs(accumulatedDelta) < wheelThreshold) {
        return;
      }
      
      e.preventDefault();
      
      const currentIndex = getCurrentSectionIndex();
      const sections = getSections();
      
      // Scroll ke bawah
      if (accumulatedDelta > 0 && currentIndex < sections.length - 1) {
        scrollToSection(currentIndex + 1);
        accumulatedDelta = 0;
      }
      // Scroll ke atas
      else if (accumulatedDelta < 0 && currentIndex > 0) {
        scrollToSection(currentIndex - 1);
        accumulatedDelta = 0;
      }
    };
    
    // HANDLE KEYBOARD
    const handleKeyDown = (e) => {
      if (!snapEnabled) return;
      if (isSnappingRef.current) return;
      
      const currentIndex = getCurrentSectionIndex();
      const sections = getSections();
      
      if (e.key === "ArrowDown" && currentIndex < sections.length - 1) {
        e.preventDefault();
        scrollToSection(currentIndex + 1);
      } else if (e.key === "ArrowUp" && currentIndex > 0) {
        e.preventDefault();
        scrollToSection(currentIndex - 1);
      }
    };
    
    // CLICK DOT NAVIGATION
    const handleDotClick = (index) => {
      if (isSnappingRef.current) return;
      scrollToSection(index);
    };
    
    // REGISTER EVENT LISTENERS
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    
    // Create dot navigation
    const createDotNavigation = () => {
      const sections = getSections();
      if (sections.length === 0) return;
      
      // Hapus jika sudah ada
      const existingNav = document.querySelector('.section-navigation');
      if (existingNav) existingNav.remove();
      
      // Buat container navigation
      const nav = document.createElement('div');
      nav.className = 'section-navigation';
      nav.style.cssText = `
        position: fixed;
        left: 24px;
        top: 50%;
        transform: translateY(-50%);
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 12px;
      `;
      
      // Buat dots
      sections.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.className = 'nav-dot';
        dot.setAttribute('data-index', idx);
        dot.style.cssText = `
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: rgba(0,0,0,0.3);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
        `;
        
        // Hover effect
        dot.addEventListener('mouseenter', () => {
          dot.style.backgroundColor = 'var(--color-utama)';
          dot.style.transform = 'scale(1.3)';
        });
        
        dot.addEventListener('mouseleave', () => {
          const isActive = dot.classList.contains('active');
          dot.style.backgroundColor = isActive ? 'var(--color-utama)' : 'rgba(0,0,0,0.3)';
          dot.style.transform = 'scale(1)';
        });
        
        // Click handler
        dot.addEventListener('click', () => handleDotClick(idx));
        
        nav.appendChild(dot);
      });
      
      document.body.appendChild(nav);
      
      // Update active dot pertama kali
      setTimeout(updateActiveDot, 100);
    };
    
    // Tambahkan CSS untuk active dot
    const style = document.createElement('style');
    style.textContent = `
      .nav-dot.active {
        background-color: var(--color-utama) !important;
        transform: scale(1.3);
        box-shadow: 0 0 8px var(--color-utama);
      }
      .nav-dot {
        transition: all 0.3s ease;
      }
      .nav-dot:hover {
        transform: scale(1.3);
      }
    `;
    document.head.appendChild(style);
    
    // Buat navigasi
    createDotNavigation();
    
    // REFRESH SCROLLTRIGGER
    ScrollTrigger.refresh();
    
    // CLEANUP
    return () => {
      if (wheelTimeout) clearTimeout(wheelTimeout);
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      
      // Hapus navigasi
      const nav = document.querySelector('.section-navigation');
      if (nav) nav.remove();
      
      // Hapus style
      if (style.parentNode) style.parentNode.removeChild(style);
      
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
    };
  }, [enabled, snapEnabled, sectionSelector, snapDuration, wheelThreshold]);

  return lenisRef;
};

export default useLenisScroll;