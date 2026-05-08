import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import peternakanImg from "@/assets/img/sector-peternakan-2.webp";

gsap.registerPlugin(ScrollTrigger);

const Layout4 = () => {
  const sectionRef = useRef(null);
  const imageFrameRef = useRef(null);
  const textGroupRef = useRef(null);

 useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5, // 1.5 adalah 'sweet spot' biar mulus tapi nggak terlalu delay
          invalidateOnRefresh: true,
        }
      });

      // Bikin variabel biar gampang kalau mau ganti-ganti
      const easeType = "sine.inOut"; // 'sine' paling smooth & natural untuk animasi berbasis scroll (scrub)
      const jarak = "40%"; // Kurangi dari 70% ke 40% biar pergerakannya anggun dan nggak buru-buru

      // --- FASE 1: MASUK BERSAMAAN ---
      // Gambar masuk dari kanan
      tl.fromTo(
        imageFrameRef.current,
        { x: jarak, opacity: 0 },
        { x: "0%", opacity: 1, ease: easeType, duration: 1 },
        "masuk" // Label posisi timeline biar barengan
      );

      // Teks masuk dari kiri
      tl.fromTo(
        textGroupRef.current,
        { x: `-${jarak}`, opacity: 0 },
        { x: "0%", opacity: 1, ease: easeType, duration: 1 },
        "masuk" // Gunakan label yang sama persis
      );

      // --- FASE 2: WAKTU DIAM (RUANG BACA) ---
      // Tween kosong ini berfungsi menahan animasi biar elemen nggak langsung ngilang pas di-scroll
      tl.to({}, { duration: 1.5 });

      // --- FASE 3: KELUAR BERSAMAAN ---
      // Gambar keluar ke kiri
      tl.to(
        imageFrameRef.current,
        { x: `-${jarak}`, opacity: 0, ease: easeType, duration: 1 },
        "keluar"
      );

      // Teks keluar ke kanan
      tl.to(
        textGroupRef.current,
        { x: jarak, opacity: 0, ease: easeType, duration: 1 },
        "keluar"
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []); // Pastikan ada dependency array kosong atau state yang relevan di sini
  

  return (
    <section
      ref={sectionRef}
      className="section min-h-screen w-full flex items-center bg-white relative overflow-hidden px-[6%]"
      id="fourth-layout"
      data-theme="light"
    >
      <div className="w-full relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">

          {/* ✅ TEXT (KIRI) - KONTEN DIUBAH TENTANG PETERNAKAN */}
          <div
            ref={textGroupRef}
            className="lg:col-span-6 flex flex-col justify-center order-1"
            style={{ willChange: "transform, opacity" }}
          >
            <div className="max-w-xl">
              <div className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black tracking-[0.3em] uppercase bg-slate-900 text-white rounded-sm">
                Sector Konstruksi
              </div>

              <h2 className="font-['Playfair_Display'] text-4xl md:text-6xl lg:text-7xl text-slate-900 font-bold leading-[1.1] mb-8 tracking-tighter">
                TB. AS Putra<br />
                <span className="text-[var(--color-utama)]">AS PUTRA</span>
              </h2>

              <div className="w-16 h-1.5 bg-[var(--color-utama)] mb-8"></div>

              <p className="text-slate-600 text-base md:text-lg leading-relaxed font-light border-l-2 border-slate-50 pl-6">
               Menyediakan berbagai alat dan bahan bangunan dengan pilihan lengkap untuk mendukung kebutuhan konstruksi. TB. AS Putra berlokasi di Jl. Jend. Sudirman, Winduhaji, Kec. Kuningan, Kabupaten Kuningan, Jawa Barat

              </p>
            </div>
          </div>

          {/* ✅ IMAGE (KANAN) - GAMBAR PETERNAKAN */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end order-2">
            <div
              ref={imageFrameRef}
              className="relative p-3 bg-white border border-slate-100 shadow-2xl rounded-sm max-w-[480px] lg:max-w-[520px] w-full aspect-[4/5] overflow-hidden"
              style={{ willChange: "transform, opacity" }}
            >
              <img
                src={peternakanImg}
                alt="Peternakan Modern AS PUTRA"
                className="w-full h-full object-cover rounded-sm"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Layout4;