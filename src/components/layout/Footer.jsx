import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo-teks-asli.png";
import logoSiluet from "@/assets/logo.jpg";

const Footer = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);

  const COLOR_GOLD = "#FFC619"; 
  const COLOR_NAVY = "#0F1A3E";

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL.replace(/\/$/, "");
        const response = await fetch(`${baseUrl}/api/v1/page/list`);
        const json = await response.json();
        if (json.status) setPages(json.data);
      } catch (error) { console.error(error); } finally { setLoading(false); }
    };
    fetchPages();
  }, []);

  const companyMenu = pages.filter(p => ["tentang", "news", "karir"].includes(p.name.toLowerCase()));
  const businessSectors = pages.filter(p => p.name.toLowerCase().includes("sector")).map(p => ({
    id: p.id,
    label: p.name.replace(/Sector\s+/i, ""),
    slug: p.name.replace(/Sector\s+/i, "").toLowerCase().replace(/\s+/g, '-'),
  }));

  const Icon = ({ path }) => (
    <svg className="w-3.5 h-3.5 transition-all duration-300 fill-current" viewBox="0 0 24 24">
      <path d={path} />
    </svg>
  );

  return (
    <footer className="footer-snap relative bg-[#FDFDFD] pt-12 md:pt-8 pb-4 border-t-[3px] overflow-hidden" style={{ borderTopColor: COLOR_GOLD }}>
      
      {/* BACKGROUND TEXTURE */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none select-none" 
        style={{ backgroundImage: `radial-gradient(${COLOR_NAVY} 0.5px, transparent 0.5px)`, backgroundSize: '20px 20px' }}>
      </div>

      {/* SILUET LOGO */}
      <div className="absolute right-[-5%] md:right-[-2%] bottom-[-2%] md:bottom-[-5%] opacity-[0.03] pointer-events-none select-none">
        <img src={logoSiluet} alt="" className="w-32 md:w-64 grayscale rotate-12" />
      </div>

      {/* GRID CONTAINER - Tetap menjaga struktur grid asli di Desktop */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-[1.2fr_0.8fr_0.8fr_1.2fr] gap-x-8 gap-y-10 md:gap-y-6 w-full px-6 md:px-8 lg:px-[5%] mb-10 md:mb-6 items-start">
        
        {/* KOLOM LOGO - Full width di mobile (col-span-2) */}
        <div className="col-span-2 md:col-span-1 space-y-4 md:space-y-3 flex flex-col items-center md:items-start text-center md:text-left">
          <img src={logo} alt="AS PUTRA" className="h-9 md:h-8 w-auto object-contain" />
          <p className="text-slate-400 leading-relaxed text-[12px] md:text-[11px] max-w-[280px] md:max-w-[240px]">
            Ekosistem bisnis terintegrasi yang berkomitmen pada inovasi dan integritas tinggi.
          </p>
        </div>

        {/* KOLOM PERUSAHAAN - Berjejer di mobile (col-span-1) */}
        <div className="col-span-1 md:col-span-1">
          <h4 className="text-[10px] md:text-[9px] uppercase tracking-[0.2em] mb-4 md:mb-3 font-black text-slate-800 flex items-center gap-2">
            <span className="w-3 h-[1.5px]" style={{ backgroundColor: COLOR_GOLD }}></span>
            Perusahaan
          </h4>
          <ul className="space-y-2 md:space-y-1 text-[13px] md:text-[12px] text-slate-500 font-medium">
            <li><Link to="/" className="hover:text-[#FFC619] transition-colors">Beranda</Link></li>
            <li><Link to="/tentang" className="hover:text-[#FFC619] transition-colors">Tentang</Link></li>
            <li><Link to="/#sector-strip" className="hover:text-[#FFC619] transition-colors">Sektor</Link></li>
            {!loading && companyMenu.filter(p => p.name.toLowerCase() !== "tentang").map(p => (
              <li key={p.id}><Link to={`/${p.name.toLowerCase()}`} className="hover:text-[#FFC619] transition-colors capitalize">{p.name}</Link></li>
            ))}
          </ul>
        </div>

        {/* KOLOM UNIT BISNIS - Berjejer di mobile (col-span-1) */}
        <div className="col-span-1 md:col-span-1">
          <h4 className="text-[10px] md:text-[9px] uppercase tracking-[0.2em] mb-4 md:mb-3 font-black text-slate-800 flex items-center gap-2">
            <span className="w-3 h-[1.5px]" style={{ backgroundColor: COLOR_GOLD }}></span>
            Unit Bisnis
          </h4>
          <ul className="space-y-2 md:space-y-1 text-[13px] md:text-[12px] text-slate-500 font-medium">
            {businessSectors.map(s => (
              <li key={s.id}><Link to={`/sector/${s.slug}`} className="hover:text-[#FFC619] transition-colors capitalize">{s.label}</Link></li>
            ))}
          </ul>
        </div>

        {/* KOLOM KONTAK & SOSMED - Full width di mobile (col-span-2) */}
        <div className="col-span-2 md:col-span-1 space-y-6 md:space-y-4 pt-8 md:pt-0 border-t md:border-t-0 border-slate-100 flex flex-col items-center md:items-start text-center md:text-left">
          <div>
            <h4 className="text-[10px] md:text-[9px] uppercase tracking-[0.2em] mb-4 md:mb-3 font-black text-slate-800 flex items-center justify-center md:justify-start gap-2">
              <span className="w-3 h-[1.5px]" style={{ backgroundColor: COLOR_GOLD }}></span>
              Hubungi Kami
            </h4>
            <p className="text-slate-500 text-[12px] md:text-[11px] leading-relaxed mb-3">
              Jl. Jend. Sudirman No.125, Winduhaji, <br className="hidden md:block" />
              Kuningan, Jawa Barat 45516
            </p>
          </div>
          
          {/* HOTLINE */}
          <div className="flex flex-col border-t border-slate-100 md:border-none pt-4 md:pt-0 w-full md:w-auto">
            <span className="text-[9px] md:text-[8px] uppercase tracking-widest text-slate-400 font-bold">Hotline</span>
            <a href="tel:+62232123456" className="text-[18px] md:text-[14px] font-black text-[#0F1A3E] hover:text-[#FFC619] transition-colors">
              (0232) 123456
            </a>
          </div>

          {/* SOSMED */}
          <div className="flex gap-3 md:gap-2">
            {[
              { id: 'ig', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
              { id: 'tt', path: 'M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1 .05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z' },
              { id: 'wa', path: 'M17.472 14.382c-.301-.15-.783-.387-.905-.43-.122-.044-.21-.066-.3.067-.09.132-.347.43-.425.522-.078.093-.156.104-.457-.046a5.745 5.745 0 0 1-1.696-1.045 6.33 6.33 0 0 1-1.173-1.46c-.178-.301-.019-.464.131-.613.135-.133.301-.35.451-.524.05-.058.083-.098.12-.132.046-.044.077-.074.113-.11.104-.103.173-.172.246-.312.074-.14.037-.263-.019-.387-.056-.123-.3-.728-.41-1.002-.108-.27-.215-.233-.3-.233-.077 0-.165-.011-.252-.011a.483.483 0 0 0-.35.163c-.12.133-.457.447-.457 1.09 0 .642.467 1.263.532 1.352.064.09 1.155 1.764 2.798 2.473.39.169.696.269.934.345.392.125.75.107 1.032.065.314-.047.963-.393 1.098-.773.136-.381.136-.708.096-.773-.04-.065-.148-.104-.449-.254zM12.004 2C6.48 2 2.01 6.47 2.01 12c0 2.189.702 4.218 1.895 5.864L2.01 22l4.28-.901a10.02 10.02 0 0 0 5.714 1.741c5.524 0 9.994-4.47 9.994-10s-4.47-10-9.994-10zm0 18.001c-1.89 0-3.642-.513-5.143-1.402l-.368-.219-2.541.536.546-2.473-.24-.383A7.99 7.99 0 0 1 3.996 12c0-4.412 3.592-8.004 8.008-8.004 4.415 0 8.008 3.592 8.008 8.004 0 4.412 3.593 8.001-8.008 8.001z' },
              { id: 'fb', path: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3V2z' }
            ].map(social => (
              <a key={social.id} href="#" className="w-9 h-9 md:w-7 md:h-7 rounded bg-slate-100 flex items-center justify-center text-slate-500 hover:text-white hover:bg-[#FFC619] transition-all shadow-sm">
                <Icon path={social.path} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER BOTTOM */}
      <div className="relative z-10 px-6 md:px-8 lg:px-[5%]">
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-slate-100 pt-6 md:pt-3 mt-2 gap-4 md:gap-2 text-slate-400">
          <p className="text-[10px] md:text-[8.5px] tracking-widest font-bold uppercase text-center md:text-left">
            &copy; 2026 AS PUTRA Group. <br className="md:hidden" /> All rights reserved.
          </p>
          <div className="flex items-center gap-1 opacity-50 italic">
            <span className="text-[8px] md:text-[7.5px] uppercase tracking-widest font-bold text-slate-500">Powered by</span>
            <span className="text-[10px] md:text-[9px] font-black text-[#0F1A3E]">Solid Project</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;