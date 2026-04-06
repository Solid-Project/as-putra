import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CareerPath from "./CareerPath";
import JobDetailModal from "./JobDetailModal";
import { 
  BriefcaseIcon, 
  MapPinIcon, 
  AcademicCapIcon,
  InformationCircleIcon,
  PaperAirplaneIcon
} from "@heroicons/react/24/outline";

gsap.registerPlugin(ScrollTrigger);

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

    const ctx = gsap.context(() => {
      gsap.fromTo(
        jobsRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isActive]);

  const handleViewDetail = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  if (!isActive) return null;

  return (
    <div ref={sectionRef} className="py-10">
      <CareerPath />

      <div className="mt-24 max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h3 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[var(--color-teks)] mb-4">
            Lowongan Terbuka
          </h3>
          <div className="w-12 h-1 bg-[var(--color-utama)] mx-auto mb-6"></div>
          <p className="text-[var(--color-teks-muted)] max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Temukan peluang karir yang tepat dan jadilah bagian dari perjalanan transformasi AS PUTRA.
          </p>
        </div>

        {/* Jobs List */}
        <div className="grid gap-4">
          {jobOpeningsData.map((job, index) => (
            <div
              key={job.id}
              ref={(el) => (jobsRef.current[index] = el)}
              className="group relative bg-white border border-gray-100 rounded-2xl p-5 md:p-7 transition-all duration-300 hover:border-[var(--color-utama)]/30 hover:shadow-xl hover:shadow-blue-500/5"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                
                {/* Job Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="p-2 bg-blue-50 text-[var(--color-utama)] rounded-lg">
                      <BriefcaseIcon className="w-5 h-5" />
                    </span>
                    <h4 className="text-xl font-bold text-[var(--color-teks)] group-hover:text-[var(--color-utama)] transition-colors">
                      {job.title}
                    </h4>
                    <span className="hidden md:block text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-gray-100 text-gray-500 rounded">
                      {job.type}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 text-sm text-[var(--color-teks-muted)]">
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="w-4 h-4 text-gray-400" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AcademicCapIcon className="w-4 h-4 text-gray-400" />
                      <span>{job.requirement}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 border-t md:border-t-0 pt-4 md:pt-0">
                  <button
                    onClick={() => handleViewDetail(job)}
                    className="p-3 text-gray-400 hover:text-[var(--color-utama)] hover:bg-blue-50 rounded-xl transition-all"
                    title="Detail Pekerjaan"
                  >
                    <InformationCircleIcon className="w-6 h-6" />
                  </button>
                  
                  <a
                    href="https://ig.me/m/ptasputra"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-8 py-3 bg-[var(--color-utama)] text-white text-sm font-bold rounded-xl transition-all duration-300 hover:bg-opacity-90 hover:translate-x-1 shadow-lg shadow-blue-500/20"
                  >
                    <span>Lamar Sekarang</span>
                    <PaperAirplaneIcon className="w-4 h-4 -rotate-45" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center p-8 bg-gray-50 rounded-3xl">
          <p className="text-[var(--color-teks-muted)] text-sm">
            Posisi yang dicari tidak tersedia? Kami selalu terbuka untuk talenta hebat. <br className="hidden md:block" />
            Kirimkan CV terbuka Anda ke 
            <a
              href="mailto:recruitment@asputra.com"
              className="ml-1 text-[var(--color-utama)] font-bold hover:underline"
            >
              recruitment@asputra.com
            </a>
          </p>
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