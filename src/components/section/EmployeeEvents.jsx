import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useSectionAnimation } from "@/hooks/useSectionAnimation";
import { 
  MapPinIcon, 
  PlusIcon,
  CalendarDaysIcon
} from "@heroicons/react/24/outline";

const EmployeeEvents = ({ isActive }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  
  const COLOR_NAVY = "#1D2B53";
  const COLOR_GOLD = "#FFC619";

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/news/all-news`);
        const json = await response.json();
        
        if (json.status) {
          const eventData = json.data.details.filter(item => 
            item.categories.some(cat => cat.name.toLowerCase() === "event")
          );
          setEvents(eventData);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useSectionAnimation(sectionRef, () => {
    if (isActive && events.length > 0) {
      gsap.fromTo(
        cardsRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          overwrite: true,
          force3D: true
        }
      );
    }
  }, [isActive, events]);

  if (loading && isActive) {
    return (
      <div className="py-24 text-center text-gray-400 animate-pulse text-xs font-bold uppercase tracking-[0.3em]">
        Menyelaraskan Event...
      </div>
    );
  }

  return (
    <div ref={sectionRef} className={`w-full ${isActive ? "block" : "hidden"}`}>
      
      {/* CONTEXT KICKER (Menggantikan Judul Raksasa agar Selaras dengan Parent Section) */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: COLOR_NAVY }}>
            Life at AS PUTRA
          </span>
          <span className="text-gray-300 text-xs">•</span>
          <span className="text-xs text-gray-500 font-medium">Dokumentasi & Aktivitas Internal</span>
        </div>
        <div className="text-xs font-bold text-gray-400 hidden sm:block">
          {events.length} Event Terarsip
        </div>
      </div>

      {/* EVENT GRID (Slightly Rounded Design) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {events.length > 0 ? (
          events.map((event, index) => (
            <div
              key={event.slug}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group relative h-[460px] rounded-xl overflow-hidden bg-slate-900 border border-gray-200/60 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-end"
            >
              {/* Background Image Area */}
              <div className="absolute inset-0 overflow-hidden z-0">
                <img
                  src={event.thumbnail}
                  alt={event.title}
                  className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
                />
                {/* MODIFIKASI: Menggunakan gradasi gelap transparan agar teks di atasnya mutlak terbaca tajam */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-500" />
              </div>

              {/* Content Layer (Z-10 di atas Image Overlay) */}
              <div className="relative z-10 p-6 sm:p-8 w-full flex flex-col justify-end h-full">
                
                {/* Meta Tag Kategori */}
                <div className="mb-2">
                  <span 
                    className="inline-block px-2.5 py-0.5 rounded text-[9px] font-black uppercase tracking-widest shadow-sm"
                    style={{ backgroundColor: COLOR_GOLD, color: COLOR_NAVY }}
                  >
                    {event.categories[0]?.name || "Event"}
                  </span>
                </div>

                {/* Judul Event - Menggunakan teks putih bersih */}
                <h4 className="text-xl sm:text-2xl font-['Playfair_Display'] font-bold leading-tight text-white line-clamp-2 mb-3">
                  {event.title}
                </h4>

                {/* Deskripsi Singkat */}
                <p className="text-gray-300 text-xs sm:text-sm mb-4 leading-relaxed line-clamp-2 font-medium opacity-90">
                  {event.excerpt}
                </p>
                
                {/* Info Lokasi & Tanggal */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-bold uppercase tracking-wider mb-5 border-t border-white/10 pt-3.5 text-gray-300">
                  <div className="flex items-center gap-1.5">
                    <MapPinIcon className="w-3.5 h-3.5" style={{ color: COLOR_GOLD }} />
                    <span className="truncate max-w-[120px]">
                      {event.excerpt?.split(',')[0] || "Indonesia"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CalendarDaysIcon className="w-3.5 h-3.5" style={{ color: COLOR_GOLD }} />
                    <span>{event.created?.split(' ')[0]}</span>
                  </div>
                </div>

                {/* CTA Button Link - Berubah menjadi Rounded-LG */}
                <Link
                  to={`/event/${event.slug.split('/').pop()}`}
                  className="w-full h-11 rounded-lg border flex items-center justify-center transition-all duration-300 font-black text-[10px] uppercase tracking-[0.15em]"
                  style={{ 
                    borderColor: 'rgba(255,255,255,0.3)', 
                    color: '#FFFFFF',
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    backdropFilter: 'blur(4px)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                    e.currentTarget.style.color = COLOR_NAVY;
                    e.currentTarget.style.borderColor = '#FFFFFF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.color = '#FFFFFF';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span>Lihat Detail Event</span>
                    <PlusIcon className="w-3.5 h-3.5" />
                  </div>
                </Link>

              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-16 text-center text-gray-400 border border-dashed border-gray-200 rounded-xl bg-gray-50/50 text-xs uppercase tracking-wider font-bold">
            Belum ada dokumentasi event keluarga besar saat ini.
          </div>
        )}
      </div>

    </div>
  );
};

export default EmployeeEvents;