import { useState, useEffect } from "react";
// Import semua variasi logo di sini
import logoLight from "@/assets/logo-teks-putih.png"; 
import logoDark from "@/assets/logo-teks-asli.png";

const useNavbarTheme = () => {
  const [theme, setTheme] = useState("dark");
  const [logo, setLogo] = useState(logoLight); // Default logo

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".section");
      const scrollPosition = window.scrollY + 80; // Offset sedikit lebih besar dari tinggi navbar

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          const sectionTheme = section.getAttribute("data-theme"); // Pastikan section punya data-theme="light" atau "dark"
          
          if (sectionTheme) {
            setTheme(sectionTheme);
            // Logika ganti logo berdasarkan theme section
            if (sectionTheme === "light") {
              setLogo(logoDark); // Jika bg section terang, pakai logo gelap
            } else {
              setLogo(logoLight); // Jika bg section gelap, pakai logo terang
            }
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Sekarang hook mengembalikan theme dan logo
  return { theme, logo };
};

export default useNavbarTheme;