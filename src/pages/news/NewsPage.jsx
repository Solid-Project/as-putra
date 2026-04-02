// src/pages/NewsPage.jsx
import React, { useState } from 'react';
import HeroNews from '@/components/news/HeroNews';
import NewsControlPanel from '@/components/news/NewsControlPanel';
import NewsGrid from '@/components/news/NewsGrid';
import useFullpageSnap from '@/hooks/useFullpageSnap';

const NewsPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Fullpage snap with enabled config
  useFullpageSnap({ enabled: true });

  return (
    <main className="overflow-x-hidden">
      <HeroNews />
      <NewsControlPanel 
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <NewsGrid 
        activeFilter={activeFilter}
        searchQuery={searchQuery}
      />
    </main>
  );
};

export default NewsPage;