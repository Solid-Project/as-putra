// src/pages/NewsPage.jsx
import React from 'react';
import HeroNews from '@/components/news/HeroNews';
import NewsSection from '@/components/news/NewsSection';
import useFullpageSnap from '@/hooks/useFullPageSnap';

const NewsPage = () => {
  // Fullpage snap dengan konfigurasi aktif
  useFullpageSnap({ enabled: true });

  return (
    <main className="overflow-x-hidden">
      <HeroNews />
      <NewsSection />
    </main>
  );
};

export default NewsPage;