import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { gsap } from "gsap";
import useNavbarTheme from "@/hooks/useNavbarTheme";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [language, setLanguage] = useState("id");
  const [isVisible, setIsVisible] = useState(true);
  
  // Ambil theme dan logo dari custom hook
  const { theme, logo } = useNavbarTheme(); 
  
  const scrollTimeoutRef = useRef(null);
  const buttonRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Auto-hide navbar saat scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(false);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => setIsVisible(true), 150);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  // Animasi button berulang (GSAP)
  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const animateButton = () => {
      gsap.to(button, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          gsap.to(button, { scale: 1, duration: 0.2, ease: "power2.out" });
        },
      });
    };

    const interval = setInterval(animateButton, 4000);
    return () => clearInterval(interval);
  }, []);

  // Control Body Scroll saat Mobile Menu Buka
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const closeMenu = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  const sectors = [
  { label: "Peternakan", path: "/sector/peternakan" },
  { label: "Hospitality", path: "/sector/hospitality" },
  { label: "Retail", path: "/sector/retail" },
  { label: "Lifestyle", path: "/sector/lifestyle" },
  { label: "Education", path: "/sector/Education" },
  { label: "Ekspedisi", path: "/sector/ekspedisi" },
  { label: "Otomotif & Energy", path: "/sector/others" }
];


  // Theme mapping berdasarkan state dari hook
  const isDark = theme === "dark";
  const textColorClass = isDark ? "text-white" : "text-[var(--color-teks)]";
  const hamburgerColor = isDark ? "bg-white" : "bg-[var(--color-teks)]";
  const hoverColorClass = "hover:text-[var(--color-utama)]";

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 px-4 sm:px-6 md:px-8 lg:px-[5%] flex justify-between items-center py-3 sm:py-4 transition-all duration-500 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${!isDark ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"}`}
      >
        {/* Logo - Menggunakan logo dari hook & tanpa rounded */}
        <Link to="/" className="flex items-center group" onClick={closeMenu}>
          <img
            src={logoIcon}
            alt="AS PUTRA"
            className="w-auto h-8 sm:h-9 md:h-10 transition-all duration-500 group-hover:scale-105 object-contain"
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex md:items-center md:gap-4 lg:gap-6 xl:gap-8">
          {["Beranda", "Tentang Kami"].map((item, i) => (
            <li key={i}>
              <NavLink
                to={i === 0 ? "/" : "/about"}
                className={({ isActive }) =>
                  `text-xs lg:text-sm uppercase tracking-wider font-bold transition-all duration-300 ${hoverColorClass} ${
                    isActive ? "text-[var(--color-utama)]" : textColorClass
                  }`
                }
              >
                {item}
              </NavLink>
            </li>
          ))}

          {/* Dropdown Sektor Bisnis */}
          <li className="relative group">
            <div className={`flex items-center gap-1 cursor-pointer text-xs lg:text-sm uppercase tracking-wider font-bold transition-all duration-300 ${textColorClass} ${hoverColorClass}`}>
              <span>Sektor Bisnis</span>
              <span className="text-[10px] transition-transform duration-300 group-hover:rotate-180">▼</span>
            </div>
            <ul className="absolute top-full left-0 mt-3 min-w-[200px] bg-white shadow-xl rounded-xl overflow-hidden opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300">
              {sectors.map((s) => (
                <li key={s.path}>
                  <Link to={s.path} className="block px-5 py-3 text-sm text-slate-700 hover:bg-slate-50 hover:text-[var(--color-utama)] transition-colors">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          {["Berita", "Karir"].map((item, i) => (
            <li key={i}>
              <NavLink
                to={i === 0 ? "/news" : "/career"}
                className={({ isActive }) =>
                  `text-xs lg:text-sm uppercase tracking-wider font-bold transition-all duration-300 ${hoverColorClass} ${
                    isActive ? "text-[var(--color-utama)]" : textColorClass
                  }`
                }
              >
                {item}
              </NavLink>
            </li>
          ))}

          {/* Language Switcher */}
          <div className={`flex items-center gap-2 ml-2 pl-3 border-l ${isDark ? "border-white/20" : "border-slate-200"}`}>
            {["id", "en"].map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`text-[10px] font-black transition-all ${
                  language === lang ? "text-[var(--color-utama)]" : isDark ? "text-white/50" : "text-slate-400"
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </ul>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Link
            ref={buttonRef}
            to="/contact"
            className="px-6 py-2.5 bg-[var(--color-utama)] text-white text-xs lg:text-sm font-bold rounded-full shadow-lg shadow-[var(--color-utama)]/20 hover:shadow-[var(--color-utama)]/40 transition-all"
          >
            Hubungi Kami
          </Link>
        </div>

        {/* Hamburger Mobile */}
        <button onClick={toggleMenu} className="md:hidden flex flex-col gap-1.5 p-2">
          <span className={`w-6 h-0.5 transition-all ${hamburgerColor} ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`w-6 h-0.5 transition-all ${hamburgerColor} ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`w-6 h-0.5 transition-all ${hamburgerColor} ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {/* Mobile Menu Panel */}
      <div
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] transition-opacity duration-300 md:hidden ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeMenu}
      />
      <div
        ref={mobileMenuRef}
        className={`fixed top-0 right-0 h-full w-[80%] max-w-[300px] bg-white z-[70] shadow-2xl flex flex-col transition-transform duration-500 ease-in-out md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 border-b flex justify-between items-center">
          <img src={logo} alt="Logo" className="h-8 w-auto object-contain" />
          <button onClick={closeMenu} className="text-slate-400">✕</button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {["Beranda", "Tentang Kami", "Berita", "Karir"].map((item, i) => (
            <NavLink
              key={i}
              to={["/", "/about", "/news", "/career"][i]}
              onClick={closeMenu}
              className="block text-lg font-bold text-slate-800 hover:text-[var(--color-utama)]"
            >
              {item}
            </NavLink>
          ))}
          
          <div>
            <button onClick={toggleDropdown} className="flex justify-between items-center w-full text-lg font-bold text-slate-800">
              Sektor Bisnis <span>{dropdownOpen ? "−" : "+"}</span>
            </button>
            <div className={`mt-2 space-y-2 pl-4 transition-all overflow-hidden ${dropdownOpen ? "max-h-60" : "max-h-0"}`}>
              {sectors.map(s => (
                <Link key={s.path} to={s.path} onClick={closeMenu} className="block text-slate-500 py-1">{s.label}</Link>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 border-t">
          <Link to="/contact" onClick={closeMenu} className="block w-full py-3 bg-[var(--color-utama)] text-white text-center font-bold rounded-xl">
            Hubungi Kami
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;