import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  CalendarIcon, 
  MapPinIcon, 
  UserGroupIcon, 
  ClockIcon,
  PhotoIcon,
  ChevronRightIcon
} from "@heroicons/react/24/outline";

gsap.registerPlugin(ScrollTrigger);

const EventDetailPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  // Refs untuk animasi
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const sidebarRef = useRef(null);
  const galleryRef = useRef(null);

  // Data event lengkap
  const eventsData = {
    "annual-gathering-2025": {
      id: "annual-gathering-2025",
      title: "Annual Gathering 2025: Harmoni dalam Kebersamaan",
      date: "15-17 Agustus 2025",
      location: "Bali",
      category: "Gathering",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1920&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80",
      ],
      content: `
        <p><strong>BALI</strong> – Seluruh keluarga besar AS PUTRA berkumpul dalam acara tahunan Annual Gathering 2025 yang mengusung tema "Harmoni dalam Kebersamaan". Acara yang berlangsung selama 3 hari ini menjadi momen spesial untuk mempererat tali silaturahmi antar karyawan dari berbagai divisi dan daerah.</p>
        
        <p>Acara dimulai dengan upacara pembukaan yang meriah di Pantai Kuta, dihadiri oleh jajaran direksi dan seluruh karyawan. Dalam sambutannya, CEO AS PUTRA, Aif Arifin Sidhik, menyampaikan apresiasi atas dedikasi dan kerja keras seluruh karyawan yang telah membawa perusahaan mencapai berbagai pencapaian gemilang.</p>
        
        <p>"Keluarga adalah fondasi terkuat kita. Melalui gathering ini, mari kita saling mengenal lebih dekat, berbagi cerita, dan membangun kebersamaan yang lebih erat. Ingatlah, kesuksesan kita adalah karena kerja sama tim yang solid," ujarnya.</p>
        
        <p>Rangkaian acara meliputi berbagai kegiatan seru seperti fun games di pantai, lomba antar divisi, pentas seni, dan dinner gala dengan hiburan musik dari artis nasional. Setiap malam diisi dengan sesi sharing inspiratif dari para karyawan berprestasi.</p>
        
        <p>Momen paling berkesan adalah saat pengumuman karyawan teladan tahun ini. Penghargaan diberikan kepada 10 karyawan dengan kinerja terbaik dan dedikasi tinggi terhadap perusahaan. Mereka mendapatkan hadiah perjalanan liburan ke luar negeri.</p>
        
        <p>Acara ditutup dengan upacara pelepasan lampion bersama sebagai simbol harapan dan doa untuk masa depan yang lebih cerah. Seluruh peserta pulang dengan membawa kenangan indah dan semangat baru untuk bekerja lebih baik lagi.</p>
      `,
      participantCount: 500,
      duration: "3 Hari",
      organizer: "Event Management AS PUTRA"
    },
    "as-putra-cup-2025": {
      id: "as-putra-cup-2025",
      title: "AS PUTRA Cup 2025: Turnamen Futsal Antar Divisi",
      date: "10 Oktober 2025",
      location: "Kuningan",
      category: "Olahraga",
      image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=1920&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=800&q=80",
      ],
      content: `
        <p><strong>KUNINGAN</strong> – Semangat sportivitas dan kebersamaan terpancar dalam ajang AS PUTRA Cup 2025, turnamen futsal tahunan yang mempertemukan tim-tim dari berbagai divisi di lingkungan AS PUTRA Group.</p>
        
        <p>Turnamen yang berlangsung selama 2 minggu ini diikuti oleh 24 tim yang mewakili masing-masing divisi, mulai dari Farm Division, Logistics, Finance, HRD, hingga Marketing. Pertandingan berlangsung sengit namun tetap menjunjung tinggi fair play.</p>
        
        <p>Direktur Operasional AS PUTRA, yang turut hadir dalam pembukaan turnamen, menyatakan bahwa kegiatan ini merupakan bagian dari program work-life balance perusahaan.</p>
        
        <p>"Kesehatan karyawan adalah investasi jangka panjang. Melalui olahraga, kita tidak hanya menjaga kebugaran fisik, tetapi juga membangun teamwork dan jiwa kompetisi yang sehat," ujarnya.</p>
        
        <p>Babak final mempertemukan tim Farm Division melawan tim Marketing. Pertandingan berlangsung dramatis dengan skor akhir 3-2 untuk kemenangan tim Farm Division. Gelar pemain terbaik diraih oleh Ahmad Rizal dari tim Farm Division yang mencetak 2 gol di babak final.</p>
        
        <p>Acara penutupan dimeriahkan dengan pembagian hadiah menarik bagi para pemenang, termasuk tropi bergilir, uang pembinaan, serta paket wisata untuk seluruh anggota tim juara. Turnamen ini rencananya akan menjadi agenda rutin tahunan yang semakin meriah di masa mendatang.</p>
      `,
      participantCount: 240,
      duration: "2 Minggu",
      organizer: "Sport Committee AS PUTRA"
    },
    "outbound-leadership-2025": {
      id: "outbound-leadership-2025",
      title: "Outbound Leadership: Melatih Jiwa Pemimpin",
      date: "5-6 November 2025",
      location: "Pangandaran",
      category: "Pelatihan",
      image: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=1920&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80",
      ],
      content: `
        <p><strong>PANGANDARAN</strong> – Sebanyak 50 karyawan potensial AS PUTRA mengikuti program Outbound Leadership 2 hari 1 malam di kawasan Green Canyon, Pangandaran. Kegiatan ini dirancang khusus untuk mengasah kemampuan kepemimpinan dan pengambilan keputusan dalam situasi yang menantang.</p>
        
        <p>Para peserta dibagi menjadi 5 tim dan mengikuti serangkaian aktivitas outbound yang menantang, seperti flying fox, rafting, team building games, hingga simulasi manajemen krisis. Setiap aktivitas dirancang untuk menguji ketahanan mental, kerjasama tim, dan kemampuan memimpin.</p>
        
        <p>Instruktur profesional dari Indonesia Leadership Center memandu jalannya kegiatan dan memberikan evaluasi mendalam kepada setiap peserta. Mereka juga memberikan sesi coaching individu untuk mengidentifikasi potensi kepemimpinan masing-masing.</p>
        
        <p>"Banyak orang hebat secara teknis, tapi tidak semua bisa memimpin tim. Program ini membantu kami mengidentifikasi bibit-bibit pemimpin masa depan AS PUTRA," ujar Head of HRD AS PUTRA.</p>
        
        <p>Sesi malam diisi dengan api unggun dan diskusi inspiratif tentang visi dan misi perusahaan. Para peserta diajak untuk memaparkan ide-ide inovatif mereka untuk kemajuan perusahaan. Ide-ide terbaik akan direalisasikan dalam program kerja tahun depan.</p>
        
        <p>Program ini mendapat antusiasme tinggi dari peserta. Banyak yang mengaku mendapatkan pengalaman berharga dan wawasan baru tentang gaya kepemimpinan yang efektif. AS PUTRA berencana untuk mengadakan program serupa secara rutin setiap tahun.</p>
      `,
      participantCount: 50,
      duration: "2 Hari",
      organizer: "HRD Development Center"
    }
  };

  // Event lain untuk sidebar
  const otherEvents = [
    {
      id: "annual-gathering-2025",
      title: "Annual Gathering 2025",
      date: "15-17 Agustus 2025",
      category: "Gathering"
    },
    {
      id: "as-putra-cup-2025",
      title: "AS PUTRA Cup 2025",
      date: "10 Oktober 2025",
      category: "Olahraga"
    },
    {
      id: "outbound-leadership-2025",
      title: "Outbound Leadership",
      date: "5-6 November 2025",
      category: "Pelatihan"
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      const selectedEvent = eventsData[id];
      if (selectedEvent) {
        setEvent(selectedEvent);
        document.title = `${selectedEvent.title} | AS PUTRA Event`;
      } else {
        setEvent(null);
        document.title = "Event Tidak Ditemukan | AS PUTRA";
      }
      setLoading(false);
    }, 100);
  }, [id]);

  // Animasi GSAP
  useEffect(() => {
    if (!event || loading) return;

    const ctx = gsap.context(() => {
      // Animasi Hero Image
      gsap.fromTo(
        heroRef.current,
        { scale: 1.1, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
        }
      );

      // Animasi Title
      gsap.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.3,
          ease: "back.out(0.7)",
        }
      );

      // Animasi Content
      gsap.fromTo(
        contentRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.5,
          ease: "power3.out",
        }
      );

      // Animasi Sidebar
      gsap.fromTo(
        sidebarRef.current,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.6,
          ease: "power3.out",
        }
      );

      // Animasi Gallery
      if (galleryRef.current) {
        gsap.fromTo(
          galleryRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            delay: 0.8,
            ease: "power3.out",
          }
        );
      }
    });

    return () => ctx.revert();
  }, [event, loading]);

  // Scroll ke atas saat halaman dibuka
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const categoryColors = {
    Gathering: "bg-purple-100 text-purple-700",
    Olahraga: "bg-green-100 text-green-700",
    Pelatihan: "bg-blue-100 text-blue-700",
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[var(--color-utama)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[var(--color-teks-muted)]">Memuat event...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-5">
        <div className="text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold text-[var(--color-teks)] mb-4">
            Event Tidak Ditemukan
          </h1>
          <p className="text-[var(--color-teks-muted)] mb-8">
            Maaf, event yang Anda cari tidak tersedia.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[var(--color-utama)] text-white font-medium rounded-lg transition-all duration-300 hover:bg-opacity-80"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Image Section - FULL BANNER tanpa back button */}
      <div className="relative h-screen max-h-[70vh] md:max-h-[80vh] overflow-hidden">
        <div ref={heroRef} className="absolute inset-0">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        </div>

        {/* Hero Overlay Content - Full Center */}
        <div className="absolute inset-0 flex items-center justify-center text-center text-white">
          <div className="max-w-4xl mx-auto px-5">
            <div ref={titleRef}>
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${categoryColors[event.category]}`}
              >
                {event.category}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-['Playfair_Display'] font-bold leading-tight mb-6">
                {event.title}
              </h1>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-white/80">
                <span className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  {event.date}
                </span>
                <span className="flex items-center gap-2">
                  <MapPinIcon className="w-4 h-4" />
                  {event.location}
                </span>
                <span className="flex items-center gap-2">
                  <UserGroupIcon className="w-4 h-4" />
                  {event.participantCount} Peserta
                </span>
                <span className="flex items-center gap-2">
                  <ClockIcon className="w-4 h-4" />
                  {event.duration}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-[1200px] mx-auto px-5 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <article
            ref={contentRef}
            className="lg:col-span-2 prose prose-lg max-w-none text-[var(--color-teks-muted)] leading-relaxed"
          >
            <div dangerouslySetInnerHTML={{ __html: event.content }} />

            {/* Galeri Foto */}
            {event.gallery && event.gallery.length > 0 && (
              <div className="mt-12" ref={galleryRef}>
                <h3 className="text-xl font-bold text-[var(--color-teks)] mb-4 flex items-center gap-2">
                  <PhotoIcon className="w-5 h-5 text-[var(--color-utama)]" />
                  Galeri Foto
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {event.gallery.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
                      onClick={() => setSelectedImage(img)}
                    >
                      <img
                        src={img}
                        alt={`Galeri ${event.title} ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-sm">
                          Klik untuk lihat
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside ref={sidebarRef} className="lg:sticky lg:top-[100px]">
            {/* Info Event */}
            <div className="bg-[var(--color-bg-alt)] rounded-2xl p-6 shadow-md">
              <h4 className="text-lg font-bold text-[var(--color-teks)] mb-4 pb-2 border-b-2 border-[var(--color-utama)] inline-block">
                Informasi Event
              </h4>
              <div className="space-y-4 mt-4">
                <div className="flex items-start gap-3">
                  <CalendarIcon className="w-5 h-5 text-[var(--color-utama)] mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-[var(--color-teks)]">Tanggal</p>
                    <p className="text-sm text-[var(--color-teks-muted)]">{event.date}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPinIcon className="w-5 h-5 text-[var(--color-utama)] mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-[var(--color-teks)]">Lokasi</p>
                    <p className="text-sm text-[var(--color-teks-muted)]">{event.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <UserGroupIcon className="w-5 h-5 text-[var(--color-utama)] mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-[var(--color-teks)]">Peserta</p>
                    <p className="text-sm text-[var(--color-teks-muted)]">{event.participantCount} orang</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ClockIcon className="w-5 h-5 text-[var(--color-utama)] mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-[var(--color-teks)]">Durasi</p>
                    <p className="text-sm text-[var(--color-teks-muted)]">{event.duration}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Event Lainnya */}
            <div className="mt-8 bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              <h4 className="text-lg font-bold text-[var(--color-teks)] mb-4 pb-2 border-b-2 border-[var(--color-utama)] inline-block">
                Event Lainnya
              </h4>
              <div className="space-y-4 mt-4">
                {otherEvents
                  .filter((item) => item.id !== id)
                  .map((item) => (
                    <Link
                      key={item.id}
                      to={`/event/${item.id}`}
                      className="block group p-3 rounded-xl hover:bg-gray-50 transition-all duration-300"
                    >
                      <span className="text-xs text-[var(--color-teks-muted)]">
                        {item.date}
                      </span>
                      <h5 className="text-base font-semibold text-[var(--color-teks)] mt-1 group-hover:text-[var(--color-utama)] transition-colors line-clamp-2">
                        {item.title}
                      </h5>
                      <span
                        className={`inline-block text-xs mt-2 px-2 py-0.5 rounded-full ${categoryColors[item.category] || "bg-gray-100 text-gray-600"}`}
                      >
                        {item.category}
                      </span>
                    </Link>
                  ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-8 bg-gradient-to-r from-[var(--color-utama)]/10 to-transparent rounded-2xl p-6 border border-[var(--color-utama)]/20">
              <h4 className="font-bold text-[var(--color-teks)] mb-2">
                Ingin Berpartisipasi?
              </h4>
              <p className="text-sm text-[var(--color-teks-muted)] mb-4">
                Ikuti event-event seru bersama keluarga besar AS PUTRA.
              </p>
              <Link
                to="/career"
                className="inline-flex items-center gap-2 px-5 py-2 bg-[var(--color-utama)] text-white rounded-lg text-sm hover:bg-opacity-80 transition-all"
              >
                Lihat Event Lainnya
                <ChevronRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </aside>
        </div>
      </div>

      {/* Modal Galeri */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 p-2 text-white hover:text-gray-300 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src={selectedImage}
            alt="Galeri full"
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .prose {
          font-size: 1.125rem;
        }
        .prose p {
          margin-bottom: 1.25rem;
          line-height: 1.75;
        }
        .prose strong {
          color: var(--color-teks);
          font-weight: 600;
        }
        .prose em {
          font-style: italic;
        }
      `}</style>
    </main>
  );
};

export default EventDetailPage;