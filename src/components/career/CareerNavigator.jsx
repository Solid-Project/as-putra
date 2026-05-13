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

  return (
    <div className="flex flex-col items-center">
      {/* 🚀 Wrapper Utama: Dibuat lebih solid agar teks di dalamnya menonjol */}
      <div className="inline-flex p-2 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl relative">
        
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative px-6 md:px-10 py-4 rounded-xl font-bold transition-all duration-500 group
                flex items-center gap-3 overflow-hidden
                ${
                  isActive
                    ? "text-[#050A1A]" // Navy Super Gelap (Sama dengan bg Section) agar kontras di atas Kuning
                    : "text-white/70 hover:text-white" // Putih transparan agar tidak balapan dengan judul utama
                }
              `}
            >
              {/* ✨ Latar Belakang Aktif: Kuning Solid */}
              {isActive && (
                <div 
                  className="absolute inset-0 bg-[var(--color-utama)] shadow-[0_0_25px_rgba(var(--color-utama-rgb),0.2)] animate-in fade-in scale-in-95 duration-300" 
                />
              )}

              {/* 🖱️ Hover State: Border halus untuk memberi tanda tanpa silau */}
              {!isActive && (
                <div className="absolute inset-0 border border-white/0 group-hover:border-[var(--color-utama)]/30 rounded-xl transition-all duration-300" />
              )}

              {/* 💡 Content (Icon & Text) */}
              <div className="relative z-10 flex items-center gap-3">
                <Icon 
                  className={`w-5 h-5 transition-transform duration-500 
                  ${isActive ? "scale-110 stroke-[2.5px]" : "group-hover:rotate-6 text-[var(--color-utama)]"}`} 
                />
                <span className="tracking-[0.1em] uppercase text-[11px] md:text-xs">
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 🏷️ Label Minimalis di Bawah */}
      <div className="mt-6 flex items-center gap-4 opacity-40">
        <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-white"></div>
        <span className="text-[9px] uppercase tracking-[0.5em] text-white font-black">
          Navigation
        </span>
        <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-white"></div>
      </div>
    </div>
  );
};

export default CareerNavigator;