import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { gsap } from 'gsap';
import useNavbarTheme from '@/hooks/useNavbarTheme';
import logo from '@/assets/logo-new.jpg';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [language, setLanguage] = useState('id');
  const [isVisible, setIsVisible] = useState(true);
  const textTheme = useNavbarTheme();
  const scrollTimeoutRef = useRef(null);
  const buttonRef = useRef(null);

  // 1. Auto-hide navbar saat scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(false);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => setIsVisible(true), 150);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  // Navbar theme handled by useNavbarTheme hook (RAF smooth + accurate bg analysis)
  // No ScrollTrigger needed

  // 3. Animasi button berulang
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
            ease: "power2.out"
          });
        }
      });
    };

    const interval = setInterval(animateButton, 4000);

    const handleMouseEnter = () => {
      gsap.to(button, {
        scale: 1.05,
        y: -2,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)",
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        scale: 1,
        y: 0,
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        duration: 0.3,
        ease: "power2.out"
      });
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearInterval(interval);
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => {
    if (window.innerWidth <= 768) setDropdownOpen(!dropdownOpen);
  };

  const textColorClass = textTheme === 'dark' ? 'text-gray-900' : 'text-white';
  const borderColorClass = textTheme === 'dark' ? 'border-gray-300' : 'border-white/20';
  const hoverColorClass = 'hover:text-[var(--color-utama)]';
  const logoTextColor = textTheme === 'dark' ? 'text-gray-900' : 'text-white';
  const hamburgerColor = textTheme === 'dark' ? 'bg-gray-900' : 'bg-white';

  return (
    <nav className={`fixed top-0 w-full z-50 px-[5%] flex justify-between items-center bg-transparent py-3 transition-all duration-500 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      {/* Logo */}
      <Link to="/" className="flex items-center gap-3 group">
        <img src={logo} alt="AS PUTRA" className="w-10 h-10 rounded-full object-cover transition-all duration-300 group-hover:scale-105" />
        <span className={`font-bold tracking-[0.15em] text-sm transition-all duration-300 ${logoTextColor} group-hover:tracking-[0.2em]`}>
          AS PUTRA
        </span>
      </Link>

      {/* Hamburger */}
      <div className="md:hidden cursor-pointer z-50" onClick={toggleMenu}>
        <span className={`block w-6 h-0.5 my-1.5 transition-all duration-300 ${hamburgerColor} ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`block w-6 h-0.5 my-1.5 transition-all duration-300 ${hamburgerColor} ${menuOpen ? 'opacity-0' : ''}`} />
        <span className={`block w-6 h-0.5 my-1.5 transition-all duration-300 ${hamburgerColor} ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
      </div>

      {/* Menu Links */}
      <ul className={`${menuOpen ? 'fixed left-0 top-[70px] w-full bg-white/95 backdrop-blur-md shadow-md flex flex-col items-center gap-0 py-8 border-b border-gray-200' : 'hidden md:flex md:items-center md:gap-8'} transition-all duration-500`}>
        <li className="my-4 md:my-0">
          <NavLink to="/" className={({ isActive }) => `text-sm uppercase tracking-wide font-medium transition-all duration-500 ${hoverColorClass} ${isActive ? 'text-[var(--color-utama)] border-b-2 border-[var(--color-utama)] pb-1' : textColorClass}`}>
            Beranda
          </NavLink>
        </li>
        <li className="my-4 md:my-0">
          <NavLink to="/about" className={({ isActive }) => `text-sm uppercase tracking-wide font-medium transition-all duration-500 ${hoverColorClass} ${isActive ? 'text-[var(--color-utama)] border-b-2 border-[var(--color-utama)] pb-1' : textColorClass}`}>
            Tentang Kami
          </NavLink>
        </li>
        <li className="my-4 md:my-0 relative group">
          <div className="flex items-center gap-1 cursor-pointer" onClick={toggleDropdown}>
            <NavLink to="/sector" className={({ isActive }) => `text-sm uppercase tracking-wide font-medium transition-all duration-500 ${hoverColorClass} ${isActive ? 'text-[var(--color-utama)] border-b-2 border-[var(--color-utama)] pb-1' : textColorClass}`}>
              Sektor Bisnis
            </NavLink>
            <span className={`${textColorClass} text-xs transition-transform duration-300 group-hover:rotate-180 md:inline-block hidden`}>▾</span>
            <span className={`${textColorClass} text-xs transition-transform duration-300 md:hidden inline-block ${dropdownOpen ? 'rotate-180' : ''}`}>▾</span>
          </div>
          <ul className={`${dropdownOpen && window.innerWidth <= 768 ? 'block relative bg-white shadow-md mt-2 rounded-lg' : 'hidden md:group-hover:block md:absolute md:top-full md:left-0 md:min-w-[220px] md:bg-white/95 md:backdrop-blur-md md:shadow-lg md:border md:border-gray-100 md:rounded-lg md:opacity-0 md:invisible md:group-hover:opacity-100 md:group-hover:visible md:transition-all md:duration-300 md:translate-y-2 md:group-hover:translate-y-0'}`}>
            <li><Link to="/sector" className="block px-6 py-2 text-sm text-gray-700 hover:text-[var(--color-utama)] hover:bg-gray-50 transition-all duration-300">Sektor Kami</Link></li>
            <li><Link to="/sector#peternakan" className="block px-6 py-2 text-sm text-gray-700 hover:text-[var(--color-utama)] hover:bg-gray-50 transition-all duration-300">Peternakan</Link></li>
            <li><Link to="/sector#hotel" className="block px-6 py-2 text-sm text-gray-700 hover:text-[var(--color-utama)] hover:bg-gray-50 transition-all duration-300">Hotel &amp; Resort</Link></li>
            <li><Link to="/sector#property" className="block px-6 py-2 text-sm text-gray-700 hover:text-[var(--color-utama)] hover:bg-gray-50 transition-all duration-300">Properti</Link></li>
            <li><Link to="/sector#retail" className="block px-6 py-2 text-sm text-gray-700 hover:text-[var(--color-utama)] hover:bg-gray-50 transition-all duration-300">Retail</Link></li>
            <li><Link to="/sector#ekspedisi" className="block px-6 py-2 text-sm text-gray-700 hover:text-[var(--color-utama)] hover:bg-gray-50 transition-all duration-300">Ekspedisi</Link></li>
          </ul>
        </li>
        <li className="my-4 md:my-0">
          <NavLink to="/news" className={({ isActive }) => `text-sm uppercase tracking-wide font-medium transition-all duration-500 ${hoverColorClass} ${isActive ? 'text-[var(--color-utama)] border-b-2 border-[var(--color-utama)] pb-1' : textColorClass}`}>
            Berita
          </NavLink>
        </li>
        <li className="my-4 md:my-0">
          <NavLink to="/career" className={({ isActive }) => `text-sm uppercase tracking-wide font-medium transition-all duration-500 ${hoverColorClass} ${isActive ? 'text-[var(--color-utama)] border-b-2 border-[var(--color-utama)] pb-1' : textColorClass}`}>
            Karir
          </NavLink>
        </li>
        <div className={`flex items-center justify-center gap-2 mt-4 pt-4 border-t transition-all duration-300 md:border-t-0 md:border-l md:border-gray-200 md:ml-5 md:pl-5 md:mt-0 md:pt-0 ${borderColorClass}`}>
          <button onClick={() => setLanguage('id')} className={`text-xs font-semibold px-1 transition-all duration-500 ${language === 'id' ? 'text-[var(--color-utama)] underline' : `${textTheme === 'dark' ? 'text-gray-600 hover:text-gray-900' : 'text-white/70 hover:text-white'}`}`}>ID</button>
          <span className={`transition-all duration-300 ${textTheme === 'dark' ? 'text-gray-300' : 'text-white/30'}`}>|</span>
          <button onClick={() => setLanguage('en')} className={`text-xs font-semibold px-1 transition-all duration-500 ${language === 'en' ? 'text-[var(--color-utama)] underline' : `${textTheme === 'dark' ? 'text-gray-600 hover:text-gray-900' : 'text-white/70 hover:text-white'}`}`}>EN</button>
        </div>
        
        {/* Button untuk mobile */}
        {menuOpen && (
          <div className="mt-6 w-full px-6">
            <Link to="/career" className="group relative inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-[var(--color-utama)] text-white font-medium tracking-wide rounded-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[var(--color-utama)]/30 hover:-translate-y-0.5">
              <span className="relative z-10 flex items-center gap-2">
                Hubungi Kami
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
          </div>
        )}
      </ul>

      {/* Button Desktop dengan Animasi */}
      <div className="hidden md:block">
        <Link ref={buttonRef} to="/career" className="group relative inline-flex items-center gap-2 px-6 py-2.5 bg-[var(--color-utama)] text-white font-medium tracking-wide rounded-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[var(--color-utama)]/30 hover:-translate-y-0.5">
          <span className="relative z-10 flex items-center gap-2">
            Hubungi Kami
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

