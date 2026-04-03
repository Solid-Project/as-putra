import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const news = [
  { id: 'csr-1', title: 'Pemberdayaan Peternak Mandiri', date: '24 Jan 2026', desc: 'Mendampingi 100+ peternak lokal Kuningan dengan pelatihan manajemen modern.', image: 'https://images.unsplash.com/photo-1589922583749-6b8473a85048?q=80&w=687&auto=format&fit=crop' },
  { id: 'csr-2', title: 'AS PUTRA Green: 5000 Pohon', date: '20 Jan 2026', desc: 'Aksi nyata pelestarian lingkungan dengan menanam 5000 bibit pohon pelindung.', image: 'https://plus.unsplash.com/premium_photo-1681140560806-928e9b8a9a20?q=80&w=1170&auto=format&fit=crop' },
  { id: 'comm-1', title: 'Kolaborasi Riset Pakan IPB', date: '10 Jan 2026', desc: 'Kerjasama strategis dengan universitas terkemuka untuk pakan ramah lingkungan.', image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80' }
];

const NewsTeaser = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animasi cards masuk
      gsap.fromTo(cardsRef.current,
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
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
      className="section min-h-screen flex flex-col justify-center px-5 bg-white"
      id="news-section"
    >
      <div className="text-center mb-12">
        <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-[var(--color-teks)] mb-4">
          Berita Terbaru
        </h2>
        <div className="w-16 h-0.5 bg-[var(--color-utama)] mx-auto"></div>
        <p className="text-[var(--color-teks-muted)] mt-4 max-w-[600px] mx-auto">
          Update terbaru tentang kegiatan dan perkembangan AS PUTRA Group
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
        {news.map((item, idx) => (
          <Link
            key={item.id}
            to={`/news/${item.id}`}
            ref={el => cardsRef.current[idx] = el}
            className="group overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            <div className="overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <span className="text-sm text-[var(--color-utama)] font-medium">{item.date}</span>
              <h4 className="text-xl font-bold text-[var(--color-teks)] mt-2 mb-3 group-hover:text-[var(--color-utama)] transition-colors">
                {item.title}
              </h4>
              <p className="text-sm text-[var(--color-teks-muted)] leading-relaxed">
                {item.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link
          to="/news"
          className="inline-block px-8 py-3 bg-transparent border-2 border-[var(--color-utama)] text-[var(--color-utama)] font-semibold rounded-md transition-all duration-300 hover:bg-[var(--color-utama)] hover:text-white hover:-translate-y-1 hover:shadow-lg"
        >
          Lihat Semua Berita
        </Link>
      </div>
    </section>
  );
};

export default NewsTeaser;