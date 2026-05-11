import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import JobDetailModal from "./JobDetailModal";
import { 
  MapPinIcon, 
  AcademicCapIcon,
  ArrowUpRightIcon,
  SparklesIcon,
  BriefcaseIcon
} from "@heroicons/react/24/outline";

const jobOpeningsData = [
  {
    id: 1,
    title: "Farm Manager",
    location: "Kuningan",
    requirement: "S1 Peternakan • Pengalaman 5 Thn",
    type: "Full Time",
    salary: "Competitive",
  },
  {
    id: 2,
    title: "Finance Staff",
    location: "Cirebon",
    requirement: "D3/S1 Akuntansi • Fresh Graduate",
    type: "Full Time",
    salary: "Competitive",
  },
  {
    id: 3,
    title: "Hotel Front Office",
    location: "Kuningan",
    requirement: "SMK Perhotelan • Komunikatif",
    type: "Full Time",
    salary: "Competitive",
  },
];

const CareerJobs = ({ isActive }) => {
  const sectionRef = useRef(null);
  const jobsRef = useRef([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    gsap.fromTo(
      jobsRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      }
    );
  }, [isActive]);

  const handleViewDetail = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  if (!isActive) return null;

  return (
    <div ref={sectionRef} className="py-10">
      <div className="max-w-5xl mx-auto px-4 md:px-0">
        
        {/* ⚡ Header Section: Kontras Tinggi */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-[var(--color-utama)] mb-4">
              <div className="p-2 bg-[var(--color-utama)]/10 rounded-lg">
                <BriefcaseIcon className="w-5 h-5 animate-bounce" />
              </div>
              <span className="text-xs uppercase tracking-[0.4em] font-black">Peluang Karir</span>
            </div>
            <h3 className="font-['Playfair_Display'] text-4xl md:text-6xl text-white leading-tight">
              Temukan <span className="italic text-[var(--color-utama)]">Potensi</span> Terbaikmu.
            </h3>
          </div>
          <div className="border-l-4 border-[var(--color-utama)] pl-6">
            <p className="text-gray-200 text-base md:text-lg leading-relaxed max-w-xs">
              Kami mencari pemimpin masa depan untuk bertumbuh bersama keluarga besar AS PUTRA.
            </p>
          </div>
        </div>

        {/* 📋 Job Board: High Visibility */}
        <div className="grid gap-6">
          {jobOpeningsData.map((job, index) => (
            <div
              key={job.id}
              ref={(el) => (jobsRef.current[index] = el)}
              className="group"
            >
              <div 
                onClick={() => handleViewDetail(job)}
                className="relative bg-white/5 border border-white/10 rounded-3xl p-6 md:p-10 transition-all duration-500 cursor-pointer hover:bg-white/[0.08] hover:border-[var(--color-utama)]/50 shadow-xl"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                  
                  <div className="flex-1">
                    {/* Badge Row */}
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-[var(--color-utama)] text-[#0A1128] rounded-full shadow-lg shadow-[var(--color-utama)]/20">
                        {job.type}
                      </span>
                      <div className="h-1 w-1 bg-white/30 rounded-full" />
                      <span className="text-gray-300 text-xs font-bold uppercase tracking-tighter uppercase">{job.salary} Package</span>
                    </div>
                    
                    <h4 className="text-3xl md:text-4xl font-['Playfair_Display'] text-white mb-6 group-hover:translate-x-2 transition-transform duration-500 font-bold">
                      {job.title}
                    </h4>

                    {/* Meta Info: Teks gray-200 untuk Readability */}
                    <div className="flex flex-wrap gap-x-8 gap-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                          <MapPinIcon className="w-4 h-4 text-[var(--color-utama)]" />
                        </div>
                        <span className="text-gray-200 font-medium">{job.location}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                          <AcademicCapIcon className="w-4 h-4 text-[var(--color-utama)]" />
                        </div>
                        <span className="text-gray-200 font-medium">{job.requirement}</span>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Action: Panah yang sangat jelas */}
                  <div className="flex items-center justify-between lg:justify-end border-t border-white/5 lg:border-none pt-6 lg:pt-0 group">
                     <span className="lg:hidden text-xs text-white/50 uppercase tracking-[0.2em] font-bold">Detail Pekerjaan</span>
                     <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[var(--color-utama)] group-hover:scale-110 transition-all duration-500 shadow-lg">
                        <ArrowUpRightIcon className="w-7 h-7 text-white group-hover:text-[#0A1128] transition-colors" />
                     </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 📬 Footer: Kontras & Jelas */}
        <div className="mt-20 p-10 rounded-[2.5rem] bg-gradient-to-br from-white/5 to-transparent border border-white/10 text-center relative overflow-hidden">
          {/* Subtle Silhouette Background */}
          <div className="absolute top-0 right-0 p-4 opacity-5">
             <SparklesIcon className="w-32 h-32 text-white" />
          </div>

          <p className="text-gray-300 text-lg md:text-xl mb-6 font-medium">
            Ingin posisi yang berbeda?
          </p>
          <a
            href="mailto:recruitment@asputra.com"
            className="group inline-flex flex-col md:flex-row items-center gap-2 md:gap-4 text-white hover:text-[var(--color-utama)] transition-all duration-300"
          >
            <span className="text-sm md:text-2xl font-bold tracking-tight">Kirim CV Terbuka ke:</span>
            <span className="text-xl md:text-2xl font-black text-[var(--color-utama)] underline underline-offset-[12px] decoration-white/20 group-hover:decoration-[var(--color-utama)] transition-all">
              recruitment@asputra.com
            </span>
          </a>
        </div>
      </div>

      <JobDetailModal
        job={selectedJob}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default CareerJobs;