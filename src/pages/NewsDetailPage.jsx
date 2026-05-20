import React, { useEffect, useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import gsap from "gsap";

import {
  CalendarIcon,
  UserIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";

import ShareButtons from "@/components/ui/ShareButtons";
import NewsSidebar from "@/pages/NewsSidebar";

const NewsDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(false);

  const heroRef = useRef(null);

  // =========================================
  // FETCH DATA
  // =========================================
  useEffect(() => {
    let isMounted = true;

    const fetchDetailNews = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/news/detail/${id}`
        );

        const json = await response.json();

        if (isMounted && json.status) {
          // smooth transition
          gsap.to(".page-fade", {
            opacity: 0,
            y: 10,
            duration: 0.18,
            ease: "power2.out",
            onComplete: () => {
              setNews(json.data);

              document.title = `${json.data.title} | AS PUTRA News`;

              gsap.fromTo(
                ".page-fade",
                {
                  opacity: 0,
                  y: 20,
                },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.8,
                  ease: "power3.out",
                }
              );
            },
          });
        }
      } catch (error) {
        console.error("Gagal ambil data:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchDetailNews();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    return () => {
      isMounted = false;
    };
  }, [id]);

  // =========================================
  // HERO ANIMATION
  // =========================================
  useEffect(() => {
    if (!news) return;

    gsap.killTweensOf(heroRef.current);

    gsap.fromTo(
      heroRef.current,
      {
        scale: 1.05,
      },
      {
        scale: 1,
        duration: 1.8,
        ease: "power3.out",
      }
    );
  }, [news?.id]);

  // =========================================
  // LOADING
  // =========================================
  if (!news) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <div className="flex flex-col items-center gap-5">
          <div className="w-10 h-10 border-[3px] border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>

          <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-black">
            Loading Article
          </span>
        </div>
      </div>
    );
  }

  return (
    <main className="page-fade min-h-screen bg-[#FAFAFA] overflow-x-hidden">
      {/* ========================================= */}
      {/* HERO */}
      {/* ========================================= */}
      <section className="relative w-full min-h-[760px] md:min-h-[880px] flex items-end overflow-hidden bg-[#0F172A]">
        {/* IMAGE */}
        <div
          ref={heroRef}
          className="absolute inset-0"
        >
          <img
            src={news.thumbnail}
            alt={news.title}
            className="w-full h-full object-cover"
          />

          {/* overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/70 to-[#020617]/20"></div>

          {/* cinematic depth */}
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* TOP NAV */}
        <div className="absolute top-0 left-0 w-full z-30">
          <div className="max-w-[1400px] mx-auto px-5 md:px-[5%] pt-6 md:pt-10 flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="group flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 text-white hover:bg-[#D4AF37] hover:text-[#0F1A3E] transition-all duration-500"
            >
              <ArrowLeftIcon className="w-4 h-4 transition-transform duration-500 group-hover:-translate-x-1" />

              <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.25em]">
                Back
              </span>
            </button>

            <span className="hidden md:inline-flex px-5 py-2 rounded-full bg-[#D4AF37] text-[#0F1A3E] text-[10px] font-black uppercase tracking-[0.25em]">
              {news.categories?.[0]?.name || "Official"}
            </span>
          </div>
        </div>

        {/* CONTENT */}
        <div className="relative z-20 w-full">
          <div className="max-w-[1400px] mx-auto px-5 md:px-[5%] pb-16 md:pb-24 pt-36 md:pt-44">
            <div className="max-w-4xl">
              {/* MOBILE CATEGORY */}
              <div className="md:hidden mb-5">
                <span className="inline-flex px-4 py-2 rounded-full bg-[#D4AF37] text-[#0F1A3E] text-[9px] font-black uppercase tracking-[0.25em]">
                  {news.categories?.[0]?.name || "Official"}
                </span>
              </div>

              {/* TITLE */}
              <h1 className="font-['Playfair_Display'] text-[2.3rem] sm:text-[3rem] md:text-[4.6rem] lg:text-[5.4rem] leading-[1.02] tracking-[-0.04em] text-white font-bold">
                {news.title}
              </h1>

              {/* EXCERPT */}
              {news.excerpt && (
                <p className="mt-6 md:mt-8 text-sm md:text-[1.1rem] text-white/75 leading-[1.9] max-w-2xl font-light">
                  {news.excerpt}
                </p>
              )}

              {/* META */}
              <div className="mt-8 md:mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-white/70">
                <div className="flex items-center gap-3">
                  <CalendarIcon className="w-4 h-4 text-[#D4AF37]" />

                  <span className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] font-bold">
                    {news.created?.split(" ")[0]}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <UserIcon className="w-4 h-4 text-[#D4AF37]" />

                  <span className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] font-bold">
                    {news.author || "Admin"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FADE */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-[#FAFAFA]"></div>
      </section>

      {/* ========================================= */}
      {/* CONTENT */}
      {/* ========================================= */}
      <section className="relative w-full px-5 md:px-[5%] pb-24 md:pb-32 -mt-10 md:-mt-16 z-30">
        <div className="max-w-[1350px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-14 xl:gap-20">
          
          {/* ARTICLE */}
          <article className="relative">
            <div className="bg-white rounded-[2rem] md:rounded-[2.8rem] border border-gray-100 shadow-[0_10px_50px_rgba(0,0,0,0.03)] overflow-hidden">
              
              {/* top accent */}
              <div className="w-full h-1 bg-gradient-to-r from-[#D4AF37] via-[#FFE082] to-[#D4AF37]"></div>

              <div className="p-6 md:p-14 lg:p-16">
                
                {/* ARTICLE CONTENT */}
                <div
                  className="news-article"
                  dangerouslySetInnerHTML={{
                    __html: news.content,
                  }}
                />

                {/* FOOTER */}
                <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                  
                  <ShareButtons
                    title={news.title}
                    url={window.location.href}
                  />

                  <Link
                    to="/news"
                    className="group inline-flex items-center gap-3 text-[#0F1A3E] hover:text-[#D4AF37] transition-all duration-300"
                  >
                    <span className="text-[10px] uppercase tracking-[0.25em] font-black">
                      Semua Berita
                    </span>

                    <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-[#D4AF37] transition-all">
                      <ArrowLeftIcon className="w-4 h-4 rotate-180" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </article>

          {/* SIDEBAR */}
          <aside className="relative">
            <div className="sticky top-28">
              <NewsSidebar currentSlug={id} />
            </div>
          </aside>
        </div>
      </section>

      {/* ========================================= */}
      {/* STYLE */}
      {/* ========================================= */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .news-article {
            color: #52525B;
            font-size: 1rem;
            line-height: 1.95;
            font-weight: 400;
          }

          .news-article p {
            margin-bottom: 1.8rem;
            text-align: justify;
            text-justify: inter-word;
          }

          .news-article strong {
            color: #0F172A;
            font-weight: 700;
          }

          .news-article h1,
          .news-article h2,
          .news-article h3,
          .news-article h4 {
            color: #0F172A;
            font-family: 'Playfair Display', serif;
            font-weight: 700;
            line-height: 1.3;
            margin-top: 3rem;
            margin-bottom: 1.2rem;
          }

          .news-article h1 {
            font-size: 2rem;
          }

          .news-article h2 {
            font-size: 1.7rem;
          }

          .news-article h3 {
            font-size: 1.45rem;
          }

          .news-article ul,
          .news-article ol {
            padding-left: 1.5rem;
            margin-bottom: 1.8rem;
          }

          .news-article li {
            margin-bottom: 0.7rem;
          }

          .news-article blockquote {
            margin: 2.5rem 0;
            padding: 1.8rem 2rem;
            border-left: 4px solid #D4AF37;
            background: #FAFAFA;
            border-radius: 1rem;
            color: #334155;
            font-style: italic;
          }

          .news-article img {
            width: 100%;
            max-width: 100%;
            border-radius: 1.6rem;
            margin: 3rem 0;
            box-shadow: 0 10px 40px rgba(0,0,0,0.08);
          }

          .news-article a {
            color: #B8860B;
            text-decoration: none;
            font-weight: 600;
          }

          .news-article a:hover {
            opacity: 0.8;
          }

          .news-article p:first-of-type::first-letter {
            float: left;
            font-size: 4rem;
            line-height: 0.9;
            padding-right: 0.5rem;
            font-weight: 800;
            color: #D4AF37;
            font-family: 'Playfair Display', serif;
          }

          @media (max-width: 768px) {
            .news-article p:first-of-type::first-letter {
              font-size: 3rem;
            }
          }
        `,
        }}
      />
    </main>
  );
};

export default NewsDetailPage;