import React, { useEffect, useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { 
  CalendarIcon, 
  UserIcon, 
  ArrowLeftIcon,
  MapPinIcon
} from "@heroicons/react/24/outline";
import ShareButtons from "@/components/ui/ShareButtons";
import NewsSidebar from "@/pages/NewsSidebar"; 

const NewsDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const fetchDetailNews = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/news/detail/${id}`);
        const json = await response.json();
        if (json.status) {
          setNews(json.data);
          document.title = `${json.data.title} | AS PUTRA News`;
        }
      } catch (error) {
        console.error("Gagal ambil data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetailNews();
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (!news || loading) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current, { scale: 1.1, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" });
      gsap.fromTo(".animate-content", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.3 });
    });
    return () => ctx.revert();
  }, [news, loading]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-12 h-12 border-4 border-[#FFC700] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!news) return <div className="h-screen flex items-center justify-center font-['Playfair_Display']">Berita tidak ditemukan</div>;

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <div className="relative h-[80vh] min-h-[650px] overflow-hidden">
        <div ref={heroRef} className="absolute inset-0">
          <img src={news.thumbnail} alt={news.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1A3E] via-[#0F1A3E]/50 to-transparent"></div>
        </div>
        <div className="absolute inset-0 flex items-end pb-20">
          <div className="w-full px-4 sm:px-6 md:px-8 lg:px-[5%]">
            <div className="max-w-[1400px] mx-auto">
              <div className="animate-content flex flex-col md:flex-row md:items-center gap-6 mb-8">
                <button
                  onClick={() => navigate(-1)}
                  className="group flex items-center gap-3 w-fit px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-[#FFC700] hover:text-[#0F1A3E] hover:border-[#FFC700] transition-all duration-500 shadow-xl"
                >
                  <ArrowLeftIcon className="w-4 h-4 transition-transform duration-500 group-hover:-translate-x-1" />
                  <span className="text-xs font-black uppercase tracking-widest">Kembali</span>
                </button>
                
                <span className="w-fit inline-flex items-center px-5 py-2 rounded-full text-[10px] font-black tracking-[0.2em] uppercase bg-[#FFC700] text-[#0F1A3E]">
                  {news.categories?.[0]?.name || "Official"}
                </span>
              </div>
              <div className="animate-content">
                <h1 className="text-4xl md:text-6xl lg:text-8xl tracking-tight font-['Playfair_Display'] font-bold leading-[1.1] text-white mb-10 max-w-5xl">
                  {news.title}
                </h1>
                <div className="flex flex-wrap gap-x-10 gap-y-4 text-sm md:text-base text-white/70 font-bold uppercase tracking-widest text-[11px]">
                  <span className="flex items-center gap-3">
                    <CalendarIcon className="w-5 h-5 text-[#FFC700]" />
                    {news.created?.split(' ')[0]}
                  </span>
                  <span className="flex items-center gap-3">
                    <MapPinIcon className="w-5 h-5 text-[#FFC700]" />
                    {news.excerpt?.split(',')[0]}
                  </span>
                  <span className="flex items-center gap-3">
                    <UserIcon className="w-5 h-5 text-[#FFC700]" />
                    {news.author || "Admin"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-[5%] py-24">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1.8fr_0.7fr] gap-16 xl:gap-24">
          
          <div ref={contentRef} className="animate-content">
            <article className="bg-white border border-gray-100 rounded-[3rem] p-8 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.03)]">
              <div
                className="news-article max-w-none text-lg md:text-xl leading-[2.1] text-gray-600 font-medium"
                dangerouslySetInnerHTML={{ __html: news.content }}
              />
              <div className="mt-20 pt-10 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-8">
                <ShareButtons title={news.title} url={window.location.href} />
                
                <Link to="/news" className="text-[11px] font-black uppercase tracking-[0.2em] text-[#0F1A3E] hover:text-[#FFC700] transition-colors border-b-2 border-[#FFC700] pb-1">
                  Semua Berita
                </Link>
              </div>
            </article>
          </div>
          <aside ref={sidebarRef} className="animate-content space-y-10">
            <div className="sticky top-32">
               <NewsSidebar currentSlug={id} />
            </div>
          </aside>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .news-article p { margin-bottom: 2.2rem; text-align: justify; text-justify: inter-word; }
        .news-article strong { color: #0F1A3E; font-weight: 800; }
        .news-article p:first-of-type::first-letter {
          float: left;
          font-size: 4.5rem;
          line-height: 1;
          font-weight: 900;
          margin-right: 0.8rem;
          color: #FFC700;
          font-family: 'Playfair Display', serif;
        }
      `}} />
    </main>
  );
};

export default NewsDetailPage;