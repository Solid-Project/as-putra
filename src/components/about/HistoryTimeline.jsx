// src/components/about/HistoryTimeline.jsx
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const timelineData = [
  {
    year: "1985",
    title: "Awal Mula: Fondasi Usaha",
    desc: "Bermula dari usaha peternakan ayam petelur skala kecil dengan 1.000 ekor di Kuningan. H. Dudung Dulajid mulai membangun kemandirian ekonomi dari pemanfaatan limbah penggilingan padi.",
    position: "left",
  },
  {
    year: "1985",
    title: "Lahirnya Nama AS Putra",
    desc: "Dedak hasil penggilingan diolah menjadi komoditas bernilai tinggi. Dari sini nama AS Putra (Arifin Sidik Putra) lahir sebagai simbol dedikasi untuk keluarga dan masa depan usaha.",
    position: "right",
  },
  {
    year: "1997",
    title: "Tahan Uji di Masa Krisis",
    desc: "Krisis moneter menjadi ujian besar. AS Putra tetap bertahan berkat prinsip tanpa hutang, disiplin keuangan, dan kepercayaan kuat dari para mitra bisnis.",
    position: "left",
  },
  {
    year: "2000",
    title: "Awal Ekspansi Usaha",
    desc: "Mulai memasuki sektor baru di luar peternakan, termasuk dealer motor sebagai langkah awal diversifikasi bisnis.",
    position: "right",
  },
  {
    year: "2006",
    title: "Ekspansi SPBU & Perhotelan",
    desc: "Perusahaan mulai masuk sektor energi melalui SPBU serta mengembangkan bisnis perhotelan dan hospitality di beberapa daerah strategis.",
    position: "left",
  },
  {
    year: "2010",
    title: "Transformasi Sistem Peternakan",
    desc: "Modernisasi sistem peternakan menuju Closed House berbasis teknologi untuk meningkatkan efisiensi dan produktivitas.",
    position: "right",
  },
  {
    year: "2016",
    title: "Penguatan Properti & Infrastruktur",
    desc: "Melalui ASP Land, AS Putra mulai mengembangkan sektor properti dan infrastruktur sebagai bagian dari ekosistem bisnis yang lebih luas.",
    position: "left",
  },
  {
    year: "2020",
    title: "Ekspansi Ritel & Lifestyle",
    desc: "Masuk ke sektor retail, kuliner, dan gaya hidup melalui berbagai brand seperti AS Putra Mart, Ayamku, dan klinik estetika.",
    position: "right",
  },
  {
    year: "2023",
    title: "Penguatan Logistik & Distribusi",
    desc: "Pengembangan jaringan distribusi nasional melalui PT Andeff dan Windu Transport untuk memperkuat rantai pasok.",
    position: "left",
  },
  {
    year: "Sekarang",
    title: "Holding Modern & Generasi Penerus",
    desc: "AS Putra berkembang menjadi holding terintegrasi. Estafet kepemimpinan mulai diberikan kepada generasi penerus untuk mengelola berbagai sektor bisnis.",
    position: "right",
  },
];

const HistoryTimeline = ({ activeIndex }) => {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const floatRef = useRef(null);
  const headerRef = useRef(null);
  const headerSubRef = useRef(null);
  const headerTitleRef = useRef(null);
  const cardsRef = useRef([]);

  const SECTION_INDEX = 3; // sesuaikan urutan kamu
  const isActive = activeIndex === SECTION_INDEX;

  useEffect(() => {
    if (!isActive) return;

    const cards = cardsRef.current;

    if (!cards || cards.length === 0) return;

    const ctx = gsap.context(() => {
      // INITIAL STATE
      gsap.set(cards, {
        opacity: 0,
        x: (i) => (i % 2 === 0 ? -30 : 30),
      });

      gsap.set(lineRef.current, {
        scaleY: 0,
        transformOrigin: "top center",
      });

      gsap.set(
        [headerRef.current, headerSubRef.current, headerTitleRef.current],
        { opacity: 0, y: 30 },
      );

      // ANIMATION
      const tl = gsap.timeline();

      tl.to([headerRef.current, headerSubRef.current, headerTitleRef.current], {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out",
      })
        .to(
          lineRef.current,
          {
            scaleY: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.3",
        )
        .to(
          cards,
          {
            opacity: 1,
            x: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [isActive]);

  return (
    <section
      ref={sectionRef}
      className="section no-snap relative overflow-visible"
      id="history-timeline"
      data-title="Sejarah Perusahaan"
      data-bg="light"
      style={{
        backgroundColor: "var(--color-bg-light)",
        minHeight: "100vh",
        height: "auto",
        paddingTop: "clamp(3rem, 8vh, 5rem)",
        paddingBottom: "clamp(3rem, 8vh, 5rem)",
        paddingLeft: "clamp(1rem, 5vw, 2rem)",
        paddingRight: "clamp(1rem, 5vw, 2rem)",
      }}
    >
      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/react/img/mission.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.06,
          zIndex: 0,
        }}
      />

      {/* OVERLAY GRADIENT */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              to bottom,
              var(--color-bg-light) 0%,
              rgba(255,255,255,0.9) 15%,
              rgba(255,255,255,0.75) 50%,
              rgba(255,255,255,0.9) 85%,
              var(--color-bg-light) 100%
            )
          `,
          zIndex: 1,
        }}
      />

      {/* SHAPES */}
      <div
        ref={floatRef}
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      >
        <div
          className="absolute rounded-full blur-3xl"
          style={{
            backgroundColor: "var(--color-utama)",
            opacity: 0.05,
            width: "min(40vw, 350px)",
            height: "min(40vw, 350px)",
            top: "-10%",
            right: "-5%",
          }}
        />

        <div
          className="absolute rounded-full blur-2xl"
          style={{
            backgroundColor: "var(--color-aksen)",
            opacity: 0.04,
            width: "min(35vw, 300px)",
            height: "min(35vw, 300px)",
            bottom: "-5%",
            left: "-10%",
          }}
        />

        <div
          className="absolute rotate-12 rounded-2xl hidden lg:block"
          style={{
            border: "1px solid var(--color-utama)",
            opacity: 0.15,
            width: "min(10vw, 80px)",
            height: "min(10vw, 80px)",
            top: "15%",
            left: "3%",
          }}
        />

        <div
          className="absolute rotate-45 opacity-15 hidden md:block"
          style={{
            backgroundColor: "var(--color-aksen)",
            width: "min(6vw, 50px)",
            height: "min(6vw, 50px)",
            bottom: "20%",
            right: "5%",
          }}
        />

        <div
          className="absolute opacity-10 hidden md:block"
          style={{
            backgroundImage:
              "radial-gradient(var(--color-utama) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            width: "min(20vw, 150px)",
            height: "min(20vw, 150px)",
            top: "30%",
            right: "10%",
          }}
        />

        <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(to right, var(--color-utama) 1px, transparent 1px),
                linear-gradient(to bottom, var(--color-utama) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
            }}
          />
        </div>
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto">
        {/* HEADER */}
        <div ref={headerRef} className="text-center mb-12 lg:mb-16">
          <div
            ref={headerSubRef}
            className="flex items-center justify-center gap-3 mb-4"
          >
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
            ref={headerTitleRef}
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
            }}
          >
            Jejak langkah AS PUTRA dari masa ke masa.
          </p>
        </div>

        {/* TIMELINE CARDS */}
        <div className="relative max-w-[1000px] mx-auto pb-10">
          {/* Garis tengah */}
          <div
            ref={lineRef}
            className="absolute left-1/2 transform -translate-x-1/2 w-0.5 top-0 bottom-0 hidden md:block"
            style={{
              backgroundColor: "var(--color-utama)",
              transformOrigin: "top center",
              scaleY: 0,
            }}
          />

          {timelineData.map((item, idx) => (
            <div
              key={idx}
              ref={(el) => {
                if (el) cardsRef.current[idx] = el;
              }}
              data-position={item.position}
              className={`timeline-card relative md:w-1/2 px-4 sm:px-5 md:px-6 mb-6 md:mb-10 ${
                item.position === "left"
                  ? "md:left-0 md:text-right md:pr-12"
                  : "md:left-1/2 md:text-left md:pl-12"
              }`}
            >
              {/* Bulatan */}
              <div
                className={`timeline-circle hidden md:block absolute top-5 w-4 h-4 md:w-5 md:h-5 rounded-full z-10 ${
                  item.position === "left" ? "right-[-10px]" : "left-[-10px]"
                }`}
                style={{
                  backgroundColor: "var(--color-bg-light)",
                  border: "3px solid var(--color-utama)",
                  boxShadow:
                    "0 0 0 2px var(--color-bg-light), 0 2px 8px rgba(0,0,0,0.1)",
                }}
              />

              {/* Card Content */}
              <div
                className="timeline-content rounded-xl shadow-lg transition-all duration-300 relative overflow-hidden"
                style={{
                  backgroundColor: "var(--color-bg-light)",
                  padding: "clamp(1rem, 4vw, 1.5rem)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 15px 30px -12px rgba(0, 0, 0, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Tahun */}
                <div
                  className="inline-flex items-center gap-2 mb-3"
                  style={{
                    borderLeft: `3px solid var(--color-utama)`,
                    paddingLeft: "12px",
                  }}
                >
                  <span
                    className="font-semibold tracking-wide"
                    style={{
                      color: "var(--color-utama)",
                      fontSize: "clamp(0.9rem, 3vw, 1.1rem)",
                    }}
                  >
                    {item.year}
                  </span>
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: "var(--color-aksen)" }}
                  />
                </div>

                {/* Judul */}
                <h3
                  className="font-bold mb-2"
                  style={{
                    color: "var(--color-teks)",
                    fontSize: "clamp(1rem, 3.5vw, 1.25rem)",
                  }}
                >
                  {item.title}
                </h3>

                {/* Deskripsi */}
                <p
                  className="leading-relaxed"
                  style={{
                    color: "var(--color-teks-muted)",
                    fontSize: "clamp(0.75rem, 2.5vw, 0.875rem)",
                  }}
                >
                  {item.desc}
                </p>

                {/* Garis aksen */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl"
                  style={{
                    backgroundColor: "var(--color-utama)",
                    opacity: 0.12,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HistoryTimeline;
