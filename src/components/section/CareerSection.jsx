import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import CareerNavigator from "@/components/section/CareerNavigator";
import EmployeeEvents from "@/components/section/EmployeeEvents";
import CareerJobs from "@/components/section/CareerJobs";
import logoAsliUrl from "@/assets/logo.jpg"; // Menggunakan logo standar agar siluet lebih jelas di bg putih

const CareerSection = ({ activeIndex }) => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const headerRef = useRef(null);
  const silhouetteRef = useRef(null);
  const [activeTab, setActiveTab] = useState("events");
  
  const SECTION_INDEX = 1;
  const isActive = activeIndex === SECTION_INDEX;

  const COLOR_NAVY = "#1D2B53";
  const COLOR_GOLD = "#FFC619";

  useEffect(() => {
    if (!isActive) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Animasi Siluet Logo di Background
      tl.fromTo(silhouetteRef.current, 
        { opacity: 0, x: 100, rotate: 10 },
        { opacity: 0.05, x: 0, rotate: -5, duration: 2, ease: "power3.out" }
      );

      // Reveal Header & Content
      tl.fromTo(".reveal-item", 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" },
        "-=1.5"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isActive]);

  return (
  <section
    ref={sectionRef}
    // Ganti px-6 md:px-12 menjadi padding yang sama dengan Navbar
    className="relative w-full min-h-screen py-24 px-4 sm:px-6 md:px-8 lg:px-[5%] bg-white flex flex-col justify-center overflow-hidden"
    id="career-section"
    data-theme="light"
  >
    {/* Siluet tetap sama */}
    <div ref={silhouetteRef} className="absolute -right-10 top-1/2 -translate-y-1/2 w-[400px] md:w-[800px] pointer-events-none z-0 opacity-[0.05]">
      <img src={logoAsliUrl} alt="" className="w-full h-auto grayscale" />
    </div>

    {/* Hapus max-w-[1440px] agar mengikuti kontainer padding navbar */}
    <div className="w-full relative z-10">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div className="reveal-item max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-0.5" style={{ backgroundColor: COLOR_GOLD }} />
            <span className="font-black tracking-[0.3em] uppercase text-[10px] md:text-xs" style={{ color: COLOR_NAVY }}>
              Career Opportunities
            </span>
          </div>
          <h2 className="font-['Playfair_Display'] text-[#1D2B53] text-5xl md:text-7xl leading-[1.1] font-extrabold">
            Build the <br />
            <span style={{ color: COLOR_GOLD }} className="italic font-medium">Future</span> with us.
          </h2>
        </div>
        
        <div className="reveal-item max-w-md border-l-2 pl-6 mb-2" style={{ borderColor: COLOR_GOLD }}>
          <p className="text-gray-500 text-base md:text-lg leading-relaxed font-medium">
            Bukan sekadar pekerjaan. Jadilah bagian dari evolusi <span style={{ color: COLOR_NAVY }} className="font-bold">AS PUTRA</span>.
          </p>
        </div>
      </div>

      <div ref={contentRef} className="reveal-item w-full">
  
  {/* Wrapper Navigator: Diubah jadi justify-center */}
  <div className="mb-14 flex justify-center w-full">
    <div className="bg-gray-50 p-1.5 rounded-2xl border border-gray-100 shadow-sm">
      <CareerNavigator activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  </div>

  {/* Area Konten tetap w-full */}
  <div className="min-h-[500px] w-full">
    {activeTab === "events" ? (
      <EmployeeEvents isActive={true} />
    ) : (
      <CareerJobs isActive={true} />
    )}
  </div>
</div>
    </div>
  </section>
);
};

export default CareerSection;