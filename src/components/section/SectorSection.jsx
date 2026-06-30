import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSectionAnimation } from "@/hooks/useSectionAnimation";
import logoAsliUrl from "@/assets/logo.jpg";

import imgPeternakan from "@/assets/img/AMM.webp";
import imgHospitality from "@/assets/img/hotel5.jpeg";
import imgRetail from "@/assets/img/karir.webp";
import imgEkspedisi from "@/assets/img/transport.webp";
import imgLifestyle from "@/assets/img/lifestyle.jpg";
import imgEnergi from "@/assets/img/Otomotif.webp";
import imgEdukasi from "@/assets/img/herocarousel6.webp";
import imgProperty from "@/assets/img/property2.jpeg";

const SECTOR_CUSTOM_DATA = {
  "peternakan": { image: imgPeternakan, description: "Penyedia produk protein hewani terintegrasi dengan standar higienis dan teknologi modern kualitas tinggi." },
  "hospitality": { image: imgHospitality, description: "Menghadirkan layanan kenyamanan dan keramahan eksklusif untuk memenuhi kebutuhan hospitality modern." },
  "retail": { image: imgRetail, description: "Jaringan distribusi dan pemenuhan kebutuhan harian masyarakat yang efisien, andal, dan terjangkau." },
  "ekspedisi": { image: imgEkspedisi, description: "Solusi logistik dan rantai pasok terintegrasi guna mendukung kelancaran distribusi multi-industri." },
  "lifestyle": { image: imgLifestyle, description: "Inovasi tren gaya hidup modern yang memberikan nilai tambah bagi ekspresi dan kenyamanan harian Anda." },
  "energi-dan-otomotif": { image: imgEnergi, description: "Pengembangan energi alternatif dan ekosistem otomotif masa depan yang efisien serta ramah lingkungan." },
  "edukasi": { image: imgEdukasi, description: "Membangun pilar peradaban bangsa lewat penyediaan fasilitas edukasi dan pelatihan yang kompeten." },
  "property": { image: imgProperty, description: "Infrastruktur hunian dan kawasan komersial bernilai investasi tinggi dengan konsep tata ruang visioner." }
};

gsap.registerPlugin(ScrollTrigger);

const SectorSkeleton = () => (
  <div className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1.5rem)] max-w-sm animate-pulse">
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col justify-end aspect-video sm:aspect-[4/3]">
      <div className="space-y-3 w-full">
        <div className="h-3 bg-neutral-700/50 rounded-full w-1/4 mb-1" />
        <div className="h-6 bg-neutral-700/50 rounded-lg w-1/2 mb-2" />
        <div className="h-3 bg-neutral-700/50 rounded w-full" />
      </div>
    </div>
  </div>
);

const SectorSection = ({ index, activeIndex, currentSlug }) => {
  const [sectors, setSectors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const sectionRef = useRef(null);
  const headerRef = useRef(null);

  const isActive = activeIndex === index;
  const COLOR_GOLD = "#FFC619";

  useEffect(() => {
    const fetchSectors = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL.replace(/\/$/, "");
        const response = await fetch(`${baseUrl}/api/v1/page/list`);
        const json = await response.json();

        if (json.status && json.data) {
          const sectorPages = json.data
            .filter(p => p && p.name && (p.name.toLowerCase().includes("sector") || p.name.toLowerCase().includes("sektor")))
            .map(p => {
              const cleanLabel = p.name.replace(/Sector\s+/i, "").replace(/Sektor\s+/i, "").trim();
              const generatedSlug = cleanLabel.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
              const localCustom = SECTOR_CUSTOM_DATA[generatedSlug];
              return {
                id: p.id, originalName: p.name, label: cleanLabel, slug: generatedSlug,
                image: localCustom?.image || `https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?q=80&w=800`,
                description: localCustom?.description || "Bagian dari pilar ekosistem bisnis terintegrasi AS PUTRA Group Indonesia."
              };
            })
            .filter(p => p.slug !== currentSlug);
          setSectors(sectorPages);
        }
      } catch (error) {
        console.error("Gagal memuat daftar sektor:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSectors();
  }, [currentSlug]);

  useSectionAnimation(sectionRef, () => {
    if (isLoading || sectors.length === 0) return;

    if (window.innerWidth < 768) {
      gsap.set([headerRef.current, ".sector-card-item"], { opacity: 1, y: 0, clearProps: "all" });
      return;
    }

    if (!isActive && !currentSlug) return;

    ScrollTrigger.refresh();
    const tl = gsap.timeline();
    tl.fromTo(headerRef.current, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", force3D: true })
      .fromTo(".sector-card-item", { y: 35, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.7, ease: "power2.out", force3D: true }, "-=0.3");
  }, [isActive, isLoading, sectors, currentSlug]);

  if (!isLoading && sectors.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen py-24 md:py-32 bg-[#070D22] flex flex-col justify-start overflow-hidden px-6 sm:px-8 md:px-12 lg:px-[8%] select-none"
      id={`section-${index}`}
      data-theme="dark"
    >
      {/* Background Decor Siluet Logo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.012] pointer-events-none -z-0">
        <img src={logoAsliUrl} alt="" loading="lazy" className="w-[60%] h-auto rotate-[-8deg] grayscale object-contain" />
      </div>

      <div className="w-full relative z-10 max-w-[1440px] mx-auto flex flex-col items-stretch h-auto gap-16">

        {/* AREA JUDUL */}
        <div ref={headerRef} className="text-center flex-shrink-0 opacity-100 md:opacity-0 flex flex-col items-center">
          <div className="inline-block px-4 py-1 border border-[#FFC619]/30 rounded-full mb-3 bg-white/[0.02] backdrop-blur-sm">
            <span style={{ color: COLOR_GOLD }} className="font-black tracking-[0.35em] uppercase text-[9px] lg:text-[10px]">
              {currentSlug ? "Explore More Units" : "Sektor Bisnis Kami"}
            </span>
          </div>
        </div>

        {/* AREA KONTEN (FLEXBOX SEIMBANG DI TENGAH) */}
        <div className="w-full">
          {isLoading ? (
            <div className="flex flex-wrap justify-center gap-6 md:gap-8 w-full">
              {[1, 2, 3].map((_, idx) => <SectorSkeleton key={idx} />)}
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-6 md:gap-8 w-full items-stretch">
              {sectors.map((sector) => (
                <Link
                  key={sector.id}
                  to={`/sector/${sector.slug}`}
                  className="sector-card-item opacity-100 md:opacity-0 group relative flex flex-col justify-end p-6 md:p-8 bg-[#0F1A3E] border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] hover:border-[#FFC619]/40 transition-all duration-500 overflow-hidden w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1.5rem)] max-w-sm aspect-video sm:aspect-[4/3]"
                >
                  {/* MEDIA BACKGROUND IMAGE KARTU KUSTOM STATIS */}
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <img
                      src={sector.image}
                      alt={sector.label}
                      loading="lazy"
                      className="w-full h-full object-cover filter grayscale brightness-[0.4] group-hover:brightness-[0.6] transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070D22] via-[#070D22]/60 to-transparent opacity-95" />
                  </div>

                  {/* KONTEN TEKS KARTU */}
                  <div className="relative z-10 w-full text-left">
                    <span style={{ color: COLOR_GOLD }} className="text-[9px] font-black uppercase tracking-[0.25em] block mb-1.5 opacity-80">
                      AS PUTRA GROUP
                    </span>

                    <h3 className="text-xl lg:text-2xl font-bold text-white mb-2 font-['Playfair_Display'] group-hover:text-[#FFC619] transition-colors duration-300">
                      Sektor {sector.label}
                    </h3>

                    <p className="text-gray-300 text-xs leading-relaxed font-light line-clamp-3 opacity-70 group-hover:opacity-95 transition-opacity duration-300 mb-2">
                      {sector.description}
                    </p>

                    {/* Tombol Aksi Indikator */}
                    <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] mt-2 text-[#FFC619]">
                      <span>Jelajahi Unit</span>
                      <span className="transform translate-x-0 group-hover:translate-x-2 transition-transform duration-300">→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default SectorSection;