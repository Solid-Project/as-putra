import React from "react";
import { 
  CalendarIcon, 
  BriefcaseIcon 
} from "@heroicons/react/24/outline";

const CareerNavigator = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "events", label: "Kegiatan Karyawan", icon: CalendarIcon },
    { id: "careers", label: "Lowongan Kerja", icon: BriefcaseIcon },
  ];

  const COLOR_NAVY = "#1D2B53";
  const COLOR_GOLD = "#FFC619";

  return (
    <div className="flex flex-col items-center">
      <div className="inline-flex gap-2 relative overflow-hidden">

        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative px-6 md:px-10 py-3.5 rounded-xl font-black transition-all duration-500 group
                flex items-center gap-3 overflow-hidden
                ${
                  isActive
                    ? "text-[#1D2B53]" // Navy agar kontras di atas Kuning
                    : "text-gray-500 hover:text-[#1D2B53]" // Abu-abu ke Navy saat hover
                }
              `}
            >
              {/* ✨ Latar Belakang Aktif: Kuning Solid AS PUTRA */}
              {isActive && (
                <div 
                  className="absolute inset-0 shadow-sm animate-in fade-in scale-in-95 duration-300" 
                  style={{ backgroundColor: COLOR_GOLD }}
                />
              )}

              {/* 🖱️ Hover State (Non-Aktif) */}
              {!isActive && (
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white transition-all duration-300" />
              )}

              {/* 💡 Content (Icon & Text) */}
              <div className="relative z-10 flex items-center gap-3">
                <Icon 
                  className={`w-4 h-4 md:w-5 md:h-5 transition-transform duration-500 
                  ${isActive ? "scale-110 stroke-[2.5px]" : "group-hover:rotate-6 text-gray-400 group-hover:text-[#1D2B53]"}`} 
                />
                <span className="tracking-[0.1em] uppercase text-[10px] md:text-xs">
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
                </span>
              </div>
            </button>
          );
        })}
      </div>

    </div>
  );
};

export default CareerNavigator;