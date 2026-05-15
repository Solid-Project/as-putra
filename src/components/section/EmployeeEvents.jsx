import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { 
  MapPinIcon, 
  PlusIcon,
  CalendarDaysIcon
} from "@heroicons/react/24/outline";

const EmployeeEvents = ({ isActive }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const cardsRef = useRef([]);
  
  const COLOR_NAVY = "#1D2B53";
  const COLOR_GOLD = "#FFC619";

  // 1. Fetch Data dari API News dengan filter kategori "Event"
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/news/all-news`);
        const json = await response.json();
        
        if (json.status) {
          // Filter hanya yang memiliki kategori "Event" (Case Insensitive)
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

  // 2. Animasi GSAP saat section aktif
  useEffect(() => {
    if (isActive && events.length > 0) {
      gsap.fromTo(
        cardsRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          overwrite: true
        }
      );
    }
  }, [isActive, events]);

  if (loading && isActive) {
    return <div className="py-20 text-center text-gray-400 animate-pulse uppercase tracking-widest">Menyelaraskan Event...</div>;
  }

  return (
    <div className={`py-10 w-full ${isActive ? "block" : "hidden"}`}>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div className="max-w-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[2px]" style={{ backgroundColor: COLOR_GOLD }}></div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em]" style={{ color: COLOR_NAVY }}>
              Life at AS PUTRA
            </h3>
          </div>
          <p className="text-3xl md:text-4xl font-['Playfair_Display'] font-bold" style={{ color: COLOR_NAVY }}>
            Membangun <span className="italic" style={{ color: COLOR_GOLD }}>Keluarga</span>, Bukan Sekadar Tim.
          </p>
        </div>
        <div className="h-[1px] flex-grow bg-gray-100 hidden md:block mx-10 mb-4"></div>
      </div>

      {/* Event Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-8">
        {events.length > 0 ? (
          events.map((event, index) => (
            <div
              key={event.slug}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group relative h-[480px] rounded-[2rem] overflow-hidden bg-gray-50 border border-gray-100 transition-all duration-500 shadow-lg hover:shadow-2xl"
            >
              {/* Background Image Area */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={event.thumbnail}
                  alt={event.title}
                  className="w-full h-full object-cover transition-all duration-1000 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content Layer */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span 
                    className="inline-block px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest mb-3 shadow-sm"
                    style={{ backgroundColor: COLOR_GOLD, color: COLOR_NAVY }}
                  >
                    {event.categories[0]?.name || "Event"}
                  </span>
                  <h4 className="text-2xl md:text-3xl font-['Playfair_Display'] font-extrabold leading-tight line-clamp-2" style={{ color: COLOR_NAVY }}>
                    {event.title}
                  </h4>
                </div>

                <div className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-75">
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed line-clamp-2 font-medium">
                    {event.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-[10px] font-bold uppercase tracking-widest mb-6 border-t border-gray-200 pt-4" style={{ color: COLOR_NAVY }}>
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="w-4 h-4" style={{ color: COLOR_GOLD }} />
                      {/* Ekstrak lokasi dari awal excerpt (sebelum tanda koma) */}
                      {event.excerpt?.split(',')[0] || "Indonesia"}
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarDaysIcon className="w-4 h-4" style={{ color: COLOR_GOLD }} />
                      {event.created?.split(' ')[0]}
                    </div>
                  </div>
                </div>

                {/* PERBAIKAN: Navigasi diarahkan ke EventDetailPage */}
                <Link
                  to={`/event/${event.slug.split('/').pop()}`}
                  className="w-full h-12 rounded-xl border flex items-center justify-center transition-all duration-500 overflow-hidden font-black text-[10px] uppercase tracking-[0.2em]"
                  style={{ 
                    borderColor: COLOR_NAVY, 
                    color: COLOR_NAVY,
                    backgroundColor: 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = COLOR_NAVY;
                    e.currentTarget.style.color = '#FFFFFF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = COLOR_NAVY;
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span>Lihat Detail Event</span>
                    <PlusIcon className="w-4 h-4" />
                  </div>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center text-gray-400 border border-dashed border-gray-200 rounded-[2rem]">
            Belum ada dokumentasi event keluarga besar saat ini.
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeEvents;