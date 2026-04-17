import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const news = [
  { id: 'csr-1', category: 'csr', title: 'Pemberdayaan Peternak Mandiri', date: '24 Jan 2026', desc: 'Mendampingi 100+ peternak lokal Kuningan dengan pelatihan manajemen modern.', image: 'https://images.unsplash.com/photo-1589922583749-6b8473a85048?q=80&w=687&auto=format&fit=crop' },
  { id: 'csr-2', category: 'csr', title: 'AS PUTRA Green: 5000 Pohon', date: '20 Jan 2026', desc: 'Aksi nyata pelestarian lingkungan dengan menanam 5000 bibit pohon pelindung.', image: 'https://plus.unsplash.com/premium_photo-1681140560806-928e9b8a9a20?q=80&w=1170&auto=format&fit=crop' },
  { id: 'comm-1', category: 'event', title: 'Kolaborasi Riset Pakan IPB', date: '10 Jan 2026', desc: 'Kerjasama strategis dengan universitas terkemuka untuk pakan ramah lingkungan.', image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80' }
];

const categoryConfig = {
  csr: { label: 'CSR', icon: '🌱' },
  event: { label: 'Acara', icon: '🎉' },
  achievement: { label: 'Prestasi', icon: '🏆' }
};

const NewsTeaser = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardsRef.current,
        { y: 60, opacity: 0, scale: 0.92, rotateX: 10 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotateX: 0,
          stagger: 0.08,
          duration: 0.7,
          ease: "back.out(0.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "bottom 70%",
            toggleActions: "play none none reverse",
            immediateRender: false,
            invalidateOnRefresh: true
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="section flex items-center overflow-hidden"
      data-theme="light" 
      data-title="Berita Terbaru"
      style={{
        minHeight: "100vh",
        height: "auto",
        backgroundColor: "var(--color-bg-light)",
        paddingTop: "clamp(1.5rem, 3vh, 2.5rem)",
        paddingBottom: "clamp(1.5rem, 3vh, 2.5rem)",
        paddingLeft: "clamp(1rem, 4vw, 2.5rem)",
        paddingRight: "clamp(1rem, 4vw, 2.5rem)",
      }}
    >
      <div className="w-full" style={{ maxWidth: "clamp(300px, 100%, 1200px)", margin: "0 auto" }}>
        
        {/* HEADER */}
        <div style={{ marginBottom: "clamp(1.5rem, 4vh, 2.5rem)", textAlign: "center" }}>
          <h2 
            className="font-['Playfair_Display'] font-extrabold"
            style={{ 
              color: "var(--color-teks)",
              fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
              marginBottom: "clamp(0.5rem, 1.5vh, 0.75rem)",
            }}
          >
            Berita Terbaru
          </h2>
          <div 
            style={{ 
              backgroundColor: "var(--color-utama)",
              width: "clamp(50px, 12vw, 80px)",
              height: "clamp(2px, 0.4vw, 3px)",
              marginLeft: "auto",
              marginRight: "auto",
              borderRadius: "9999px",
            }}
          />
          <p 
            className="mx-auto"
            style={{ 
              color: "var(--color-teks-muted)",
              fontSize: "clamp(0.85rem, 2vw, 1.1rem)",
              maxWidth: "clamp(280px, 90%, 600px)",
              marginTop: "clamp(0.75rem, 2vh, 1rem)",
            }}
          >
            Update terbaru tentang kegiatan dan perkembangan{" "}
            <strong style={{ color: "var(--color-utama)" }}>AS PUTRA Group</strong>
          </p>
        </div>

        {/* CARDS GRID */}
        <div 
          className="grid md:grid-cols-3"
          style={{ gap: "clamp(1rem, 2.5vw, 2rem)" }}
        >
          {news.map((item, idx) => (
            <Link 
              key={item.id} 
              to={`/news/${item.id}`} 
              ref={el => cardsRef.current[idx] = el} 
              className="group relative bg-white overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer"
              style={{ 
                borderRadius: "clamp(12px, 2.5vw, 16px)",
              }}
            >
              {/* Image Container */}
              <div 
                className="relative overflow-hidden"
                style={{ height: "clamp(180px, 45vw, 220px)" }}
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span 
                    className="inline-flex items-center gap-1 rounded-full text-xs font-semibold shadow-md"
                    style={{
                      backgroundColor: item.category === 'csr' ? '#fff3e0' : '#e3f2fd',
                      color: item.category === 'csr' ? '#e65100' : '#1565c0',
                      padding: "clamp(0.2rem, 0.8vw, 0.4rem) clamp(0.5rem, 1.5vw, 0.75rem)",
                      fontSize: "clamp(0.65rem, 1.5vw, 0.75rem)",
                    }}
                  >
                    <span>{categoryConfig[item.category]?.icon}</span>
                    <span>{categoryConfig[item.category]?.label}</span>
                  </span>
                </div>

                {/* Date Badge */}
                <div className="absolute bottom-4 right-4 z-10">
                  <div 
                    className="backdrop-blur-sm rounded-lg shadow-md flex items-center gap-1 font-medium"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.9)",
                      color: "var(--color-teks)",
                      padding: "clamp(0.2rem, 0.8vw, 0.4rem) clamp(0.5rem, 1.5vw, 0.75rem)",
                      fontSize: "clamp(0.65rem, 1.5vw, 0.75rem)",
                    }}
                  >
                    <svg 
                      style={{ width: "clamp(10px, 2vw, 12px)", height: "clamp(10px, 2vw, 12px)" }}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {item.date}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div 
                className="flex flex-col justify-between"
                style={{ 
                  padding: "clamp(1rem, 3vw, 1.5rem)",
                  minHeight: "clamp(180px, 45vw, 220px)",
                }}
              >
                <h3 
                  className="font-bold transition-colors line-clamp-2"
                  style={{ 
                    color: "var(--color-teks)",
                    fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
                    marginBottom: "clamp(0.5rem, 1.5vh, 0.75rem)",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "var(--color-utama)"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "var(--color-teks)"}
                >
                  {item.title}
                </h3>
                <p 
                  className="leading-relaxed line-clamp-3"
                  style={{ 
                    color: "var(--color-teks-muted)",
                    fontSize: "clamp(0.75rem, 1.8vw, 0.875rem)",
                    marginBottom: "clamp(0.75rem, 2vh, 1rem)",
                  }}
                >
                  {item.desc}
                </p>
                <div 
                  className="flex items-center gap-2 font-medium transition-all duration-300 group-hover:gap-3"
                  style={{ 
                    color: "var(--color-utama)",
                    fontSize: "clamp(0.75rem, 1.8vw, 0.875rem)",
                  }}
                >
                  <span>Baca Selengkapnya</span>
                  <svg 
                    className="group-hover:translate-x-1 transition-transform duration-300"
                    style={{ width: "clamp(14px, 2vw, 16px)", height: "clamp(14px, 2vw, 16px)" }}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>

              {/* Bottom line animation */}
              <div 
                className="absolute bottom-0 left-0 right-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ 
                  height: "clamp(2px, 0.4vw, 3px)",
                  background: `linear-gradient(to right, transparent, var(--color-utama), transparent)`,
                }}
              />
            </Link>
          ))}
        </div>

        {/* BUTTON */}
        <div style={{ marginTop: "clamp(1.5rem, 4vh, 2.5rem)", textAlign: "center" }}>
          <Link
            to="/news"
            className="inline-block font-semibold rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1"
            style={{ 
              backgroundColor: "var(--color-utama)", 
              color: "white",
              paddingTop: "clamp(0.6rem, 1.8vh, 0.9rem)",
              paddingBottom: "clamp(0.6rem, 1.8vh, 0.9rem)",
              paddingLeft: "clamp(1.5rem, 5vw, 2.5rem)",
              paddingRight: "clamp(1.5rem, 5vw, 2.5rem)",
              fontSize: "clamp(0.85rem, 2vw, 1rem)",
              boxShadow: "0 6px 20px rgba(30,58,138,0.4)",
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