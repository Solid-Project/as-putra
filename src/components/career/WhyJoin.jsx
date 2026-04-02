// src/components/WhyJoin.jsx
import React from 'react';

const whyJoinData = [
  { title: 'Pertumbuhan', desc: 'Peluang untuk pengembangan profesional dan kemajuan karir.' },
  { title: 'Budaya', desc: 'Lingkungan kolaboratif dan inklusif di mana setiap suara dihargai.' },
  { title: 'Dampak', desc: 'Bekerja pada proyek-proyek yang membuat perbedaan nyata di dunia.' }
];

const WhyJoin = () => {
  return (
    <section className="py-20 px-5 bg-[var(--color-bg-alt)]">
      <div className="text-center mb-12">
        <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-[var(--color-teks)] mb-4">Mengapa AS PUTRA?</h2>
        <div className="w-16 h-0.5 bg-[var(--color-utama)] mx-auto"></div>
      </div>
      <div className="grid md:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
        {whyJoinData.map((item, idx) => (
          <div key={idx} className="text-center p-6">
            <h4 className="text-2xl font-bold text-[var(--color-utama)] mb-3">{item.title}</h4>
            <p className="text-[var(--color-teks-muted)]">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyJoin;