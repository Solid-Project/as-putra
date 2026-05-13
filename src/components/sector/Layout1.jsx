import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Layout1 = ({ data, isActive, index }) => {
  const sectionRef = useRef(null);
  const imageFrameRef = useRef(null);
  const textGroupRef = useRef(null);
  const floatRef = useRef(null);

  // 1. PERBAIKAN URL GAMBAR (Sama seperti IntroSection)
  // Pastikan VITE_API_URL Anda di .env tidak diakhiri tanda /
  const displayImage = data?.image 
    ? `${import.meta.env.VITE_API_URL}/storage/${data.image}` 
    : ""; // Atau kasih placeholder image

  useEffect(() => {
    if (!data) return;

    const ctx = gsap.context(() => {
      // Animasi Floating Background
      const shapes = floatRef.current?.children;
      if (shapes) {
        [...shapes].forEach((shape, i) => {
          gsap.to(shape, {
            y: i % 2 === 0 ? 30 : -30,
            duration: 10 + i,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
        });
      }

      // Animasi Konten (ScrollTrigger)
      // Kita pakai timeline sederhana agar sinkron dengan snap scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          toggleActions: "play none none reverse",
        }
      });

      tl.fromTo(imageFrameRef.current, 
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: "power4.out" }
      )
      .fromTo(textGroupRef.current, 
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: "power4.out" },
        "-=0.8" // Overlap animasi
      );

    }, sectionRef);

    return () => ctx.revert();
  }, [data]);

  return (
    <section
      ref={sectionRef}
      className="section relative w-full bg-white overflow-hidden"
      id={`section-${index}`}
      style={{ height: "100vh" }}
      data-theme="light"
    >
      {/* BACKGROUND DECORATIVE */}
      <div ref={floatRef} className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute rounded-full blur-3xl opacity-[0.03] w-[40vw] h-[40vw] bottom-0 left-0 bg-[#FFC619]" />
      </div>

      <div className="relative z-10 w-full h-full flex items-center px-[8%]">
        <div className="w-full grid lg:grid-cols-12 gap-12 items-center">
          
          {/* SISI KIRI: IMAGE */}
          <div className="lg:col-span-6 flex justify-center lg:justify-start order-2 lg:order-1">
            <div
              ref={imageFrameRef}
              className="relative p-3 bg-white shadow-2xl rounded-sm border border-slate-100"
              style={{
                maxWidth: "480px",
                width: "100%",
                aspectRatio: "4/5",
              }}
            >
              <img
                src={displayImage}
                alt={data.title}
                className="w-full h-full object-cover rounded-sm"
              />
            </div>
          </div>

          {/* SISI KANAN: TEXT */}
          <div ref={textGroupRef} className="lg:col-span-6 flex flex-col order-1 lg:order-2">
            <div className="max-w-xl">
              <span className="text-[#FFC619] font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block">
                {data.meta || "Detail Overview"}
              </span>
              
              <h2 className="font-['Playfair_Display'] font-bold leading-[1.1] mb-6 tracking-tighter text-[#1D2B53]"
                style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
                {data.title}
              </h2>

              <div className="h-[3px] w-12 bg-[#1D2B53] mb-8" />

              <div className="space-y-4">
                {/* Gunakan dangerouslySetInnerHTML jika data dari CMS mengandung tag HTML */}
                <div 
                  className="text-slate-500 text-base lg:text-lg leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: data.description }}
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Layout1;