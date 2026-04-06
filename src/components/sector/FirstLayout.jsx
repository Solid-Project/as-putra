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
      // Timeline Parallax Dua Hala
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          // 'start' & 'end' dilaraskan supaya animasi 'bertemu' tepat di tengah skrin
          start: "top bottom", // Mula bergerak bila section muncul dari bawah
          end: "bottom top",   // Selesai bila section hilang ke atas
          scrub: 1.5,          // Kelajuan animasi mengikut skrol
          toggleActions: "play reverse play reverse", // Membolehkan animasi berpatah balik
        }
      });

      tl.fromTo(imageFrameRef.current, 
        { x: "-100%", opacity: 0 },
        { 
          x: "0%", 
          opacity: 1, 
          ease: "power1.inOut",
          duration: 0.5 // Bahagian pertama: Masuk ke posisi sempurna
        }
      ).to(imageFrameRef.current, {
        x: "100%", // Bahagian kedua: Keluar ke arah bertentangan bila skrol terus ke bawah
        opacity: 0,
        ease: "power1.inOut",
        duration: 0.5
      });

      tl.fromTo(textGroupRef.current, 
        { x: "100%", opacity: 0 },
        { 
          x: "0%", 
          opacity: 1, 
          ease: "power1.inOut",
          duration: 0.5 
        },
        0 // Mula serentak dengan gambar
      ).to(textGroupRef.current, {
        x: "-100%",
        opacity: 0,
        ease: "power1.inOut",
        duration: 0.5
      }, 0.5);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section min-h-screen flex items-center bg-white relative overflow-hidden px-[6%]"
      id={data.id}
    >
      <div className="w-full relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* KOLOM KIRI: IMAGE */}
          <div className="lg:col-span-6 flex justify-center lg:justify-start order-2 lg:order-1">
            <div
              ref={imageFrameRef}
              className="relative p-4 bg-white border border-slate-100 shadow-2xl rounded-sm max-w-[520px] w-full aspect-[4/5] overflow-hidden"
            >
              <img
                src={data.image}
                alt={data.title}
                className="w-full h-full object-cover rounded-sm"
              />
            </div>
          </div>

          {/* KOLOM KANAN: TEXT */}
          <div ref={textGroupRef} className="lg:col-span-6 flex flex-col gap-8 order-1 lg:order-2">
            <div className="max-w-xl">
              <div className="inline-block px-4 py-1.5 mb-8 text-[10px] font-black tracking-[0.3em] uppercase bg-slate-900 text-white rounded-sm">
                {data.meta || "Corporate Overview"}
              </div>
              
              <h2 className="font-['Playfair_Display'] text-5xl md:text-6xl lg:text-7xl text-slate-900 font-bold leading-[1.1] mb-10 tracking-tighter">
                {data.title}
              </h2>

              <div className="w-20 h-1.5 bg-[var(--color-utama)] mb-12"></div>

              <div className="space-y-6">
                {Array.isArray(data.description) ? (
                  data.description.map((p, idx) => (
                    <p key={idx} className="text-slate-600 text-lg md:text-xl leading-relaxed font-light border-l-2 border-slate-50 pl-8">
                      {p}
                    </p>
                  ))
                ) : (
                  <p className="text-slate-600 text-lg md:text-xl leading-relaxed font-light border-l-2 border-slate-50 pl-8">
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