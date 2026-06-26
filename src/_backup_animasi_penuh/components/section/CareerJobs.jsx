import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import JobDetailModal from "@/components/section/JobDetailModal";
import { 
  MapPinIcon, 
  AcademicCapIcon, 
  ArrowUpRightIcon, 
  EnvelopeIcon 
} from "@heroicons/react/24/outline";

const CareerJobs = ({ isActive }) => {
  const sectionRef = useRef(null);
  const jobsRef = useRef([]);
  const [jobOpeningsData, setJobOpeningsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const COLOR_NAVY = "#1D2B53";
  const COLOR_GOLD = "#FFC619";

  // Fetch data dari API
  useEffect(() => {
    const fetchCareers = async () => {
      try {
        setIsLoading(true);
        const apiUrl = `${import.meta.env.VITE_API_URL}/api/v1/career/list`;
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error("Gagal mengambil data karir");
        }
        
        const result = await response.json();
        const activeJobs = result.data.filter((job) => job.is_active);
        setJobOpeningsData(activeJobs);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCareers();
  }, []);

  // Animasi GSAP
  useEffect(() => {
    if (isActive && !isLoading && jobOpeningsData.length > 0) {
      gsap.fromTo(
        jobsRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          overwrite: true
        }
      );
    }
  }, [isActive, isLoading, jobOpeningsData]);

  const handleViewDetail = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  return (
    <div 
      ref={sectionRef} 
      className={`w-full ${isActive ? "block" : "hidden"}`}
    >
      <div className="w-full">
        
        {/* CONTEXT KICKER */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: COLOR_NAVY }}>
              Peluang Karir
            </span>
            <span className="text-gray-300 text-xs">•</span>
            <span className="text-xs text-gray-500 font-medium">Bergabung dan Berkembang Bersama Kami</span>
          </div>
          <div className="text-xs font-bold text-gray-400 hidden sm:block">
            {isLoading ? "Memuat..." : `${jobOpeningsData.length} Posisi Tersedia`}
          </div>
        </div>

        {/* LOADING & ERROR STATES */}
        {isLoading && (
          <div className="text-center py-12 text-gray-500 font-medium animate-pulse">
            Sedang memuat lowongan pekerjaan...
          </div>
        )}

        {error && (
          <div className="text-center py-12 text-red-500 font-medium">
            Gagal memuat data: {error}
          </div>
        )}

        {/* JOB LIST */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 gap-4">
            {jobOpeningsData.length === 0 ? (
              <div className="text-center py-12 text-gray-400">Belum ada lowongan yang tersedia saat ini.</div>
            ) : (
              jobOpeningsData.map((job, index) => (
                <div
                  key={job.id}
                  ref={(el) => (jobsRef.current[index] = el)}
                  onClick={() => handleViewDetail(job)}
                  className="group relative bg-white border border-gray-200/70 rounded-xl p-6 md:p-8 transition-all duration-400 cursor-pointer hover:shadow-md hover:border-gray-300 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
                >
                  <div className="flex-1 min-w-0"> {/* Ditambahkan min-w-0 untuk mengamankan flex item truncation */}
                    <div className="flex items-center gap-3 mb-3">
                      <span 
                        className="inline-block px-2.5 py-0.5 rounded text-[9px] font-black uppercase tracking-widest shadow-sm"
                        style={{ backgroundColor: COLOR_GOLD, color: COLOR_NAVY }}
                      >
                        {job.type}
                      </span>
                      <span className="text-gray-300 text-xs">•</span>
                      <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                        Rp {parseInt(job.salary).toLocaleString("id-ID")}
                      </span>
                    </div>
                    
                    <h4 
                      className="text-xl md:text-2xl font-['Playfair_Display'] font-bold mb-3 transition-transform duration-300 group-hover:translate-x-1 truncate" 
                      style={{ color: COLOR_NAVY }}
                    >
                      {job.title}
                    </h4>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-x-6 gap-y-2">
                      {/* Lokasi */}
                      <div className="flex items-center gap-2 text-gray-600 shrink-0">
                        <MapPinIcon className="w-4 h-4 shrink-0" style={{ color: COLOR_GOLD }} />
                        <span className="text-xs md:text-sm font-semibold capitalize">{job.location}</span>
                      </div>
                      
                      {/* Kualifikasi - Dioptimasi Agar Tidak Memanjang */}
                      <div className="flex items-center gap-2 text-gray-600 min-w-0">
                        <AcademicCapIcon className="w-4 h-4 shrink-0" style={{ color: COLOR_GOLD }} />
                        <p className="text-xs md:text-sm font-semibold text-gray-500 truncate">
                          {job.qualifications && job.qualifications.length > 0 ? (
                            <>
                              {/* Hanya tampilkan syarat pertama */}
                              <span className="text-gray-700 font-semibold">{job.qualifications[0]}</span>
                              
                              {/* Jika ada syarat tambahan, beri indikator kuantitas */}
                              {job.qualifications.length > 1 && (
                                <span className="ml-1.5 text-[11px] text-gray-400 font-medium bg-gray-100 px-1.5 py-0.5 rounded-md inline-block">
                                  +{job.qualifications.length - 1} Syarat Lainnya
                                </span>
                              )}
                            </>
                          ) : (
                            "Kualifikasi tidak ditentukan"
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end border-t border-gray-100 sm:border-none pt-4 sm:pt-0">
                    <span className="sm:hidden text-[9px] text-gray-400 uppercase tracking-[0.15em] font-black">
                      Lihat Detail Lowongan
                    </span>
                    <div 
                      className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center transition-all duration-300 border border-gray-200 bg-gray-50 group-hover:bg-[#1D2B53] group-hover:border-[#1D2B53]"
                    >
                      <ArrowUpRightIcon 
                        className="w-4 h-4 transition-colors duration-300 text-[#1D2B53] group-hover:text-white" 
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* FOOTER CTA */}
        <div className="mt-10 p-8 md:p-12 rounded-xl bg-gray-50/80 backdrop-blur-sm border border-gray-200/60 text-center flex flex-col items-center justify-center">
            <p className="text-gray-500 text-sm md:text-base mb-3 font-semibold">
              Tidak menemukan posisi yang cocok dengan keahlian Anda?
            </p>
            <a href="mailto:recruitment@asputra.com" className="group flex flex-col md:flex-row items-center gap-2 md:gap-3 transition-all duration-300" style={{ color: COLOR_NAVY }}>
              <span className="text-lg md:text-2xl font-bold tracking-tight">Kirim CV Terbuka ke:</span>
              <div className="flex items-center gap-2 text-lg md:text-2xl font-black underline underline-offset-[6px] decoration-gray-300 group-hover:decoration-[#FFC619] transition-all">
                <EnvelopeIcon className="w-5 h-5 md:w-6 md:h-6 shrink-0" />
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