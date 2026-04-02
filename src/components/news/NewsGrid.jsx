// src/components/news/NewsGrid.jsx
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const newsData = [
  // CSR Items
  {
    id: 'csr-1',
    category: 'csr',
    title: 'Pemberdayaan Peternak Mandiri',
    desc: 'Mendampingi 100+ peternak lokal Kuningan dengan pelatihan manajemen modern untuk meningkatkan kemandirian.',
    image: 'https://images.unsplash.com/photo-1589922583749-6b8473a85048?q=80&w=687&auto=format&fit=crop',
    date: '24 Jan 2026'
  },
  {
    id: 'csr-2',
    category: 'csr',
    title: 'AS PUTRA Green: 5000 Pohon',
    desc: 'Aksi nyata pelestarian lingkungan dengan menanam 5000 bibit pohon pelindung di area resapan air Gunung Ciremai.',
    image: 'https://plus.unsplash.com/premium_photo-1681140560806-928e8b9a9a20?q=80&w=1170&auto=format&fit=crop',
    date: '20 Jan 2026'
  },
  {
    id: 'csr-3',
    category: 'csr',
    title: 'Bantuan Kemanusiaan',
    desc: 'Menyalurkan bantuan logistik dan obat-obatan tanggap darurat untuk korban bencana alam di wilayah Jawa Barat.',
    image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=600&q=80',
    date: '15 Jan 2026'
  },
  // Community Items (Acara)
  {
    id: 'comm-1',
    category: 'event',
    title: 'Kolaborasi Riset Pakan',
    desc: 'Kerjasama strategis dengan universitas terkemuka untuk mengembangkan formula pakan ternak ramah lingkungan.',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80',
    date: '10 Jan 2026'
  },
  {
    id: 'comm-2',
    category: 'event',
    title: 'Gathering Mitra Nasional',
    desc: 'Mempererat sinergi dengan 500+ mitra bisnis dari seluruh Indonesia dalam acara tahunan "Tumbuh Bersama".',
    image: '/img/team.jpeg',
    date: '5 Jan 2026'
  },
  {
    id: 'comm-3',
    category: 'event',
    title: 'Pelatihan Bisnis UMKM',
    desc: 'Workshop digital marketing dan manajemen keuangan untuk meningkatkan daya saing UMKM binaan AS PUTRA.',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=80',
    date: '28 Des 2025'
  },
  // Business Items (Prestasi)
  {
    id: 'biz-1',
    category: 'achievement',
    title: 'Pabrik Pakan Unit IV',
    desc: 'Peresmian fasilitas produksi otomatisasi penuh dengan kapasitas 50 ton/jam untuk memenuhi permintaan pasar.',
    image: 'https://images.unsplash.com/photo-1569466593977-94ee7ed02ec9?q=80&w=1632&auto=format&fit=crop',
    date: '20 Des 2025'
  },
  {
    id: 'biz-2',
    category: 'achievement',
    title: 'Smart Farming IoT',
    desc: 'Transformasi digital di Internal Farm menggunakan sensor IoT untuk monitoring suhu dan kelembaban realtime.',
    image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=600&q=80',
    date: '15 Des 2025'
  },
  {
    id: 'biz-3',
    category: 'achievement',
    title: 'Grand Opening Luxury Villa',
    desc: 'Meluncurkan Luxury villa terbaru di pusat Pangandaran.',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80',
    date: '10 Des 2025'
  }
];

const categoryConfig = {
  all: { label: 'Semua', color: 'bg-gray-100 text-gray-700', icon: '📰' },
  event: { label: 'Acara', color: 'bg-blue-100 text-blue-700', icon: '🎉' },
  achievement: { label: 'Prestasi', color: 'bg-green-100 text-green-700', icon: '🏆' },
  csr: { label: 'CSR', color: 'bg-orange-100 text-orange-700', icon: '🌱' }
};

const NewsGrid = ({ activeFilter, searchQuery }) => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const titleRef = useRef(null);

  // Filter data berdasarkan activeFilter dan searchQuery
  const filteredNews = newsData.filter((item) => {
    const matchesCategory = activeFilter === 'all' || item.category === activeFilter;
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Reset cardsRef ketika filter berubah
  useEffect(() => {
    cardsRef.current = [];
  }, [activeFilter, searchQuery]);

  useEffect(() => {
    // Bersihkan ScrollTrigger sebelumnya untuk section ini
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars.trigger === sectionRef.current) trigger.kill();
    });

    const ctx = gsap.context(() => {
      
      // Animasi judul section
      if (titleRef.current) {
        gsap.fromTo(titleRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
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
      }

      // Animasi cards dengan stagger (hanya jika ada cards)
      if (cardsRef.current.length > 0) {
        gsap.fromTo(cardsRef.current,
          { 
            y: 60, 
            opacity: 0, 
            scale: 0.92,
            rotateX: 10
          },
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
      }

    }, sectionRef);

    return () => ctx.revert();
  }, [filteredNews]); // Re-run animasi ketika filteredNews berubah

  if (filteredNews.length === 0) {
    return (
      <section 
        ref={sectionRef}
        className="section py-20 px-5 bg-white min-h-[50vh] flex items-center justify-center"
        id="news-grid-empty"
      >
        <div className="text-center">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-xl font-semibold text-[var(--color-teks)] mb-2">Tidak Ada Berita</h3>
          <p className="text-[var(--color-teks-muted)]">Belum ada berita yang sesuai dengan filter yang dipilih.</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-2 bg-[var(--color-utama)] text-white rounded-full text-sm hover:bg-[var(--color-utama-hover)] transition-all"
          >
            Reset Filter
          </button>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={sectionRef} 
      className="section py-20 px-5 bg-gradient-to-b from-white to-gray-50"
      id="news-grid"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header Grid */}
        <div ref={titleRef} className="text-center mb-12">
          <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl text-[var(--color-teks)] mb-3">
            Berita Terkini
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[var(--color-utama)] to-transparent mx-auto"></div>
          <p className="text-[var(--color-teks-muted)] mt-3 text-sm">
            Menampilkan {filteredNews.length} berita
          </p>
        </div>

        {/* Grid Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((item, idx) => (
            <Link
              key={`${item.id}-${activeFilter}`}
              to={`/news/${item.id}`}
              ref={el => cardsRef.current[idx] = el}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden h-56">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold ${categoryConfig[item.category]?.color || categoryConfig.all.color} shadow-md`}>
                    <span>{categoryConfig[item.category]?.icon || categoryConfig.all.icon}</span>
                    <span>{categoryConfig[item.category]?.label || item.category}</span>
                  </span>
                </div>
                
                {/* Date Badge */}
                <div className="absolute bottom-4 right-4 z-10">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs font-medium text-gray-700 shadow-md">
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {item.date}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-[var(--color-teks)] mb-3 line-clamp-2 group-hover:text-[var(--color-utama)] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--color-teks-muted)] leading-relaxed line-clamp-3 mb-4">
                  {item.desc}
                </p>
                
                {/* Read More Link */}
                <div className="flex items-center gap-2 text-[var(--color-utama)] font-medium text-sm group-hover:gap-3 transition-all duration-300">
                  <span>Baca Selengkapnya</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>

              {/* Decorative Border Bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--color-utama)] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default NewsGrid;