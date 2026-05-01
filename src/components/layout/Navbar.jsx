import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { gsap } from "gsap";
import useNavbarTheme from "@/hooks/useNavbarTheme";
import logo from "@/assets/logo-new.jpg";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [language, setLanguage] = useState("id");
  const [isVisible, setIsVisible] = useState(true);
  const textTheme = useNavbarTheme();
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

  // Animasi button berulang
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
          gsap.to(button, {
            scale: 1,
            duration: 0.2,
            ease: "power2.out",
          });
        },
      });
    };

    const interval = setInterval(animateButton, 4000);

    const handleMouseEnter = () => {
      gsap.to(button, {
        scale: 1.05,
        y: -2,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        scale: 1,
        y: 0,
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      clearInterval(interval);
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Animasi mobile menu
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(mobileMenuRef.current,
        { x: "100%" },
        { x: "0%", duration: 0.4, ease: "power2.out" }
      );
    } else {
      document.body.style.overflow = "";
      if (mobileMenuRef.current) {
        gsap.to(mobileMenuRef.current, {
          x: "100%",
          duration: 0.3,
          ease: "power2.in"
        });
      }
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
  const items = document.querySelectorAll(".sector-item");

  if (menuOpen === false) return;

  gsap.fromTo(
    items,
    { y: -10, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.25,
      stagger: 0.05,
      ease: "power2.out",
    }
  );
}, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const closeMenu = () => setMenuOpen(false);
  const sectors = [
  { label: "Peternakan", path: "/sector/peternakan" },
  { label: "Hospitality", path: "/sector/hospitality" },
  { label: "Retail", path: "/sector/retail" },
  { label: "Construction", path: "/sector/construction" },
  { label: "Lifestyle", path: "/sector/lifestyle" },
  { label: "Ekspedisi", path: "/sector/ekspedisi" }
];
  // Theme mapping
  const textColorClass = textTheme === "dark" ? "text-white" : "text-[var(--color-teks)]";
  const logoTextColor = textTheme === "dark" ? "text-white" : "text-[var(--color-teks)]";
  const hamburgerColor = textTheme === "dark" ? "bg-white" : "bg-[var(--color-teks)]";
  const hoverColorClass = "hover:text-[var(--color-utama)]";
  const activeLinkClass = "text-[var(--color-utama)] border-l-4 border-[var(--color-utama)] pl-3";

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 px-4 sm:px-6 md:px-8 lg:px-[5%] flex justify-between items-center bg-transparent py-3 sm:py-4 transition-all duration-500 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3 group" onClick={closeMenu}>
          <img
            src={logo}
            alt="AS PUTRA"
            className="w-8 h-8 sm:w-9 md:w-10 sm:h-9 md:h-10 rounded-full object-cover transition-all duration-300 group-hover:scale-105"
          />
          <span
            className={`font-bold tracking-[0.15em] text-xs sm:text-sm transition-all duration-300 ${logoTextColor} group-hover:tracking-[0.2em]`}
          >
            AS PUTRA
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex md:items-center md:gap-4 lg:gap-6 xl:gap-8">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-xs lg:text-sm uppercase tracking-wide font-medium transition-all duration-500 ${hoverColorClass} ${
                  isActive ? "text-[var(--color-utama)] border-b-2 border-[var(--color-utama)] pb-1" : textColorClass
                }`
              }
            >
              Beranda
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-xs lg:text-sm uppercase tracking-wide font-medium transition-all duration-500 ${hoverColorClass} ${
                  isActive ? "text-[var(--color-utama)] border-b-2 border-[var(--color-utama)] pb-1" : textColorClass
                }`
              }
            >
              Tentang Kami
            </NavLink>
          </li>
          <li className="relative group">
  <div className="flex items-center gap-1 cursor-pointer">
    <span className={`text-xs lg:text-sm uppercase tracking-wide font-medium transition-all duration-500 ${textColorClass} hover:text-[var(--color-utama)]`}>
      Sektor Bisnis
    </span>

    <span className="text-xs transition-transform duration-300 group-hover:rotate-180">
      ▾
    </span>
  </div>

  {/* DROPDOWN */}
  <ul className="
    absolute top-full left-0 mt-3 min-w-[230px]
    bg-white/90 backdrop-blur-xl
    border border-gray-100
    shadow-xl rounded-xl overflow-hidden
    opacity-0 invisible translate-y-2 scale-95
    group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:scale-100
    transition-all duration-300 origin-top
  ">
    {sectors.map((item, index) => (
      <li key={item.path}>
        <Link
          to={item.path}
          className="
            block px-4 py-3 text-sm
            text-[var(--color-teks)]
            hover:bg-[var(--color-bg-alt)]
            hover:text-[var(--color-utama)]
            transition-all duration-200
            border-b last:border-b-0 border-gray-100
          "
        >
          {item.label}
        </Link>
      </li>
    ))}
  </ul>
</li>
          <li>
            <NavLink
              to="/news"
              className={({ isActive }) =>
                `text-xs lg:text-sm uppercase tracking-wide font-medium transition-all duration-500 ${hoverColorClass} ${
                  isActive ? "text-[var(--color-utama)] border-b-2 border-[var(--color-utama)] pb-1" : textColorClass
                }`
              }
            >
              Berita
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/career"
              className={({ isActive }) =>
                `text-xs lg:text-sm uppercase tracking-wide font-medium transition-all duration-500 ${hoverColorClass} ${
                  isActive ? "text-[var(--color-utama)] border-b-2 border-[var(--color-utama)] pb-1" : textColorClass
                }`
              }
            >
              Karir
            </NavLink>
          </li>

          {/* Language Switcher Desktop */}
          <div className="flex items-center gap-2 ml-2 pl-3 border-l border-[var(--color-teks-muted)]/30">
            <button
              onClick={() => setLanguage("id")}
              className={`text-xs font-semibold px-1 transition-all duration-500 ${
                language === "id"
                  ? "text-[var(--color-utama)] underline underline-offset-2"
                  : textTheme === "dark"
                  ? "text-white/70 hover:text-white"
                  : "text-[var(--color-teks-muted)] hover:text-[var(--color-teks)]"
              }`}
            >
              ID
            </button>
            <span className={`${textTheme === "dark" ? "text-white/30" : "text-[var(--color-teks-muted)]/50"}`}>|</span>
            <button
              onClick={() => setLanguage("en")}
              className={`text-xs font-semibold px-1 transition-all duration-500 ${
                language === "en"
                  ? "text-[var(--color-utama)] underline underline-offset-2"
                  : textTheme === "dark"
                  ? "text-white/70 hover:text-white"
                  : "text-[var(--color-teks-muted)] hover:text-[var(--color-teks)]"
              }`}
            >
              EN
            </button>
          </div>
        </ul>

        {/* Button Desktop */}
        <div className="hidden md:block">
          <Link
            ref={buttonRef}
            to="/career"
            className="group relative inline-flex items-center gap-2 px-5 lg:px-6 py-2 lg:py-2.5 bg-[var(--color-utama)] text-white font-medium tracking-wide rounded-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[var(--color-utama)]/30 hover:-translate-y-0.5 text-xs lg:text-sm"
          >
            <span className="relative z-10 flex items-center gap-2">
              Hubungi Kami
              <svg className="w-3.5 h-3.5 lg:w-4 lg:h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Link>
        </div>

        {/* Hamburger Button Mobile */}
        <button
          onClick={toggleMenu}
          className="md:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
          aria-label="Menu"
        >
          <span
            className={`block w-5 h-0.5 transition-all duration-300 ${hamburgerColor} ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 transition-all duration-300 ${hamburgerColor} ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 transition-all duration-300 ${hamburgerColor} ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile Menu - Slide from Right */}
      <>
        {/* Overlay */}
        <div
          className={`fixed inset-0 bg-black/50 z-40 transition-all duration-300 md:hidden ${
            menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={closeMenu}
        />

        {/* Menu Panel */}
        <div
          ref={mobileMenuRef}
          className={`fixed top-0 right-0 h-full w-[280px] sm:w-[320px] bg-white shadow-2xl z-50 flex flex-col transform transition-shadow duration-300 md:hidden ${
            menuOpen ? "shadow-black/20" : ""
          }`}
          style={{ transform: menuOpen ? "translateX(0)" : "translateX(100%)" }}
        >
          {/* Header Panel */}
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <img src={logo} alt="AS PUTRA" className="w-10 h-10 rounded-full object-cover" />
            <button
              onClick={closeMenu}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto py-4">
            <div className="px-4 space-y-1">
              <NavLink
                to="/"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `block py-3 px-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-[var(--color-utama)]/10 text-[var(--color-utama)]"
                      : "text-[var(--color-teks)] hover:bg-gray-50"
                  }`
                }
              >
                Beranda
              </NavLink>

              <NavLink
                to="/about"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `block py-3 px-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-[var(--color-utama)]/10 text-[var(--color-utama)]"
                      : "text-[var(--color-teks)] hover:bg-gray-50"
                  }`
                }
              >
                Tentang Kami
              </NavLink>

              {/* Dropdown Mobile */}
              <div className="space-y-1">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center justify-between w-full py-3 px-3 rounded-lg text-sm font-medium text-[var(--color-teks)] hover:bg-gray-50 transition-all duration-300"
                >
                  <span>Sektor Bisnis</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div className={`pl-4 space-y-1 overflow-hidden transition-all duration-300 ${dropdownOpen ? "max-h-96" : "max-h-0"}`}>
                  <Link to="/sector" onClick={closeMenu} className="block py-2.5 px-3 rounded-lg text-sm text-[var(--color-teks-muted)] hover:text-[var(--color-utama)] hover:bg-gray-50 transition-all duration-300">
                    Sektor Kami
                  </Link>
                  <Link to="/sector#peternakan" onClick={closeMenu} className="block py-2.5 px-3 rounded-lg text-sm text-[var(--color-teks-muted)] hover:text-[var(--color-utama)] hover:bg-gray-50 transition-all duration-300">
                    Peternakan
                  </Link>
                  <Link to="/sector#hotel" onClick={closeMenu} className="block py-2.5 px-3 rounded-lg text-sm text-[var(--color-teks-muted)] hover:text-[var(--color-utama)] hover:bg-gray-50 transition-all duration-300">
                    Hotel & Resort
                  </Link>
                  <Link to="/sector#property" onClick={closeMenu} className="block py-2.5 px-3 rounded-lg text-sm text-[var(--color-teks-muted)] hover:text-[var(--color-utama)] hover:bg-gray-50 transition-all duration-300">
                    Properti
                  </Link>
                  <Link to="/sector#retail" onClick={closeMenu} className="block py-2.5 px-3 rounded-lg text-sm text-[var(--color-teks-muted)] hover:text-[var(--color-utama)] hover:bg-gray-50 transition-all duration-300">
                    Retail
                  </Link>
                  <Link to="/sector#ekspedisi" onClick={closeMenu} className="block py-2.5 px-3 rounded-lg text-sm text-[var(--color-teks-muted)] hover:text-[var(--color-utama)] hover:bg-gray-50 transition-all duration-300">
                    Ekspedisi
                  </Link>
                </div>
              </div>

              <NavLink
                to="/news"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `block py-3 px-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-[var(--color-utama)]/10 text-[var(--color-utama)]"
                      : "text-[var(--color-teks)] hover:bg-gray-50"
                  }`
                }
              >
                Berita
              </NavLink>

              <NavLink
                to="/career"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `block py-3 px-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-[var(--color-utama)]/10 text-[var(--color-utama)]"
                      : "text-[var(--color-teks)] hover:bg-gray-50"
                  }`
                }
              >
                Karir
              </NavLink>
            </div>

            {/* Language Switcher Mobile */}
            <div className="px-4 pt-6 mt-4 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setLanguage("id")}
                  className={`text-sm font-semibold px-2 py-1 rounded-md transition-all duration-300 ${
                    language === "id"
                      ? "bg-[var(--color-utama)] text-white"
                      : "text-[var(--color-teks-muted)] hover:bg-gray-100"
                  }`}
                >
                  INDONESIA
                </button>
                <button
                  onClick={() => setLanguage("en")}
                  className={`text-sm font-semibold px-2 py-1 rounded-md transition-all duration-300 ${
                    language === "en"
                      ? "bg-[var(--color-utama)] text-white"
                      : "text-[var(--color-teks-muted)] hover:bg-gray-100"
                  }`}
                >
                  ENGLISH
                </button>
              </div>
            </div>
          </div>

          {/* Button Mobile di Footer Panel */}
          <div className="p-4 border-t border-gray-100">
            <Link
              to="/career"
              onClick={closeMenu}
              className="flex items-center justify-center gap-2 w-full py-3 bg-[var(--color-utama)] text-white font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 text-sm"
            >
              Hubungi Kami
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </>
    </>
  );
};

export default Navbar;