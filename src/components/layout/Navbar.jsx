import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import useNavbarTheme from "@/hooks/useNavbarTheme";

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  // 1. Ambil status bahasa awal langsung dari localStorage (Default ke 'id')
  const [language, setLanguage] = useState(localStorage.getItem("user_lang") || "id");
  const [isVisible, setIsVisible] = useState(true);

  const [sectors, setSectors] = useState([]);
  const [isSectorLoading, setIsSectorLoading] = useState(true);

  const { theme, logo, needsBlur } = useNavbarTheme();
  const scrollTimeoutRef = useRef(null);

  // KONFIGURASI WARNA & UKURAN (SLIM & SLEEK)
  const COLOR_GOLD = "#FFC619";
  const COLOR_NAVY = "#1D2B53";
  const isDark = theme === "dark";

  const COLOR_ACCENT = isDark ? COLOR_GOLD : COLOR_NAVY;
  const textColorClass = isDark ? "text-white" : "text-slate-900";
  const hamburgerColor = isDark ? "bg-white" : "bg-slate-900";

  const isSectorActive = location.pathname.includes("/sector/");

  // ==========================================
  // LOGIKA BAHASA BARU: SIARKAN KE LOCALSTORAGE
  // ==========================================
  const changeLanguage = (langCode) => {
    setLanguage(langCode);
    localStorage.setItem("user_lang", langCode);
    
    if (langCode === "id") {
      // Jika kembali ke Indonesia, reload halaman untuk mengembalikan teks asli API admin
      window.location.reload();
    } else {
      // Jika memilih EN atau JP, siarkan sinyal agar AutoTranslate langsung beraksi
      window.dispatchEvent(new Event("storage")); 
    }
  };
  // Kamus statis sangat simpel khusus menu inti Navbar agar loading tombol instan kilat
  const staticMenu = {
    Beranda: { id: "Beranda", en: "Home", jp: "ホーム" },
    Tentang: { id: "Tentang", en: "About", jp: "会社概要},"},
    SektorBisnis: { id: "Sektor Bisnis", en: "Business Sectors", jp: "事業部門"},
    Berita: { id: "Berita", en: "News", jp: "ニュース"},
    Karir: { id: "Karir", en: "Career", jp: "採用情報"},
    Hubungi: { id: "Hubungi Kami", en: "Contact Us", jp: "お問い合わせ"},
    UnitBisnis: { id: "Unit Bisnis", en: "Business Units", jp: "ビジネスユニット"},
  };

  // 1. FETCH SEKTOR DARI DATABASE
  useEffect(() => {
    const fetchSectors = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL.replace(/\/$/, "");
        const response = await fetch(`${baseUrl}/api/v1/page/list`);
        const json = await response.json();

        if (json.status && json.data) {
          const sectorPages = json.data
            .filter(p => {
              if (!p || !p.name) return false;
              const nameLower = p.name.toLowerCase();
              return nameLower.includes("sector") || nameLower.includes("sektor");
            })
            .map(p => {
              const cleanLabel = p.name
                .replace(/Sector\s+/i, "")
                .replace(/Sektor\s+/i, "")
                .trim();

              return {
                label: cleanLabel,
                slug: cleanLabel
                  .toLowerCase()
                  .replace(/[^a-z0-9\s-]/g, "") 
                  .replace(/\s+/g, "-")         
                  .replace(/-+/g, "-"),         
              };
            });

          setSectors(sectorPages);
        }
      } catch (error) {
        console.error("Gagal memuat list dropdown sektor:", error);
      } finally {
        setIsSectorLoading(false);
      }
    };
    fetchSectors();
  }, []);

  // 2. AUTO-HIDE NAVBAR SAAT SCROLL
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(false);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => setIsVisible(true), 150);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => { setMenuOpen(false); setDropdownOpen(false); };

  return (
    <>
      {/* NAVBAR MAIN */}
      <nav className={`fixed top-0 w-full z-50 px-4 md:px-8 lg:px-[5%] flex justify-between items-center py-2 transition-all duration-500 ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
           style={{
             backgroundColor: needsBlur ? (isDark ? "rgba(17,17,17,0.65)" : "rgba(249,249,249,0.65)") : "transparent",
             backdropFilter: needsBlur ? "blur(14px)" : "none",
             WebkitBackdropFilter: needsBlur ? "blur(14px)" : "none",
             transition: "background-color 0.4s ease, backdrop-filter 0.4s ease"
           }}>

        {/* LOGO */}
        <Link to="/beranda" className="flex items-center" onClick={closeMenu}>
          <img src={logo} alt="AS PUTRA" className="h-10 md:h-12 object-contain transition-transform hover:scale-105" />
        </Link>

        {/* DESKTOP MENU - Font text-[10px] agar sleek */}
        <ul className="hidden md:flex items-center gap-6 lg:gap-8">
          <li className="relative group">
            <NavLink to="/beranda" className={({ isActive }) => `inline-flex items-center text-[10px] lg:text-[11px] uppercase tracking-[0.2em] font-black transition-all duration-300 ${isActive ? "" : textColorClass} hover:opacity-70`} style={({ isActive }) => ({ color: isActive ? COLOR_ACCENT : '' })}>
              {({ isActive }) => (
                <>
                  {staticMenu.Beranda[language]}
                  {isActive && <span className="absolute -bottom-1 left-0 w-full h-[1.5px]" style={{ backgroundColor: COLOR_ACCENT }} />}
                </>
              )}
            </NavLink>
          </li>
          <li className="relative group">
            <NavLink to="/tentang" className={({ isActive }) => `inline-flex items-center text-[10px] lg:text-[11px] uppercase tracking-[0.2em] font-black transition-all duration-300 ${isActive ? "" : textColorClass} hover:opacity-70`} style={({ isActive }) => ({ color: isActive ? COLOR_ACCENT : '' })}>
              {({ isActive }) => (
                <>
                  {staticMenu.Tentang[language]}
                  {isActive && <span className="absolute -bottom-1 left-0 w-full h-[1.5px]" style={{ backgroundColor: COLOR_ACCENT }} />}
                </>
              )}
            </NavLink>
          </li>

          {/* DROPDOWN SEKTOR */}
          <li className="relative group">
            <div
              className={`inline-flex items-center gap-1 cursor-pointer text-[10px] lg:text-[11px] uppercase tracking-[0.2em] font-black transition-colors ${isSectorActive ? "" : textColorClass}`}
              style={{ color: isSectorActive ? COLOR_ACCENT : '' }}
            >
              <span>{staticMenu.SektorBisnis[language]}</span>
              <span className="text-[8px] transition-transform group-hover:rotate-180">▼</span>
              {isSectorActive && <span className="absolute -bottom-1 left-0 w-full h-[1.5px]" style={{ backgroundColor: COLOR_ACCENT }} />}
            </div>
            <ul className="absolute top-full left-0 mt-2 min-w-[180px] bg-white shadow-2xl rounded-lg overflow-hidden opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 border border-slate-50">
              {!isSectorLoading && sectors.map((s, i) => (
                <li key={i}>
                  <NavLink to={`/sector/${s.slug}`} onClick={closeMenu} className={({ isActive }) => `block px-4 py-2.5 text-[11px] font-bold transition-all ${isActive ? "bg-slate-50" : "text-slate-600 hover:bg-slate-50"}`} style={({ isActive }) => ({ color: isActive ? COLOR_NAVY : '' })}>
                    {s.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </li>

          <li className="relative group">
            <NavLink to="/news" className={({ isActive }) => `inline-flex items-center text-[10px] lg:text-[11px] uppercase tracking-[0.2em] font-black transition-all duration-300 ${isActive ? "" : textColorClass} hover:opacity-70`} style={({ isActive }) => ({ color: isActive ? COLOR_ACCENT : '' })}>
              {({ isActive }) => (
                <>
                  {staticMenu.Berita[language]}
                  {isActive && <span className="absolute -bottom-1 left-0 w-full h-[1.5px]" style={{ backgroundColor: COLOR_ACCENT }} />}
                </>
              )}
            </NavLink>
          </li>
          <li className="relative group">
            <NavLink to="/karir" className={({ isActive }) => `inline-flex items-center text-[10px] lg:text-[11px] uppercase tracking-[0.2em] font-black transition-all duration-300 ${isActive ? "" : textColorClass} hover:opacity-70`} style={({ isActive }) => ({ color: isActive ? COLOR_ACCENT : '' })}>
              {({ isActive }) => (
                <>
                  {staticMenu.Karir[language]}
                  {isActive && <span className="absolute -bottom-1 left-0 w-full h-[1.5px]" style={{ backgroundColor: COLOR_ACCENT }} />}
                </>
              )}
            </NavLink>
          </li>
        </ul>

        {/* CTA & LANG (DESKTOP) */}
        <div className="hidden md:flex items-center gap-5">
          <div className="flex items-center gap-2 pr-5 border-r border-slate-400/20 text-[9px] font-black">
            {["id", "en", "jp"].map((lang) => (
              <button 
                key={lang} 
                onClick={() => changeLanguage(lang)} 
                className={`transition-colors ${language === lang ? '' : 'opacity-30'} ${textColorClass}`} 
                style={{ color: language === lang ? COLOR_ACCENT : '' }}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
          <Link to="/contact" className={`px-5 py-2 text-[10px] font-black uppercase tracking-widest rounded-full shadow-md transition-transform hover:scale-105 active:scale-95 ${isDark ? "text-[#1D2B53]" : "text-white"}`} style={{ backgroundColor: COLOR_ACCENT }}>
            {staticMenu.Hubungi[language]}
          </Link>
        </div>

        {/* MOBILE HAMBURGER TOGGLE BUTTON */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden flex flex-col gap-1 p-2 z-[100]">
          <span className={`w-5 h-0.5 transition-all ${hamburgerColor} ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
          <span className={`w-5 h-0.5 transition-all ${hamburgerColor} ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`w-5 h-0.5 transition-all ${hamburgerColor} ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
        </button>
      </nav>

      {/* MOBILE PANEL */}
      <div className={`fixed top-0 right-0 h-full w-[75%] max-w-[280px] bg-white z-[110] shadow-2xl flex flex-col transition-transform duration-500 md:hidden ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-6 border-b flex justify-between items-center">
          <img src={logo} alt="Logo" className="h-7" />
          <button onClick={closeMenu} className="text-slate-800 text-xl font-bold">✕</button>
        </div>
        <div className="flex-1 p-6 space-y-5 overflow-y-auto">
          <NavLink to="/beranda" onClick={closeMenu} className={({ isActive }) => `block text-base font-black tracking-tight ${isActive ? "" : "text-slate-500"}`} style={({ isActive }) => ({ color: isActive ? COLOR_NAVY : '' })}>
            {staticMenu.Beranda[language]}
          </NavLink>
          <NavLink to="/tentang" onClick={closeMenu} className={({ isActive }) => `block text-base font-black tracking-tight ${isActive ? "" : "text-slate-500"}`} style={({ isActive }) => ({ color: isActive ? COLOR_NAVY : '' })}>
            {staticMenu.Tentang[language]}
          </NavLink>
          <NavLink to="/news" onClick={closeMenu} className={({ isActive }) => `block text-base font-black tracking-tight ${isActive ? "" : "text-slate-500"}`} style={({ isActive }) => ({ color: isActive ? COLOR_NAVY : '' })}>
            {staticMenu.Berita[language]}
          </NavLink>
          <NavLink to="/karir" onClick={closeMenu} className={({ isActive }) => `block text-base font-black tracking-tight ${isActive ? "" : "text-slate-500"}`} style={({ isActive }) => ({ color: isActive ? COLOR_NAVY : '' })}>
            {staticMenu.Karir[language]}
          </NavLink>

          <div className="pt-5 border-t border-slate-50">
            <p className="text-[9px] uppercase tracking-widest text-slate-300 font-bold mb-4">{staticMenu.UnitBisnis[language]}</p>
            <div className="grid grid-cols-1 gap-4">
              {sectors.map((s, i) => (
                <Link key={i} to={`/sector/${s.slug}`} onClick={closeMenu} className="text-sm font-bold text-slate-700 capitalize hover:text-[#1D2B53] transition-colors">{s.label}</Link>
              ))}
            </div>
          </div>
          
          {/* LANG PICKER (MOBILE) */}
          <div className="pt-5 border-t border-slate-100">
            <p className="text-[9px] uppercase tracking-widest text-slate-300 font-bold mb-3">Bahasa / Language</p>
            <div className="flex gap-4 text-xs font-black">
              {["id", "en", "jp"].map((lang) => (
                <button 
                  key={lang} 
                  onClick={() => { changeLanguage(lang); closeMenu(); }} 
                  className={`transition-colors ${language === lang ? 'text-[#1D2B53]' : 'text-slate-400'}`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="p-6 border-t bg-slate-50">
          <Link to="/contact" onClick={closeMenu} className="block text-center py-4 text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-lg" style={{ backgroundColor: COLOR_NAVY }}>
            {staticMenu.Hubungi[language]}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;