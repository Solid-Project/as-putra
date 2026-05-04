import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CultureSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const lineRef = useRef(null);
  const textRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;

    // --- 1. LIVE PARALLAX (Satu Kecepatan Agar Tetap Sejajar & Padat) ---
    const ctx = gsap.context(() => {
      // Header meluncur naik sedikit (jarak dikurangi agar tidak terlalu jauh)
      gsap.to([titleRef.current, textRef.current, lineRef.current], {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        }
      });

      // SEMUA CARD BERGERAK BERSAMAAN (Tetap Sejajar)
      gsap.to(cardsRef.current, {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        }
      });
    }, section);

    // --- 2. ANIMASI REVEAL ASLI (Intersection Observer) ---
    const titleAnim = gsap.fromTo(
      titleRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", paused: true }
    );

    const lineAnim = gsap.fromTo(
      lineRef.current,
      { width: 0 },
      { width: 64, duration: 0.8, ease: "power3.out", paused: true }
    );

    const textAnim = gsap.fromTo(
      textRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.1, ease: "power3.out", paused: true }
    );

    const cardsAnim = gsap.fromTo(
      cardsRef.current,
      { y: 40, opacity: 0, scale: 0.98 },
      { y: 0, opacity: 1, scale: 1, stagger: 0.15, duration: 0.8, delay: 0.2, ease: "power3.out", paused: true }
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.delayedCall(0.1, () => {
              titleAnim.restart();
              lineAnim.restart();
              textAnim.restart();
              cardsAnim.restart();
            });
          }
        });
      },
      { threshold: 0.3 },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      ctx.revert();
    };
  }, []);

 const cards = [
  {
    icon: "✦",
    title: "Inovatif",
    desc: "“Berinovasi dan menjadi pelopor perkembangan.” Terbuka pada teknologi dan pembaruan di setiap lini usaha.",
  },
  {
    icon: "★",
    title: "Integrity",
    desc: "“Menjaga Amanah dengan Sepenuh Hati.” Berintegritas dan konsisten dalam kualitas, perkembangan, dan tujuan perusahaan.",
  },
  {
    icon: "♥",
    title: "Berkarya dengan Hati",
    desc: "“Memberi Makna dalam Setiap Tugas.” Bekerja dengan bangga dan rasa memiliki.",
  },
  {
    icon: "⟡",
    title: "Tumbuh Bersama",
    desc: "“Bersinergi, Saling Menguatkan.” Saling dukung untuk berkembang antar setiap lini usaha serta lingkungan.",
  },
  {
    icon: "✤",
    title: "Berbagi Manfaat",
    desc: "“Memberi Dampak Nyata bagi Sesama.” Usaha untuk kebaikan lingkungan dan masyarakat.",
  },
];

  return (
    <section
      ref={sectionRef}
      // py-12 md:py-16 membuat section lebih padat (jarak kosong berkurang)
      className="section py-12 md:py-16 bg-white px-[5%] overflow-hidden"
      id="culture-section" data-title="Budaya Kami" data-theme="light"
    >
      {/* Header dengan mb-10 agar lebih rapat ke card */}
      <div className="text-center mb-10 md:mb-12">
        <h2
          ref={titleRef}
          className="font-['Playfair_Display'] text-3xl md:text-4xl text-[var(--color-teks)] mb-3"
        >
          Budaya Kami
        </h2>

        <div
          ref={lineRef}
          className="h-0.5 bg-[var(--color-utama)] mx-auto mb-3"
          style={{ width: 0 }}
        />

        <p
          ref={textRef}
          className="text-[var(--color-teks-muted)] max-w-[600px] mx-auto text-sm md:text-base leading-relaxed"
        >
          Nilai-nilai yang membentuk cara kami bekerja, berkolaborasi, dan
          bertumbuh bersama.
        </p>
      </div>

      {/* Grid dengan gap-6 agar lebih padat */}
      <div className="grid md:grid-cols-3 gap-6 max-w-[1100px] mx-auto">
        {cards.map((item, idx) => (
          <div
            key={idx}
            ref={(el) => (cardsRef.current[idx] = el)}
            className="text-center p-6 md:p-8 rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md"
          >
            <div className="text-3xl text-[var(--color-utama)] mb-3">
              {item.icon}
            </div>
            <h3 className="text-lg md:text-xl font-bold text-[var(--color-teks)]">
              {item.title}
            </h3>
            <p className="text-[var(--color-teks-muted)] mt-2 text-xs md:text-sm leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CultureSection;