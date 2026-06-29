import { useEffect } from "react";
import gsap from "gsap";

/**
 * Custom hook untuk mengelola animasi GSAP di section
 * @param {Object} ref - React ref ke elemen section
 * @param {Function} setup - Fungsi callback untuk mendefinisikan animasi unik
 * @param {Array} dependencies - Dependencies agar animasi reset jika data berubah
 */
export const useSectionAnimation = (ref, setup, dependencies = []) => {
  useEffect(() => {
    if (!ref.current) return;

    // Menggunakan context agar mudah di-revert
    const ctx = gsap.context(() => {
      setup();
    }, ref);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, ...dependencies]);
};
