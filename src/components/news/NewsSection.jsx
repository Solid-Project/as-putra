// src/components/news/NewsSection.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logoIcon from "@/assets/logo.jpg"; // Mengikuti aset yang sama dengan Teaser
gsap.registerPlugin(ScrollTrigger);
const newsData = [
  // CSR
  {
    id: "csr-1",
    category: "csr",
    title: "Pemberdayaan Peternak Mandiri",
    desc: "Mendampingi 100+ peternak lokal Kuningan dengan pelatihan manajemen modern untuk meningkatkan kemandirian.",
    image:
      "https://images.unsplash.com/photo-1589922583749-6b8473a85048?q=80&w=687&auto=format&fit=crop",
    date: "24 Jan 2026",
  },
  {
    id: "csr-2",
    category: "csr",
    title: "AS PUTRA Green: 5000 Pohon",
    desc: "Aksi nyata pelestarian lingkungan dengan menanam 5000 bibit pohon pelindung di area resapan air Gunung Ciremai.",
    image:
      "https://plus.unsplash.com/premium_photo-1681140560806-928e8b9a9a20?q=80&w=1170&auto=format&fit=crop",
    date: "20 Jan 2026",
  },
  {
    id: "csr-3",
    category: "csr",
    title: "Bantuan Kemanusiaan",
    desc: "Menyalurkan bantuan logistik dan obat-obatan tanggap darurat untuk korban bencana alam di wilayah Jawa Barat.",
    image:
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=600&q=80",
    date: "15 Jan 2026",
  },
  // Event
  {
    id: "comm-1",
    category: "event",
    title: "Kolaborasi Riset Pakan",
    desc: "Kerjasama strategis dengan universitas terkemuka untuk mengembangkan formula pakan ternak ramah lingkungan.",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80",
    date: "10 Jan 2026",
  },
  {
    id: "comm-2",
    category: "event",
    title: "Gathering Mitra Nasional",
    desc: 'Mempererat sinergi dengan 500+ mitra bisnis dari seluruh Indonesia dalam acara tahunan "Tumbuh Bersama".',
    image: "/img/team.jpeg",
    date: "5 Jan 2026",
  },
  {
    id: "comm-3",
    category: "event",
    title: "Pelatihan Bisnis UMKM",
    desc: "Workshop digital marketing dan manajemen keuangan untuk meningkatkan daya saing UMKM binaan AS PUTRA.",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=80",
    date: "28 Des 2025",
  },
  // Achievement
  {
    id: "biz-1",
    category: "achievement",
    title: "Pabrik Pakan Unit IV",
    desc: "Peresmian fasilitas produksi otomatisasi penuh dengan kapasitas 50 ton/jam untuk memenuhi permintaan pasar.",
    image:
      "https://images.unsplash.com/photo-1569466593977-94ee7ed02ec9?q=80&w=1632&auto=format&fit=crop",
    date: "20 Des 2025",
  },
  {
    id: "biz-2",
    category: "achievement",
    title: "Smart Farming IoT",
    desc: "Transformasi digital di Internal Farm menggunakan sensor IoT untuk monitoring suhu dan kelembaban realtime.",
    image:
      "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=600&q=80",
    date: "15 Des 2025",
  },
  {
    id: "biz-3",
    category: "achievement",
    title: "Grand Opening Luxury Villa",
    desc: "Meluncurkan Luxury villa terbaru di pusat Pangandaran.",
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80",
    date: "10 Des 2025",
  },
];

const NewsSection = ({ activeIndex }) => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const siluetRefs = useRef([]); // Ref untuk banyak siluet

  const filteredNews = newsData.filter(
    (item) =>
      (activeFilter === "all" || item.category === activeFilter) &&
      (searchQuery === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Animasi Parallax untuk Siluet
      siluetRefs.current.forEach((el, i) => {
        gsap.to(el, {
          y: (i % 2 === 0 ? -100 : 100), // Arah gerak selang-seling
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // 2. Animasi Masuk Content (hanya jalan saat section aktif)
      if (activeIndex === 1) {
        gsap.fromTo(titleRef.current, 
          { y: 50, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
        );
        
        gsap.fromTo(cardsRef.current, 
          { y: 100, opacity: 0 }, 
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power2.out", delay: 0.2 }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [activeIndex, filteredNews]);

  return (
    <section
      ref={sectionRef}
      className="section no-snap relative min-h-screen py-24 px-6 bg-white overflow-hidden"
      data-title="News & Activity"
      data-theme="light"
    >
      {/* LAYER SILUET - Tersebar di latar belakang */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Siluet 1 - Kiri Atas */}
        <img 
          ref={el => siluetRefs.current[0] = el}
          src={logoIcon} 
          className="absolute -top-10 -left-20 w-[400px] opacity-[0.04] grayscale rotate-12" 
          alt="" 
        />
        {/* Siluet 2 - Kanan Tengah */}
        <img 
          ref={el => siluetRefs.current[1] = el}
          src={logoIcon} 
          className="absolute top-[30%] -right-32 w-[500px] opacity-[0.03] grayscale -rotate-12" 
          alt="" 
        />
        {/* Siluet 3 - Kiri Bawah */}
        <img 
          ref={el => siluetRefs.current[2] = el}
          src={logoIcon} 
          className="absolute bottom-0 -left-10 w-[450px] opacity-[0.04] grayscale rotate-[20deg]" 
          alt="" 
        />
        {/* Siluet 4 - Tengah (Sangat Besar) */}
        <img 
          ref={el => siluetRefs.current[3] = el}
          src={logoIcon} 
          className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[800px] opacity-[0.02] grayscale" 
          alt="" 
        />
      </div>

      <div className="max-w-[1300px] mx-auto relative z-10">
        {/* HEADER */}
        <div ref={titleRef} className="mb-20 text-center md:text-left">
          <div className="inline-block px-4 py-1 border border-[#FFC700] rounded-full mb-6">
            <span className="text-[#B8860B] font-bold tracking-[0.3em] uppercase text-[9px]">
              Latest News & Activity
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h2 className="text-5xl md:text-6xl font-['Playfair_Display'] font-bold text-[#0F1A3E]">
              Jejak <span className="text-[#FFC700] italic">Informasi</span>
            </h2>
            <p className="text-gray-500 max-w-md text-sm md:text-base leading-relaxed border-l-4 border-[#FFC700] pl-6">
              Dokumentasi langkah nyata <span className="text-[#0F1A3E] font-bold">AS PUTRA Group</span> 
              dalam inovasi industri dan kebermanfaatan sosial bagi masyarakat.
            </p>
          </div>
        </div>

        {/* SEARCH & FILTER AREA */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6 bg-gray-50/50 backdrop-blur-sm p-4 rounded-3xl border border-gray-100">
           <div className="flex flex-wrap gap-2">
             {["all", "event", "achievement", "csr"].map((cat) => (
               <button
                 key={cat}
                 onClick={() => setActiveFilter(cat)}
                 className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                   activeFilter === cat ? "bg-[#FFC700] text-[#0F1A3E]" : "hover:bg-white text-gray-400"
                 }`}
               >
                 {cat}
               </button>
             ))}
           </div>
           <input 
              type="text" 
              placeholder="Cari berita..." 
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white px-6 py-3 rounded-2xl text-sm border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#FFC700]/20 w-full md:w-64"
           />
        </div>

        {/* GRID BERITA */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {filteredNews.map((item, idx) => (
            <Link
              key={item.id}
              to={`/news/${item.id}`}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="group block"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] mb-6 shadow-xl shadow-gray-200/50">
                <img
                  src={item.image}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  alt=""
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1A3E]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Float Date */}
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl">
                   <p className="text-[10px] font-black text-[#0F1A3E]">{item.date}</p>
                </div>
              </div>

              <div className="px-2">
                <h3 className="text-xl font-bold text-[#0F1A3E] leading-tight mb-3 group-hover:text-[#FFC700] transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                  {item.desc}
                </p>
                <div className="flex items-center gap-3">
                   <div className="h-[1px] w-8 bg-[#FFC700] group-hover:w-12 transition-all"></div>
                   <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#0F1A3E]">Read Article</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;