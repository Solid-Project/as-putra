import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FirstLayout = ({ data }) => {
  const sectionRef = useRef(null);
  const imageFrameRef = useRef(null);
  const textGroupRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. TIMELINE PARALLAX
      // Kita gunakan scrub: 2 agar gerakan 'berat' dan mewah (sat-set tapi halus)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom", // Mulai saat section muncul di bawah
          end: "bottom top",   // Selesai saat section hilang ke atas
          scrub: 2,             
          invalidateOnRefresh: true
        }
      });

      // 2. ANIMASI GAMBAR (MASUK -> DIAM -> KELUAR)
      tl.fromTo(imageFrameRef.current, 
        { x: "-70%", opacity: 0 },
        { 
          x: "0%", 
          opacity: 1, 
          ease: "power2.inOut",
          duration: 1 
        }
      )
      // JEDA: Membuat elemen "diam" di tengah saat section di tengah layar
      .to(imageFrameRef.current, { duration: 0.8 }) 
      .to(imageFrameRef.current, {
        x: "70%", 
        opacity: 0,
        ease: "power2.inOut",
        duration: 1 
      });

      // 3. ANIMASI TEKS (SINKRON DENGAN GAMBAR)
      tl.fromTo(textGroupRef.current, 
        { x: "70%", opacity: 0 },
        { 
          x: "0%", 
          opacity: 1, 
          ease: "power2.inOut",
          duration: 1 
        },
        0 // Mulai bareng gambar
      )
      // JEDA TEKS
      .to(textGroupRef.current, { duration: 0.8 }, 1)
      .to(textGroupRef.current, {
        x: "-70%",
        opacity: 0,
        ease: "power2.inOut",
        duration: 1
      }, ">");

    }, sectionRef);

    return () => ctx.revert();
  }, [data]);

  return (
    <section
      ref={sectionRef}
      // KUNCI: h-screen memastikan tinggi section selalu satu layar penuh
      className="section h-screen w-full flex items-center bg-white relative overflow-hidden px-[6%]"
      id={data.id}
      data-theme="light"
    >
      <div className="w-full relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* KOLOM KIRI: IMAGE */}
          <div className="lg:col-span-6 flex justify-center lg:justify-start order-2 lg:order-1">
            <div
              ref={imageFrameRef}
              className="relative p-3 bg-white border border-slate-100 shadow-2xl rounded-sm max-w-[480px] lg:max-w-[520px] w-full aspect-[4/5] overflow-hidden"
              style={{ willChange: "transform, opacity" }} 
            >
              <img
                src={data.image}
                alt={data.title}
                className="w-full h-full object-cover rounded-sm"
              />
            </div>
          </div>

          {/* KOLOM KANAN: TEXT */}
          <div 
            ref={textGroupRef} 
            className="lg:col-span-6 flex flex-col justify-center order-1 lg:order-2"
            style={{ willChange: "transform, opacity" }}
          >
            <div className="max-w-xl">
              <div className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black tracking-[0.3em] uppercase bg-slate-900 text-white rounded-sm">
                {data.meta || "Corporate Overview"}
              </div>
              
              <h2 className="font-['Playfair_Display'] text-4xl md:text-6xl lg:text-7xl text-slate-900 font-bold leading-[1.1] mb-8 tracking-tighter">
                {data.title}
              </h2>

              <div className="w-16 h-1.5 bg-[var(--color-utama)] mb-8"></div>

              <div className="space-y-5">
                {Array.isArray(data.description) ? (
                  data.description.map((p, idx) => (
                    <p key={idx} className="text-slate-600 text-base md:text-lg leading-relaxed font-light border-l-2 border-slate-50 pl-6">
                      {p}
                    </p>
                  ))
                ) : (
                  <p className="text-slate-600 text-base md:text-lg leading-relaxed font-light border-l-2 border-slate-50 pl-6">
                    {data.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FirstLayout;