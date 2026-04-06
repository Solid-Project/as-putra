import { useState, useEffect } from "react";

const useNavbarTheme = () => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".section");
      const scrollPosition = window.scrollY + 70; // 70px adalah offset (kira-kira tinggi navbar)

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        // Jika posisi scroll kita berada di dalam rentang section ini
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          const sectionTheme = section.getAttribute("data-theme");
          if (sectionTheme) {
            setTheme(sectionTheme);
          }
        }
      });
    };

    // Jalankan saat scroll & resize
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    
    // Jalankan sekali saat load untuk deteksi posisi awal
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return theme;
};

export default useNavbarTheme;