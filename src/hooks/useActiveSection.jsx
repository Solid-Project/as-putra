// hooks/useActiveSection.js
import { useEffect } from "react";

const useActiveSection = () => {
  useEffect(() => {
    const sections = document.querySelectorAll(".section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active-section");
          } else {
            entry.target.classList.remove("active-section");
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((sec) => observer.observe(sec));

    return () => observer.disconnect();
  }, []);
};

export default useActiveSection;