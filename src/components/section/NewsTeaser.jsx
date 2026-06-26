import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import logoIcon from "@/assets/logo.jpg";

const NewsTeaser = ({ activeIndex, index }) => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const contentGridRef = useRef(null);
  const buttonRef = useRef(null);

  const isActive = activeIndex === index;

  // Fetch Data Preview
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/news/all-news`);
        const json = await response.json();
        if (json.status && json.data.details) {
          setNewsData(json.data.details.slice(0, 3));
        }
      } catch (error) {
        console.error("Gagal memuat etalase berita:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  // GSAP Entrance Animation
  useEffect(() => {
    if (!isActive || loading || !newsData.length) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(headerRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", force3D: true })
        .fromTo(".teaser-hero-card", { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", force3D: true }, "-=0.25")
        .fromTo(".teaser-list-item", { x: 20, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.08, duration: 0.4, ease: "power2.out", force3D: true }, "-=0.4")
        .fromTo(buttonRef.current, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out", force3D: true }, "-=0.2");
    });

    return () => ctx.revert();
  }, [isActive, loading, newsData]);

  const featuredNews = newsData[0];
  const sideNewsList = newsData.slice(1, 3);

  return (
    <section
      ref={sectionRef}
      className="section relative w-full h-screen flex flex-col justify-between bg-[#070D22] overflow-hidden pt-12 pb-8 px-6 sm:px-8 md:px-12 lg:px-[8%] snap-start select-none"
      id={`section-${index}`}
    >
      {/* Background Decor Siluet */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.01] pointer-events-none -z-0">
        <img src={logoIcon} alt="" className="w-[55%] h-auto rotate-[-8deg] select-none grayscale" />
      </div>

      <div className="w-full relative z-10 flex flex-col max-w-[1440px] mx-auto h-full justify-between items-stretch gap-6 md:gap-8">

        {/* HEADER AREA */}
        <div ref={headerRef} className="text-left flex-shrink-0 mb-2 md:mb-4">
          <div className="inline-block px-3 py-0.5 border border-[#FFC700] rounded-full mb-2">
            <span className="text-[#FFC700] font-black tracking-[0.3em] uppercase text-[8px] lg:text-[9px]">
              Latest News & Activity
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 md:gap-12">
            <h2 className="text-2xl lg:text-4xl font-['Playfair_Display'] font-bold text-white tracking-tight">
              Jejak <span className="text-[#FFC700] italic font-normal">Informasi</span>
            </h2>
          </div>
        </div>

        {/* LOADING STATE */}
        {loading ? (
          <div className="text-center my-auto text-gray-500 font-bold uppercase tracking-widest text-[9px] animate-pulse">
            Menyelaraskan Etalase Berita...
          </div>
        ) : newsData.length > 0 ? (

          <div
            ref={contentGridRef}
            className="grid grid-cols-12 gap-4 md:gap-6 lg:gap-8 items-stretch my-auto max-h-[58vh] md:max-h-[45vh] w-full"
          >

            {/* COLUMN 1: BERITA UTAMA / HERO */}
            <div className="col-span-12 md:col-span-7 flex flex-col h-full">
              {featuredNews && (
                <Link
                  to={`/news/${featuredNews.slug?.split('/').pop()}`}
                  className="teaser-hero-card group relative flex flex-col gap-3 w-full h-full bg-white/[0.01] border border-white/10 rounded-xl p-3.5 shadow-[0_12px_30px_rgba(0,0,0,0.3)] hover:border-white/20 hover:bg-white/[0.02] transition-all duration-500 overflow-hidden"
                >
                  <div className="relative overflow-hidden rounded-lg bg-white/5 max-h-[160px] md:max-h-[150px] lg:max-h-[200px] w-full flex-shrink-0 aspect-[16/9] md:aspect-auto">
                    <img
                      src={featuredNews.thumbnail}
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-103"
                      alt={featuredNews.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070D22]/90 via-transparent" />
                    <span className="absolute top-2 left-2 bg-[#FFC700] text-[#070D22] text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded shadow-sm">
                      {featuredNews.categories?.[0]?.name || "Utama"}
                    </span>
                  </div>

                  {/* Teks Deskripsi */}
                  <div className="flex flex-col justify-between flex-1 pt-1 md:pt-2">
                    <div>
                      <span className="text-white/30 text-[8px] block mb-0.5 font-medium">
                        {featuredNews.created?.split(" ")[0]}
                      </span>
                      <h3 className="text-sm md:text-xs lg:text-base font-bold text-white leading-snug mb-1 group-hover:text-[#FFC700] transition-colors duration-300 font-['Playfair_Display'] line-clamp-2">
                        {featuredNews.title}
                      </h3>
                      <p className="text-gray-400 text-[11px] leading-relaxed line-clamp-2 opacity-45 font-light hidden md:block">
                        {featuredNews.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 text-[#FFC700] text-[8px] font-black uppercase tracking-widest mt-1">
                      <span>Baca Selengkapnya</span>
                      <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </div>
                  </div>
                </Link>
              )}
            </div>

            {/* COLUMN 2: SIDE LIST */}
            <div className="col-span-12 md:col-span-5 flex flex-col justify-between gap-2.5 md:gap-3 h-full">
              {sideNewsList.length > 0 ? (
                sideNewsList.map((item, idx) => (
                  <Link
                    key={`side-${item.slug || idx}`}
                    to={`/news/${item.slug?.split('/').pop()}`}
                    className="teaser-list-item group flex flex-row items-center gap-3.5 bg-white/[0.01] border border-white/5 p-3 rounded-xl hover:border-white/15 hover:bg-white/[0.02] transition-all duration-300 w-full flex-1 min-h-[65px] md:min-h-[70px]"
                  >
                    <div className="flex-1 min-w-0">
                      <span className="text-[#FFC700] text-[8px] font-bold uppercase tracking-wider block mb-0.5 opacity-80">
                        {item.categories?.[0]?.name || "Berita"}
                      </span>
                      <h4 className="text-xs lg:text-sm font-bold text-white leading-snug line-clamp-2 mb-1 group-hover:text-[#FFC700] transition-colors duration-300">
                        {item.title}
                      </h4>
                      <span className="text-[8px] text-white/30 font-medium">
                        {item.created?.split(" ")[0]}
                      </span>
                    </div>

                    <div className="flex-none w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-lg overflow-hidden bg-white/5 border border-white/10 relative">
                      <img
                        src={item.thumbnail}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-103"
                        alt=""
                      />
                    </div>
                  </Link>
                ))
              ) : (
                <div className="w-full h-full flex items-center justify-center border border-dashed border-white/10 rounded-xl bg-white/[0.01] p-4 text-center text-gray-500 text-[9px] font-bold uppercase tracking-widest">
                  Artikel segera hadir
                </div>
              )}
            </div>

          </div>
        ) : (
          <div className="text-center py-12 bg-white/[0.01] rounded-xl border border-dashed border-white/10 my-auto w-full">
            <p className="text-gray-500 font-bold uppercase tracking-widest text-[9px]">
              Belum ada berita terbaru
            </p>
          </div>
        )}

        {/* BUTTON REDIREKSI */}
        <div ref={buttonRef} className="flex justify-center flex-shrink-0 pt-4 pb-2">
          <Link
            to="/news"
            className="group relative px-8 py-3 bg-transparent border border-[#FFC700]/30 text-[#FFC700] font-bold text-[9px] uppercase tracking-[0.25em] rounded-full overflow-hidden transition-all duration-300 hover:border-[#FFC700] hover:shadow-[0_0_20px_rgba(255,199,0,0.2)] active:scale-95"
          >
            <span className="absolute inset-0 w-full h-full transition-transform duration-300 ease-out -translate-x-full group-hover:translate-x-0 bg-[#FFC700] -z-10" />
            <span className="relative z-10 group-hover:text-[#070D22] transition-colors duration-300">
              Lihat Semua Berita
            </span>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default NewsTeaser;