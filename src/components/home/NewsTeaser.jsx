import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import logoIcon from "@/assets/logo.jpg";

const news = [
  {
    id: "csr-1",
    category: "csr",
    title: "Pemberdayaan Peternak Mandiri",
    date: "24 Jan 2026",
    desc: "Mendampingi 100+ peternak lokal Kuningan dengan pelatihan manajemen modern.",
    image: "https://images.unsplash.com/photo-1589922583749-6b8473a85048?q=80&w=687&auto=format&fit=crop",
  },
  {
    id: "csr-2",
    category: "csr",
    title: "AS PUTRA Green: 5000 Pohon",
    date: "20 Jan 2026",
    desc: "Aksi nyata pelestarian lingkungan dengan menanam 5000 bibit pohon pelindung.",
    image: "https://plus.unsplash.com/premium_photo-1681140560806-928e9b8a9a20?q=80&w=1170&auto=format&fit=crop",
  },
  {
    id: "comm-1",
    category: "event",
    title: "Kolaborasi Riset Pakan IPB",
    date: "10 Jan 2026",
    desc: "Kerjasama strategis dengan universitas terkemuka untuk pakan ramah lingkungan.",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80",
  },
];

const categoryConfig = {
  csr: { label: "CSR", icon: "🌱" },
  event: { label: "Acara", icon: "🎉" },
  achievement: { label: "Prestasi", icon: "🏆" },
};

const NewsTeaser = ({ activeIndex, index }) => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const headerRef = useRef(null);
  const buttonRef = useRef(null);
  
  const isActive = activeIndex === index;

  useEffect(() => {
    if (!isActive) return;

    const ctx = gsap.context(() => {
      const validCards = cardsRef.current.filter(Boolean);

      gsap.fromTo(headerRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );

      gsap.fromTo(validCards,
        { y: 40, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          duration: 0.7,
          ease: "power2.out",
          delay: 0.2
        }
      );

      gsap.fromTo(buttonRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.5 }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isActive]);

  return (
    <section
      ref={sectionRef}
      className="section relative w-full h-[100vh] flex items-center justify-center bg-[#0F1A3E] overflow-hidden"
      id={`section-${index}`}
    >
      {/* Background Decor */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.025] pointer-events-none -z-0">
        <img src={logoIcon} alt="" className="w-[85%] h-auto rotate-[-12deg] scale-110" />
      </div>

      {/* Main Container - justify-center dikombinasikan dengan padding yang lebih ketat */}
      <div className="w-full max-w-[1300px] h-full max-h-[90vh] mx-auto px-6 md:px-12 z-10 flex flex-col justify-center">
        
        {/* HEADER - Margin bottom dikurangi sedikit agar lebih rapat */}
        <div ref={headerRef} className="mb-6 lg:mb-10">
          <span className="text-[#FFC700] font-black tracking-[0.4em] uppercase text-[10px] md:text-xs block mb-2">
            Latest Updates
          </span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-['Playfair_Display'] font-bold text-white leading-tight">
              Berita & <span className="text-[#FFC700] italic">Artikel</span>
            </h2>
            <p className="text-gray-400 max-w-sm text-xs md:text-sm leading-relaxed border-l border-[#FFC700]/30 pl-5 opacity-80">
              Informasi terkini mengenai inovasi dan kontribusi sosial 
              <span className="text-white font-semibold"> AS PUTRA Group</span>.
            </p>
          </div>
        </div>

        {/* GRID - Margin bottom dikurangi secara signifikan (dari mb-10/14 menjadi mb-6/8) */}
        <div className="grid md:grid-cols-3 gap-5 lg:gap-8 mb-6 lg:mb-8">
          {news.slice(0, 3).map((item, idx) => (
            <Link
              key={item.id}
              to={`/news/${item.id}`}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="group relative flex flex-col bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:bg-white/10 hover:border-white/20 shadow-2xl shadow-black/20"
            >
              {/* IMAGE AREA */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1A3E]/80 via-transparent to-transparent opacity-80" />
                
                <div className="absolute top-3 left-3 bg-[#FFC700] text-[#0F1A3E] px-2.5 py-1 rounded-full text-[9px] font-black tracking-wider uppercase">
                  {categoryConfig[item.category]?.label || "News"}
                </div>
                <div className="absolute bottom-3 left-4 text-[9px] font-bold text-white/70">
                  📅 {item.date}
                </div>
              </div>

              {/* CONTENT AREA */}
              <div className="p-5 lg:p-6 flex-1 flex flex-col">
                <h3 className="text-white font-bold text-base lg:text-lg mb-2 leading-tight group-hover:text-[#FFC700] transition-colors duration-300 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-[11px] lg:text-xs leading-relaxed line-clamp-2 mb-4 opacity-80">
                  {item.desc}
                </p>
                
                <div className="mt-auto flex items-center gap-2 text-[#FFC700] text-[10px] font-black uppercase tracking-[0.15em]">
                  <span>Read More</span>
                  <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* FOOTER BUTTON - Sekarang lebih dekat dengan Grid */}
        <div ref={buttonRef} className="flex justify-center">
          <Link
            to="/news"
            className="group relative px-8 py-3.5 bg-transparent border border-[#FFC700]/40 text-[#FFC700] font-bold text-[10px] uppercase tracking-[0.3em] rounded-full overflow-hidden transition-all duration-500 hover:border-[#FFC700] hover:shadow-[0_0_30px_rgba(255,199,0,0.15)]"
          >
            <span className="relative z-10">Explores All News</span>
            <div className="absolute inset-0 bg-[#FFC700] translate-y-full group-hover:translate-y-0 transition-transform duration-500 -z-0" />
            <style dangerouslySetInnerHTML={{ __html: `
              .group:hover span { color: #0F1A3E; }
            `}} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsTeaser;