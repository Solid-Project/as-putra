import React from 'react';
import { Link } from 'react-router-dom';
import logo from '@/assets/logo-new.jpg';

const Footer = () => {
  return (
    <footer className="panel bg-white pt-20 pb-8 px-5 border-t border-gray-200">
      <div className="grid md:grid-cols-4 gap-8 max-w-[1200px] mx-auto text-left mb-16">
        <div>
          <img src={logo} alt="AS PUTRA" className="w-16 rounded-full" />
          <p className="text-[var(--color-teks-muted)] mt-6 max-w-[300px]">
            Ekosistem bisnis terkemuka yang berlandaskan tata kelola terbaik dan inovasi berkelanjutan.
          </p>
        </div>
        <div>
          <h4 className="text-[var(--color-utama)] text-xs uppercase tracking-wider mb-6">Perusahaan</h4>
          <ul className="space-y-3">
            <li><Link to="/about" className="text-[var(--color-teks-muted)] hover:text-[var(--color-utama)] transition-colors">Tentang Kami</Link></li>
            <li><Link to="/career" className="text-[var(--color-teks-muted)] hover:text-[var(--color-utama)] transition-colors">Karir</Link></li>
            <li><Link to="/news" className="text-[var(--color-teks-muted)] hover:text-[var(--color-utama)] transition-colors">Berita & Media</Link></li>
            <li><Link to="#" className="text-[var(--color-teks-muted)] hover:text-[var(--color-utama)] transition-colors">Hubungan Investor</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-[var(--color-utama)] text-xs uppercase tracking-wider mb-6">Unit Bisnis</h4>
          <ul className="space-y-3">
            <li><Link to="/sector" className="text-[var(--color-teks-muted)] hover:text-[var(--color-utama)] transition-colors">Peternakan & Farming</Link></li>
            <li><Link to="/sector" className="text-[var(--color-teks-muted)] hover:text-[var(--color-utama)] transition-colors">Hotel & Hospitality</Link></li>
            <li><Link to="/sector" className="text-[var(--color-teks-muted)] hover:text-[var(--color-utama)] transition-colors">Properti</Link></li>
            <li><Link to="/sector" className="text-[var(--color-teks-muted)] hover:text-[var(--color-utama)] transition-colors">Retail & Lifestyle</Link></li>
            <li><Link to="/sector" className="text-[var(--color-teks-muted)] hover:text-[var(--color-utama)] transition-colors">Logistik</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-[var(--color-utama)] text-xs uppercase tracking-wider mb-6">Hubungi Kami</h4>
          <address className="not-italic text-[var(--color-teks-muted)] text-sm">
            Jl. Raya Kuningan No. 123<br />Jawa Barat, Indonesia<br /><br />
            <a href="tel:+6281234567890" className="hover:text-[var(--color-utama)]">+62 812 3456 7890</a><br />
            <a href="mailto:contact@asputra.com" className="hover:text-[var(--color-utama)]">contact@asputra.com</a>
          </address>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-gray-100 pt-6 text-[var(--color-teks-muted)] text-xs max-w-[1200px] mx-auto">
        <p>&copy; 2026 AS PUTRA Group. All rights reserved.</p>
        <p>Powered by Lain Kali Project</p>
      </div>
    </footer>
  );
};

export default Footer;