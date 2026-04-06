import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FirstLayout = ({ data }) => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const imageFrameRef = useRef(null);
  const textGroupRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Animasi Frame Gambar (Masuk dari kiri)
      gsap.fromTo(
        imageFrameRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 2. Animasi Grup Teks (Stagger dari kanan)
      gsap.fromTo(
        textGroupRef.current.children,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          delay: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
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
      id={data.id}
      data-theme="light"
    >
      <div className="w-full relative z-10">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          
          {/* KOLOM KIRI: IMAGE DENGAN FRAME (Mirror FourthLayout) */}
          <div className="flex justify-center md:justify-start order-2 md:order-1">
            <div
              ref={imageFrameRef}
              className="relative p-3 bg-white border border-slate-200 shadow-xl rounded-sm max-w-[520px] w-full aspect-[4/5]"
            >
              <img
                src={data.image}
                alt={data.title}
                className="w-full h-full object-cover rounded-sm"
              />
            </div>
          </div>

          {/* KOLOM KANAN: CONTENT STORY */}
          <div ref={textGroupRef} className="flex flex-col gap-8 order-1 md:order-2">
            <div>
              {/* Badge Meta */}
              <div className="inline-block px-4 py-1.5 mb-6 text-[11px] font-bold tracking-[0.2em] uppercase border border-slate-200 text-slate-500 rounded-sm">
                {data.meta || "Corporate Overview"}
              </div>

              {/* Title */}
              <h2
                ref={titleRef}
                className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl text-slate-900 font-bold leading-[1.1] mb-8"
              >
                {data.title}
              </h2>

              {/* Garis Aksen Halus */}
              <div className="w-16 h-1 bg-[var(--color-utama)] mb-10"></div>

              {/* Description (Full Text) */}
              <div ref={descRef} className="space-y-6">
                {typeof data.description === 'string' ? (
                  <p className="text-slate-600 text-lg md:text-xl leading-relaxed font-light">
                    {data.description}
                  </p>
                ) : (
                  data.description.map((paragraph, idx) => (
                    <p key={idx} className="text-slate-600 text-lg md:text-xl leading-relaxed font-light">
                      {paragraph}
                    </p>
                  ))
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