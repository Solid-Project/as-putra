import { useState, useEffect } from "react";

/**
 * Hook untuk mendeteksi apakah device saat ini adalah mobile.
 * @param {number} breakpoint - Lebar layar (px) batas bawah desktop. Default: 768px (breakpoint 'md' Tailwind).
 * @returns {boolean} true jika lebar layar < breakpoint (mobile), false jika desktop.
 */
const useMobileDetect = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < breakpoint);

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [breakpoint]);

  return isMobile;
};

export default useMobileDetect;
