import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bgOffice from "@/assets/img/property.webp"; 

gsap.registerPlugin(ScrollTrigger);

const ThirdLayout = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const contentRef = useRef(null);
  const bgRef = useRef(null); // Ref baru untuk background
  const [activeDot, setActiveDot] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // --- 1. LIVE PARALLAX: BACKGROUND IMAGE (ZOOM & MOVE) ---
      // Gambar akan bergerak perlahan ke bawah & membesar (Zoom) saat scroll
      gsap.fromTo(bgRef.current, 
        { scale: 1.2, y: "-10%" }, 
        {
          scale: 1,
          y: "10%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );

      // --- 2. LIVE PARALLAX: FLOATING CARD (BERGERAK BERLAWANAN) ---
      // Kartu akan bergerak naik lebih cepat (Float effect)
      gsap.fromTo(cardRef.current, 
        { y: 100 }, 
        {
          y: -100,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5, // Lebih tinggi angkanya, lebih terasa "ringan" melayangnya
          }
        }
      );

      // --- 3. ANIMASI MASUK AWAL (ONCE) ---
      // Tetap menjaga animasi masuk agar saat section pertama kali terlihat, ada transisi smooth
      gsap.fromTo(contentRef.current.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section relative min-h-screen w-full overflow-hidden flex items-center bg-gray-900"
      id="three-layout"
      data-theme="dark"
    >
      {/* 1. BACKGROUND IMAGE (LIVE PARALLAX) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          ref={bgRef}
          src={bgOffice}
          alt="AS Putra Office"
          className="w-full h-[120%] object-cover opacity-60" // Tinggi dibuat 120% agar ada ruang gerak parallax
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
      </div>

      {/* 2. FLOATING WHITE CARD (LIVE PARALLAX) */}
      <div className="container mx-auto px-[6%] z-10">
        <div
          ref={cardRef}
          className="bg-white w-full max-w-[550px] p-12 md:p-20 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] relative rounded-sm"
        >
          <div ref={contentRef} className="flex flex-col gap-8">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 tracking-tighter font-['Playfair_Display'] leading-tight">
              AS Putra Group
            </h2>

            <div className="w-16 h-1 bg-[var(--color-utama)] mb-2"></div>

            <div className="space-y-8 text-gray-600 leading-relaxed text-lg">
              <div className="group transition-all duration-300">
                <span className="font-black block text-gray-900 mb-2 tracking-widest text-xs uppercase">
                  01. Pengembangan Berkelanjutan
                </span>
                <p className="font-light border-l-2 border-gray-100 pl-6 group-hover:border-[var(--color-utama)] transition-colors">
                  Fokus pada model bisnis yang adaptif dan bernilai jangka panjang untuk masa depan Indonesia.
                </p>
              </div>

              <div className="group transition-all duration-300">
                <span className="font-black block text-gray-900 mb-2 tracking-widest text-xs uppercase">
                  02. Investasi Strategis
                </span>
                <p className="font-light border-l-2 border-gray-100 pl-6 group-hover:border-[var(--color-utama)] transition-colors">
                  Menjalin kemitraan kuat untuk mendukung pertumbuhan industri dan ekonomi nasional.
                </p>
              </div>

              <div className="group transition-all duration-300">
                <span className="font-black block text-gray-900 mb-2 tracking-widest text-xs uppercase">
                  03. Inovasi & Integritas
                </span>
                <p className="font-light border-l-2 border-gray-100 pl-6 group-hover:border-[var(--color-utama)] transition-colors">
                  Menggabungkan keandalan tradisional dengan solusi teknologi modern yang transparan.
                </p>
              </div>
            </div>

            {/* CTA & PAGINATION */}
            <div className="mt-10 flex flex-col gap-10">
              <Link
                to="/about"
                className="group flex items-center gap-4 text-gray-400 hover:text-gray-900 transition-colors duration-300 uppercase tracking-[0.3em] text-[10px] font-black"
              >
                <span className="w-8 h-[1px] bg-gray-300 group-hover:w-12 group-hover:bg-[var(--color-utama)] transition-all duration-500"></span>
                Explore Corporate
              </Link>

              <div className="flex gap-4">
                {[0, 1].map((dot) => (
                  <button
                    key={dot}
                    onClick={() => setActiveDot(dot)}
                    className={`w-2 h-2 rounded-full transition-all duration-500 ${
                      activeDot === dot ? "bg-[var(--color-utama)] w-8" : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThirdLayout;