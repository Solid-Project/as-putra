import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useSectionAnimation } from "@/hooks/useSectionAnimation";
import logoIcon from "@/assets/logo.jpg";

const NewsTeaser = ({ activeIndex, index }) => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const contentGridRef = useRef(null);
  const buttonRef = useRef(null);

  const isActive = activeIndex === index;

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

  useSectionAnimation(sectionRef, () => {
    if (!isActive || loading || !newsData.length) return;

    const tl = gsap.timeline();
    tl.fromTo(headerRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", force3D: true })
      .fromTo(".teaser-hero-card", { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", force3D: true }, "-=0.25")
      .fromTo(".teaser-list-item", { x: 20, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.08, duration: 0.4, ease: "power2.out", force3D: true }, "-=0.4")
      .fromTo(buttonRef.current, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out", force3D: true }, "-=0.2");
  }, [isActive, loading, newsData]);

  const featuredNews = newsData[0];
  const sideNewsList = newsData.slice(1, 3);

  return (
    <section
      ref={sectionRef}
      className="section relative w-full h-screen flex flex-col bg-[#070D22] overflow-hidden py-8 px-6 sm:px-8 md:px-12 lg:px-[8%] snap-start select-none"
      id={`section-${index}`}
    >
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.01] pointer-events-none -z-0">
        <img src={logoIcon} alt="" loading="lazy" className="w-[55%] h-auto rotate-[-8deg] select-none grayscale" />
      </div>

      <div className="relative z-10 flex flex-col max-w-[1440px] mx-auto w-full flex-1 min-h-0">

        <div ref={headerRef} className="flex-shrink-0">
          <div className="inline-block px-3 py-0.5 border border-[#FFC700] rounded-full mb-2">
            <span className="text-[#FFC700] font-black tracking-[0.3em] uppercase text-[8px] lg:text-[9px]">
              Latest News & Activity
            </span>
          </div>
          <h2 className="text-2xl lg:text-4xl font-['Playfair_Display'] font-bold text-white tracking-tight">
            Jejak <span className="text-[#FFC700] italic font-normal">Informasi</span>
          </h2>
        </div>

        {loading ? (
          <div className="flex-1 flex items-center justify-center text-gray-500 font-bold uppercase tracking-widest text-[9px] animate-pulse">
            Menyelaraskan Etalase Berita...
          </div>
        ) : newsData.length > 0 ? (
          <div
            ref={contentGridRef}
            className="grid grid-cols-12 gap-4 md:gap-6 flex-1 min-h-0 py-4"
          >
            <div className="col-span-12 md:col-span-8">
              {featuredNews && (
                <Link
                  to={`/news/${featuredNews.slug?.split('/').pop()}`}
                  className="teaser-hero-card group relative flex flex-col w-full bg-white/[0.01] border border-white/10 rounded-xl p-3 shadow-[0_12px_30px_rgba(0,0,0,0.3)] hover:border-white/20 hover:bg-white/[0.02] transition-all duration-500 overflow-hidden"
                >
                  <div className="relative overflow-hidden rounded-lg bg-white/5 w-full h-44 md:h-[280px] flex-shrink-0">
                    <img
                      src={featuredNews.thumbnail}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-103"
                      alt={featuredNews.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070D22]/90 via-transparent" />
                    <span className="absolute top-2 left-2 bg-[#FFC700] text-[#070D22] text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded shadow-sm">
                      {featuredNews.categories?.[0]?.name || "Utama"}
                    </span>
                  </div>

                  <div className="flex flex-col justify-end flex-1 min-h-0 pt-2">
                    <span className="text-white/40 text-[8px] font-medium">
                      {featuredNews.created?.split(" ")[0]}
                    </span>
                    <h3 className="text-sm md:text-xs lg:text-sm font-bold text-white leading-tight mt-1 mb-1 group-hover:text-[#FFC700] transition-colors duration-300 font-['Playfair_Display'] line-clamp-2">
                      {featuredNews.title}
                    </h3>
                    <p className="text-gray-400 text-[10px] leading-relaxed line-clamp-2 opacity-60 font-light mb-1 hidden md:block">
                      {featuredNews.excerpt}
                    </p>

                    <div className="flex items-center gap-1 text-[#FFC700] text-[8px] font-black uppercase tracking-widest mt-auto">
                      <span>Baca Selengkapnya</span>
                      <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </div>
                  </div>
                </Link>
              )}
            </div>

            <div className="col-span-12 md:col-span-4 flex flex-col gap-3">
              {sideNewsList.map((item, idx) => (
                <Link
                  key={`side-${item.slug || idx}`}
                  to={`/news/${item.slug?.split('/').pop()}`}
                  className="teaser-list-item group flex flex-row items-center gap-2 bg-white/[0.01] border border-white/5 p-2.5 rounded-lg hover:border-white/15 hover:bg-white/[0.02] transition-all duration-300 w-full"
                >
                  <div className="flex-1 min-w-0">
                    <span className="text-[#FFC700] text-[7px] font-bold uppercase tracking-wider block mb-0.5 opacity-80">
                      {item.categories?.[0]?.name || "Berita"}
                    </span>
                    <h4 className="text-[11px] font-bold text-white leading-snug line-clamp-2 mb-0.5 group-hover:text-[#FFC700] transition-colors duration-300">
                      {item.title}
                    </h4>
                    <span className="text-[7px] text-white/30 font-medium">
                      {item.created?.split(" ")[0]}
                    </span>
                  </div>
                  <div className="flex-none w-10 h-10 rounded-md overflow-hidden bg-white/5 border border-white/10 relative">
                    <img
                      src={item.thumbnail}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-103"
                      alt=""
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center py-12 bg-white/[0.01] rounded-xl border border-dashed border-white/10 w-full max-w-md">
              <p className="text-gray-500 font-bold uppercase tracking-widest text-[9px]">
                Belum ada berita terbaru
              </p>
            </div>
          </div>
        )}

        <div ref={buttonRef} className="flex justify-center flex-shrink-0 pb-2">
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
