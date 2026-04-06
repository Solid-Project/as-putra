import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CareerPath from "./CareerPath";
import JobDetailModal from "./JobDetailModal";
import { 
  BriefcaseIcon, 
  MapPinIcon, 
  CurrencyDollarIcon,
  AcademicCapIcon,
  EyeIcon
} from "@heroicons/react/24/outline";

gsap.registerPlugin(ScrollTrigger);

const jobOpeningsData = [
  {
    id: 1,
    title: "Farm Manager",
    location: "Kuningan",
    requirement: "Minimal S1 Peternakan • Pengalaman 5 Tahun",
    type: "Full Time",
    salary: "Competitive",
    description: "Mengelola seluruh operasional peternakan termasuk perawatan hewan, manajemen pakan, dan koordinasi tim.",
    responsibilities: [
      "Mengawasi operasional harian peternakan",
      "Memastikan kesehatan dan kesejahteraan hewan",
      "Mengelola stok pakan dan suplemen",
      "Memimpin tim peternak dan teknisi",
      "Melakukan evaluasi dan pelaporan rutin"
    ]
  },
  {
    id: 2,
    title: "Finance Staff",
    location: "Cirebon",
    requirement: "D3/S1 Akuntansi • Fresh Graduate Welcome",
    type: "Full Time",
    salary: "Competitive",
    description: "Mengelola transaksi keuangan, pembukuan, dan pelaporan keuangan perusahaan.",
    responsibilities: [
      "Mencatat dan merekonsiliasi transaksi keuangan",
      "Menyusun laporan keuangan bulanan",
      "Mengelola arus kas dan pembayaran",
      "Membantu proses audit internal",
      "Mengelola administrasi perpajakan"
    ]
  },
  {
    id: 3,
    title: "Hotel Front Office",
    location: "Kuningan",
    requirement: "Min. SMK Perhotelan • Komunikatif",
    type: "Full Time",
    salary: "Competitive",
    description: "Melayani tamu hotel dengan standar pelayanan terbaik untuk pengalaman menginap yang menyenangkan.",
    responsibilities: [
      "Menyambut dan melayani tamu dengan ramah",
      "Melakukan proses check-in dan check-out",
      "Menangani reservasi dan pertanyaan tamu",
      "Berkoordinasi dengan departemen lain",
      "Menangani keluhan tamu dengan profesional"
    ]
  },
];

const CareerJobs = ({ isActive }) => {
  const sectionRef = useRef(null);
  const jobsRef = useRef([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    const ctx = gsap.context(() => {
      jobsRef.current.forEach((job, index) => {
        gsap.fromTo(
          job,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            delay: index * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: job,
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

  const handleViewDetail = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  if (!isActive) return null;

  return (
    <div ref={sectionRef}>
      <CareerPath />

      <div className="mt-20">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h3 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold text-[var(--color-teks)] mb-4">
            Lowongan Kerja Terbaru
          </h3>
          <div className="w-16 h-0.5 bg-[var(--color-utama)] mx-auto mb-4"></div>
          <p className="text-[var(--color-teks-muted)] max-w-2xl mx-auto">
            Temukan posisi yang sesuai dengan keahlian Anda dan mulailah karir bersama AS PUTRA
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {jobOpeningsData.map((job, index) => (
            <div
              key={job.id}
              ref={(el) => (jobsRef.current[index] = el)}
              className="group bg-[var(--color-bg-alt)] rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <BriefcaseIcon className="w-5 h-5 text-[var(--color-utama)]" />
                    <h4 className="text-xl font-semibold text-[var(--color-teks)] group-hover:text-[var(--color-utama)] transition-colors duration-300">
                      {job.title}
                    </h4>
                    <span className="px-2 py-1 bg-[var(--color-utama)]/10 text-[var(--color-utama)] text-xs rounded-full">
                      {job.type}
                    </span>
                    <div className="flex items-center gap-1 text-[var(--color-teks-muted)] text-sm">
                      <MapPinIcon className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[var(--color-teks-muted)] text-sm mb-1">
                    <AcademicCapIcon className="w-4 h-4 text-[var(--color-utama)]" />
                    <p>{job.requirement}</p>
                  </div>
                  <div className="flex items-center gap-2 text-[var(--color-teks-muted)] text-xs">
                    <CurrencyDollarIcon className="w-4 h-4 text-[var(--color-utama)]" />
                    <p>{job.salary}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleViewDetail(job)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 border border-[var(--color-utama)] text-[var(--color-utama)] font-medium rounded-lg transition-all duration-300 hover:bg-[var(--color-utama)] hover:text-white"
                  >
                    <EyeIcon className="w-4 h-4" />
                    <span>Lihat Detail</span>
                  </button>
                  <a
                    href={`mailto:recruitment@asputra.com?subject=Lamaran%20${encodeURIComponent(
                      job.title
                    )}`}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-[var(--color-utama)] text-white font-medium rounded-lg transition-all duration-300 hover:bg-opacity-80"
                  >
                    <span>Lamar Sekarang</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-[var(--color-teks-muted)] text-sm">
            Tidak menemukan posisi yang cocok? Kirimkan CV Anda ke{" "}
            <a
              href="mailto:recruitment@asputra.com"
              className="text-[var(--color-utama)] hover:underline transition-colors"
            >
              recruitment@asputra.com
            </a>
          </p>
        </div>
      </div>

      {/* Modal Detail Pekerjaan */}
      <JobDetailModal
        job={selectedJob}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default CareerJobs;