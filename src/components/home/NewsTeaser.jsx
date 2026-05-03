import React, { useEffect, useRef} from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

const news = [
  {
    id: "csr-1",
    category: "csr",
    title: "Pemberdayaan Peternak Mandiri",
    date: "24 Jan 2026",
    desc: "Mendampingi 100+ peternak lokal Kuningan dengan pelatihan manajemen modern.",
    image:
      "https://images.unsplash.com/photo-1589922583749-6b8473a85048?q=80&w=687&auto=format&fit=crop",
  },
  {
    id: "csr-2",
    category: "csr",
    title: "AS PUTRA Green: 5000 Pohon",
    date: "20 Jan 2026",
    desc: "Aksi nyata pelestarian lingkungan dengan menanam 5000 bibit pohon pelindung.",
    image:
      "https://plus.unsplash.com/premium_photo-1681140560806-928e9b8a9a20?q=80&w=1170&auto=format&fit=crop",
  },
  {
    id: "comm-1",
    category: "event",
    title: "Kolaborasi Riset Pakan IPB",
    date: "10 Jan 2026",
    desc: "Kerjasama strategis dengan universitas terkemuka untuk pakan ramah lingkungan.",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80",
  },
];

const categoryConfig = {
  csr: { label: "CSR", icon: "🌱", color: "#10B981" },
  event: { label: "Acara", icon: "🎉", color: "#F59E0B" },
  achievement: { label: "Prestasi", icon: "🏆", color: "#EF4444" },
};

const NewsTeaser = ({ activeIndex }) => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const headerRef = useRef(null);
  const buttonRef = useRef(null);
  const SECTION_INDEX = 3; // sesuaikan urutan
  const isActive = activeIndex === SECTION_INDEX;
  useEffect(() => {
  if (!isActive) return;

  const ctx = gsap.context(() => {
    const validCards = cardsRef.current.filter(Boolean);

    gsap.fromTo(headerRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    gsap.fromTo(validCards,
      { y: 80, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.15,
        duration: 0.9,
        ease: "back.out(0.3)"
      }
    );

    gsap.fromTo(buttonRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, delay: 0.6 }
    );
  }, sectionRef);

  return () => ctx.revert(); // 🔥 AUTO RESET SEMUA
}, [isActive]);

  return (
    <section
      ref={sectionRef}
      className="section"
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--color-bg-light)",
        paddingTop: "clamp(2rem, 5vh, 3rem)",
        paddingBottom: "clamp(2rem, 5vh, 3rem)",
        paddingLeft: "clamp(1rem, 4vw, 2.5rem)",
        paddingRight: "clamp(1rem, 4vw, 2.5rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decoration with aksen color */}
      <div
        style={{
          position: "absolute",
          top: "-50%",
          right: "-20%",
          width: "60%",
          height: "100%",
          background:
            "radial-gradient(circle, rgba(250, 204, 21, 0.05) 0%, rgba(250, 204, 21, 0) 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

      <div
        className="w-full mx-auto"
        style={{
          maxWidth: "1200px",
          width: "100%",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* HEADER */}
        <div
          ref={headerRef}
          style={{
            textAlign: "center",
            marginBottom: "clamp(2rem, 5vh, 3rem)",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(1.8rem, 5vw, 2.5rem)",
              fontWeight: "bold",
              color: "var(--color-teks)",
              marginBottom: "0.75rem",
              letterSpacing: "-0.02em",
            }}
          >
            Berita &amp; Artikel Terbaru
          </h2>
          <div
            style={{
              width: "60px",
              height: "4px",
              background:
                "linear-gradient(90deg, var(--color-utama), var(--color-aksen))",
              margin: "0 auto 1rem auto",
              borderRadius: "2px",
            }}
          />
          <p
            style={{
              color: "var(--color-teks-muted)",
              maxWidth: "600px",
              margin: "0 auto",
              fontSize: "clamp(0.9rem, 3vw, 1rem)",
              lineHeight: "1.6",
            }}
          >
            Update terbaru tentang kegiatan dan perkembangan{" "}
            <strong style={{ color: "var(--color-utama)" }}>
              AS PUTRA Group
            </strong>
          </p>
        </div>

        {/* GRID */}
        <div
          className="grid md:grid-cols-3 gap-6"
          style={{
            marginBottom: "clamp(2rem, 5vh, 3rem)",
          }}
        >
          {news.map((item, idx) => {
            const category =
              categoryConfig[item.category] || categoryConfig.event;
            return (
              <Link
                key={item.id}
                to={`/news/${item.id}`}
                ref={(el) => {
                  if (el) {
                    cardsRef.current[idx] = el;
                  }
                }}
                className="group bg-white rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
                style={{
                  display: "block",
                  textDecoration: "none",
                }}
              >
                {/* IMAGE */}
                <div
                  className="relative h-52 overflow-hidden"
                  style={{
                    background: "var(--color-bg-alt)",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />
                  {/* Category Badge */}
                  <div
                    style={{
                      position: "absolute",
                      top: "1rem",
                      left: "1rem",
                      background: category.color,
                      color: "white",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "9999px",
                      fontSize: "0.75rem",
                      fontWeight: "600",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      zIndex: 1,
                    }}
                  >
                    <span>{category.icon}</span>
                    <span>{category.label}</span>
                  </div>
                  {/* Date */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "1rem",
                      right: "1rem",
                      background: "rgba(15, 23, 42, 0.85)",
                      backdropFilter: "blur(8px)",
                      color: "white",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "9999px",
                      fontSize: "0.7rem",
                      fontWeight: "500",
                      zIndex: 1,
                    }}
                  >
                    📅 {item.date}
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-5 flex flex-col justify-between h-full">
                  <div>
                    <h3 className="font-bold text-lg mb-2 group-hover:text-[var(--color-utama)] transition">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">{item.desc}</p>
                  </div>

                  <div className="flex items-center gap-2 group-hover:gap-3 transition-all">
                    <span className="text-sm font-semibold text-[var(--color-utama)]">
                      Baca Selengkapnya
                    </span>
                    <span className="text-sm font-semibold text-[var(--color-utama)]">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* BUTTON */}
        <div ref={buttonRef} style={{ textAlign: "center" }}>
          <Link
            to="/news"
            className="inline-block px-6 py-3 rounded-full text-white font-semibold shadow-lg hover:scale-105 transition"
            style={{
              background:
                "linear-gradient(135deg, var(--color-utama), var(--color-utama-hover))",
              boxShadow: "0 10px 15px -3px rgba(30, 58, 138, 0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow =
                "0 20px 25px -5px rgba(30, 58, 138, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow =
                "0 10px 15px -3px rgba(30, 58, 138, 0.3)";
            }}
          >
            Lihat Semua Berita
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsTeaser;
