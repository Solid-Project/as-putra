import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ganti ini dengan path gambar kantor/command center AS Putra
import bgOffice from "@/assets/img/property.jpg"; 

gsap.registerPlugin(ScrollTrigger);

const ThirdLayout = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const contentRef = useRef(null);
  const [activeDot, setActiveDot] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animasi Card Putih Masuk dari Kiri
      gsap.fromTo(
        cardRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animasi Text Stagger
      gsap.fromTo(
        contentRef.current.children,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          delay: 0.5,
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
      data-theme="dark" // Karena background gambar kantor biasanya kompleks, navbar putih lebih aman
    >
      {/* 1. BACKGROUND IMAGE (FULL SCREEN) */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgOffice}
          alt="AS Putra Office"
          className="w-full h-full object-cover opacity-80" // Sedikit gelap agar card putih kontras
        />
        {/* Overlay halus agar gambar lebih menyatu */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* 2. FLOATING WHITE CARD (SISI KIRI) */}
      <div className="container mx-auto px-[5%] z-10">
        <div
          ref={cardRef}
          className="bg-white w-full max-w-[550px] p-10 md:p-16 shadow-2xl relative"
        >
          <div ref={contentRef} className="flex flex-col gap-6">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight font-['Playfair_Display']">
              AS Putra Group
            </h2>

            <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
              <p>
                <span className="font-bold block text-gray-900 mb-1">
                  1. PENGEMBANGAN BISNIS BERKELANJUTAN
                </span>
                Fokus pada model bisnis yang adaptif dan bernilai jangka panjang
                untuk masa depan Indonesia.
              </p>

              <p>
                <span className="font-bold block text-gray-900 mb-1">
                  2. INVESTASI SEKTOR STRATEGIS
                </span>
                Menjalin kemitraan yang kuat untuk mendukung pertumbuhan
                industri dan ekonomi nasional.
              </p>

              <p>
                <span className="font-bold block text-gray-900 mb-1">
                  3. INOVASI DAN INTEGRITAS
                </span>
                Menggabungkan keandalan korporat tradisional dengan solusi
                teknologi modern yang transparan.
              </p>
            </div>

            {/* CTA & PAGINATION (Gaya Referensi) */}
            <div className="mt-8 flex flex-col gap-8">
              <Link
                to="/about"
                className="group flex items-center gap-3 text-gray-400 hover:text-gray-900 transition-colors duration-300 uppercase tracking-[0.2em] text-sm font-bold"
              >
                <span className="w-10 h-[1px] bg-gray-300 group-hover:w-16 group-hover:bg-gray-900 transition-all duration-500"></span>
                Go to Website
              </Link>

              {/* Dots Pagination */}
              <div className="flex gap-3">
                {[0, 1].map((dot) => (
                  <button
                    key={dot}
                    onClick={() => setActiveDot(dot)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      activeDot === dot ? "bg-gray-900 scale-125" : "bg-gray-300"
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