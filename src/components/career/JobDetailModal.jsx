import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  XMarkIcon,
  BriefcaseIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  AcademicCapIcon,
  ClockIcon,
  UserGroupIcon,
  ChartBarIcon,
  TrophyIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

const JobDetailModal = ({ job, isOpen, onClose }) => {
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";

      // Animasi modal muncul
      gsap.fromTo(
        modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" },
      );

      gsap.fromTo(
        contentRef.current,
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "back.out(0.8)" },
      );
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen || !job) return null;

  const requirements = [
    "Pendidikan minimal S1 sesuai bidang",
    "Memiliki pengalaman kerja minimal 2 tahun di bidang terkait",
    "Mampu bekerja dalam tim maupun individu",
    "Memiliki komunikasi yang baik",
    "Bersedia ditempatkan di seluruh wilayah operasional AS PUTRA",
  ];

  const benefits = [
    "Gaji kompetitif",
    "Tunjangan kesehatan",
    "Asuransi jiwa",
    "Bonus tahunan",
    "Pelatihan dan pengembangan karir",
    "Lingkungan kerja yang kondusif",
  ];

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        ref={contentRef}
        className="relative bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tombol Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors z-10"
        >
          <XMarkIcon className="w-5 h-5 text-gray-600" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-[var(--color-utama)] to-[var(--color-utama)]/80 text-white rounded-t-2xl p-6 pr-16">
          <div className="flex items-center gap-3 mb-3">
            <BriefcaseIcon className="w-8 h-8" />
            <h2 className="text-2xl md:text-3xl font-bold">{job.title}</h2>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-white/90">
            <div className="flex items-center gap-1">
              <MapPinIcon className="w-4 h-4" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <ClockIcon className="w-4 h-4" />
              <span>{job.type}</span>
            </div>
            <div className="flex items-center gap-1">
              <CurrencyDollarIcon className="w-4 h-4" />
              <span>{job.salary}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Deskripsi Pekerjaan */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-[var(--color-teks)] mb-3 flex items-center gap-2">
              <ChartBarIcon className="w-5 h-5 text-[var(--color-utama)]" />
              Deskripsi Pekerjaan
            </h3>
            <p className="text-[var(--color-teks-muted)] leading-relaxed">
              Kami sedang mencari kandidat yang berkualitas dan bersemangat
              untuk bergabung sebagai {job.title}. Posisi ini bertanggung jawab
              untuk mengelola dan mengembangkan operasional sesuai dengan
              standar perusahaan yang telah ditetapkan. Kandidat yang terpilih
              akan bekerja sama dengan tim yang profesional dan berpengalaman di
              bidangnya.
            </p>
          </div>
          {/* Kualifikasi */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-[var(--color-teks)] mb-3 flex items-center gap-2">
              <AcademicCapIcon className="w-5 h-5 text-[var(--color-utama)]" />
              Kualifikasi
            </h3>
            <ul className="space-y-2">
              {requirements.map((req, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-[var(--color-teks-muted)]"
                >
                  <span className="text-[var(--color-utama)] mt-1">•</span>
                  <span>{req}</span>
                </li>
              ))}
              <li className="flex items-start gap-2 text-[var(--color-teks-muted)]">
                <span className="text-[var(--color-utama)] mt-1">•</span>
                <span>{job.requirement}</span>
              </li>
            </ul>
          </div>
          {/* Benefit */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-[var(--color-teks)] mb-3 flex items-center gap-2">
              <TrophyIcon className="w-5 h-5 text-[var(--color-utama)]" />
              Benefit & Keuntungan
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-[var(--color-teks-muted)]"
                >
                  <span className="text-[var(--color-utama)]">✓</span>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Cara Melamar */}
          <div className="bg-gray-50 rounded-xl p-5 mb-6">
            <h3 className="text-lg font-bold text-[var(--color-teks)] mb-3 flex items-center gap-2">
              <UserGroupIcon className="w-5 h-5 text-[var(--color-utama)]" />
              Cara Melamar
            </h3>
            <p className="text-[var(--color-teks-muted)] text-sm mb-4">
              Klik tombol di bawah ini untuk mengirimkan berkas lamaran Anda (CV
              & Portofolio) langsung melalui **Direct Message Instagram**
              rekrutmen kami:
            </p>

            <a
              href="https://ig.me/m/ptasputra"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-8 py-4 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-95 group"
            >
              {/* Icon Instagram sederhana menggunakan SVG */}
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span>Kirim Lamaran via Instagram</span>
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <p className="text-[10px] text-gray-400 mt-3 italic">
              *Pastikan akun Instagram Anda tidak dikunci (private) agar tim
              kami dapat merespon pesan Anda.
            </p>
          </div>
          {/* Info Tambahan */}
          <p className="text-xs text-gray-400 text-center">
            Pendaftaran gratis. Hanya kandidat yang memenuhi kualifikasi akan
            diproses lebih lanjut.
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobDetailModal;
