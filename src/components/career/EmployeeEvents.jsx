import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  CalendarIcon, 
  MapPinIcon, 
  EyeIcon,
  ChevronRightIcon
} from "@heroicons/react/24/outline";

gsap.registerPlugin(ScrollTrigger);

const eventsData = [
  {
    id: "annual-gathering-2025",
    title: "Annual Gathering 2025",
    description:
      "Momen kebersamaan seluruh keluarga besar AS PUTRA di Bali dengan tema 'Harmoni dalam Kebersamaan'.",
    image:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=600&q=80",
    date: "15-17 Agustus 2025",
    location: "Bali",
    category: "Gathering"
  },
  {
    id: "as-putra-cup-2025",
    title: "AS PUTRA Cup",
    description:
      "Turnamen futsal antar divisi untuk menjaga sportivitas dan kesehatan karyawan.",
    image:
      "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=600&q=80",
    date: "10 Oktober 2025",
    location: "Kuningan",
    category: "Olahraga"
  },
  {
    id: "outbound-leadership-2025",
    title: "Outbound Leadership",
    description:
      "Melatih jiwa kepemimpinan melalui kegiatan alam terbuka yang menantang.",
    image:
      "https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=600&q=80",
    date: "5-6 November 2025",
    location: "Pangandaran",
    category: "Pelatihan"
  },
];

const EmployeeEvents = ({ isActive }) => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    if (!isActive) return;

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
              immediateRender: false,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isActive]);

  if (!isActive) return null;

  const categoryColors = {
    Gathering: "bg-purple-100 text-purple-700",
    Olahraga: "bg-green-100 text-green-700",
    Pelatihan: "bg-blue-100 text-blue-700",
  };

  return (
    <div ref={sectionRef}>
      {/* Title Section */}
      <div className="text-center mb-12">
        <h3 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold text-[var(--color-teks)] mb-4">
          Keseruan Kami
        </h3>
        <div className="w-16 h-0.5 bg-[var(--color-utama)] mx-auto mb-4"></div>
        <p className="text-[var(--color-teks-muted)] max-w-2xl mx-auto">
          Membangun kekeluargaan melalui event dan gathering seru bersama seluruh keluarga besar AS PUTRA
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {eventsData.map((event, index) => (
          <div
            key={event.id}
            ref={(el) => (cardsRef.current[index] = el)}
            className="group bg-[var(--color-bg-alt)] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div className="overflow-hidden h-56 relative">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-4 right-4 bg-black/60 rounded-full px-3 py-1 text-xs text-white">
                {event.date}
              </div>
              <div className="absolute bottom-4 left-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[event.category]}`}>
                  {event.category}
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <MapPinIcon className="w-4 h-4 text-[var(--color-utama)]" />
                <span className="text-[var(--color-teks-muted)] text-sm">{event.location}</span>
              </div>
              <h3 className="text-xl font-semibold text-[var(--color-teks)] mb-3 group-hover:text-[var(--color-utama)] transition-colors duration-300">
                {event.title}
              </h3>
              <p className="text-[var(--color-teks-muted)] text-sm leading-relaxed line-clamp-2">
                {event.description}
              </p>
              <Link
                to={`/event/${event.id}`}
                className="mt-4 inline-flex items-center gap-2 text-[var(--color-utama)] text-sm font-medium hover:gap-3 transition-all duration-300"
              >
                <EyeIcon className="w-4 h-4" />
                <span>Lihat Detail Event</span>
                <ChevronRightIcon className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default EmployeeEvents;