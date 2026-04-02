// hooks/useSectionAnimation.js
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const useSectionAnimation = (animationCallback) => {
  const sectionRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Fungsi untuk mengecek apakah section aktif
    const checkAndAnimate = () => {
      if (!sectionRef.current || hasAnimated) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Jika section berada di tengah viewport (active section)
      const isActive = rect.top >= 0 && rect.top <= windowHeight * 0.5;
      
      if (isActive && !hasAnimated) {
        setHasAnimated(true);
        if (animationCallback) {
          // Delay sedikit untuk memastikan snap selesai
          setTimeout(() => {
            animationCallback(sectionRef.current);
          }, 150);
        }
      }
    };
    
    // Check saat scroll
    window.addEventListener('scroll', checkAndAnimate);
    // Check awal
    setTimeout(checkAndAnimate, 200);
    
    return () => {
      window.removeEventListener('scroll', checkAndAnimate);
    };
  }, [hasAnimated, animationCallback]);
  
  return sectionRef;
};

export default useSectionAnimation;