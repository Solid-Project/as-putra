// src/components/career/CareerSection.jsx (gabungan)
import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import EventsTab from '@/components/career/EventsTab';
import DevelopmentTab from '@/components/career/DevelopmentTab';
import CareersTab from '@/components/career/CareerTab';

gsap.registerPlugin(ScrollTrigger);

const CareerSection = () => {
  const [activeTab, setActiveTab] = useState('careers');
  const sectionRef = useRef(null);
  const buttonsRef = useRef([]);
  const contentRef = useRef(null);

  const tabs = [
    { key: 'events', label: 'Kegiatan Karyawan' },
    { key: 'development', label: 'People Development' },
    { key: 'careers', label: 'Pengembangan Karir & Loker' }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      gsap.from(buttonsRef.current, {
        y: 20,
        opacity: 0,
        stagger: 0.12,
        duration: 0.5,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          end: 'bottom 70%',
          toggleActions: 'play none none reverse',
          immediateRender: false,
          invalidateOnRefresh: true
        }
      });

      gsap.from(contentRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          end: 'bottom 70%',
          toggleActions: 'play none none reverse',
          immediateRender: false,
          invalidateOnRefresh: true
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="section py-16 px-5 bg-white"
      id="career-section"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Judul Section */}
        <div className="text-center mb-10">
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-[var(--color-teks)] mb-4">
            Karir di AS PUTRA
          </h2>
          <div className="w-16 h-0.5 bg-[var(--color-utama)] mx-auto mb-4"></div>
          <p className="text-[var(--color-teks-muted)] max-w-[600px] mx-auto">
            Temukan jalur pengembangan diri dan peluang karier bersama kami
          </p>
        </div>

        {/* Navigasi Tab */}
        <div className="max-w-[800px] mx-auto mb-10">
          <div className="bg-[var(--color-bg-alt)] p-4 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex flex-wrap justify-center gap-3">
              {tabs.map((tab, idx) => (
                <button
                  key={tab.key}
                  ref={el => buttonsRef.current[idx] = el}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeTab === tab.key
                      ? 'bg-[var(--color-utama)] text-white shadow-md'
                      : 'bg-white border border-gray-300 text-[var(--color-teks-muted)] hover:border-[var(--color-utama)] hover:text-[var(--color-utama)] hover:-translate-y-0.5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Konten Tab - Kirim activeTab */}
        <div ref={contentRef}>
          <EventsTab activeTab={activeTab} />
          <DevelopmentTab activeTab={activeTab} />
          <CareersTab activeTab={activeTab} />
        </div>
      </div>
    </section>
  );
};

export default CareerSection;