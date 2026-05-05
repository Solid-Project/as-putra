import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import CareerNavigator from "@/components/career/CareerNavigator";
import EmployeeEvents from "@/components/career/EmployeeEvents";
import PeopleDevelopment from "@/components/career/PeopleDevelopment";
import CareerJobs from "@/components/career/CareerJobs";

const CareerSection = ({ activeIndex }) => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const navigatorRef = useRef(null);
  const [activeTab, setActiveTab] = useState("events");
  const SECTION_INDEX = 1; // sesuaikan urutan kamu
  const isActive = activeIndex === SECTION_INDEX;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ❗ kalau tidak aktif → tampil normal (biar gak hilang)
      if (!isActive) {
        gsap.set(titleRef.current, { y: 0, opacity: 1 });
        gsap.set(navigatorRef.current, { y: 0, opacity: 1 });
        return;
      }

      // 🔥 INITIAL STATE
      gsap.set(titleRef.current, { y: -50, opacity: 0 });
      gsap.set(navigatorRef.current, { y: 30, opacity: 0 });

      // 🔥 ANIMATION
      const tl = gsap.timeline();

      tl.to(titleRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      }).to(navigatorRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        delay: 0.2,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isActive]);

  return (
    <section
      ref={sectionRef}
      className="section no-snap py-20 px-5 bg-white" // ← KUNCI: tambah "no-snap"
      id="career-section"
      data-title="Jenjang Karir"
      data-theme="light"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Title Section */}
        <div ref={titleRef} className="text-center mb-12">
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-[var(--color-teks)] mb-4">
            Bergabunglah dengan{" "}
            <span className="text-[var(--color-utama)]">AS PUTRA</span>
          </h2>
          <div className="w-16 h-0.5 bg-[var(--color-utama)] mx-auto mb-4"></div>
          <p className="text-[var(--color-teks-muted)] max-w-[600px] mx-auto">
            Jadilah bagian dari sesuatu yang lebih besar. Bentuk masa depan
            bersama tim kami yang dinamis.
          </p>
        </div>

        {/* Navigator */}
        <div ref={navigatorRef}>
          <CareerNavigator activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Tab Content */}
        <div className="mt-12">
          <EmployeeEvents isActive={activeTab === "events"} />
          <PeopleDevelopment isActive={activeTab === "development"} />
          <CareerJobs isActive={activeTab === "careers"} />
        </div>
      </div>
    </section>
  );
};

export default CareerSection;
