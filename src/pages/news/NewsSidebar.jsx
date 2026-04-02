// src/components/NewsSidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const otherNews = [
  { id: 'csr-1', title: 'Pemberdayaan Peternak Mandiri', date: '24 Jan 2026', category: 'Program CSR' },
  { id: 'biz-1', title: 'Peresmian Pabrik Pakan Unit IV', date: '20 Des 2025', category: 'Pengembangan Usaha' },
  { id: 'comm-1', title: 'Kolaborasi Riset IPB', date: '10 Jan 2026', category: 'Community Activity' }
];

const NewsSidebar = ({ currentId }) => {
  const filteredNews = otherNews.filter(news => news.id !== currentId);

  return (
    <aside className="lg:sticky lg:top-[100px]">
      <h4 className="text-[var(--color-utama)] border-b border-[var(--color-utama)] pb-2 mb-4 font-semibold">
        Berita Lainnya
      </h4>
      <div className="space-y-4">
        {filteredNews.map((item) => (
          <Link 
            key={item.id}
            to={`/news/${item.id}`}
            className="block group"
          >
            <span className="text-xs text-[var(--color-teks-muted)]">{item.date}</span>
            <h5 className="text-base font-semibold text-[var(--color-teks)] group-hover:text-[var(--color-utama)] transition mt-1">
              {item.title}
            </h5>
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <Link 
          to="/news" 
          className="block w-full text-center px-4 py-3 bg-[var(--color-utama)] text-white rounded-md hover:bg-[var(--color-utama-hover)] transition"
        >
          Lihat Semua Berita
        </Link>
      </div>
    </aside>
  );
};

export default NewsSidebar;