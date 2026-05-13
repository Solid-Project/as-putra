import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useScrollSnap = (containerSelector = ".snap-container") => {
  useEffect(() => {
    const sections = gsap.utils.toArray(`${containerSelector} .section`);

    if (!sections.length) return;

    const snapInstance = ScrollTrigger.create({
      trigger: containerSelector,
      start: "top top",
      end: "bottom bottom",
      snap: {
        snapTo: 1 / (sections.length - 1),
        duration: { min: 0.8, max: 1.4 },
        ease: "expo.inOut",
        delay: 0.1,
      }
    });

    return () => {
      snapInstance.kill(); // 🔥 biar gak numpuk saat pindah page
    };
  }, [containerSelector]);
};

export default useScrollSnap;