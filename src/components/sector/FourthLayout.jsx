// src/components/layouts/FourthLayout.jsx
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import gambar kantor/talenta AS Putra kamu (Sesuaikan path-nya)
import officeTalentImg from "@/assets/img/prop2.jpeg";

gsap.registerPlugin(ScrollTrigger);

const FourthLayout = () => {
  const sectionRef = useRef(null);
  const textGroupRef = useRef(null);
  const imageFrameRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Animasi Teks (Stagger dari kiri)
      gsap.fromTo(
        textGroupRef.current.children,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 2. Animasi Frame Gambar (Masuk dari kanan dengan rotasi tipis)
      gsap.fromTo(
        imageFrameRef.current,
        { x: 100, opacity: 0, rotation: 5 },
        {
          x: 0,
          opacity: 1,
          rotation: 0,
          duration: 1.2,
          ease: "back.out(1.5)",
          delay: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section min-h-screen flex items-center py-24 px-[5%] bg-[#fcfcfc] relative overflow-hidden"
      id="fourth-layout"
      data-theme="light" // Agar navbar hitam di section terang ini
    >
      {/* Container Full-Layout (z-10 agar di atas background decoration) */}
      <div className="w-full relative z-10">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          
          {/* KOLOM KIRI: TEKS (GROUPED FOR GSAP) */}
          <div ref={textGroupRef} className="flex flex-col gap-16">
            
            {/* Blok Teks 1 */}
            <div className="flex flex-col gap-6">
              <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl text-slate-900 font-bold leading-[1.1]">
                AS Putra Group: Komitmen Pertumbuhan
              </h2>
              <p className="text-slate-600 text-lg md:text-xl leading-relaxed font-light">
                AS Putra Group berkomitmen untuk menyediakan peluang pengembangan dan
                karir bagi setiap talenta. Dengan basis operasional yang luas di 10 sektor
                dan 7 wilayah di Indonesia, kami berperan dalam menyediakan lapangan
                kerja berkualitas.
              </p>
            </div>

            {/* Blok Teks 2 */}
            <div className="flex flex-col gap-6">
              <h3 className="text-3xl md:text-4xl text-slate-900 font-bold tracking-tight">
                Peluang & Sektor Strategis
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed font-light">
                Kami melihat peluang besar dalam pengembangan bisnis berkelanjutan dan inovasi.
                Dengan integritas tinggi, AS Putra Group menjalin kemitraan strategis untuk
                pertumbuhan industri dan ekonomi nasional. Peluang karir kami dapat diikuti
                melalui akun resmi di [LINK: Karier.net] dan Departemen Sumber Daya
                Manusia kami.
              </p>
            </div>
          </div>

          {/* KOLOM KANAN: GAMBAR DENGAN FRAME (GAYA REFERENSI) */}
          <div className="flex justify-center md:justify-end">
            <div
              ref={imageFrameRef}
              className="relative p-3 bg-white border border-slate-200 shadow-2xl rounded-sm max-w-[500px] w-full aspect-[4/5]"
            >
              <img
                src={officeTalentImg}
                alt="AS Putra Group Talents"
                className="w-full h-full object-cover rounded-sm"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FourthLayout;