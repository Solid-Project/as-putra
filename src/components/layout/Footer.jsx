import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo-teks-asli.png";
import logoSiluet from "@/assets/logo.jpg";

const Footer = () => {
  const [pages, setPages] = useState([]);
  const [articles, setArticles] = useState([]); 
  const [companyInfo, setCompanyInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const COLOR_GOLD = "#FFC619"; 
  const COLOR_NAVY = "#0F1A3E";

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL.replace(/\/$/, "");
        
        const [pagesRes, companyRes, newsRes] = await Promise.all([
          fetch(`${baseUrl}/api/v1/page/list`),
          fetch(`${baseUrl}/api/v1/company/info`),
          fetch(`${baseUrl}/api/v1/news/all-news`).catch(() => null)
        ]);

        const pagesJson = await pagesRes.json();
        if (pagesJson.status) setPages(pagesJson.data || []);

        const companyJson = await companyRes.json();
        if (companyJson.status && companyJson.data && companyJson.data.length > 0) {
          setCompanyInfo(companyJson.data[0]);
        }

        if (newsRes) {
          const newsJson = await newsRes.json();
          if (newsJson.status && newsJson.data && Array.isArray(newsJson.data.details)) {
            setArticles(newsJson.data.details);
          }
        }
      } catch (error) { 
        console.error("Gagal memuat data footer:", error); 
      } finally {
        setLoading(false);
      }
    };
    fetchFooterData();
  }, []);

  // 1. FILTER DINAMIS: Sektor Unit Bisnis
  const businessSectors = (Array.isArray(pages) ? pages : [])
    .filter(p => p && p.name && p.name.toLowerCase().includes("sector"))
    .map(p => ({
      id: p.id,
      label: p.name.replace(/Sector\s+/i, ""),
      slug: p.name.replace(/Sector\s+/i, "").toLowerCase().replace(/\s+/g, '-'),
    }));

  // 2. FILTER DINAMIS: Sustainability (Diambil dari array 'details' API News)
  const safeArticles = Array.isArray(articles) ? articles : [];
  const sustainabilityContent = safeArticles
    .filter(art => {
      const title = art && art.title ? art.title.toLowerCase() : "";
      const hasSustainabilityCategory = art.categories && art.categories.some(cat => {
        const catName = cat.name ? cat.name.toLowerCase() : "";
        return catName.includes("csr") || catName.includes("lingkungan") || catName.includes("sosial");
      });
      return hasSustainabilityCategory || title.includes("bantu") || title.includes("warga") || title.includes("run") || title.includes("gathering");
    })
    .slice(0, 4);

  const extractSlug = (fullUrl) => {
    if (!fullUrl) return "";
    const parts = fullUrl.split("/");
    return parts[parts.length - 1];
  };

  const Icon = ({ path }) => (
    <svg className="w-3.5 h-3.5 transition-all duration-300 fill-current" viewBox="0 0 24 24">
      <path d={path} />
    </svg>
  );

  return (
    <footer className="footer-snap relative bg-[#F8FAFC] pt-20 pb-8 border-t bg-gradient-to-b from-[#FAFAFA] to-[#F1F5F9] overflow-hidden border-slate-200/60">
      
      {/* TEXTURE BACKGROUND */}
      <div className="absolute inset-0 opacity-[0.012] pointer-events-none select-none" 
        style={{ backgroundImage: `radial-gradient(${COLOR_NAVY} 0.8px, transparent 0.8px)`, backgroundSize: '20px 20px' }}>
      </div>

      {/* RE-POSITIONED BACKGROUND SILUET LOGO */}
      <div className="absolute right-[-4%] bottom-[-6%] opacity-[0.02] pointer-events-none select-none mix-blend-multiply">
        <img src={logoSiluet} alt="" className="w-72 md:w-[500px] grayscale rotate-6" />
      </div>

      <div className="relative z-10 w-full px-6 md:px-12 lg:px-[6%] flex flex-col gap-16">
        
        {/* ROW 1: BRAND HEADER & SOCIAL MEDIA */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start pb-10 border-b border-slate-200 gap-8 text-center lg:text-left">
          <div className="space-y-3 max-w-xl">
            <img src={logo} alt="AS PUTRA" className="h-10 w-auto object-contain mx-auto lg:mx-0 transition-transform duration-300 hover:scale-105" />
            <p className="text-slate-400 text-xs font-semibold leading-relaxed">
              Membangun kemajuan berkelanjutan melalui integritas, inovasi, dan nilai luhur ekosistem bisnis terintegrasi yang berfokus pada kesejahteraan masyarakat dan ketahanan pangan.
            </p>
          </div>
          
          {/* SOSMED TAUTAN DENGAN STYLE HOVER PREMIUM */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <span className="text-[10px] tracking-widest uppercase font-bold text-slate-400">Ikuti Kami</span>
            <div className="flex gap-3">
              {[
                { id: 'ig', url: companyInfo?.url_instagram, path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                { id: 'tt', url: companyInfo?.tiktok, path: 'M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1 .05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z' },
                { id: 'wa', url: companyInfo?.whatsapp ? `https://wa.me/${companyInfo.whatsapp.replace(/\D/g, '')}` : null, path: 'M17.472 14.382c-.301-.15-.783-.387-.905-.43-.122-.044-.21-.066-.3.067-.09.132-.347.43-.425.522-.078.093-.156.104-.457-.046a5.745 5.745 0 0 1-1.696-1.045 6.33 6.33 0 0 1-1.173-1.46c-.178-.301-.019-.464.131-.613.135-.133.301-.35.451-.524.05-.058.083-.098.12-.132.046-.044.077-.074.113-.11.104-.103.173-.172.246-.312.074-.14.037-.263-.019-.387-.056-.123-.3-.728-.41-1.002-.108-.27-.215-.233-.3-.233-.077 0-.165-.011-.252-.011a.483.483 0 0 0-.35.163c-.12.133-.457.447-.457 1.09 0 .642.467 1.263.532 1.352.064.09 1.155 1.764 2.798 2.473.39.169.696.269.934.345.392.125.75.107 1.032.065.314-.047.963-.393 1.098-.773.136-.381.136-.708.096-.773-.04-.065-.148-.104-.449-.254zM12.004 2C6.48 2 2.01 6.47 2.01 12c0 2.189.702 4.218 1.895 5.864L2.01 22l4.28-.901a10.02 10.02 0 0 0 5.714 1.741c5.524 0 9.994-4.47 9.994-10s-4.47-10-9.994-10zm0 18.001c-1.89 0-3.642-.513-5.143-1.402l-.368-.219-2.541.536.546-2.473-.24-.383A7.99 7.99 0 0 1 3.996 12c0-4.412 3.592-8.004 8.008-8.004 4.415 0 8.008 3.592 8.008 8.004 0 4.412 3.593 8.001-8.008 8.001z' },
                { id: 'fb', url: companyInfo?.url_facebook, path: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3V2z' }
              ].map(social => (
                <a key={social.id} href={social.url || "#"} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:text-white hover:bg-[#0F1A3E] hover:border-[#0F1A3E] transition-all duration-300 shadow-sm hover:shadow-md">
                  <Icon path={social.path} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ROW 2: MEGA SITEMAP GRID (5 Columns Format) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-8 gap-y-12 items-start">
          
          {/* Kolom 1: Perusahaan */}
          <div className="space-y-4">
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-extrabold text-slate-800 flex items-center gap-2">
              <span className="w-3 h-[2px]" style={{ backgroundColor: COLOR_GOLD }}></span> Corporate
            </h4>
            <ul className="space-y-3 text-xs text-slate-500 font-semibold">
              <li><Link to="/beranda" className="hover:text-[#0F1A3E] hover:underline transition-all">Beranda</Link></li>
              <li><Link to="/tentang" className="hover:text-[#0F1A3E] hover:underline transition-all">Tentang Kami</Link></li>
              <li><Link to="/sector" className="hover:text-[#0F1A3E] hover:underline transition-all">Sektor Bisnis</Link></li>
              <li><Link to="/news" className="hover:text-[#0F1A3E] hover:underline transition-all">Newsroom</Link></li>
              <li><Link to="/karir" className="hover:text-[#0F1A3E] hover:underline transition-all">Karir & Budaya</Link></li>
            </ul>
          </div>

          {/* Kolom 2: Sektor Unit Bisnis */}
          <div className="space-y-4">
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-extrabold text-slate-800 flex items-center gap-2">
              <span className="w-3 h-[2px]" style={{ backgroundColor: COLOR_GOLD }}></span> Business Units
            </h4>
            <ul className="space-y-3 text-xs text-slate-500 font-semibold">
              {businessSectors.length > 0 ? (
                businessSectors.map(s => (
                  <li key={s.id}>
                    <Link to={`/sector/${s.slug}`} className="hover:text-[#0F1A3E] hover:underline transition-all capitalize">{s.label}</Link>
                  </li>
                ))
              ) : (
                <li className="text-slate-400 italic text-[11px] font-normal">Belum tersedia...</li>
              )}
            </ul>
          </div>

          {/* Kolom 3: Sustainability */}
          <div className="space-y-4">
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-extrabold text-slate-800 flex items-center gap-2">
              <span className="w-3 h-[2px]" style={{ backgroundColor: COLOR_GOLD }}></span> Sustainability
            </h4>
            <ul className="space-y-3 text-xs text-slate-500 font-semibold">
              {sustainabilityContent.length > 0 ? (
                sustainabilityContent.map(art => (
                  <li key={art.slug || art.title}>
                    <Link to={`/news/${extractSlug(art.slug)}`} className="hover:text-[#0F1A3E] hover:underline transition-all line-clamp-1">
                      {art.title}
                    </Link>
                  </li>
                ))
              ) : safeArticles.length > 0 ? (
                safeArticles.slice(0, 4).map(art => (
                  <li key={art.slug || art.title}>
                    <Link to={`/news/${extractSlug(art.slug)}`} className="hover:text-[#0F1A3E] hover:underline transition-all line-clamp-1">
                      {art.title}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-slate-400 italic text-[11px] font-normal">Belum ada pembaruan...</li>
              )}
            </ul>
          </div>

          {/* Kolom 4: Governance / Regulasi Hukum Statis (Disinkronkan dengan rute slug Fullpage) */}
          <div className="space-y-4">
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-extrabold text-slate-800 flex items-center gap-2">
              <span className="w-3 h-[2px]" style={{ backgroundColor: COLOR_GOLD }}></span> Governance
            </h4>
            <ul className="space-y-3 text-xs text-slate-500 font-semibold">
              <li>
                <Link to="/privacy-policy" className="hover:text-[#0F1A3E] hover:underline transition-all">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="hover:text-[#0F1A3E] hover:underline transition-all">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <span className="text-slate-300 cursor-not-allowed select-none">
                  Legal Disclaimer
                </span>
              </li>
            </ul>
          </div>

          {/* Kolom 5: Kontak Utama Headquarters */}
          <div className="space-y-4 col-span-2 sm:col-span-1">
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-extrabold text-slate-800 flex items-center gap-2">
              <span className="w-3 h-[2px]" style={{ backgroundColor: COLOR_GOLD }}></span> Headquarters
            </h4>
            <div className="text-slate-500 text-xs font-semibold leading-relaxed space-y-4">
              <p className="whitespace-pre-line text-justify">
                {companyInfo?.address || `Jl. Jend. Sudirman No.125, Winduhaji,\nKuningan, Jawa Barat 45516`}
              </p>
              <div className="pt-3 border-t border-slate-200 flex flex-col gap-0.5">
                <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Hotline Corporate</span>
                <a href={companyInfo?.phone ? `tel:${companyInfo.phone}` : "tel:+62232123456"} className="text-sm font-black text-[#0F1A3E] hover:text-[#FFC619] transition-colors">
                  {companyInfo?.phone || "(0232) 123456"}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* ROW 3: FOOTER BOTTOM (Copyright & Credit) */}
        <div className="flex flex-col sm:flex-row justify-between items-center border-t border-slate-200 pt-8 gap-4 text-slate-400 font-bold uppercase tracking-wider text-[9px]">
          <p className="text-center sm:text-left tracking-wide">
            &copy; 2026 <span className="text-slate-600">AS PUTRA Group</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 opacity-60">
            <span className="font-bold text-[8px] text-slate-400">Engineered by</span>
            <span className="text-[10px] font-black tracking-widest text-[#0F1A3E] border-b-2 border-[#FFC619] pb-0.5">SOLID PROJECT</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;