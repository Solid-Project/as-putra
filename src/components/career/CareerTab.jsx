import React from 'react';

const jobOpenings = [
  { title: 'Farm Manager (Kuningan)', requirement: 'Minimal S1 Peternakan • Pengalaman 5 Tahun', email: 'recruitment@asputra.com', subject: 'Lamar%20Farm%20Manager' },
  { title: 'Finance Staff (Cirebon)', requirement: 'D3/S1 Akuntansi • Fresh Graduate Welcome', email: 'recruitment@asputra.com', subject: 'Lamar%20Finance%20Staff' },
  { title: 'Hotel Front Office (Kuningan)', requirement: 'Min. SMK Perhotelan • Komunikatif', email: 'recruitment@asputra.com', subject: 'Lamar%20Front%20Office' }
];

const careerPath = [
  { title: '01. Entry Level / Staff', desc: 'Memulai karir, belajar budaya kerja, dan mengasah skill teknis.', position: 'left' },
  { title: '02. Supervisor', desc: 'Memimpin tim kecil dan bertanggung jawab atas operasional harian.', position: 'right' },
  { title: '03. Managerial', desc: 'Mengelola departemen/divisi dan mengambil keputusan strategis.', position: 'left' },
  { title: '04. Executive / GM', desc: 'Menentukan arah bisnis perusahaan dan pengembangan jangka panjang.', position: 'right' }
];

const CareerTab = ({ activeTab }) => {
  if (activeTab !== 'careers') return null;

  return (
    <section className="py-20 px-5 bg-white">
      <div className="max-w-[1000px] mx-auto mb-16">
        <h3 className="text-center text-2xl md:text-3xl font-['Playfair_Display'] text-[var(--color-teks)] mb-10">
          Jenjang Karir yang Jelas
        </h3>
        <div className="relative max-w-[1000px] mx-auto">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-[var(--color-utama)] top-0 bottom-0 hidden md:block"></div>
          {careerPath.map((item, idx) => (
            <div 
              key={idx}
              className={`relative md:w-1/2 px-6 md:px-10 mb-8 ${
                item.position === 'left' ? 'md:left-0 md:text-right' : 'md:left-1/2 md:text-left'
              }`}
            >
              <div className={`hidden md:block absolute top-4 w-5 h-5 bg-white border-4 border-[var(--color-utama)] rounded-full z-10 ${
                item.position === 'left' ? 'right-[-10px]' : 'left-[-10px]'
              }`}></div>
              <div className="bg-[var(--color-bg-alt)] rounded-xl p-6 shadow-md">
                <span className="text-[var(--color-utama)] font-bold">{item.title}</span>
                <p className="text-[var(--color-teks-muted)] mt-2">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mb-12">
        <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-[var(--color-teks)] mb-4">Lowongan Kerja Terbaru</h2>
        <div className="w-16 h-0.5 bg-[var(--color-utama)] mx-auto"></div>
      </div>

      <div className="max-w-[900px] mx-auto space-y-4">
        {jobOpenings.map((job, idx) => (
          <div key={idx} className="flex flex-wrap justify-between items-center gap-4 p-6 bg-[var(--color-bg-alt)] rounded-xl border border-gray-100 shadow-sm">
            <div>
              <h4 className="text-xl font-bold text-[var(--color-teks)] mb-2">{job.title}</h4>
              <p className="text-sm text-[var(--color-teks-muted)]">{job.requirement}</p>
            </div>
            <a 
              href={`mailto:${job.email}?subject=${job.subject}`}
              className="px-5 py-2 bg-[var(--color-utama)] text-white font-semibold rounded-md text-sm transition-all hover:bg-[var(--color-utama-hover)] hover:-translate-y-0.5 hover:shadow-lg"
            >
              Lamar Sekarang
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CareerTab;

