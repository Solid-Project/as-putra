// src/components/about/HistoryTimeline.jsx
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const timelineData = [
  {
    year: "1984",
    title: "Awal Mula",
    desc: "Dimulainya proyek perintis oleh H. Dudung Dulajid. Dengan visi yang kuat, fondasi bisnis mulai diletakkan di Kuningan, berfokus pada pengembangan ekonomi pedesaan.",
    position: "left",
  },
  {
    year: "1990",
    title: "Fokus Peternakan",
    desc: "Mulai merambah ke penyebaran dan memperluas sektor ayam ras petelur dan pedaging. Periode ini menandai pertumbuhan signifikan dalam kapasitas produksi dan kemitraan dengan peternak lokal.",
    position: "right",
  },
  {
    year: "2000",
    title: "Diversifikasi Bisnis",
    desc: "Memasuki milenium baru, AS PUTRA mulai berekspansi ke sektor lain di luar agribisnis. Konstruksi dan infrastruktur mulai menjadi pilar baru pertumbuhan perusahaan.",
    position: "left",
  },
  {
    year: "2010",
    title: "Inovasi & Pelayanan",
    desc: "Memperkuat divisi logistik dan transportasi (PT Andeff) serta mulai memasuki industri perhotelan untuk mendukung pariwisata daerah. Teknologi mulai diintegrasikan ke dalam operasional.",
    position: "right",
  },
  {
    year: "2020",
    title: "Visi Global & Berkelanjutan",
    desc: "Di bawah kepemimpinan Aif Arifin Sidhik, grup bertransformasi menjadi konglomerasi modern. Fokus pada keberlanjutan, energi terbarukan, dan ekspansi pasar yang lebih luas.",
    position: "left",
  },
];

const HistoryTimeline = () => {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const floatRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animasi floating shapes
      const shapes = floatRef.current?.children;
      if (shapes) {
        if (shapes[0]) {
          gsap.to(shapes[0], {
            y: 30,
            x: 20,
            rotate: 10,
            duration: 8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }
        if (shapes[1]) {
          gsap.to(shapes[1], {
            y: -40,
            x: -15,
            rotate: -15,
            duration: 10,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }
        if (shapes[2]) {
          gsap.to(shapes[2], {
            y: 25,
            x: -10,
            rotate: 8,
            duration: 7,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }
        if (shapes[3]) {
          gsap.to(shapes[3], {
            y: -20,
            x: 25,
            rotate: -5,
            duration: 9,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }
      }

      // Animasi garis timeline
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0, transformOrigin: "top center" },
          {
            scaleY: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      // Animasi untuk setiap card
      const cards = document.querySelectorAll(".timeline-card");

      cards.forEach((card) => {
        const circle = card.querySelector(".timeline-circle");
        const content = card.querySelector(".timeline-content");
        const position = card.getAttribute("data-position");

        if (!circle || !content) return;

        // Set initial state
        gsap.set(circle, { scale: 0, opacity: 0 });
        gsap.set(content, { opacity: 0, x: position === "left" ? -40 : 40 });

        // Buat timeline animasi
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        tl.to(circle, {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.5)",
        }).to(
          content,
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.3",
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section relative overflow-hidden bg-white"
      id="history-timeline"
      data-title="Sejarah Perusahaan"
      data-bg="light"
      style={{
        paddingTop: "clamp(3rem, 8vh, 5rem)",
        paddingBottom: "clamp(3rem, 8vh, 5rem)",
        paddingLeft: "clamp(1rem, 5vw, 2rem)",
        paddingRight: "clamp(1rem, 5vw, 2rem)",
      }}
    >
      {/* BACKGROUND SHAPES - Floating decorative shapes */}
      <div ref={floatRef} className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Shape 1 - Circle besar blur */}
        <div
          className="absolute rounded-full blur-3xl"
          style={{
            backgroundColor: "var(--color-utama)",
            opacity: 0.05,
            width: "min(60vw, 500px)",
            height: "min(60vw, 500px)",
            top: "-10%",
            right: "-5%",
          }}
        />

        {/* Shape 2 - Circle aksen */}
        <div
          className="absolute rounded-full blur-2xl"
          style={{
            backgroundColor: "var(--color-aksen)",
            opacity: 0.06,
            width: "min(40vw, 350px)",
            height: "min(40vw, 350px)",
            bottom: "-5%",
            left: "-10%",
          }}
        />

        {/* Shape 3 - Square rotated */}
        <div
          className="absolute rotate-12 rounded-2xl opacity-40 hidden lg:block"
          style={{
            border: "2px solid var(--color-utama)",
            width: "min(12vw, 100px)",
            height: "min(12vw, 100px)",
            top: "15%",
            left: "5%",
          }}
        />

        {/* Shape 4 - Diamond */}
        <div
          className="absolute rotate-45 opacity-30 hidden md:block"
          style={{
            backgroundColor: "var(--color-aksen)",
            width: "min(8vw, 60px)",
            height: "min(8vw, 60px)",
            bottom: "20%",
            right: "8%",
          }}
        />

        {/* Shape 5 - Dot pattern */}
        <div
          className="absolute opacity-20 hidden md:block"
          style={{
            backgroundImage: "radial-gradient(var(--color-utama) 2px, transparent 2px)",
            backgroundSize: "20px 20px",
            width: "min(30vw, 200px)",
            height: "min(30vw, 200px)",
            top: "30%",
            right: "15%",
          }}
        />

        {/* Pattern grid - subtle */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(to right, var(--color-utama) 1px, transparent 1px),
                linear-gradient(to bottom, var(--color-utama) 1px, transparent 1px)
              `,
              backgroundSize: "clamp(20px, 5vw, 40px) clamp(20px, 5vw, 40px)",
            }}
          />
        </div>
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto">
        {/* HEADER */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div
              className="h-0.5 rounded-full"
              style={{
                backgroundColor: "var(--color-utama)",
                width: "clamp(30px, 5vw, 48px)",
              }}
            />
            <span
              className="font-semibold tracking-[0.2em] uppercase text-xs md:text-sm"
              style={{ color: "var(--color-utama)" }}
            >
              Our Journey
            </span>
            <div
              className="h-0.5 rounded-full"
              style={{
                backgroundColor: "var(--color-utama)",
                width: "clamp(30px, 5vw, 48px)",
              }}
            />
          </div>

          <h2
            className="font-['Playfair_Display'] font-bold"
            style={{
              color: "var(--color-teks)",
              fontSize: "clamp(1.75rem, 6vw, 2.5rem)",
              marginBottom: "clamp(0.75rem, 2vh, 1rem)",
            }}
          >
            Perjalanan Kami
          </h2>

          <div
            className="rounded-full mx-auto"
            style={{
              backgroundColor: "var(--color-utama)",
              width: "clamp(40px, 8vw, 64px)",
              height: "clamp(2px, 0.5vh, 3px)",
              marginBottom: "clamp(1rem, 3vh, 1.5rem)",
            }}
          />

          <p
            className="max-w-[600px] mx-auto"
            style={{
              color: "var(--color-teks-muted)",
              fontSize: "clamp(0.875rem, 2.5vw, 1rem)",
              paddingLeft: "clamp(1rem, 5vw, 2rem)",
              paddingRight: "clamp(1rem, 5vw, 2rem)",
            }}
          >
            Jejak langkah AS PUTRA dari masa ke masa.
          </p>
        </div>

        {/* TIMELINE */}
        <div className="relative max-w-[1000px] mx-auto">
          {/* Garis tengah - hidden di mobile */}
          <div
            ref={lineRef}
            className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-[var(--color-utama)] top-0 bottom-0 hidden md:block"
            style={{ transformOrigin: "top center" }}
          />

          {timelineData.map((item, idx) => (
            <div
              key={idx}
              data-position={item.position}
              className={`timeline-card relative md:w-1/2 px-4 sm:px-6 md:px-8 mb-8 md:mb-12 ${
                item.position === "left" 
                  ? "md:left-0 md:text-right md:pr-12" 
                  : "md:left-1/2 md:text-left md:pl-12"
              }`}
            >
              {/* Bulatan - hanya di desktop */}
              <div
                className={`timeline-circle hidden md:block absolute top-5 w-4 h-4 md:w-5 md:h-5 bg-white border-[3px] md:border-4 border-[var(--color-utama)] rounded-full z-10 shadow-md ${
                  item.position === "left" ? "right-[-9px]" : "left-[-9px]"
                }`}
              />

              {/* Konten Card */}
              <div
                className="timeline-content bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 relative overflow-hidden opacity-0"
                style={{
                  padding: "clamp(1rem, 4vw, 1.5rem)",
                }}
              >
                {/* Header dengan tahun dan shape */}
                <div
                  className={`flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 ${
                    item.position === "left" ? "md:flex-row-reverse" : "md:flex-row"
                  }`}
                >
                  {/* Tahun */}
                  <span
                    className="text-[var(--color-utama)] font-bold leading-none"
                    style={{
                      fontSize: "clamp(2rem, 8vw, 3rem)",
                    }}
                  >
                    {item.year}
                  </span>

                  {/* Shape container - responsive */}
                  <div className="flex-1 w-full sm:w-auto flex items-center gap-2">
                    <div className="flex-1 h-0.5 bg-gradient-to-r from-[var(--color-aksen)] to-transparent" />
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <div
                        className="rounded-full bg-[var(--color-aksen)]"
                        style={{ width: "clamp(6px, 2vw, 8px)", height: "clamp(6px, 2vw, 8px)" }}
                      />
                      <div
                        className="rounded-full border-2 border-[var(--color-aksen)]"
                        style={{ width: "clamp(10px, 3vw, 12px)", height: "clamp(10px, 3vw, 12px)" }}
                      />
                      <div
                        className="rounded-full bg-[var(--color-utama)]"
                        style={{ width: "clamp(5px, 1.5vw, 6px)", height: "clamp(5px, 1.5vw, 6px)" }}
                      />
                    </div>
                  </div>
                </div>

                {/* Judul */}
                <h3
                  className="font-bold text-[var(--color-teks)] mt-4 mb-2"
                  style={{
                    fontSize: "clamp(1.125rem, 4vw, 1.25rem)",
                  }}
                >
                  {item.title}
                </h3>

                {/* Deskripsi */}
                <p
                  className="text-[var(--color-teks-muted)] leading-relaxed"
                  style={{
                    fontSize: "clamp(0.75rem, 2.5vw, 0.875rem)",
                  }}
                >
                  {item.desc}
                </p>

                {/* Shape background subtle - responsive */}
                <div
                  className={`absolute ${
                    item.position === "left" ? "-right-6 -bottom-6" : "-left-6 -bottom-6"
                  } opacity-[0.04]`}
                  style={{
                    width: "clamp(60px, 15vw, 96px)",
                    height: "clamp(60px, 15vw, 96px)",
                  }}
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="50" cy="50" r="50" fill="var(--color-aksen)" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HistoryTimeline;