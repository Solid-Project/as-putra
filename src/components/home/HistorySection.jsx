import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import sejarahImg from "@/assets/img/sejarah.png";

gsap.registerPlugin(ScrollTrigger);

const HistorySection = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const buttonRef = useRef(null);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const fullText = "Our History";

  // Efek mengetik berulang (infinite)
  useEffect(() => {
    let currentIndex = 0;
    let timeoutId;

    const startTyping = () => {
      currentIndex = 0;
      setDisplayText("");
      setIsTyping(true);

      const typingInterval = setInterval(() => {
        if (currentIndex < fullText.length) {
          setDisplayText(fullText.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          // Selesai mengetik, tunggu sebentar lalu hapus dan ulang
          clearInterval(typingInterval);
          setIsTyping(false);

          // Tunggu 1.5 detik sebelum menghapus teks dan mulai lagi
          timeoutId = setTimeout(() => {
            startTyping(); // Mulai lagi dari awal
          }, 1500);
        }
      }, 120);
    };

    startTyping();

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;

    const textAnim = gsap.fromTo(
      contentRef.current,
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 2.0, // ⬅️ lebih lama
        ease: "power3.out", // ⬅️ lebih smooth
        paused: true,
      },
    );

    const imageAnim = gsap.fromTo(
      imageRef.current,
      { x: 100, opacity: 0, scale: 0.95 },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 2.0,
        delay: 0.2, // ⬅️ jeda biar berurutan
        ease: "power3.out",
        paused: true,
      },
    );

    const buttonAnim = gsap.fromTo(
      buttonRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 2.0,
        delay: 0.4, // ⬅️ terakhir muncul
        ease: "power3.out",
        paused: true,
      },
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
  gsap.delayedCall(0.1, () => {
    textAnim.restart();
    imageAnim.restart();
    buttonAnim.restart();
  });
}
        });
        
      },
      {
        threshold: 0.5, // penting (50% masuk viewport)
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);
  return (
    <section
      ref={sectionRef}
      className="section min-h-screen relative bg-gradient-to-b from-white to-gray-50 py-24 px-5 z-20 overflow-hidden"
      id="history-section" data-theme="light" data-title="Sejarah Kami"
    >
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-utama)]/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--color-utama)]/5 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* 🔥 TEXT */}
        <div ref={contentRef}>
          {/* EFEK MENGETIK BERULANG (INFINITE) */}
          <div className="mb-4">
            <div className="inline-flex items-center">
              <span
                className={`text-[var(--color-utama)] font-semibold tracking-wider uppercase text-base ${
                  !isTyping
                    ? "border-r-3 border-[var(--color-utama)] animate-[blink-caret_0.75s_step-end_infinite]"
                    : ""
                }`}
                style={{
                  paddingRight: !isTyping ? "8px" : "0",
                  borderRightWidth: !isTyping ? "3px" : "0",
                }}
              >
                {displayText}
              </span>
              {isTyping && (
                <span className="w-0.5 h-5 bg-[var(--color-utama)] ml-1 animate-blink"></span>
              )}
            </div>
          </div>

          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl lg:text-5xl text-[var(--color-teks)] mb-6 leading-tight">
            Sejarah{" "}
            <span className="text-[var(--color-utama)] relative inline-block">
              AS PUTRA
              <svg
                className="absolute -bottom-2 left-0 w-full h-2"
                viewBox="0 0 200 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,5 Q50,0 100,5 T200,5"
                  stroke="var(--color-utama)"
                  fill="none"
                  strokeWidth="2"
                  strokeDasharray="5 5"
                />
              </svg>
            </span>
          </h2>

          <div className="space-y-4 text-[var(--color-teks-muted)] leading-relaxed">
            <p className="text-base">
              Didirikan oleh{" "}
              <strong className="text-[var(--color-teks)]">
                H. Dudung Dulajid
              </strong>
              , AS PUTRA Group memulai perjalanannya di Kuningan dengan visi
              untuk memberdayakan ekonomi lokal melalui peternakan unggas.
              Dimulai dari langkah sederhana, ketangguhan dan ketajaman bisnis
              H. Dudung meletakkan dasar yang kuat bagi apa yang kemudian
              menjadi konglomerasi yang beragam.
            </p>

            <p className="text-base">
              Hari ini, perjuangan tersebut berlanjut di bawah kepemimpinan
              putranya,{" "}
              <strong className="text-[var(--color-teks)]">
                H. Aif Arifin Sidhik
              </strong>
              . Sebagai CEO, Aif telah memperluas cakrawala grup ke bidang
              perhotelan, konstruksi, dan lainnya, sambil tetap mempertahankan
              nilai-nilai inti yang ditanamkan oleh ayahnya. Bersama-sama,
              mereka mewakili masa lalu, masa kini, dan masa depan AS PUTRA.
            </p>
          </div>

          {/* BUTTON MODERN */}
          <div ref={buttonRef} className="mt-10">
            <Link
              to="/about"
              className="group relative inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-utama)] text-white font-medium tracking-wide rounded-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[var(--color-utama)]/30 hover:-translate-y-1"
            >
              <span className="relative z-10 flex items-center gap-2">
                Baca Selengkapnya
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
          </div>
        </div>

        {/* 🔥 IMAGE */}
        <div ref={imageRef} className="relative group">
          <div className="absolute -top-6 -right-6 w-32 h-32 border-2 border-[var(--color-utama)]/20 rounded-full z-0"></div>
          <div className="absolute -bottom-6 -left-6 w-40 h-40 border-2 border-[var(--color-utama)]/20 rounded-full z-0"></div>

          <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 group-hover:shadow-3xl group-hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <img
              src={sejarahImg}
              alt="H. Dudung Dulajid & Aif Arifin Sidhik"
              className="w-full rounded-2xl relative z-0 transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          <div className="relative z-10 mt-6 text-center">
            <div className="inline-block px-6 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md">
              <p className="text-[var(--color-utama)] text-sm font-medium">
                H. Dudung Dulajid & H. Aif Arifin Sidhik
              </p>
            </div>
          </div>

          <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-[var(--color-utama)]/30 z-20 hidden md:block"></div>
          <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-[var(--color-utama)]/30 z-20 hidden md:block"></div>
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes blink-caret {
          from, to { border-color: transparent; }
          50% { border-color: var(--color-utama); }
        }
        .animate-blink {
          animation: blink 0.8s step-end infinite;
        }
        .border-r-3 {
          border-right-width: 3px;
        }
      `}</style>
    </section>
  );
};

export default HistorySection;
