import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import JobDetailModal from "./JobDetailModal";
import { 
  MapPinIcon, 
  AcademicCapIcon, 
  ArrowUpRightIcon, 
  BriefcaseIcon, 
  EnvelopeIcon 
} from "@heroicons/react/24/outline";

const jobOpeningsData = [
  { id: 1, title: "Farm Manager", location: "Kuningan", requirement: "S1 Peternakan • Pengalaman 5 Thn", type: "Full Time", salary: "Competitive" },
  { id: 2, title: "Finance Staff", location: "Cirebon", requirement: "D3/S1 Akuntansi • Fresh Graduate", type: "Full Time", salary: "Competitive" },
  { id: 3, title: "Hotel Front Office", location: "Kuningan", requirement: "SMK Perhotelan • Komunikatif", type: "Full Time", salary: "Competitive" },
];

const CareerJobs = ({ isActive }) => {
  const sectionRef = useRef(null);
  const jobsRef = useRef([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const COLOR_NAVY = "#1D2B53";
  const COLOR_GOLD = "#FFC619";

  useEffect(() => {
    // Animasi hanya jalan saat isActive berubah jadi true
    if (isActive) {
      gsap.fromTo(
        jobsRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          overwrite: true // Mencegah konflik animasi saat klik cepat
        }
      );
    }
  }, [isActive]);

  const handleViewDetail = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  return (
    // PERBAIKAN: Gunakan style hidden/block sebagai pengganti return null
    <div 
      ref={sectionRef} 
      className={`py-10 w-full ${isActive ? "block" : "hidden"}`}
    >
      <div className="w-full">
        {/* Header Section - Identik dengan EmployeeEvents */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px]" style={{ backgroundColor: COLOR_GOLD }}></div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em]" style={{ color: COLOR_NAVY }}>
                Peluang Karir
              </h3>
            </div>
            <p className="text-3xl md:text-4xl font-['Playfair_Display'] font-bold" style={{ color: COLOR_NAVY }}>
              Temukan <span className="italic" style={{ color: COLOR_GOLD }}>Potensi</span> Terbaikmu.
            </p>
          </div>
          <div className="h-[1px] flex-grow bg-gray-100 hidden md:block mx-10 mb-4"></div>
        </div>

        {/* Job List */}
        <div className="grid grid-cols-1 gap-6">
          {jobOpeningsData.map((job, index) => (
            <div
              key={job.id}
              ref={(el) => (jobsRef.current[index] = el)}
              className="group"
            >
              <div 
                onClick={() => handleViewDetail(job)}
                className="relative bg-white border border-gray-100 rounded-[2rem] p-8 md:p-10 transition-all duration-500 cursor-pointer hover:shadow-2xl hover:border-gray-200"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-lg" style={{ backgroundColor: COLOR_GOLD, color: COLOR_NAVY }}>
                        {job.type}
                      </span>
                      <div className="h-1 w-1 bg-gray-300 rounded-full" />
                      <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">{job.salary} Package</span>
                    </div>
                    
                    <h4 className="text-2xl md:text-4xl font-['Playfair_Display'] mb-4 group-hover:translate-x-2 transition-transform duration-500 font-extrabold" style={{ color: COLOR_NAVY }}>
                      {job.title}
                    </h4>

                    <div className="flex flex-wrap gap-x-10 gap-y-3">
                      <div className="flex items-center gap-2.5">
                        <MapPinIcon className="w-5 h-5" style={{ color: COLOR_GOLD }} />
                        <span className="text-gray-600 text-sm md:text-base font-semibold">{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <AcademicCapIcon className="w-5 h-5" style={{ color: COLOR_GOLD }} />
                        <span className="text-gray-600 text-sm md:text-base font-semibold">{job.requirement}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between lg:justify-end border-t border-gray-50 lg:border-none pt-6 lg:pt-0">
                     <span className="lg:hidden text-[10px] text-gray-400 uppercase tracking-[0.2em] font-black">Lihat Detail Lowongan</span>
                     <div 
                        className="w-14 h-14 md:w-20 md:h-20 rounded-[1.5rem] flex items-center justify-center transition-all duration-500 shadow-sm group-hover:rotate-12 group-hover:scale-110"
                        style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}
                     >
                        <ArrowUpRightIcon className="w-8 h-8 transition-colors duration-500" style={{ color: COLOR_NAVY }} />
                     </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-12 p-10 md:p-16 rounded-[2.5rem] bg-gray-50 border border-gray-100 text-center">
            <p className="text-gray-500 text-lg mb-4 font-semibold">
              Tidak menemukan posisi yang cocok?
            </p>
            <a href="mailto:recruitment@asputra.com" className="group inline-flex flex-col md:flex-row items-center gap-2 md:gap-4 transition-all duration-300" style={{ color: COLOR_NAVY }}>
              <span className="text-xl md:text-3xl font-bold tracking-tight">Kirim CV Terbuka ke:</span>
              <div className="flex items-center gap-2 text-xl md:text-3xl font-black underline underline-offset-[10px] decoration-gray-200 group-hover:decoration-[#FFC619] transition-all">
                <EnvelopeIcon className="w-8 h-8" />
                <span>recruitment@asputra.com</span>
              </div>
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