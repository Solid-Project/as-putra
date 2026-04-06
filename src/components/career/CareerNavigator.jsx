import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { 
  CalendarIcon, 
  AcademicCapIcon, 
  BriefcaseIcon 
} from "@heroicons/react/24/outline";

const CareerNavigator = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "events", label: "Kegiatan Karyawan", icon: CalendarIcon },
    { id: "development", label: "People Development", icon: AcademicCapIcon },
    { id: "careers", label: "Pengembangan Karir & Loker", icon: BriefcaseIcon },
  ];

  const activeIndicatorRef = useRef(null);
  const buttonsRef = useRef([]);

  useEffect(() => {
    // Animasi active indicator
    const activeButton = buttonsRef.current.find(
      (btn) => btn?.dataset.id === activeTab
    );
    if (activeButton && activeIndicatorRef.current) {
      gsap.to(activeIndicatorRef.current, {
        width: activeButton.offsetWidth,
        x: activeButton.offsetLeft,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  }, [activeTab]);

  return (
    <div className="relative">
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8">
        {tabs.map((tab, index) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              ref={(el) => (buttonsRef.current[index] = el)}
              data-id={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative px-6 py-3 rounded-full font-medium transition-all duration-300
                ${isActive
                  ? "text-white bg-[var(--color-utama)] shadow-md"
                  : "text-[var(--color-teks-muted)] hover:text-[var(--color-teks)] bg-[var(--color-bg-alt)] hover:bg-gray-100"
                }
              `}
            >
              <span className="flex items-center gap-2">
                <Icon className="w-5 h-5" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
              </span>
            </button>
          );
        })}
      </div>
      {/* Active Indicator */}
      <div
        ref={activeIndicatorRef}
        className="absolute bottom-0 left-0 h-0.5 bg-[var(--color-utama)] rounded-full transition-all duration-300"
        style={{ width: 0 }}
      />
    </div>
  );
};

export default CareerNavigator;