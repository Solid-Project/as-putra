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
import { translateDynamicText } from "@/lib/translator";

const NewsDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(false);
  const [language] = useState(localStorage.getItem("user_lang") || "id");

  const t = {
    id: { back: "Kembali", category: "Resmi", allNews: "Semua Berita" },
    en: { back: "Back", category: "Official", allNews: "All News" },
    jp: { back: "戻る", category: "公式", allNews: "すべてのニュース" }
  };
  const lang = t[language] || t.id;

  const heroRef = useRef(null);

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
          let data = json.data;

          if (language !== "id") {
            const targetLang = language === "jp" ? "ja" : language;
            const [title, excerpt, content] = await Promise.all([
              translateDynamicText(data.title, targetLang),
              translateDynamicText(data.excerpt || "", targetLang),
              translateDynamicText(data.content || "", targetLang),
            ]);
            data = { ...data, title, excerpt, content };
          }

          gsap.to(".page-fade", {
            opacity: 0,
            y: 10,
            duration: 0.18,
            ease: "power2.out",
            onComplete: () => {
              setNews(data);

              document.title = `${data.title} | AS PUTRA News`;

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
      <section className="relative w-full min-h-[560px] md:min-h-[640px] flex items-end overflow-hidden bg-[#0F172A]">
        <div ref={heroRef} className="absolute inset-0">
          <img
            src={news.thumbnail}
            alt={news.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/70 to-[#020617]/20"></div>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        <div className="absolute top-0 left-0 w-full z-30">
          <div className="max-w-[1400px] mx-auto px-5 md:px-[5%] pt-6 md:pt-10 flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-xl border border-white/10 text-white hover:bg-[#D4AF37] hover:text-[#0F1A3E] transition-all duration-500"
            >
              <ArrowLeftIcon className="w-3.5 h-3.5 transition-transform duration-500 group-hover:-translate-x-1" />
              <span className="text-[10px] font-black uppercase tracking-[0.25em]">
                {lang.back}
              </span>
            </button>

            <span className="hidden md:inline-flex px-4 py-1.5 rounded-full bg-[#D4AF37] text-[#0F1A3E] text-[9px] font-black uppercase tracking-[0.25em]">
              {news.categories?.[0]?.name || lang.category}
            </span>
          </div>
        </div>

        <div className="relative z-20 w-full">
          <div className="max-w-[1400px] mx-auto px-5 md:px-[5%] pb-16 md:pb-24 pt-28 md:pt-32">
            <div className="max-w-4xl">
              <div className="md:hidden mb-5">
                <span className="inline-flex px-4 py-2 rounded-full bg-[#D4AF37] text-[#0F1A3E] text-[9px] font-black uppercase tracking-[0.25em]">
                  {news.categories?.[0]?.name || lang.category}
                </span>
              </div>

              <h1 className="font-['Playfair_Display'] text-[1.8rem] sm:text-[2.4rem] md:text-[3.2rem] lg:text-[3.8rem] leading-[1.08] tracking-[-0.02em] text-white font-bold">
                {news.title}
              </h1>

              {news.excerpt && (
                <p className="mt-5 md:mt-6 text-sm md:text-[0.95rem] text-white/70 leading-[1.7] max-w-2xl font-light">
                  {news.excerpt}
                </p>
              )}

              <div className="mt-8 md:mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
                <div className="flex items-center gap-2.5">
                  <CalendarIcon className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-bold text-white/60">
                    {news.created?.split(" ")[0]}
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <UserIcon className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-bold text-white/60">
                    {news.author || "Admin"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-[#FAFAFA]"></div>
      </section>

      <section className="relative w-full px-5 md:px-[5%] pb-24 md:pb-32 -mt-10 md:-mt-16 z-30">
        <div className="max-w-[1350px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-14 xl:gap-20">
          <article className="relative">
            <div className="bg-white rounded-[2rem] md:rounded-[2.8rem] border border-gray-100/80 shadow-[0_8px_40px_rgba(0,0,0,0.04)] overflow-hidden">
              <div className="w-full h-1 bg-gradient-to-r from-[#D4AF37] via-[#FFE082] to-[#D4AF37]"></div>

              <div className="p-6 md:p-10 lg:p-12">
                <div
                  className="news-article"
                  dangerouslySetInnerHTML={{
                    __html: news.content,
                  }}
                />

                <div className="mt-12 pt-6 border-t border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <ShareButtons
                    title={news.title}
                    url={window.location.href}
                  />

                  <Link
                    to="/news"
                    className="group inline-flex items-center gap-3 text-[#0F1A3E] hover:text-[#D4AF37] transition-all duration-300"
                  >
                    <span className="text-[10px] uppercase tracking-[0.25em] font-black">
                      {lang.allNews}
                    </span>

                    <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-[#D4AF37] transition-all">
                      <ArrowLeftIcon className="w-4 h-4 rotate-180" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </article>

          <aside className="relative">
            <div className="sticky top-28">
              <NewsSidebar currentSlug={id} />
            </div>
          </aside>
        </div>
      </section>

      <style
        dangerouslySetInnerHTML={{
          __html: `
          .news-article {
            color: #374151;
            font-size: 1rem;
            line-height: 1.85;
            font-weight: 400;
          }

          .news-article p {
            margin-bottom: 1.5rem;
          }

          .news-article strong {
            color: #0F172A;
            font-weight: 700;
          }

          .news-article h2,
          .news-article h3,
          .news-article h4 {
            color: #0F172A;
            font-family: 'Playfair Display', serif;
            font-weight: 700;
            line-height: 1.25;
            margin-top: 2.5rem;
            margin-bottom: 1rem;
          }

          .news-article h2 {
            font-size: 1.5rem;
          }

          .news-article h3 {
            font-size: 1.25rem;
          }

          .news-article h4 {
            font-size: 1.1rem;
          }

          .news-article ul,
          .news-article ol {
            padding-left: 1.5rem;
            margin-bottom: 1.5rem;
          }

          .news-article li {
            margin-bottom: 0.5rem;
          }

          .news-article blockquote {
            margin: 2rem 0;
            padding: 1.5rem 1.8rem;
            border-left: 4px solid #D4AF37;
            background: #F8F8F8;
            border-radius: 1rem;
            color: #374151;
            font-style: italic;
            font-size: 1.05rem;
          }

          .news-article img {
            width: 100%;
            max-width: 100%;
            border-radius: 1.2rem;
            margin: 2rem 0;
            box-shadow: 0 8px 30px rgba(0,0,0,0.06);
          }

          .news-article a {
            color: #B8860B;
            text-decoration: none;
            font-weight: 600;
            border-bottom: 1px solid transparent;
            transition: border-color 0.2s;
          }

          .news-article a:hover {
            border-color: #B8860B;
          }

          .news-article p:first-of-type::first-letter {
            float: left;
            font-size: 3.2rem;
            line-height: 0.85;
            padding-right: 0.5rem;
            padding-top: 0.15rem;
            font-weight: 800;
            color: #D4AF37;
            font-family: 'Playfair Display', serif;
          }

          @media (max-width: 768px) {
            .news-article p:first-of-type::first-letter {
              font-size: 2.6rem;
            }
            .news-article {
              font-size: 0.95rem;
              line-height: 1.75;
            }
          }
        `,
        }}
      />
    </main>
  );
};

export default NewsDetailPage;
