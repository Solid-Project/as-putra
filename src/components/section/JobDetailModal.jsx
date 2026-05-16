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
} from "@heroicons/react/24/outline";

const JobDetailModal = ({ job, isOpen, onClose }) => {
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  const COLOR_NAVY = "#1D2B53";
  const COLOR_GOLD = "#FFC619";

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(modalRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25 });
      gsap.fromTo(contentRef.current, 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" }
      );
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen || !job) return null;

  const requirements = [
    job.requirement,
    "Pengalaman kerja relevan di bidangnya",
    "Adaptif terhadap perubahan & inovatif",
    "Mampu bekerja dalam ekosistem tim yang dinamis",
  ];

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-6 bg-slate-900/60 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* PURE CARD: Menggunakan !bg-white mutlak dan inline style background #FFFFFF untuk menghancurkan sisa warna navy */}
      <div
        ref={contentRef}
        className="relative !bg-white border border-gray-200/80 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 md:p-10 flex flex-col gap-8 animate-none"
        style={{ backgroundColor: '#FFFFFF', color: '#1D2B53' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tombol Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-500 hover:text-gray-800 rounded-lg transition-all z-20"
          aria-label="Close modal"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>

        {/* SECTION 1: HEADER & META INFO */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center border border-gray-200 bg-gray-50">
                <BriefcaseIcon className="w-4 h-4" style={{ color: COLOR_NAVY }} />
              </div>
              <span 
                className="inline-block px-2.5 py-0.5 text-[9px] font-black uppercase tracking-widest rounded shadow-sm"
                style={{ backgroundColor: COLOR_GOLD, color: COLOR_NAVY }}
              >
                {job.type}
              </span>
            </div>
            <h2 className="text-2xl md:text-4xl font-['Playfair_Display'] font-black leading-tight" style={{ color: COLOR_NAVY }}>
              {job.title}
            </h2>
          </div>

          <div className="flex flex-wrap gap-4 text-gray-600 md:self-end">
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200/60 px-3 py-1.5 rounded-lg text-xs font-semibold">
              <MapPinIcon className="w-4 h-4 text-gray-400" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200/60 px-3 py-1.5 rounded-lg text-xs font-semibold">
              <CurrencyDollarIcon className="w-4 h-4 text-gray-400" />
              <span>{job.salary} Package</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200/60 px-3 py-1.5 rounded-lg text-xs font-semibold">
              <ClockIcon className="w-4 h-4 text-gray-400" />
              <span>Full-Time</span>
            </div>
          </div>
        </div>

        {/* SECTION 2: OVERVIEW */}
        <div>
          <h3 className="text-xs uppercase tracking-[0.25em] font-black mb-3 flex items-center gap-2" style={{ color: COLOR_NAVY }}>
            <SparklesIcon className="w-4 h-4" style={{ color: COLOR_GOLD }} /> Overview
          </h3>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed italic font-medium border-l-4 pl-4 py-0.5 border-gray-200">
            "Jadilah bagian dari evolusi industri bersama AS PUTRA Group. Kami mencari talenta kompeten yang siap berkontribusi aktif dan bertumbuh bersama membangun masa depan."
          </p>
        </div>

        {/* SECTION 3: KUALIFIKASI & BENEFIT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-sm font-bold mb-4 flex items-center gap-2 border-b border-gray-100 pb-2" style={{ color: COLOR_NAVY }}>
              <AcademicCapIcon className="w-4 h-4" style={{ color: COLOR_GOLD }} /> Kualifikasi
            </h3>
            <ul className="space-y-3">
              {requirements.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs md:text-sm text-gray-600 leading-relaxed font-medium">
                  <CheckBadgeIcon className="w-4 h-4 shrink-0 mt-0.5" style={{ color: COLOR_NAVY }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold mb-4 flex items-center gap-2 border-b border-gray-100 pb-2" style={{ color: COLOR_NAVY }}>
              <SparklesIcon className="w-4 h-4" style={{ color: COLOR_GOLD }} /> Benefit Kerja
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
               {["Gaji & Bonus Kompetitif", "Asuransi Kesehatan", "Jenjang Karir Terbuka", "Lingkungan Kerja Positif"].map((benefit, i) => (
                 <div key={i} className="bg-gray-50 border border-gray-200/60 p-3 rounded-lg text-xs text-gray-600 font-semibold hover:bg-gray-100/70 transition-colors">
                    {benefit}
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* SECTION 4: CTA BANNER */}
        <div className="p-6 rounded-lg text-white shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 mt-2" style={{ backgroundColor: COLOR_NAVY }}>
          <div className="text-center sm:text-left">
            <h4 className="text-lg md:text-xl font-bold mb-0.5 font-['Playfair_Display']">Tertarik Bergabung?</h4>
            <p className="text-[10px] font-bold opacity-75 uppercase tracking-wider">Kirimkan berkas lamaran Anda sekarang</p>
          </div>
          <a
            href={`mailto:recruitment@asputra.com?subject=Lamaran Kerja - ${job.title}`}
            className="group w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-white text-sm font-black rounded-lg transition-all shadow-md"
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
        <p className="text-center text-[9px] text-gray-400 uppercase tracking-widest font-bold pt-2">
          AS PUTRA • Recruitment Center • 2026
        </p>
      </div>
    </div>
  );
};

export default JobDetailModal;