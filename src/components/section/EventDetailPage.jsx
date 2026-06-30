import React, { useEffect, useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { CalendarIcon, MapPinIcon, ArrowLeftIcon, UserIcon } from "@heroicons/react/24/outline";
import ShareButtons from "@/components/ui/ShareButtons";

const EventDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [otherEvents, setOtherEvents] = useState([]);
  const [language] = useState(localStorage.getItem("user_lang") || "id");

  const t = {
    id: { back: "Kembali", event: "Event", allNews: "Semua Berita", info: "Informasi Event", date: "Tanggal", author: "Penulis", other: "Event Lainnya" },
    en: { back: "Back", event: "Event", allNews: "All News", info: "Event Information", date: "Date", author: "Author", other: "Other Events" },
    jp: { back: "戻る", event: "イベント", allNews: "すべてのニュース", info: "イベント情報", date: "日付", author: "著者", other: "他のイベント" }
  };
  const lang = t[language] || t.id;

  const pageRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const fetchEventData = async () => {
      setLoading(true);
      try {
        const baseUrl = import.meta.env.VITE_API_URL;
        const [detailRes, listRes] = await Promise.all([
          fetch(`${baseUrl}/api/v1/news/detail/${id}`),
          fetch(`${baseUrl}/api/v1/news/all-news`)
        ]);
        const detailJson = await detailRes.json();
        const listJson = await listRes.json();
        if (detailJson.status) {
          setEvent(detailJson.data);
          document.title = `${detailJson.data.title} | AS PUTRA Event`;
        }
        if (listJson.status) {
          const onlyEvents = listJson.data.details
            .filter(item => item.categories.some(cat => cat.name.toLowerCase() === "event"))
            .filter(item => item.slug.split('/').pop() !== id)
            .slice(0, 3);
          setOtherEvents(onlyEvents);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEventData();
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (!event || loading) return;
    gsap.fromTo(heroRef.current, { scale: 1.1, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" });
    gsap.fromTo(".animate-content", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.3 });
  }, [event, loading]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
      <div className="flex flex-col items-center gap-5">
        <div className="w-10 h-10 border-[3px] border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
        <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-black">Loading Event</span>
      </div>
    </div>
  );

  if (!event) return <div className="h-screen flex items-center justify-center text-gray-500 text-sm font-bold uppercase tracking-widest">Event tidak ditemukan</div>;

  return (
    <main ref={pageRef} className="min-h-screen bg-[#FAFAFA] overflow-x-hidden">
      <section className="relative w-full min-h-[560px] md:min-h-[640px] flex items-end overflow-hidden bg-[#0F172A]">
        <div ref={heroRef} className="absolute inset-0">
          <img src={event.thumbnail} alt={event.title} className="w-full h-full object-cover" />
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
              <span className="text-[10px] font-black uppercase tracking-[0.25em]">{lang.back}</span>
            </button>

            <span className="hidden md:inline-flex px-4 py-1.5 rounded-full bg-[#D4AF37] text-[#0F1A3E] text-[9px] font-black uppercase tracking-[0.25em]">
              {event.categories?.[0]?.name || lang.event}
            </span>
          </div>
        </div>

        <div className="relative z-20 w-full">
          <div className="max-w-[1400px] mx-auto px-5 md:px-[5%] pb-16 md:pb-24 pt-28 md:pt-32">
            <div className="max-w-4xl">
              <div className="md:hidden mb-5">
                <span className="inline-flex px-4 py-2 rounded-full bg-[#D4AF37] text-[#0F1A3E] text-[9px] font-black uppercase tracking-[0.25em]">
                  {event.categories?.[0]?.name || lang.event}
                </span>
              </div>

              <h1 className="font-['Playfair_Display'] text-[1.8rem] sm:text-[2.4rem] md:text-[3.2rem] lg:text-[3.8rem] leading-[1.08] tracking-[-0.02em] text-white font-bold">
                {event.title}
              </h1>

              <div className="mt-8 md:mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
                <div className="flex items-center gap-2.5">
                  <CalendarIcon className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-bold text-white/60">
                    {event.created?.split(' ')[0]}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <UserIcon className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-bold text-white/60">
                    {event.author || "Admin"}
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
                  className="event-article"
                  dangerouslySetInnerHTML={{ __html: event.content }}
                />

                <div className="mt-12 pt-6 border-t border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <ShareButtons title={event.title} url={window.location.href} />

                  <Link
                    to="/news"
                    className="group inline-flex items-center gap-3 text-[#0F1A3E] hover:text-[#D4AF37] transition-all duration-300"
                  >
                    <span className="text-[10px] uppercase tracking-[0.25em] font-black">{lang.allNews}</span>
                    <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-[#D4AF37] transition-all">
                      <ArrowLeftIcon className="w-4 h-4 rotate-180" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </article>

          <aside className="relative">
            <div className="sticky top-28 space-y-6">
              <div className="bg-[#0F1A3E] rounded-[2rem] p-6 md:p-8 text-white shadow-xl relative overflow-hidden group">
                <div className="w-24 h-24 bg-[#D4AF37]/5 rounded-full absolute -top-6 -right-6 blur-3xl"></div>
                <h4 className="text-lg md:text-xl font-bold mb-6 md:mb-8 font-['Playfair_Display']">{lang.info}</h4>
                <div className="space-y-5 relative z-10">
                  {[
                    { icon: CalendarIcon, label: lang.date, value: event.created?.split(' ')[0] },
                    { icon: UserIcon, label: lang.author, value: event.author || "Admin" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                        <item.icon className="w-4 h-4 text-[#D4AF37]" />
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-0.5">{item.label}</p>
                        <p className="text-xs md:text-sm font-bold text-white/90">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-[2rem] p-6 md:p-8 border border-gray-100/80 shadow-[0_8px_40px_rgba(0,0,0,0.04)]">
                <h4 className="text-lg md:text-xl font-bold text-[#0F1A3E] mb-6 font-['Playfair_Display']">{lang.other}</h4>
                <div className="space-y-5">
                  {otherEvents.map((item) => (
                    <Link
                      key={item.slug}
                      to={`/event/${item.slug.split('/').pop()}`}
                      className="block group border-b border-gray-50 pb-4 last:border-0 last:pb-0"
                    >
                      <span className="text-[9px] text-[#D4AF37] font-black uppercase tracking-widest">{item.created?.split(' ')[0]}</span>
                      <h5 className="text-sm md:text-base font-bold text-[#0F1A3E] mt-1 leading-snug group-hover:text-[#D4AF37] transition-colors line-clamp-2">{item.title}</h5>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{
        __html: `
        .event-article {
          color: #374151;
          font-size: 1rem;
          line-height: 1.85;
          font-weight: 400;
        }
        .event-article p {
          margin-bottom: 1.5rem;
        }
        .event-article strong {
          color: #0F172A;
          font-weight: 700;
        }
        .event-article h2,
        .event-article h3,
        .event-article h4 {
          color: #0F172A;
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          line-height: 1.25;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
        }
        .event-article h2 { font-size: 1.5rem; }
        .event-article h3 { font-size: 1.25rem; }
        .event-article h4 { font-size: 1.1rem; }
        .event-article ul,
        .event-article ol {
          padding-left: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .event-article li { margin-bottom: 0.5rem; }
        .event-article blockquote {
          margin: 2rem 0;
          padding: 1.5rem 1.8rem;
          border-left: 4px solid #D4AF37;
          background: #F8F8F8;
          border-radius: 1rem;
          color: #374151;
          font-style: italic;
          font-size: 1.05rem;
        }
        .event-article img {
          width: 100%;
          max-width: 100%;
          border-radius: 1.2rem;
          margin: 2rem 0;
          box-shadow: 0 8px 30px rgba(0,0,0,0.06);
        }
        .event-article a {
          color: #B8860B;
          text-decoration: none;
          font-weight: 600;
          border-bottom: 1px solid transparent;
          transition: border-color 0.2s;
        }
        .event-article a:hover { border-color: #B8860B; }
        .event-article p:first-of-type::first-letter {
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
          .event-article {
            font-size: 0.95rem;
            line-height: 1.75;
          }
          .event-article p:first-of-type::first-letter { font-size: 2.6rem; }
        }
      `}} />
    </main>
  );
};

export default EventDetailPage;
