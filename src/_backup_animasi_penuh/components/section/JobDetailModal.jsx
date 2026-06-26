import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  XMarkIcon,
  BriefcaseIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  AcademicCapIcon,
  ClockIcon,
  EnvelopeIcon,
  CheckBadgeIcon,
  SparklesIcon,
  ArrowRightIcon,
  CalendarDaysIcon
} from "@heroicons/react/24/outline";

const JobDetailModal = ({ job, isOpen, onClose }) => {
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  const COLOR_NAVY = "#1D2B53";
  const COLOR_GOLD = "#FFC619";

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(contentRef.current, 
        { scale: 0.95, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" }
      );
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen || !job) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div
      ref={modalRef}
      // Dibuat bg-transparent tanpa warna dasar dan tanpa backdrop-blur agar halaman utama bersih
      className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-6 bg-transparent"
      onClick={onClose}
    >
      <div
        ref={contentRef}
        // Shadow ditingkatkan ke 'shadow-2xl' dengan ring border halus agar kartu tetap terpisah manis dari halaman belakang
        className="relative w-full max-w-3xl bg-white border border-gray-100 ring-1 ring-black/5 rounded-2xl max-h-[85vh] overflow-y-auto shadow-2xl p-6 md:p-8 flex flex-col gap-6"
        style={{ color: '#1D2B53', backgroundColor: '#FFFFFF' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tombol Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-400 hover:text-gray-700 rounded-xl transition-all z-20"
          aria-label="Close modal"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>

        {/* HEADER SECTION */}
        <div className="flex flex-col gap-4 pb-6 border-b border-gray-100">
          <div className="flex flex-wrap items-center gap-2">
            <span 
              className="inline-block px-2.5 py-0.5 text-[9px] font-black uppercase tracking-widest rounded shadow-sm"
              style={{ backgroundColor: COLOR_GOLD, color: COLOR_NAVY }}
            >
              {job.type}
            </span>
            <span className="text-gray-200 text-xs">•</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${job.is_active ? 'bg-green-50 text-green-700 border border-green-200/50' : 'bg-red-50 text-red-700'}`}>
              {job.is_active ? "Active Opening" : "Closed"}
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-['Playfair_Display'] font-black leading-tight tracking-tight" style={{ color: COLOR_NAVY }}>
            {job.title}
          </h2>

          {/* Grid Informasi Utama */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-1">
            <div className="flex items-center gap-2.5 bg-gray-50/80 border border-gray-200/50 px-3 py-2 rounded-xl">
              <MapPinIcon className="w-4 h-4 text-gray-400 shrink-0" />
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-wider font-bold text-gray-400">Lokasi</span>
                <span className="text-xs font-bold capitalize text-gray-700">{job.location}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 bg-gray-50/80 border border-gray-200/50 px-3 py-2 rounded-xl">
              <CurrencyDollarIcon className="w-4 h-4 text-gray-400 shrink-0" />
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-wider font-bold text-gray-400">Gaji / Package</span>
                <span className="text-xs font-bold text-gray-700">Rp {parseInt(job.salary).toLocaleString("id-ID")}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 bg-gray-50/80 border border-gray-200/50 px-3 py-2 rounded-xl col-span-2 sm:col-span-1">
              <CalendarDaysIcon className="w-4 h-4 text-gray-400 shrink-0" />
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-wider font-bold text-gray-400">Diterbitkan</span>
                <span className="text-xs font-semibold text-gray-600">{formatDate(job.created_at)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* DESKRIPSI / OVERVIEW SECTION */}
        <div className="bg-gradient-to-r from-gray-50 to-transparent p-4 rounded-xl border-l-4" style={{ borderColor: COLOR_GOLD }}>
          <h3 className="text-[10px] uppercase tracking-[0.2em] font-black mb-1.5 flex items-center gap-1.5 text-gray-400">
            <BriefcaseIcon className="w-3.5 h-3.5 text-gray-400" /> Deskripsi Pekerjaan
          </h3>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed whitespace-pre-line font-medium">
            {job.description}
          </p>
        </div>

        {/* DETAIL GRID: KUALIFIKASI & BENEFIT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Kolom Kualifikasi */}
          <div className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm">
            <h3 className="text-xs uppercase tracking-widest font-black mb-3 flex items-center gap-2 border-b border-gray-100 pb-2 text-gray-400">
              <AcademicCapIcon className="w-4 h-4" style={{ color: COLOR_GOLD }} /> Kualifikasi Utama
            </h3>
            <ul className="space-y-2.5">
              {job.qualifications?.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs md:text-sm text-gray-600 leading-relaxed font-semibold">
                  <CheckBadgeIcon className="w-4 h-4 shrink-0 mt-0.5" style={{ color: COLOR_NAVY }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom Benefit */}
          <div className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm">
            <h3 className="text-xs uppercase tracking-widest font-black mb-3 flex items-center gap-2 border-b border-gray-100 pb-2 text-gray-400">
              <SparklesIcon className="w-4 h-4" style={{ color: COLOR_GOLD }} /> Kompensasi & Benefit
            </h3>
            <div className="flex flex-col gap-2">
              {job.benefits?.map((benefit, i) => (
                <div key={i} className="bg-gray-50/80 border border-gray-200/40 px-3 py-2 rounded-lg text-xs text-gray-600 font-bold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLOR_GOLD }} />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA BANNER */}
        <div className="p-6 rounded-xl text-white flex flex-col sm:flex-row items-center justify-between gap-4 mt-2 shadow-lg shadow-slate-900/10" style={{ backgroundColor: COLOR_NAVY }}>
          <div className="text-center sm:text-left">
            <h4 className="text-lg font-bold mb-0.5 font-['Playfair_Display'] tracking-wide">Tertarik Bergabung?</h4>
            <p className="text-[10px] font-medium opacity-75 uppercase tracking-widest">Kirimkan berkas lamaran Anda langsung ke tim kami</p>
          </div>
          <a
            href={`mailto:recruitment@asputra.com?subject=Lamaran Kerja - ${job.title}`}
            className="group w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md"
            style={{ color: COLOR_NAVY }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = COLOR_GOLD;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
            }}
          >
            <EnvelopeIcon className="w-4 h-4" />
            <span>Kirim Lamaran</span>
            <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-3 text-[9px] text-gray-400 font-bold uppercase tracking-wider">
          <span>ID Lowongan: #{job.id}</span>
          <span>AS PUTRA Group • 2026</span>
        </div>
      </div>
    </div>
  );
};

export default JobDetailModal;