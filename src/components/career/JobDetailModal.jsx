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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(modalRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo(contentRef.current, 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
      );
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen || !job) return null;

  const requirements = [
    "Pendidikan minimal sesuai bidang",
    "Pengalaman kerja relevan minimal 2 tahun",
    "Adaptif terhadap perubahan & inovatif",
    "Mampu bekerja dalam ekosistem tim yang dinamis",
  ];

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        ref={contentRef}
        className="relative bg-[#0F172A] border border-white/20 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button - Dibuat lebih kontras */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-red-500 text-white rounded-full transition-all z-20"
          aria-label="Close modal"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        <div className="flex flex-col md:flex-row h-full overflow-hidden">
          
          {/* Left Column: Visual & Quick Info - Menggunakan Navy yang lebih tajam */}
          <div className="md:w-1/3 bg-gradient-to-br from-[#1E293B] to-[#0F172A] p-8 text-white border-b md:border-b-0 md:border-r border-white/10">
            <div className="mb-10">
               <div className="w-16 h-16 bg-[var(--color-utama)] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-[var(--color-utama)]/20">
                  <BriefcaseIcon className="w-8 h-8 text-[#0A1128]" />
               </div>
               <h2 className="text-3xl font-['Playfair_Display'] font-bold leading-tight mb-4">{job.title}</h2>
               <span className="px-3 py-1 bg-[var(--color-utama)] text-[#0A1128] text-[10px] font-extrabold uppercase tracking-widest rounded-full">
                  {job.type}
               </span>
            </div>

            <div className="space-y-5">
               <div className="flex items-center gap-3 text-white/90">
                  <MapPinIcon className="w-5 h-5 text-[var(--color-utama)]" />
                  <span className="text-sm font-medium">{job.location}</span>
               </div>
               <div className="flex items-center gap-3 text-white/90">
                  <CurrencyDollarIcon className="w-5 h-5 text-[var(--color-utama)]" />
                  <span className="text-sm font-medium">{job.salary}</span>
               </div>
               <div className="flex items-center gap-3 text-white/90">
                  <ClockIcon className="w-5 h-5 text-[var(--color-utama)]" />
                  <span className="text-sm font-medium">Full-time Position</span>
               </div>
            </div>
          </div>

          {/* Right Column: Details - Fokus pada Readability */}
          <div className="flex-1 p-8 md:p-12 text-white overflow-y-auto custom-scrollbar">
            {/* Overview */}
            <div className="mb-12">
              <h3 className="text-[var(--color-utama)] text-xs uppercase tracking-[0.3em] font-bold mb-4 flex items-center gap-2">
                <SparklesIcon className="w-4 h-4" /> Overview
              </h3>
              <p className="text-gray-200 text-lg leading-relaxed italic font-light">
                "Jadilah bagian dari revolusi industri bersama AS PUTRA. Kami mencari talenta yang tidak hanya bekerja, tapi juga menciptakan standar baru."
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-12">
              {/* Requirements - Teks ditingkatkan ke gray-200 */}
              <div>
                <h3 className="text-white text-lg font-bold mb-5 flex items-center gap-2 border-b border-white/10 pb-2">
                  <AcademicCapIcon className="w-5 h-5 text-[var(--color-utama)]" /> Kualifikasi
                </h3>
                <ul className="space-y-4">
                  {requirements.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-200 leading-relaxed">
                      <CheckBadgeIcon className="w-5 h-5 text-[var(--color-utama)] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div>
                <h3 className="text-white text-lg font-bold mb-5 flex items-center gap-2 border-b border-white/10 pb-2">
                  <SparklesIcon className="w-5 h-5 text-[var(--color-utama)]" /> Benefit
                </h3>
                <div className="grid grid-cols-1 gap-3">
                   {["Gaji & Bonus Kompetitif", "Asuransi Kesehatan", "Jenjang Karir Terbuka", "Lingkungan Kerja Positif"].map((b, i) => (
                     <div key={i} className="bg-white/5 border border-white/10 p-3 rounded-xl text-xs text-gray-200 font-medium hover:bg-white/10 transition-colors">
                        {b}
                     </div>
                   ))}
                </div>
              </div>
            </div>

            {/* 📩 THE EMAIL BUTTON (CTA) - Kontras Maksimal */}
            <div className="p-8 rounded-3xl bg-[var(--color-utama)] text-[#0A1128] shadow-xl">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <h4 className="text-2xl font-bold mb-1 text-white font-['Playfair_Display']">Siap Bergabung?</h4>
                  <p className="text-sm font-semibold opacity-80 text-white uppercase tracking-wider">Daftar Sekarang</p>
                </div>
                <a
                  href={`mailto:recruitment@asputra.com?subject=Lamaran Kerja - ${job.title}`}
                  className="group flex items-center gap-3 px-8 py-4 bg-[#0F172A] text-white rounded-2xl font-bold transition-all hover:bg-black hover:shadow-2xl shadow-lg"
                >
                  <EnvelopeIcon className="w-5 h-5" />
                  <span>Daftar</span>
                  <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            <p className="mt-8 text-center text-[10px] text-gray-500 uppercase tracking-widest font-bold">
              AS PUTRA • Recruitment Center • 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailModal;