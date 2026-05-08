import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bgLayout from "@/assets/img/tgw2.webp";

gsap.registerPlugin(ScrollTrigger);

const Layout1 = () => {
  const sectionRef = useRef(null);
  const imageFrameRef = useRef(null);
  const textGroupRef = useRef(null);
  const floatRef = useRef(null);

  // =========================
  // STATIC DATA (ARETHA FARM)
  // =========================
  const data = {
    id: "aretha",
    title: "The Good Wife",
    meta: "Women's Private Gym",
    image: bgLayout,
    description: [
     'Definisi kenyamanan dalam berolahraga. Berlokasi di jantung Kuningan, The Good Wife hadir sebagai private sanctuary khusus wanita yang dilengkapi fasilitas kebugaran lengkap untuk mendukung gaya hidup sehat Anda dengan privasi maksimal.'
    ],
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const shapes = floatRef.current?.children;

      if (shapes) {
        if (shapes[0]) {
          gsap.to(shapes[0], {
            y: 50,
            x: 30,
            rotate: 20,
            duration: 15,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }
        if (shapes[1]) {
          gsap.to(shapes[1], {
            y: -40,
            x: -25,
            rotate: -15,
            duration: 12,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }
        if (shapes[2]) {
          gsap.to(shapes[2], {
            y: 35,
            x: -20,
            rotate: 10,
            duration: 10,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }
        if (shapes[3]) {
          gsap.to(shapes[3], {
            y: -25,
            x: 35,
            rotate: -8,
            duration: 13,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        imageFrameRef.current,
        { x: "-70%", opacity: 0 },
        { x: "0%", opacity: 1, ease: "power2.inOut", duration: 1 },
      )
        .to(imageFrameRef.current, { duration: 0.8 })
        .to(imageFrameRef.current, {
          x: "70%",
          opacity: 0,
          ease: "power2.inOut",
          duration: 1,
        });

      tl.fromTo(
        textGroupRef.current,
        { x: "70%", opacity: 0 },
        { x: "0%", opacity: 1, ease: "power2.inOut", duration: 1 },
        0,
      )
        .to(textGroupRef.current, { duration: 0.8 }, 1)
        .to(
          textGroupRef.current,
          {
            x: "-70%",
            opacity: 0,
            ease: "power2.inOut",
            duration: 1,
          },
          ">",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section relative w-full bg-white overflow-y-auto overflow-x-hidden"
      id={data.id}
      data-theme="light"
      data-title={data.title}
      style={{
        height: "100vh",
        minHeight: "600px",
        maxHeight: "1080px",
      }}
    >
      {/* BACKGROUND SHAPES */}
      <div
        ref={floatRef}
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      >
        <div
          className="absolute rounded-full blur-3xl"
          style={{
            backgroundColor: "var(--color-utama)",
            opacity: 0.06,
            width: "min(50vw, 500px)",
            height: "min(50vw, 500px)",
            top: "-10%",
            right: "-5%",
          }}
        />
        <div
          className="absolute rounded-full blur-2xl"
          style={{
            backgroundColor: "var(--color-aksen)",
            opacity: 0.05,
            width: "min(40vw, 400px)",
            height: "min(40vw, 400px)",
            bottom: "-10%",
            left: "-8%",
          }}
        />
        <div
          className="absolute opacity-20 hidden lg:block"
          style={{
            backgroundImage:
              "radial-gradient(var(--color-utama) 2px, transparent 2px)",
            backgroundSize: "clamp(20px, 4vw, 30px) clamp(20px, 4vw, 30px)",
            width: "min(25vw, 200px)",
            height: "min(25vw, 200px)",
            top: "15%",
            left: "5%",
          }}
        />
        <div
          className="absolute rotate-12 rounded-2xl opacity-30 hidden xl:block"
          style={{
            border: "2px solid var(--color-aksen)",
            width: "min(12vw, 100px)",
            height: "min(12vw, 100px)",
            bottom: "20%",
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
              backgroundSize: "clamp(30px, 5vw, 50px) clamp(30px, 5vw, 50px)",
            }}
          />
        </div>
      </div>

      {/* CONTENT */}
      <div
        className="relative z-10 w-full h-full flex items-center"
        style={{
          paddingLeft: "clamp(1rem, 6%, 6rem)",
          paddingRight: "clamp(1rem, 6%, 6rem)",
          paddingTop: "clamp(1rem, 3vh, 2rem)",
          paddingBottom: "clamp(1rem, 3vh, 2rem)",
        }}
      >
        <div className="w-full grid lg:grid-cols-12 gap-6 lg:gap-12 xl:gap-16 items-center">
          {/* IMAGE */}
          <div className="lg:col-span-6 flex justify-center lg:justify-start order-2 lg:order-1">
            <div
              ref={imageFrameRef}
              className="relative bg-white shadow-2xl rounded-sm overflow-hidden"
              style={{
                padding: "clamp(0.75rem, 2vw, 1rem)",
                maxWidth: "clamp(260px, 70vw, 480px)",
                width: "100%",
                aspectRatio: "4/5",
              }}
            >
              <img
                src={data.image}
                alt={data.title}
                className="w-full h-full object-cover rounded-sm"
                style={{ objectPosition: "center 30%" }}
              />
            </div>
          </div>

          {/* TEXT */}
          <div
            ref={textGroupRef}
            className="lg:col-span-6 flex flex-col justify-center order-1 lg:order-2"
          >
            <div className="max-w-xl mx-auto lg:mx-0">
              <div
                className="inline-block px-3 py-1 mb-4 text-[10px] font-black tracking-[0.3em] uppercase rounded-sm"
                style={{
                  backgroundColor: "var(--color-teks)",
                  color: "white",
                }}
              >
                {data.meta}
              </div>

              <h2
                className="font-['Playfair_Display'] font-bold leading-[1.1] mb-4 lg:mb-6 tracking-tighter"
                style={{
                  color: "var(--color-teks)",
                  fontSize: "clamp(1.5rem, 5vw, 3.5rem)",
                }}
              >
                {data.title}
              </h2>

              <div
                className="mb-5 lg:mb-6"
                style={{
                  width: "clamp(40px, 8vw, 60px)",
                  height: "clamp(3px, 0.6vh, 5px)",
                  backgroundColor: "var(--color-utama)",
                }}
              />

              <div className="space-y-3 md:space-y-4">
                <p
                  className="leading-relaxed text-justify transition-all duration-300 hover:pl-6"
                  style={{
                    color: "var(--color-teks-muted)",
                    fontSize: "clamp(0.85rem, 2vw, 1.05rem)",
                    borderLeft: "3px solid var(--color-utama)",
                    paddingLeft: "clamp(1rem, 2.5vw, 1.4rem)",
                    lineHeight: "1.8",
                    letterSpacing: "0.3px",
                  }}
                >
                  <span className="italic">{data.description[0].title}</span>{" "}
                      Definisi kenyamanan dalam berolahraga. Berlokasi di jantung Kuningan, The Good Wife hadir sebagai private sanctuary khusus wanita yang dilengkapi fasilitas kebugaran lengkap untuk mendukung gaya hidup sehat Anda dengan privasi maksimal.

                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Layout1;
