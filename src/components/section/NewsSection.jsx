import React, { useEffect, useRef, useState, useMemo } from "react";
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
  const desktopHeroRef = useRef(null);
  const desktopListRef = useRef(null);
  const mobileCardsRef = useRef([]);
  const siluetRefs = useRef([]);

  const COLOR_NAVY = "#0F1A3E";
  const COLOR_GOLD = "#FFC700";

  // =========================
  // FETCH DATA
  // =========================
  useEffect(() => {
    let isMounted = true;

    const fetchNews = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/news/all-news`
        );

        const json = await response.json();

        if (isMounted && json.status && json.data.details) {
          const details = json.data.details;

          setNewsData(details);

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
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchNews();

    return () => {
      isMounted = false;
    };
  }, []);

  // =========================
  // FILTERED DATA
  // =========================
  const filteredNews = useMemo(() => {
    return newsData.filter((item) => {
      const itemCategories = item.categories.map((c) =>
        c.name.toLowerCase()
      );

      const categoryMatch =
        activeFilter === "all" ||
        itemCategories.includes(activeFilter.toLowerCase());

      const searchMatch =
        searchQuery === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [newsData, activeFilter, searchQuery]);

  // =========================
  // GSAP ANIMATION
  // =========================
  useEffect(() => {
    if (loading) return;

    mobileCardsRef.current = mobileCardsRef.current.slice(
      0,
      filteredNews.length
    );

    const ctx = gsap.context(() => {
      siluetRefs.current.forEach((el, i) => {
        if (el) {
          gsap.to(el, {
            y: i % 2 === 0 ? -80 : 80,
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      });

      if (filteredNews.length > 0 && window.innerWidth >= 1024) {
        gsap.fromTo(
          [desktopHeroRef.current, desktopListRef.current],
          {
            y: 40,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            force3D: true,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
            },
          }
        );
      }

      if (filteredNews.length > 0 && window.innerWidth < 1024) {
        gsap.fromTo(
          mobileCardsRef.current.filter(Boolean),
          {
            x: 20,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            stagger: 0.04,
            duration: 0.5,
            ease: "power2.out",
            overwrite: true,
            force3D: true
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [loading, activeFilter, searchQuery, filteredNews.length]);

  const mobileFeatured = filteredNews.slice(0, 2);
  const mobileList = filteredNews.slice(2);

  const desktopFeatured = filteredNews[0];
  const desktopSideList = filteredNews.slice(1, 5);

  return (
    <section
      ref={sectionRef}
      className="section no-snap relative min-h-screen py-16 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-[8%] bg-white overflow-hidden"
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
            className={`absolute opacity-[0.02] md:opacity-[0.03] grayscale ${
              i === 0
                ? "-top-10 -left-20 w-[400px] rotate-12"
                : i === 1
                ? "top-[30%] -right-32 w-[500px] -rotate-12"
                : i === 2
                ? "bottom-0 -left-10 w-[450px] rotate-[20deg]"
                : "top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[800px]"
            }`}
            alt=""
          />
        ))}
      </div>

      <div className="w-full relative z-10">
        {/* HEADER AREA */}
        <div ref={titleRef} className="mb-10 lg:mb-14 text-left">
          <div className="inline-block px-4 py-1 border border-[#FFC700] rounded-full mb-4 lg:mb-6">
            <span className="text-[#B8860B] font-black tracking-[0.3em] uppercase text-[8px] lg:text-[9px]">
              Latest News & Activity
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 lg:gap-12">
            <h2 className="text-4xl lg:text-6xl font-['Playfair_Display'] font-bold text-[#0F1A3E] tracking-tight">
              Jejak{" "}
              <span className="text-[#FFC700] italic font-normal">
                Informasi
              </span>
            </h2>
          </div>
        </div>

        {/* SEARCH & FILTER BAR */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-10 lg:mb-12 gap-4 bg-gray-50/90 backdrop-blur-md p-3 lg:p-4 rounded-2xl lg:rounded-[2rem] border border-gray-200/60 shadow-sm">
          <div className="hide-scrollbar flex flex-row gap-2 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0 snap-x touch-pan-x">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`snap-center flex-none px-6 py-2.5 rounded-full text-[9px] lg:text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                  activeFilter === cat
                    ? "bg-[#FFC700] text-[#0F1A3E] shadow-md shadow-[#FFC700]/20 scale-105"
                    : "bg-white text-gray-400 border border-gray-200/50 hover:border-gray-300 hover:text-[#0F1A3E]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-80">
            <input
              type="text"
              placeholder="Cari berita..."
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white px-5 py-3 rounded-xl lg:rounded-2xl text-xs lg:text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FFC700]/20 w-full transition-all"
            />
          </div>
        </div>

        {/* MOBILE */}
        <div className="block lg:hidden w-full space-y-8">
          {loading ? (
            <div className="text-center py-20 text-gray-400 font-bold uppercase tracking-widest animate-pulse text-xs">
              Menyelaraskan Data...
            </div>
          ) : filteredNews.length > 0 ? (
            <>
              {/* Featured */}
              {mobileFeatured.length > 0 && (
                <div className="w-full">
                  <div className="flex items-center justify-between mb-3 px-1">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-[#0F1A3E]/60">
                      Berita Utama
                    </h4>
                    <div className="w-12 h-[1px] bg-gray-200"></div>
                  </div>

                  <div className="hide-scrollbar flex flex-row gap-4 overflow-x-auto snap-x snap-mandatory touch-pan-x -mx-4 px-4 pb-2">
                    {mobileFeatured.map((item, idx) => (
                      <Link
                        key={`mob-feat-${item.slug || idx}`}
                        to={`/news/${item.slug.split("/").pop()}`}
                        ref={(el) => (mobileCardsRef.current[idx] = el)}
                        className="snap-center flex-none w-[85vw] bg-white border border-gray-200/70 rounded-[2rem] p-3 shadow-sm flex flex-col"
                      >
                        <div className="relative aspect-[16/10] overflow-hidden rounded-[1.3rem] bg-gray-100">
                          <img
                            src={item.thumbnail}
                            className="w-full h-full object-cover"
                            alt={item.title}
                          />

                          <span className="absolute top-3 left-3 bg-[#0F1A3E] text-[#FFC700] text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md">
                            {item.categories[0]?.name}
                          </span>
                        </div>

                        <div className="pt-3 pb-1 px-1 flex flex-col flex-1">
                          <p className="text-[9px] text-gray-400 font-medium mb-1">
                            {item.created.split(" ")[0]}
                          </p>

                          <h3 className="text-base font-bold text-[#0F1A3E] leading-snug line-clamp-2 font-['Playfair_Display']">
                            {item.title}
                          </h3>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* List */}
              {mobileList.length > 0 && (
                <div className="w-full space-y-4">
                  <div className="flex items-center justify-between mb-1 px-1">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-[#0F1A3E]/60">
                      Artikel Lainnya
                    </h4>
                    <div className="w-12 h-[1px] bg-gray-200"></div>
                  </div>

                  <div className="flex flex-col gap-3">
                    {mobileList.map((item, idx) => {
                      const actualIdx = idx + 2;

                      return (
                        <Link
                          key={`mob-list-${item.slug || actualIdx}`}
                          to={`/news/${item.slug.split("/").pop()}`}
                          ref={(el) =>
                            (mobileCardsRef.current[actualIdx] = el)
                          }
                          className="flex flex-row items-center gap-4 bg-white p-2.5 border border-gray-100 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] active:scale-[0.98] transition-all"
                        >
                          <div className="flex-1 min-w-0">
                            <span className="text-[#B8860B] text-[8px] font-black uppercase tracking-wider block mb-0.5">
                              {item.categories[0]?.name}
                            </span>

                            <h3 className="text-xs sm:text-sm font-bold text-[#0F1A3E] leading-snug line-clamp-2 mb-1">
                              {item.title}
                            </h3>

                            <p className="text-[9px] text-gray-400">
                              {item.created.split(" ")[0]}
                            </p>
                          </div>

                          <div className="flex-none w-20 h-20 rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
                            <img
                              src={item.thumbnail}
                              className="w-full h-full object-cover"
                              alt=""
                            />
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200 text-xs text-gray-400 font-bold uppercase tracking-widest">
              Berita tidak ditemukan
            </div>
          )}
        </div>

        {/* DESKTOP */}
        {loading ? (
          <div className="hidden lg:block text-center py-32 text-gray-400 font-bold uppercase tracking-widest animate-pulse">
            Menyelaraskan Sajian Data...
          </div>
        ) : filteredNews.length > 0 ? (
          <div className="hidden lg:grid grid-cols-12 gap-10 items-start">
            <div
              ref={desktopHeroRef}
              className="col-span-7 flex flex-col"
            >
              {desktopFeatured && (
                <Link
                  to={`/news/${desktopFeatured.slug
                    .split("/")
                    .pop()}`}
                  className="group relative flex flex-col w-full bg-white border border-gray-100 rounded-[2.5rem] p-5 shadow-[0_15px_50px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_70px_rgba(15,26,62,0.08)] transition-all duration-500 overflow-hidden"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[2rem] bg-gray-100">
                    <img
                      src={desktopFeatured.thumbnail}
                      className="w-full h-full object-cover transition-transform duration-1000 cubic-bezier(0.16,1,0.3,1) group-hover:scale-105"
                      alt={desktopFeatured.title}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F1A3E]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <span className="absolute top-5 left-5 bg-[#0F1A3E] text-[#FFC700] text-[9px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-xl shadow-md">
                      {desktopFeatured.categories[0]?.name}
                    </span>
                  </div>

                  <div className="pt-6 px-2 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[11px] font-bold text-gray-400">
                        {desktopFeatured.created.split(" ")[0]}
                      </span>
                    </div>

                    <h3 className="text-3xl font-bold text-[#0F1A3E] leading-tight mb-4 group-hover:text-[#B8860B] transition-colors duration-300 font-['Playfair_Display']">
                      {desktopFeatured.title}
                    </h3>

                    <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3 font-light">
                      {desktopFeatured.excerpt}
                    </p>
                  </div>
                </Link>
              )}
            </div>

            <div
              ref={desktopListRef}
              className="col-span-5 flex flex-col justify-start gap-4"
            >
              {desktopSideList.map((item, idx) => (
                <Link
                  key={`desk-side-${item.slug || idx}`}
                  to={`/news/${item.slug.split("/").pop()}`}
                  className="group flex flex-row items-center gap-5 bg-white p-4 border border-gray-100 rounded-2xl shadow-[0_5px_25px_rgba(0,0,0,0.01)] hover:shadow-[0_15px_45px_rgba(15,26,62,0.05)] hover:border-gray-200/80 transition-all duration-300 w-full"
                >
                  <div className="flex-1 min-w-0">
                    <span className="text-[#B8860B] text-[9px] font-black uppercase tracking-[0.15em] block mb-1">
                      {item.categories[0]?.name}
                    </span>

                    <h4 className="text-base font-bold text-[#0F1A3E] leading-snug line-clamp-2 mb-1.5 group-hover:text-[#B8860B] transition-colors duration-300">
                      {item.title}
                    </h4>

                    <span className="text-[11px] text-gray-400 font-medium">
                      {item.created.split(" ")[0]}
                    </span>
                  </div>

                  <div className="flex-none w-24 h-24 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 relative">
                    <img
                      src={item.thumbnail}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      alt=""
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="hidden lg:block text-center py-24 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
            <p className="text-gray-400 font-bold uppercase tracking-widest">
              Berita tidak ditemukan
            </p>
          </div>
        )}
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default NewsSection;