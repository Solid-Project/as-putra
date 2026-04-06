import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import officeTalentImg from "@/assets/img/prop2.webp";

gsap.registerPlugin(ScrollTrigger);

const FourthLayout = () => {
  const sectionRef = useRef(null);
  const textGroupRef = useRef(null);
  const imageFrameRef = useRef(null);
  const innerImgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // Menggunakan Timeline dengan Pinning agar pas satu layar (min-h-screen)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",    // Kunci section tepat di atas layar
          end: "+=150%",       // Durasi scroll untuk menjalankan seluruh paralaks
          scrub: 1.2,          // Menjaga kehalusan sesuai permintaan Anda
          pin: true,           // KUNCI: Membuat section tertahan di layar (min-h-screen)
          invalidateOnRefresh: true,
        }
      });

      // --- LOGIKA PARALLAX ANDA (DIPERTAHANKAN TOTAL) ---
      
      // 1. TEKS: Masuk -> Tengah -> Keluar
      tl.fromTo(textGroupRef.current, 
        { x: -150, opacity: 0 }, 
        { 
          x: 0, 
          opacity: 1, 
          ease: "power1.inOut",
          duration: 0.5 
        }
      ).to(textGroupRef.current, {
        x: -150, 
        opacity: 0,
        ease: "power1.inOut",
        duration: 0.5
      }, "+=0.2"); // Beri sedikit jeda di tengah agar enak dibaca

      // 2. IMAGE FRAME: Masuk -> Tengah -> Keluar (DENGAN ROTASI ANDA)
      tl.fromTo(imageFrameRef.current, 
        { x: 150, opacity: 0, rotation: 3 }, 
        { 
          x: 0, 
          opacity: 1, 
          rotation: 0,
          ease: "power1.inOut",
          duration: 0.5 
        }, 
        0 // Mulai bareng teks
      ).to(imageFrameRef.current, {
        x: 150, 
        opacity: 0,
        rotation: -3,
        ease: "power1.inOut",
        duration: 0.5
      }, "+=0.2");

      // 3. INTERNAL IMAGE PARALLAX (Vertikal tetap hidup)
      tl.fromTo(innerImgRef.current, 
        { y: -30 }, 
        { y: 30, ease: "none", duration: 1.2 }, // Durasi disesuaikan dengan total timeline
        0
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      // h-screen memastikan section pas satu layar penuh
      className="section h-screen flex items-center bg-[#fcfcfc] relative overflow-hidden px-[6%]"
      id="fourth-layout"
    >
      <div className="w-full relative z-10 mx-auto">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* KOLOM KIRI: TEKS */}
          <div ref={textGroupRef} className="lg:col-span-6 flex flex-col gap-12 order-1">
            <div className="max-w-xl">
              <span className="text-[var(--color-utama)] font-bold tracking-[0.3em] text-[10px] uppercase block mb-6">
                Growth Commitment
              </span>
              <h2 className="font-['Playfair_Display'] text-5xl md:text-6xl lg:text-7xl text-slate-900 font-bold leading-[1.1] tracking-tighter mb-8">
                AS Putra Group: Komitmen Pertumbuhan
              </h2>
              <div className="w-20 h-1.5 bg-[var(--color-utama)] mb-10"></div>
              <p className="text-slate-600 text-lg md:text-xl leading-relaxed font-light border-l-2 border-slate-100 pl-8">
                AS Putra Group berkomitmen untuk menyediakan peluang pengembangan dan
                karir bagi setiap talenta di 10 sektor strategis.
              </p>
            </div>
          </div>

          {/* KOLOM KANAN: IMAGE */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end order-2">
            <div
              ref={imageFrameRef}
              className="relative p-4 bg-white border border-slate-100 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] rounded-sm max-w-[500px] w-full aspect-[4/5] overflow-hidden"
            >
              <img
                ref={innerImgRef}
                src={officeTalentImg}
                alt="AS Putra Group Talents"
                className="absolute inset-0 w-full h-[130%] object-cover rounded-sm"
                style={{ top: '-15%', willChange: 'transform' }} // willChange untuk performa paralaks internal
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FourthLayout;