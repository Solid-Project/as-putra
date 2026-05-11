import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { 
  MapPinIcon, 
  PlusIcon,
  CalendarDaysIcon
} from "@heroicons/react/24/outline";

const eventsData = [
  {
    id: "annual-gathering-2025",
    title: "Annual Gathering 2025",
    description: "Momen kebersamaan seluruh keluarga besar AS PUTRA di Bali dengan tema 'Harmoni dalam Kebersamaan'.",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=600&q=80",
    date: "15-17 Agustus 2025",
    location: "Bali",
    category: "Gathering"
  },
  {
    id: "as-putra-cup-2025",
    title: "AS PUTRA Cup",
    description: "Turnamen futsal antar divisi untuk menjaga sportivitas dan kesehatan karyawan.",
    image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=600&q=80",
    date: "10 Oktober 2025",
    location: "Kuningan",
    category: "Olahraga"
  },
  {
    id: "outbound-leadership-2025",
    title: "Outbound Leadership",
    description: "Melatih jiwa kepemimpinan melalui kegiatan alam terbuka yang menantang.",
    image: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=600&q=80",
    date: "5-6 November 2025",
    location: "Pangandaran",
    category: "Pelatihan"
  },
];

const EmployeeEvents = ({ isActive }) => {
  const cardsRef = useRef([]);

  useEffect(() => {
    if (!isActive) return;

    gsap.fromTo(
      cardsRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      }
    );
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="py-10">
      {/* 🚀 Header: Minimalist & High Contrast */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div className="max-w-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-[var(--color-utama)]"></div>
            <h3 className="text-[var(--color-utama)] text-xs font-black uppercase tracking-[0.4em]">
              Life at AS PUTRA
            </h3>
          </div>
          <p className="text-3xl md:text-4xl font-['Playfair_Display'] text-white font-bold">
            Membangun <span className="italic text-[var(--color-utama)]">Keluarga</span>, Bukan Sekadar Tim.
          </p>
        </div>
        <div className="h-[1px] flex-grow bg-white/10 hidden md:block mx-10 mb-4 text-white/20"></div>
      </div>

      {/* ⚡ Event Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
        {eventsData.map((event, index) => (
          <div
            key={event.id}
            ref={(el) => (cardsRef.current[index] = el)}
            className="group relative h-[500px] rounded-[2.5rem] overflow-hidden bg-[#0A1128] border border-white/10 transition-all duration-500 shadow-2xl"
          >
            {/* Background Image: Overlay dipertebal agar teks gray-200 terbaca */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover opacity-50 group-hover:scale-110 group-hover:opacity-30 transition-all duration-1000 ease-out grayscale group-hover:grayscale-0"
              />
              {/* Overlay Gradasi: Sangat gelap di bagian bawah untuk kontras teks murni */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050A1A] via-[#050A1A]/60 to-transparent" />
            </div>

            {/* Content Layer */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              {/* Category & Title */}
              <div className="mb-4 translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <span className="inline-block px-3 py-1 rounded-full bg-[var(--color-utama)] text-[#050A1A] text-[10px] font-black uppercase tracking-widest mb-3 shadow-lg shadow-[var(--color-utama)]/20">
                  {event.category}
                </span>
                <h4 className="text-3xl font-['Playfair_Display'] text-white font-bold leading-tight">
                  {event.title}
                </h4>
              </div>

              {/* Revealable Content: Menggunakan gray-200 agar kontras di dark mode */}
              <div className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                <p className="text-gray-200 text-sm mb-6 leading-relaxed line-clamp-3 font-medium">
                  {event.description}
                </p>
                
                <div className="flex flex-wrap items-center gap-4 text-[11px] font-bold uppercase tracking-widest text-white/80 mb-8 border-t border-white/10 pt-4">
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="w-4 h-4 text-[var(--color-utama)]" />
                    {event.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarDaysIcon className="w-4 h-4 text-[var(--color-utama)]" />
                    {event.date}
                  </div>
                </div>
              </div>

              {/* Action Button: Navy on Yellow (Contrast King) */}
              <Link
                to={`/event/${event.id}`}
                className="w-full h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-[var(--color-utama)] group-hover:text-[#050A1A] transition-all duration-500 overflow-hidden"
              >
                <div className="flex items-center gap-3 font-black text-xs uppercase tracking-[0.2em]">
                  <span className="opacity-0 group-hover:opacity-100 max-w-0 group-hover:max-w-[200px] transition-all duration-500">
                    Lihat Detail
                  </span>
                  <PlusIcon className="w-5 h-5 flex-shrink-0" />
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeEvents;