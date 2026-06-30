import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { translateDynamicText } from "@/lib/translator";

const NewsSidebar = ({ currentSlug }) => {
  const [otherNews, setOtherNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [language] = useState(localStorage.getItem("user_lang") || "id");

  const t = {
    id: { title: "Berita Lainnya", btn: "Lihat Semua Berita", loading: "Memuat berita...", update: "Update" },
    en: { title: "Other News", btn: "View All News", loading: "Loading news...", update: "Update" },
    jp: { title: "その他のニュース", btn: "すべてのニュースを見る", loading: "ニュースを読み込み中...", update: "更新" }
  };
  const lang = t[language] || t.id;

  useEffect(() => {
    const fetchOtherNews = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/news/all-news`);
        const json = await response.json();
        
        if (json.status) {
          const filtered = json.data.details.filter(news => {
            const slug = news.slug.split('/').pop();
            return slug !== currentSlug;
          }).slice(0, 5);

          let items = filtered;
          if (language !== "id") {
            const targetLang = language === "jp" ? "ja" : language;
            items = await Promise.all(
              filtered.map(async (news) => ({
                ...news,
                title: await translateDynamicText(news.title, targetLang),
              }))
            );
          }
          setOtherNews(items);
        }
      } catch (error) {
        console.error("Error fetching sidebar news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOtherNews();
  }, [currentSlug]);

  // update saat bahasa berubah
  useEffect(() => {
    const handleStorage = () => window.location.reload();
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  if (loading) return <div className="text-gray-500 animate-pulse">{lang.loading}</div>;

  return (
    <aside className="lg:sticky lg:top-[100px]">
      <h4 className="text-[var(--color-utama)] border-b border-[var(--color-utama)]/20 pb-2 mb-6 font-bold uppercase tracking-wider text-sm">
        {lang.title}
      </h4>
      
      <div className="space-y-6">
        {otherNews.map((item, idx) => {
          const itemSlug = item.slug.split('/').pop();
          
          return (
            <Link 
              key={idx}
              to={`/news/${itemSlug}`}
              className="block group"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] bg-[var(--color-utama)]/10 text-[var(--color-utama)] px-2 py-0.5 rounded font-bold uppercase">
                  {item.category_name || lang.update}
                </span>
                <span className="text-[10px] text-[var(--color-teks-muted)]">
                  {item.created.split(' ')[0]}
                </span>
              </div>
              
              <h5 className="text-sm md:text-base font-bold text-[var(--color-teks)] group-hover:text-[var(--color-utama)] transition-all duration-300 leading-snug line-clamp-2">
                {item.title}
              </h5>
              <div className="mt-4 border-b border-gray-100 group-last:border-none" />
            </Link>
          );
        })}
      </div>

      <div className="mt-10">
        <Link 
          to="/news" 
          className="group relative flex items-center justify-center w-full px-4 py-3 bg-[#0F1A3E] text-white rounded-xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-[var(--color-utama)]/20"
        >
          <span className="relative z-10 font-bold text-xs uppercase tracking-widest">
            {lang.btn}
          </span>
          <div className="absolute inset-0 bg-[var(--color-utama)] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          <style dangerouslySetInnerHTML={{ __html: `
            .group:hover span { color: #0F1A3E; }
          `}} />
        </Link>
      </div>
    </aside>
  );
};

export default NewsSidebar;