import React, { useRef } from "react";
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

  const buttonsRef = useRef([]);

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
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative px-6 py-3 rounded-full font-medium transition-all duration-300
                ${
                  isActive
                    ? "text-white bg-[var(--color-utama)] shadow-md scale-105"
                    : "text-[var(--color-teks-muted)] hover:text-[var(--color-teks)] bg-[var(--color-bg-alt)] hover:bg-gray-100 hover:-translate-y-0.5"
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
    </div>
  );
};

export default CareerNavigator;