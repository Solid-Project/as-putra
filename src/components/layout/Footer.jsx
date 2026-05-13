import React from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo-teks-asli.png";

const Footer = () => {
  return (
    // Tambahkan class "section no-snap" di sini
    <footer className="footer-snap bg-white pt-12 pb-6 px-5 border-t border-gray-200">
      {/* ... sisa konten footer tetap sama ... */}
      <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr_1fr_1fr] gap-8 w-full px-[5%] mb-10 items-start">
        {/* LOGO */}
        <div>
          <img src={logo} alt="AS PUTRA" className="w-16 rounded-full" />
          <p className="text-[var(--color-teks-muted)] mt-4 max-w-[280px] leading-relaxed text-sm">
            Ekosistem bisnis terkemuka yang berlandaskan tata kelola terbaik dan
            inovasi berkelanjutan.
          </p>
        </div>

        {/* PERUSAHAAN */}
        <div>
          <h4 className="text-[var(--color-utama)] text-xs uppercase tracking-wider mb-4 font-semibold">
            Perusahaan
          </h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-[var(--color-utama)] transition">Tentang Kami</Link></li>
            <li><Link to="/career" className="hover:text-[var(--color-utama)] transition">Karir</Link></li>
            <li><Link to="/news" className="hover:text-[var(--color-utama)] transition">Berita & Media</Link></li>
          </ul>
        </div>

        {/* UNIT BISNIS */}
        <div>
          <h4 className="text-[var(--color-utama)] text-xs uppercase tracking-wider mb-4 font-semibold">
            Unit Bisnis
          </h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/sector" className="hover:text-[var(--color-utama)] transition">Peternakan & Farming</Link></li>
            <li><Link to="/sector" className="hover:text-[var(--color-utama)] transition">Hotel & Hospitality</Link></li>
            <li><Link to="/sector" className="hover:text-[var(--color-utama)] transition">Properti</Link></li>
          </ul>
        </div>

        {/* KONTAK */}
        <div>
          <h4 className="text-[var(--color-utama)] text-xs uppercase tracking-wider mb-4 font-semibold">
            Hubungi Kami
          </h4>
          <address className="not-italic text-[var(--color-teks-muted)] text-sm leading-relaxed">
            Jl. Raya Kuningan No. 123 <br />
            Jawa Barat, Indonesia <br />
            <br />
            <a href="tel:+6281234567890" className="hover:text-[var(--color-utama)] transition">+62 812 3456 7890</a>
          </address>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-3 border-t border-gray-100 pt-5 text-[var(--color-teks-muted)] text-xs max-w-[1200px] mx-auto">
        <p>&copy; 2026 AS PUTRA Group. All rights reserved.</p>
        <p className="opacity-80">Powered by Solid Project</p>
      </div>
    </footer>
  );
};

export default Footer;