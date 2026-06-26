import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const LegalLayoutWrapper = ({ title, lastUpdated, children }) => {
  // Maksa scroll otomatis ke atas setiap kali halaman ini dibuka
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [title]);

  return (
    <div className="min-h-screen bg-[#FCFCFC] text-slate-700 font-sans antialiased selection:bg-[#FFC619] selection:text-[#0F1A3E]">
      
      {/* HEADER MINIMALIS */}
      <header className="border-b border-slate-200/80 bg-white py-6 px-6 md:px-12 sticky top-0 z-50 backdrop-blur-md bg-white/90">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link to="/beranda" className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-[#0F1A3E] transition-colors flex items-center gap-1">
            &larr; Kembali ke Beranda
          </Link>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2.5 py-1 rounded">
            Dokumen Resmi
          </span>
        </div>
      </header>

      {/* CONTAINER TEKS UTAMA */}
      <main className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        
        {/* JUDUL DOKUMEN */}
        <div className="border-b-2 border-slate-900/10 pb-8 mb-12">
          <h1 className="text-3xl md:text-4xl font-['Playfair_Display'] font-black text-[#0F1A3E] mb-3 leading-tight">
            {title}
          </h1>
          <p className="text-xs font-medium text-slate-400 tracking-wide uppercase">
            Terakhir Diperbarui: <span className="text-slate-600 font-bold">{lastUpdated}</span>
          </p>
        </div>

        {/* AREA ISI TEKS (Menggunakan class artikel agar rapi otomatis) */}
        <div className="prose prose-slate prose-sm max-w-none text-[14px] leading-relaxed text-slate-600 font-medium 
          space-y-6 
          [&>h3]:text-base [&>h3]:font-black [&>h3]:text-[#0F1A3E] [&>h3]:pt-4 [&>h3]:uppercase [&>h3]:tracking-wider
          [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-2
          [&>p]:text-justify">
          {children}
        </div>

      </main>

    </div>
  );
};

export default LegalLayoutWrapper;