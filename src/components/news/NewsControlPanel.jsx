// src/components/news/NewsControlPanel.jsx
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const NewsControlPanel = ({ activeFilter, setActiveFilter, searchQuery, setSearchQuery }) => {
  const sectionRef = useRef(null);
  const filtersRef = useRef([]);
  const searchRef = useRef(null);

  const filters = [
    { key: 'all', label: 'Semua' },
    { key: 'event', label: 'Acara' },
    { key: 'achievement', label: 'Prestasi' },
    { key: 'csr', label: 'CSR' }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // Animasi filter buttons
      gsap.fromTo(filtersRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.5,
          ease: "back.out(0.8)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "bottom 70%",
            toggleActions: "play none none reverse",
            immediateRender: false,
            invalidateOnRefresh: true
          }
        }
      );

      // Animasi search bar
      gsap.fromTo(searchRef.current,
        { y: 30, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          delay: 0.2,
          ease: "back.out(0.8)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "bottom 70%",
            toggleActions: "play none none reverse",
            immediateRender: false,
            invalidateOnRefresh: true
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="section py-12 px-5 bg-white"
      id="news-control"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {filters.map((filter, idx) => (
            <button
              key={filter.key}
              ref={el => filtersRef.current[idx] = el}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === filter.key
                  ? 'bg-[var(--color-utama)] text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:-translate-y-0.5'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div ref={searchRef} className="max-w-md mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari berita..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-5 py-3 pl-12 border border-gray-200 rounded-full focus:outline-none focus:border-[var(--color-utama)] focus:ring-1 focus:ring-[var(--color-utama)] transition-all duration-300"
            />
            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsControlPanel;