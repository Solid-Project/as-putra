import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { gsap } from "gsap";
import useNavbarTheme from "@/hooks/useNavbarTheme";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [language, setLanguage] = useState("id");
  const [isVisible, setIsVisible] = useState(true);

  const sectors = [
    { label: "Peternakan", slug: "peternakan" },
    { label: "Hospitality", slug: "hospitality" },
    { label: "Retail", slug: "retail" }
  ];

  const { theme, logo } = useNavbarTheme();
  const scrollTimeoutRef = useRef(null);
  const buttonRef = useRef(null);

  const isDark = theme === "dark";

  const textColorClass = isDark ? "text-white" : "text-black/80";
  const hamburgerColor = isDark ? "bg-white" : "bg-black/80";

  // AUTO HIDE NAVBAR SAAT SCROLL
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

  // ANIMASI BUTTON
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
        onComplete: () => gsap.to(button, { scale: 1, duration: 0.2 }),
      });
    };

    const interval = setInterval(animateButton, 4000);
    return () => clearInterval(interval);
  }, []);

  // LOCK BODY SCROLL MOBILE
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 w-full z-50 px-4 sm:px-6 md:px-8 lg:px-[5%] flex justify-between items-center py-3 sm:py-4 transition-all duration-500 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } bg-transparent`}
      >
        {/* LOGO */}
        <Link to="/" className="flex items-center group" onClick={closeMenu}>
          <img
            src={logo}
            alt="AS PUTRA"
            className="h-8 sm:h-9 md:h-10 object-contain transition-all duration-300 group-hover:scale-105"
          />
        </Link>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8">
          {["Beranda", "Tentang Kami"].map((item, i) => (
            <li key={i}>
              <NavLink
                to={i === 0 ? "/" : "/about"}
                className={({ isActive }) =>
                  `text-xs lg:text-sm uppercase tracking-wider font-bold transition-colors hover:text-[var(--color-utama)] ${
                    isActive ? "text-[var(--color-utama)]" : textColorClass
                  }`
                }
              >
                {item}
              </NavLink>
            </li>
          ))}

          {/* DROPDOWN SEKTOR */}
          <li className="relative group">
            <div
              className={`flex items-center gap-1 cursor-pointer text-xs lg:text-sm uppercase tracking-wider font-bold transition-colors hover:text-[var(--color-utama)] ${textColorClass}`}
            >
              <span>Sektor Bisnis</span>
              <span className="text-[10px] group-hover:rotate-180 transition-transform">
                ▼
              </span>
            </div>

            <ul className="absolute top-full left-0 mt-3 min-w-[200px] bg-white shadow-xl rounded-xl overflow-hidden opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300">
              {sectors.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/sector/${s.slug}`}
                    onClick={closeMenu}
                    className="block px-5 py-3 text-sm text-slate-700 hover:bg-slate-50 hover:text-[var(--color-utama)] border-b last:border-0"
                  >
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
                  `text-xs lg:text-sm uppercase tracking-wider font-bold transition-colors hover:text-[var(--color-utama)] ${
                    isActive ? "text-[var(--color-utama)]" : textColorClass
                  }`
                }
              >
                {item}
              </NavLink>
            </li>
          ))}

          {/* LANGUAGE */}
          <div className="flex items-center gap-2 ml-2 pl-3 border-l border-white/20">
            {["id", "en"].map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`text-[10px] font-bold transition-colors ${
                  language === lang
                    ? "text-[var(--color-utama)]"
                    : isDark
                    ? "text-white/50"
                    : "text-black/40"
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </ul>

        {/* CTA */}
        <div className="hidden md:block">
          <Link
            ref={buttonRef}
            to="/contact"
            className="px-6 py-2.5 bg-[var(--color-utama)] text-white text-xs lg:text-sm font-bold rounded-full shadow-lg"
          >
            Hubungi Kami
          </Link>
        </div>

        {/* HAMBURGER */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 z-[80]"
        >
          <span
            className={`w-6 h-0.5 transition-all ${hamburgerColor} ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 transition-all ${hamburgerColor} ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 transition-all ${hamburgerColor} ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </nav>

      {/* MOBILE OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/50 z-[60] md:hidden transition-opacity ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeMenu}
      />

      {/* MOBILE MENU */}
      <div
        className={`fixed top-0 right-0 h-full w-[80%] max-w-[300px] bg-white z-[70] shadow-2xl flex flex-col transition-transform md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 border-b flex justify-between items-center">
          <img src={logo} alt="Logo" className="h-8" />
          <button onClick={closeMenu} className="text-xl">
            ✕
          </button>
        </div>

        <div className="flex-1 p-6 space-y-5">
          {["/", "/about", "/news", "/career"].map((path, i) => (
            <NavLink
              key={i}
              to={path}
              onClick={closeMenu}
              className="block text-lg font-bold text-slate-800"
            >
              {["Beranda", "Tentang Kami", "Berita", "Karir"][i]}
            </NavLink>
          ))}

          <div>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex justify-between w-full text-lg font-bold"
            >
              Sektor Bisnis
              <span>{dropdownOpen ? "−" : "+"}</span>
            </button>

            <div
              className={`mt-3 pl-4 overflow-hidden transition-all ${
                dropdownOpen ? "max-h-[400px]" : "max-h-0"
              }`}
            >
              {sectors.map((s) => (
                <Link
                  key={s.slug}
                  to={`/sector/${s.slug}`}
                  onClick={closeMenu}
                  className="block py-1 text-slate-600"
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 border-t">
          <Link
            to="/contact"
            onClick={closeMenu}
            className="block text-center py-4 bg-[var(--color-utama)] text-white font-bold rounded-xl"
          >
            Hubungi Kami
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;