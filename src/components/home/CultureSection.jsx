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

    // 🔥 TITLE
    const titleAnim = gsap.fromTo(
      titleRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        paused: true,
      },
    );

    // 🔥 LINE
    const lineAnim = gsap.fromTo(
      lineRef.current,
      { width: 0 },
      {
        width: 64,
        duration: 1,
        ease: "power3.out",
        paused: true,
      },
    );

    // 🔥 TEXT
    const textAnim = gsap.fromTo(
      textRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
        paused: true,
      },
    );

    // 🔥 CARDS
    const cardsAnim = gsap.fromTo(
      cardsRef.current,
      { y: 60, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.2,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
        paused: true,
      },
    );

    // 🔥 OBSERVER (KUNCI UTAMA)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // kasih sedikit delay biar lebih smooth
            gsap.delayedCall(0.15, () => {
              titleAnim.restart();
              lineAnim.restart();
              textAnim.restart();
              cardsAnim.restart();
            });
          }
        });
      },
      {
        threshold: 0.4, // ⬅️ penting (jangan terlalu besar)
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  const cards = [
    {
      icon: "✦",
      title: "Integritas",
      desc: "Kami memegang komitmen untuk bekerja secara jujur, transparan, dan bertanggung jawab — baik kepada klien, mitra, maupun tim internal.",
    },
    {
      icon: "★",
      title: "Keunggulan",
      desc: "Kami terus meningkatkan kualitas kerja melalui perbaikan berkelanjutan, standar yang jelas, dan perhatian pada detail di setiap proses.",
    },
    {
      icon: "♥",
      title: "Kolaborasi & Komunitas",
      desc: "Kami percaya pertumbuhan yang berkelanjutan hanya bisa dicapai melalui kerja sama yang sehat, saling menghargai, dan kontribusi positif bagi lingkungan sekitar.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="section bg-[var(--color-bg-alt)] py-20 px-5"
      id="culture-section"
    >
      <div className="text-center mb-16">
        <h2
          ref={titleRef}
          className="font-['Playfair_Display'] text-3xl md:text-4xl text-[var(--color-teks)] mb-4"
        >
          Budaya Kami
        </h2>

        <div
          ref={lineRef}
          className="h-0.5 bg-[var(--color-utama)] mx-auto mb-4"
          style={{ width: 0 }}
        />

        <p
          ref={textRef}
          className="text-[var(--color-teks-muted)] max-w-[600px] mx-auto"
        >
          Nilai-nilai yang membentuk cara kami bekerja, berkolaborasi, dan
          bertumbuh bersama.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
        {cards.map((item, idx) => (
          <div
            key={idx}
            ref={(el) => (cardsRef.current[idx] = el)}
            className="text-center p-8 rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
          >
            <div className="text-4xl text-[var(--color-utama)] mb-4">
              {item.icon}
            </div>
            <h3 className="text-xl font-bold text-[var(--color-teks)]">
              {item.title}
            </h3>
            <p className="text-[var(--color-teks-muted)] mt-3 text-sm leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CultureSection;
