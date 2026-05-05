// src/pages/NewsPage.jsx
import React from 'react';
import HeroNews from '@/components/news/HeroNews';
import NewsSection from '@/components/news/NewsSection';
import useFullpageSnap from '@/hooks/useFullPageSnap';

const NewsPage = () => {
  // Fullpage snap dengan konfigurasi aktif
  const { activeIndex } = useFullpageSnap({ enabled: true });

  return (
    <main className="overflow-x-hidden">
      <HeroNews activeIndex={activeIndex}/>
      <NewsSection activeIndex={activeIndex}/>
    </main>
  );
};

export default NewsPage;