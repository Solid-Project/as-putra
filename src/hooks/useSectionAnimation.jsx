// hooks/useSectionAnimation.js
import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';

const useSectionAnimation = (animationCallback, options = {}) => {
  const {
    delay = 100,
    threshold = 0.5,
    once = true,
    debounceMs = 100,
    autoStart = true // Tambahan: apakah langsung jalan atau tunggu trigger
  } = options;
  
  const sectionRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const animationTimeoutRef = useRef(null);
  const debounceTimeoutRef = useRef(null);
  const observerRef = useRef(null);
  const isAnimatingRef = useRef(false);

  // Bersihkan semua timeout
  const clearTimeouts = useCallback(() => {
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
      animationTimeoutRef.current = null;
    }
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
      debounceTimeoutRef.current = null;
    }
  }, []);

  // Fungsi untuk menjalankan animasi
  const runAnimation = useCallback(() => {
    if (!sectionRef.current) return;
    if (once && hasAnimated) return;
    if (isAnimatingRef.current) return;
    
    isAnimatingRef.current = true;
    
    // HANYA kill tweens yang sedang berjalan pada element ini, BUKAN children
    gsap.killTweensOf(sectionRef.current);
    
    clearTimeouts();
    
    animationTimeoutRef.current = setTimeout(() => {
      if (animationCallback && sectionRef.current) {
        animationCallback(sectionRef.current);
        if (once) {
          setHasAnimated(true);
        }
      }
      animationTimeoutRef.current = null;
      isAnimatingRef.current = false;
    }, delay);
  }, [animationCallback, delay, once, hasAnimated, clearTimeouts]);

  // Reset animasi
  const resetAnimation = useCallback(() => {
    setHasAnimated(false);
    isAnimatingRef.current = false;
    clearTimeouts();
    
    // Reset style yang mungkin ditinggalkan GSAP
    if (sectionRef.current) {
      gsap.killTweensOf(sectionRef.current);
      // Jangan kill children, biarkan mereka tetap visible
    }
  }, [clearTimeouts]);

  // Gunakan Intersection Observer
  useEffect(() => {
    if (!sectionRef.current || !autoStart) return;
    
    // Pastikan element visible dulu sebelum observer
    // Set opacity ke 1 biar tidak hilang
    if (sectionRef.current.style.opacity === '0') {
      sectionRef.current.style.opacity = '1';
    }
    
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && (!once || !hasAnimated)) {
            clearTimeouts();
            animationTimeoutRef.current = setTimeout(() => {
              runAnimation();
            }, delay);
          }
        });
      },
      {
        threshold: threshold,
        rootMargin: '0px 0px 0px 0px' // Hapus margin negatif
      }
    );
    
    observerRef.current.observe(sectionRef.current);
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      clearTimeouts();
    };
  }, [threshold, delay, once, hasAnimated, runAnimation, clearTimeouts, autoStart]);

  return { sectionRef, hasAnimated, resetAnimation };
};

// Animasi yang lebih aman (tidak menghilangkan elemen)
export const sectionAnimations = {
  fadeInUp: (element) => {
    // Pastikan element visible dulu
    gsap.set(element, { opacity: 1 }); // Set default visible
    
    gsap.fromTo(element,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', clearProps: 'all' }
    );
  },
  
  scaleIn: (element) => {
    gsap.set(element, { opacity: 1, scale: 1 });
    gsap.fromTo(element,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(0.4)', clearProps: 'all' }
    );
  },
  
  slideInLeft: (element) => {
    gsap.set(element, { opacity: 1 });
    gsap.fromTo(element,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out', clearProps: 'all' }
    );
  },
  
  slideInRight: (element) => {
    gsap.set(element, { opacity: 1 });
    gsap.fromTo(element,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out', clearProps: 'all' }
    );
  },
  
  // Untuk line (width animation)
  lineWidth: (element, targetWidth = 80) => {
    gsap.set(element, { width: 0 });
    gsap.to(element, {
      width: targetWidth,
      duration: 0.6,
      ease: 'back.out(1.2)',
      clearProps: 'all'
    });
  },
  
  staggerChildren: (element, selector = '.animate-item') => {
    const children = element.querySelectorAll(selector);
    gsap.set(children, { opacity: 1 });
    gsap.fromTo(children,
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.5, 
        stagger: 0.1, 
        ease: 'power2.out',
        clearProps: 'all'
      }
    );
  },
  
  textReveal: (element, selector = 'h1, h2, h3, p') => {
    const texts = element.querySelectorAll(selector);
    gsap.set(texts, { opacity: 1 });
    texts.forEach((text, i) => {
      gsap.fromTo(text,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: i * 0.1, ease: 'power2.out', clearProps: 'all' }
      );
    });
  }
};

export default useSectionAnimation;