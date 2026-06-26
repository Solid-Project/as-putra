import { useState, useEffect } from "react";
// Import logo assets
import logoLight from "@/assets/logo-teks-putih.png"; 
import logoDark from "@/assets/logo-teks-asli.png";

const useNavbarTheme = () => {
  const [theme, setTheme] = useState("dark");
  const [logo, setLogo] = useState(logoLight);
  const [needsBlur, setNeedsBlur] = useState(false);

  useEffect(() => {
    const handleThemeChange = () => {
      const sections = document.querySelectorAll(".section");
      
      // Kita cek section yang berada di area atas layar (posisi navbar)
      const navbarHeight = 80; 
      let foundBlur = false;
      
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        
        /**
         * Logika: Jika bagian atas section sudah melewati batas navbar 
         * DAN bagian bawah section masih di bawah batas navbar, 
         * berarti section inilah yang sedang bersentuhan dengan navbar.
         */
        if (rect.top <= navbarHeight && rect.bottom >= navbarHeight) {
          const sectionTheme = section.getAttribute("data-theme");
          const sectionBlur = section.getAttribute("data-blur");
          
          if (sectionBlur === "true") foundBlur = true;
          
          if (sectionTheme && sectionTheme !== theme) {
            setTheme(sectionTheme);
            
            if (sectionTheme === "light") {
              setLogo(logoDark); // Section terang -> Logo gelap
            } else {
              setLogo(logoLight); // Section gelap -> Logo terang
            }
          }
        }
      });

      setNeedsBlur(foundBlur);
    };

    // Jalankan saat scroll dan resize
    window.addEventListener("scroll", handleThemeChange, { passive: true });
    window.addEventListener("resize", handleThemeChange);
    
    // Inisialisasi pertama kali
    handleThemeChange();

    return () => {
      window.removeEventListener("scroll", handleThemeChange);
      window.removeEventListener("resize", handleThemeChange);
    };
  }, [theme]); // Dependency theme agar pengecekan lebih akurat

  return { theme, logo, needsBlur };
};

export default useNavbarTheme;