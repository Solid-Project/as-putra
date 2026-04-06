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
  csr: { label: 'CSR', color: 'bg-orange-100 text-orange-700', icon: '🌱' },
  event: { label: 'Acara', color: 'bg-blue-100 text-blue-700', icon: '🎉' },
  achievement: { label: 'Prestasi', color: 'bg-green-100 text-green-700', icon: '🏆' }
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
      // KUNCI: Menambahkan h-screen, min-h-screen, dan flex items-center
      className="section min-h-screen h-screen flex items-center py-20 px-5 bg-[var(--color-bg-light)] overflow-hidden" 
      data-theme="light" 
      data-title="Berita Terbaru"
    >
      <div className="max-w-[1200px] mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-extrabold mb-4" style={{ color: 'var(--color-teks)' }}>Berita Terbaru</h2>
          <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: 'var(--color-utama)' }}></div>
          <p className="mt-4 max-w-xl mx-auto text-lg" style={{ color: 'var(--color-teks-muted)' }}>
            Update terbaru tentang kegiatan dan perkembangan <strong style={{ color: 'var(--color-utama)' }}>AS PUTRA Group</strong>
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {news.map((item, idx) => (
            <Link key={item.id} to={`/news/${item.id}`} ref={el => cardsRef.current[idx] = el} 
              className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 cursor-pointer">

              <div className="relative overflow-hidden h-56">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
                <div className="absolute top-4 left-4 z-10">
                  <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold ${categoryConfig[item.category]?.color} shadow-md`}>
                    <span>{categoryConfig[item.category]?.icon}</span>
                    <span>{categoryConfig[item.category]?.label}</span>
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 z-10">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs font-medium text-[var(--color-teks)] shadow-md flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {item.date}
                  </div>
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between h-64">
                <h3 className="text-xl font-bold mb-3 text-[var(--color-teks)] group-hover:text-[var(--color-utama)] transition-colors line-clamp-2">{item.title}</h3>
                <p className="text-sm text-[var(--color-teks-muted)] leading-relaxed line-clamp-3 mb-4">{item.desc}</p>
                <div className="flex items-center gap-2 text-[var(--color-utama)] font-medium text-sm group-hover:gap-3 transition-all duration-300">
                  <span>Baca Selengkapnya</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--color-utama)] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </Link>
          ))}
        </div>

        <div className="text-center mt-12"> {/* mt dikecilkan sedikit agar muat di screen */}
          <Link
            to="/news"
            className="inline-block px-12 py-4 font-semibold rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1"
            style={{ backgroundColor: 'var(--color-utama)', color: 'white', boxShadow: '0 6px 20px rgba(37,99,235,0.4)' }}
          >
            Lihat Semua Berita
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsTeaser;