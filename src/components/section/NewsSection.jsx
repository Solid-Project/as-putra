import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logoIcon from "@/assets/logo.jpg";

gsap.registerPlugin(ScrollTrigger);

const NewsSection = ({ activeIndex }) => {
  const [newsData, setNewsData] = useState([]);
  const [categories, setCategories] = useState(["all"]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);
  const cardsRef = useRef([]);
  const siluetRefs = useRef([]);

  const COLOR_NAVY = "#0F1A3E";
  const COLOR_GOLD = "#FFC700";

  // 1. Fetching Data - Selaras dengan struktur JSON API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/news/all-news`);
        const json = await response.json();
        
        if (json.status && json.data.details) {
          const details = json.data.details;
          setNewsData(details);

          // Mengambil kategori unik dari array categories di setiap item
          const dynamicCats = [
            "all",
            ...new Set(
              details.flatMap((item) => 
                item.categories.map((cat) => cat.name.toLowerCase())
              )
            ),
          ];
          setCategories(dynamicCats);
        }
      } catch (error) {
        console.error("Error loading news list:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  // Filter logic - Mencocokkan dengan array categories
  const filteredNews = newsData.filter((item) => {
    const itemCategories = item.categories.map(c => c.name.toLowerCase());
    const categoryMatch =
      activeFilter === "all" || itemCategories.includes(activeFilter.toLowerCase());

    const searchMatch =
      searchQuery === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());

    return categoryMatch && searchMatch;
  });

  // 2. Animasi GSAP (Tetap sama)
  useEffect(() => {
    cardsRef.current = cardsRef.current.slice(0, filteredNews.length);
    const ctx = gsap.context(() => {
      siluetRefs.current.forEach((el, i) => {
        if (el) {
          gsap.to(el, {
            y: i % 2 === 0 ? -100 : 100,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      });

      if (filteredNews.length > 0) {
        gsap.fromTo(
          cardsRef.current.filter(Boolean),
          { y: 30, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.05,
            duration: 0.6,
            ease: "power2.out",
            overwrite: true,
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, [filteredNews, loading]);

  return (
    <section
      ref={sectionRef}
      className="section no-snap relative min-h-screen py-24 px-4 sm:px-6 md:px-8 lg:px-[5%] bg-white overflow-hidden"
      id="news-section"
      data-theme="light"
    >
      {/* LAYER SILUET */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[0, 1, 2, 3].map((i) => (
          <img
            key={i}
            ref={(el) => (siluetRefs.current[i] = el)}
            src={logoIcon}
            className={`absolute opacity-[0.03] grayscale ${
              i === 0 ? "-top-10 -left-20 w-[400px] rotate-12" :
              i === 1 ? "top-[30%] -right-32 w-[500px] -rotate-12" :
              i === 2 ? "bottom-0 -left-10 w-[450px] rotate-[20deg]" :
              "top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[800px]"
            }`}
            alt=""
          />
        ))}
      </div>

      <div className="w-full relative z-10">
        {/* HEADER */}
        <div ref={titleRef} className="mb-10 text-left">
          <div className="inline-block px-4 py-1 border border-[#FFC700] rounded-full mb-6">
            <span className="text-[#B8860B] font-black tracking-[0.3em] uppercase text-[9px]">
              Latest News & Activity
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h2 className={`text-5xl md:text-6xl font-['Playfair_Display'] font-bold text-[${COLOR_NAVY}]`}>
              Jejak <span className="text-[#FFC700] italic">Informasi</span>
            </h2>
            <div className="max-w-md border-l-4 border-[#FFC700] pl-6 mb-2">
              <p className="text-gray-500 text-sm md:text-base leading-relaxed font-medium">
                Dokumentasi langkah nyata <span className="font-bold" style={{ color: COLOR_NAVY }}>AS PUTRA Group</span> dalam inovasi industri dan kebermanfaatan sosial.
              </p>
            </div>
          </div>
        </div>

        {/* SEARCH & FILTER */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6 bg-gray-50/80 backdrop-blur-md p-4 rounded-[2rem] border border-gray-200 shadow-sm">
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                  activeFilter === cat
                    ? "bg-[#FFC700] text-[#0F1A3E] shadow-lg shadow-[#FFC700]/20 scale-105"
                    : "bg-white/50 text-gray-400 hover:text-[#0F1A3E] border border-transparent hover:border-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Cari berita..."
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white px-6 py-3.5 rounded-2xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FFC700]/20 w-full transition-all"
            />
          </div>
        </div>

        {/* GRID BERITA */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 items-start min-h-[400px]"
        >
          {loading ? (
            <div className="col-span-full text-center py-20 text-gray-400 font-bold uppercase tracking-widest animate-pulse">
              Menyelaraskan Data...
            </div>
          ) : filteredNews.length > 0 ? (
            filteredNews.map((item, idx) => (
              <Link
                key={item.slug || idx}
                // Mengambil slug dari URL lengkap di JSON
                to={`/news/${item.slug.split('/').pop()}`}
                ref={(el) => (cardsRef.current[idx] = el)}
                className="group flex flex-col w-full bg-white border border-gray-200/80 rounded-[2rem] p-4 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(15,26,62,0.10)] hover:-translate-y-2 transition-all duration-500"
              >
                {/* IMAGE */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-gray-100">
                  <img
                    src={item.thumbnail}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    alt={item.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1A3E]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Date dari field 'created' */}
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg">
                    <p className="text-[10px] font-black text-[#0F1A3E] tracking-wide uppercase">
                      {item.created.split(" ")[0]}
                    </p>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="pt-5 px-1 flex flex-col flex-1">
                  {/* Category - Mengambil kategori pertama */}
                  <span className="text-[#FFC700] text-[10px] font-black uppercase tracking-[0.25em] mb-3 block">
                    {item.categories[0]?.name}
                  </span>

                  {/* Title */}
                  <h3 className="text-[22px] font-bold text-[#0F1A3E] leading-tight mb-3 group-hover:text-[#B8860B] transition-colors duration-300 line-clamp-2 font-['Playfair_Display']">
                    {item.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                    {item.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="mt-auto flex items-center gap-3">
                    <div className="h-[1.5px] w-8 bg-[#FFC700] group-hover:w-14 transition-all duration-500"></div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0F1A3E]">
                      Read Article
                    </span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
              <p className="text-gray-400 font-bold uppercase tracking-widest">
                Berita tidak ditemukan
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;