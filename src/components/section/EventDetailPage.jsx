import React, { useEffect, useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import {
  CalendarIcon,
  MapPinIcon,
  ArrowLeftIcon,
  UserIcon
} from "@heroicons/react/24/outline";
import ShareButtons from "@/components/ui/ShareButtons";

const EventDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [otherEvents, setOtherEvents] = useState([]);

  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const fetchEventData = async () => {
      setLoading(true);
      try {
        const baseUrl = import.meta.env.VITE_API_URL;
        const detailRes = await fetch(`${baseUrl}/api/v1/news/detail/${id}`);
        const detailJson = await detailRes.json();
        if (detailJson.status) {
          setEvent(detailJson.data);
          document.title = `${detailJson.data.title} | AS PUTRA Event`;
        }

        const listRes = await fetch(`${baseUrl}/api/v1/news/all-news`);
        const listJson = await listRes.json();
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
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current, { scale: 1.1, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" });
      gsap.fromTo(".animate-content", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.3 });
    });
    return () => ctx.revert();
  }, [event, loading]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-10 h-10 border-4 border-[#FFC700] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!event) return <div className="h-screen flex items-center justify-center">Event tidak ditemukan</div>;

  return (
    <main className="min-h-screen bg-[#FAFAFA] overflow-x-hidden">
      {/* HERO SECTION */}
      <div className="relative h-[65vh] md:h-[80vh] min-h-[480px] md:min-h-[650px] overflow-hidden">
        <div ref={heroRef} className="absolute inset-0">
          <img src={event.thumbnail} alt={event.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1A3E] via-[#0F1A3E]/40 to-transparent"></div>
        </div>

        {/* 1. KHUSUS MOBILE: Floating di atas (Hanya muncul di < 768px) */}
        <div className="md:hidden absolute top-6 left-0 w-full z-20 px-5">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black/30 backdrop-blur-md text-white border border-white/10 shadow-2xl"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Back</span>
            </button>
            <span className="px-4 py-2 rounded-xl bg-[#FFC700] text-[#0F1A3E] text-[9px] font-black uppercase tracking-widest">
              {event.categories?.[0]?.name || "Event"}
            </span>
          </div>
        </div>

        {/* HERO CONTENT */}
        <div className="absolute inset-0 flex items-end pb-10 md:pb-20">
          <div className="w-full px-5 sm:px-8 lg:px-[5%]">
            <div className="max-w-[1400px] mx-auto">

              {/* 2. KHUSUS DESKTOP: Sejajar di atas judul (Hanya muncul di >= 768px) */}
              <div className="hidden md:flex animate-content flex-row items-center gap-6 mb-8">
                <button
                  onClick={() => navigate(-1)}
                  className="group flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-[#FFC700] hover:text-[#0F1A3E] transition-all duration-500 shadow-xl"
                >
                  <ArrowLeftIcon className="w-4 h-4 transition-transform duration-500 group-hover:-translate-x-1" />
                  <span className="text-xs font-black uppercase tracking-widest">Kembali</span>
                </button>
                <span className="inline-flex items-center px-5 py-2 rounded-full text-[10px] font-black tracking-[0.2em] uppercase bg-[#FFC700] text-[#0F1A3E]">
                  {event.categories?.[0]?.name || "Event"}
                </span>
              </div>

              {/* TITLE */}
              <div className="animate-content">
                <h1 className="text-3xl md:text-6xl lg:text-8xl tracking-tight font-['Playfair_Display'] font-bold leading-tight md:leading-[1.1] text-white mb-6 md:mb-10 max-w-5xl">
                  {event.title}
                </h1>

                {/* META INFO */}
                <div className="flex flex-wrap gap-x-6 gap-y-3 text-[10px] md:text-base text-white/80 font-bold uppercase tracking-widest">
                  <span className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-[#FFC700]" />
                    {event.created?.split(' ')[0]}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPinIcon className="w-4 h-4 text-[#FFC700]" />
                    {event.excerpt?.split(',')[0]}
                  </span>
                  {/* UserIcon disembunyikan di mobile agar tidak terlalu penuh, muncul di desktop */}
                  <span className="hidden md:flex items-center gap-3">
                    <UserIcon className="w-5 h-5 text-[#FFC700]" />
                    {event.author || "Admin"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT SECTION */}
      <div className="w-full px-5 sm:px-8 lg:px-[5%] py-12 md:py-24">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1.8fr_0.7fr] gap-12 lg:gap-24">

          <div ref={contentRef} className="animate-content order-1 lg:order-1">
            <article className="bg-white border border-gray-100 rounded-[2rem] md:rounded-[3rem] p-6 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.03)]">
              <div
                className="event-content max-w-none text-base md:text-xl leading-relaxed md:leading-[2.1] text-gray-600 font-medium"
                dangerouslySetInnerHTML={{ __html: event.content }}
              />

              <div className="mt-12 md:mt-20 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                <ShareButtons title={event.title} url={window.location.href} />

                <Link to="/news" className="text-[10px] font-black uppercase tracking-widest text-[#0F1A3E] border-b-2 border-[#FFC700] pb-1">
                  Semua Berita
                </Link>
              </div>
            </article>
          </div>

          {/* SIDEBAR - Moved below content on mobile */}
          <aside ref={sidebarRef} className="animate-content space-y-8 order-2 lg:order-2">
            <div className="bg-[#0F1A3E] rounded-[2rem] p-6 md:p-8 text-white shadow-xl relative overflow-hidden group">
              <h4 className="text-lg md:text-xl font-bold mb-6 md:mb-10 font-['Playfair_Display']">Informasi Event</h4>
              <div className="space-y-6 md:space-y-8 relative z-10">
                {[
                  { icon: CalendarIcon, label: "Tanggal", value: event.created?.split(' ')[0] },
                  { icon: MapPinIcon, label: "Lokasi", value: event.excerpt?.split(',')[0] },
                  { icon: UserIcon, label: "Penulis", value: event.author }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 md:w-5 md:h-5 text-[#FFC700]" />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-0.5">{item.label}</p>
                      <p className="text-xs md:text-sm font-bold text-white/90">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* EVENT LAINNYA */}
            <div className="bg-white border border-gray-100 rounded-[2rem] p-6 md:p-8 shadow-sm">
              <h4 className="text-lg md:text-xl font-bold text-[#0F1A3E] mb-6 font-['Playfair_Display']">Langkah Lainnya</h4>
              <div className="space-y-5">
                {otherEvents.map((item) => (
                  <Link
                    key={item.slug}
                    to={`/event/${item.slug.split('/').pop()}`}
                    className="block group border-b border-gray-50 pb-4 last:border-0 last:pb-0"
                  >
                    <span className="text-[9px] text-[#FFC700] font-black uppercase tracking-widest">{item.created?.split(' ')[0]}</span>
                    <h5 className="text-sm md:text-base font-bold text-[#0F1A3E] mt-1 leading-snug group-hover:text-[#B8860B] transition-colors line-clamp-2">{item.title}</h5>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .event-content p { margin-bottom: 1.5rem; text-align: left; }
        @media (min-width: 768px) {
          .event-content p { margin-bottom: 2.2rem; text-align: justify; }
        }
        .event-content strong { color: #0F1A3E; font-weight: 800; }
        .event-content p:first-of-type::first-letter {
          float: left;
          font-size: 3.5rem;
          line-height: 1;
          font-weight: 900;
          margin-right: 0.6rem;
          color: #FFC700;
          font-family: 'Playfair Display', serif;
        }
        @media (min-width: 768px) {
          .event-content p:first-of-type::first-letter { font-size: 4.5rem; margin-right: 0.8rem; }
        }
        /* Fix for images inside content on mobile */
        .event-content img {
          max-width: 100%;
          height: auto;
          border-radius: 1rem;
          margin: 2rem 0;
        }
      `}} />
    </main>
  );
};

export default EventDetailPage;