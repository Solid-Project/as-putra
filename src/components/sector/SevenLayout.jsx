import React, { useRef } from "react";
import { ArrowRightIcon, ArrowLeftIcon, BuildingOffice2Icon } from "@heroicons/react/24/outline";

const SevenLayout = () => {
  // Ref khusus untuk area scroll internal
  const scrollContainerRef = useRef(null);

  // Data Unit Bisnis (Diperkecil deskripsinya agar pas di card kecil)
  const unitBisnis = [
    { id: 1, name: "PT AS PUTRA AYAM", desc: "Peternakan ayam modern.", img: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?q=80&w=600" },
    { id: 2, name: "PT AS PUTRA SAPI", desc: "Penggemukan sapi potong unggul.", img: "https://images.unsplash.com/photo-1547496502-affa22d38842?q=80&w=600" },
    { id: 3, name: "PT AS PUTRA PAKAN", desc: "Produksi pakan ternak bernutrisi.", img: "https://images.unsplash.com/photo-1594913366159-1832ffef867d?q=80&w=600" },
    { id: 4, name: "PT AS PUTRA LOGISTIK", desc: "Distribusi hasil ternak nasional.", img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=600" },
    { id: 5, name: "PT AS PUTRA RETAIL", desc: "Jaringan toko daging segar.", img: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=600" },
  ];

  // Fungsi navigasi tombol (Hanya scroll area internal)
  const scroll = (direction) => {
    const { current } = scrollContainerRef;
    if (current) {
      const scrollAmount = 340; // Lebar card kecil + gap
      current.scrollBy({ 
        left: direction === "left" ? -scrollAmount : scrollAmount, 
        behavior: "smooth" 
      });
    }
  };

  return (
    <section className="section min-h-screen flex flex-col justify-center py-24 bg-[#F8FAFC] overflow-hidden" id="seven-layout">
      
      {/* 1. HEADER - Margin Standar */}
      <div className="w-full px-[6%] mx-auto mb-16 flex justify-between items-end relative z-10">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-5">
             <div className="w-10 h-[1px] bg-[var(--color-utama)]"></div>
             <span className="text-[var(--color-utama)] font-bold tracking-[0.3em] text-[10px] uppercase">Subsidiaries</span>
          </div>
          <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl text-slate-950 font-bold leading-tight tracking-tight">
            Sektor Pertanian & <br className="hidden md:block"/> Peternakan AS Putra
          </h2>
        </div>

        {/* Tombol Navigasi (Hanya muncul di Desktop) */}
        <div className="hidden lg:flex gap-3 mb-2">
          <button onClick={() => scroll("left")} className="p-4 border border-slate-200 bg-white rounded-full hover:bg-slate-950 hover:text-white transition-all shadow-sm active:scale-95">
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
          <button onClick={() => scroll("right")} className="p-4 border border-slate-200 bg-white rounded-full hover:bg-slate-950 hover:text-white transition-all shadow-sm active:scale-95">
            <ArrowRightIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 2. CARD PEMBUNGKUS BESAR (UTAMA) - Sejajar dengan Margin */}
      <div className="w-full px-[6%] mx-auto relative z-10">
        <div className="bg-white p-10 md:p-12 rounded-xl shadow-2xl shadow-slate-200/70 border border-slate-100">
          
          {/* Sub-Header di dalam Card (Opsional) */}
          <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-100">
             <BuildingOffice2Icon className="w-8 h-8 text-blue-600/60" />
             <h3 className="text-xl font-bold text-slate-900 tracking-tight">Daftar Anak Perusahaan</h3>
          </div>

          {/* 3. AREA SCROLL INTERNAL (Hanya di dalam Card) */}
          <div 
            ref={scrollContainerRef}
            className="hide-scrollbar flex gap-8 overflow-x-auto snap-x snap-mandatory touch-pan-x py-2"
          >
            {unitBisnis.map((item) => (
              <div 
                key={item.id}
                className="unit-card flex-none w-[260px] md:w-[300px] snap-start group cursor-pointer"
              >
                {/* Image Wrapper (Diperkecil) */}
                <div className="relative h-[180px] md:h-[220px] overflow-hidden rounded-sm bg-slate-100 mb-5 border border-slate-100">
                  <img 
                    src={item.img} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Text (Di luar Image) */}
                <h4 className="text-lg font-bold text-slate-950 mb-1.5 tracking-tight group-hover:text-blue-700 transition-colors">
                  {item.name}
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed font-light">
                  {item.desc}
                </p>
                <div className="mt-4 w-0 group-hover:w-10 h-[2px] bg-[var(--color-utama)] transition-all duration-500"></div>
              </div>
            ))}
            
            {/* Spacer akhir internal */}
            <div className="flex-none w-[20px]" />
          </div>

        </div>
      </div>

    </section>
  );
};

export default SevenLayout;