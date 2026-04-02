// src/components/DevelopmentTab.jsx
import React from 'react';

const developmentData = [
  {
    icon: '🎓',
    title: 'Future Leaders Gen-5',
    desc: 'Program Management Trainee (MT) intensif 12 bulan untuk mencetak pemimpin masa depan dengan rotasi lintas sektor.'
  },
  {
    icon: '💼',
    title: 'Workshop Manajerial',
    desc: 'Pelatihan kepemimpinan rutin bagi level supervisor dan manajer untuk mempertajam skill pengambilan keputusan strategis.'
  },
  {
    icon: '🌐',
    title: 'Scholarship Program',
    desc: 'Kami mendukung karyawan berprestasi untuk melanjutkan studi S2 atau sertifikasi profesional.'
  }
];

const DevelopmentTab = ({ activeTab }) => {
  if (activeTab !== 'development') return null;

  return (
    <section className="py-20 px-5 bg-white">
      <div className="text-center mb-12">
        <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-[var(--color-teks)] mb-4">Tumbuh Bersama</h2>
        <p className="text-[var(--color-teks-muted)]">Investasi terbesar kami adalah sumber daya manusia.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
        {developmentData.map((item, idx) => (
          <div key={idx} className="text-center p-8 rounded-xl bg-[var(--color-bg-alt)] border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
            <div className="text-4xl mb-4">{item.icon}</div>
            <h3 className="text-xl font-bold text-[var(--color-teks)] mb-3">{item.title}</h3>
            <p className="text-sm text-[var(--color-teks-muted)]">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DevelopmentTab;