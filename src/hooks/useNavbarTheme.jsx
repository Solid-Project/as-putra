import { useState, useEffect, useCallback } from "react";

const useNavbarTheme = () => {
  const [textTheme, setTextTheme] = useState('dark');

  const getLuminance = (r, g, b) => (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  const analyzeSection = useCallback((section) => {
    const bgFlag = section.dataset.bg;
    if (bgFlag === 'dark') return 'light';
    if (bgFlag === 'light') return 'dark';

    const style = window.getComputedStyle(section);
    
    if (style.backgroundImage !== 'none') return 'light';

    if (style.background.includes('linear-gradient')) return 'light';

    const bgColor = style.backgroundColor;
    const rgbMatch = bgColor.match(/\d+/g);
    if (rgbMatch && rgbMatch.length >= 3) {
      const luminance = getLuminance(parseInt(rgbMatch[0]), parseInt(rgbMatch[1]), parseInt(rgbMatch[2]));
      return luminance < 0.5 ? 'light' : 'dark';
    }

    return 'dark';
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('.section');
    if (sections.length === 0) return;

    let rafId = null;

    const updateTheme = () => {
      const scrollY = window.scrollY;
      let currentSectionIndex = 0;

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const nextSection = sections[i + 1];
        const sectionEnd = nextSection ? nextSection.offsetTop : Infinity;
        if (scrollY >= section.offsetTop - 100 && scrollY < sectionEnd) {
          currentSectionIndex = i;
          break;
        }
      }

      const currentSection = sections[currentSectionIndex];
      const newTheme = analyzeSection(currentSection);
      setTextTheme(newTheme);

      rafId = requestAnimationFrame(updateTheme);
    };

    requestAnimationFrame(updateTheme);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [analyzeSection]);

  return textTheme;
};

export default useNavbarTheme;

