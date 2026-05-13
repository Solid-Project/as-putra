import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bgOffice from "@/assets/img/SectorPeternakanKeempat.webp";

gsap.registerPlugin(ScrollTrigger);

const Layout3 = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const contentRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // --- 1. LIVE PARALLAX: BACKGROUND IMAGE (ZOOM & MOVE) ---
      gsap.fromTo(
        bgRef.current,
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
          },
        },
      );
      // --- 2. LIVE PARALLAX: FLOATING CARD ---
      gsap.fromTo(
        cardRef.current,
        { y: 100 },
        {
          y: -100,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        },
      );

      // --- 3. ANIMASI MASUK AWAL ---
      gsap.fromTo(
        contentRef.current.children,
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
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section relative min-h-screen w-full overflow-hidden flex items-center"
      id="three-layout"
      data-theme="dark"
      style={{
        backgroundColor: "var(--color-footer-bg)",
      }}
    >
      {/* 1. BACKGROUND IMAGE (LIVE PARALLAX) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          ref={bgRef}
          src={bgOffice}
          alt="AS Putra Peternakan"
          className="w-full h-[120%] object-cover"
          style={{ opacity: 0.6 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.2))",
          }}
        />
      </div>

      {/* 2. FLOATING WHITE CARD (LIVE PARALLAX) */}
      <div
        className="container mx-auto z-10"
        style={{
          paddingLeft: "clamp(1rem, 6%, 6rem)",
          paddingRight: "clamp(1rem, 6%, 6rem)",
        }}
      >
        <div
          ref={cardRef}
          className="bg-white w-full max-w-[550px] shadow-2xl relative rounded-sm"
          style={{
            padding: "clamp(2rem, 8vw, 5rem)",
            boxShadow: "0 50px 100px -20px rgba(0,0,0,0.5)",
          }}
        >
          <div
            ref={contentRef}
            className="flex flex-col"
            style={{ gap: "clamp(1.5rem, 4vh, 2rem)" }}
          >
            <h2
              className="font-['Playfair_Display'] font-bold tracking-tighter leading-tight"
              style={{
                color: "var(--color-teks)",
                fontSize: "clamp(2rem, 6vw, 3.5rem)",
              }}
            >
              <span style={{ color: "var(--color-utama)" }}>AS Putra</span>{" "}
              <br />
              Unit Usaha Produk
            </h2>

            <div
              className="mb-2"
              style={{
                width: "clamp(48px, 10vw, 64px)",
                height: "clamp(3px, 0.6vh, 4px)",
                backgroundColor: "var(--color-utama)",
              }}
            />

            <div
              className="space-y-6"
              style={{ gap: "clamp(1.5rem, 3vh, 2rem)" }}
            >
              <div className="group transition-all duration-300">
                <span
                  className="font-black block mb-2 tracking-widest text-xs uppercase"
                  style={{ color: "var(--color-teks)" }}
                >
                  01. Ceha
                </span>

                <p
                  className="font-light transition-colors"
                  style={{
                    color: "var(--color-teks-muted)",
                    borderLeftWidth: "2px",
                    borderLeftColor: "var(--color-bg-alt)",
                    paddingLeft: "clamp(1rem, 3vw, 1.5rem)",
                  }}
                >
                  Pusat produk telur dan ayam segar berkualitas, menghadirkan kebutuhan pangan yang aman, higienis, dan terpercaya untuk masyarakat yang berlokasi di Jl. Jend. Sudirman, Awirarangan, Kec. Kuningan, Kabupaten Kuningan, Jawa Barat 45511
                </p>
              </div>

              <div className="group transition-all duration-300">
                <span
                  className="font-black block mb-2 tracking-widest text-xs uppercase"
                  style={{ color: "var(--color-teks)" }}
                >
                  02. Ayamku
                </span>

                <p
                  className="font-light transition-colors"
                  style={{
                    color: "var(--color-teks-muted)",
                    borderLeftWidth: "2px",
                    borderLeftColor: "var(--color-bg-alt)",
                    paddingLeft: "clamp(1rem, 3vw, 1.5rem)",
                  }}
                >
                  Outlet fried chicken yang menyajikan ayam goreng berkualitas dengan rasa konsisten dan harga terjangkau. Beberapa Outlet Tersebar di berbagai lokasi strategis di Kuningan, mencakup lebih dari 10 outlet aktif.

                </p>
              </div>

              <div className="group transition-all duration-300">
                <span
                  className="font-black block mb-2 tracking-widest text-xs uppercase"
                  style={{ color: "var(--color-teks)" }}
                >
                  03. AS Putra Mart
                </span>

                <p
                  className="font-light transition-colors"
                  style={{
                    color: "var(--color-teks-muted)",
                    borderLeftWidth: "2px",
                    borderLeftColor: "var(--color-bg-alt)",
                    paddingLeft: "clamp(1rem, 3vw, 1.5rem)",
                  }}
                >
                  Toko kelontongan modern yang menyediakan berbagai kebutuhan harian dengan produk lengkap dan kualitas terjaga. Toko Kelontongan ini berlokasi di Jl. Jend. Sudirman, Winduhaji, Kec. Kuningan, Kabupaten Kuningan, Jawa Barat 45511

                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Layout3;
