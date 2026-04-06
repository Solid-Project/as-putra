import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
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
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const JobDetailModal = ({ job, isOpen, onClose }) => {
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
      // Animasi modal muncul
      gsap.fromTo(modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      
      gsap.fromTo(contentRef.current,
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "back.out(0.8)" }
      );
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen || !job) return null;

  const requirements = [
    "Pendidikan minimal S1 sesuai bidang",
    "Memiliki pengalaman kerja minimal 2 tahun di bidang terkait",
    "Mampu bekerja dalam tim maupun individu",
    "Memiliki komunikasi yang baik",
    "Bersedia ditempatkan di seluruh wilayah operasional AS PUTRA"
  ];

  const benefits = [
    "Gaji kompetitif",
    "Tunjangan kesehatan",
    "Asuransi jiwa",
    "Bonus tahunan",
    "Pelatihan dan pengembangan karir",
    "Lingkungan kerja yang kondusif"
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
              Kami sedang mencari kandidat yang berkualitas dan bersemangat untuk bergabung sebagai {job.title}. 
              Posisi ini bertanggung jawab untuk mengelola dan mengembangkan operasional sesuai dengan standar 
              perusahaan yang telah ditetapkan. Kandidat yang terpilih akan bekerja sama dengan tim yang profesional 
              dan berpengalaman di bidangnya.
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
                <li key={idx} className="flex items-start gap-2 text-[var(--color-teks-muted)]">
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
                <div key={idx} className="flex items-center gap-2 text-[var(--color-teks-muted)]">
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
            <p className="text-[var(--color-teks-muted)] text-sm mb-3">
              Kirimkan berkas lamaran Anda melalui email dengan ketentuan:
            </p>
            <ul className="space-y-1 text-sm text-[var(--color-teks-muted)] mb-4">
              <li>1. Surat lamaran</li>
              <li>2. Curriculum Vitae (CV) terbaru</li>
              <li>3. Foto terbaru</li>
              <li>4. Scan ijazah dan transkrip nilai</li>
              <li>5. Sertifikat pendukung (jika ada)</li>
            </ul>
            <a
              href={`mailto:recruitment@asputra.com?subject=Lamaran%20${encodeURIComponent(job.title)}&body=Nama%20Lengkap%3A%0AAlamat%3A%0ANo.%20Telepon%3A%0APosisi%20yang%20dilamar%3A%20${encodeURIComponent(job.title)}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-utama)] text-white font-medium rounded-lg hover:bg-opacity-80 transition-all duration-300 hover:gap-3"
            >
              <span>Kirim Lamaran via Email</span>
              <ArrowRightIcon className="w-4 h-4" />
            </a>
          </div>

          {/* Info Tambahan */}
          <p className="text-xs text-gray-400 text-center">
            Pendaftaran gratis. Hanya kandidat yang memenuhi kualifikasi akan diproses lebih lanjut.
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobDetailModal;