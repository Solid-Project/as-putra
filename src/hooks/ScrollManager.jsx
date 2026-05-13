// src/components/ScrollManager.jsx
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollManager() {
  useEffect(() => {
    // 🔥 bersihin semua trigger lama (penting saat pindah halaman)
    ScrollTrigger.getAll().forEach(t => t.kill());

    const sections = gsap.utils.toArray(".section");

    if (sections.length <= 1) return;

    const ctx = gsap.context(() => {
      gsap.to(sections, {
        yPercent: -100 * (sections.length - 1),
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".wrapper",
          start: "top top",
          end: () => "+=" + window.innerHeight * sections.length,
          
          pin: true,
          pinSpacing: false,        // 🔥 fix error insertBefore
          anticipatePin: 1,         // 🔥 fix jitter
          
          scrub: 1.5,
          
          snap: {
            snapTo: 1 / (sections.length - 1),
            duration: 0.8,
            ease: "power2.inOut"
          }
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}