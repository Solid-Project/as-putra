// src/components/EventsTab.jsx
import React from 'react';

const eventsData = [
  {
    title: 'Annual Gathering 2025',
    desc: 'Momen kebersamaan seluruh keluarga besar AS PUTRA di Bali.',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'AS PUTRA Cup',
    desc: 'Turnamen futsal antar divisi untuk menjaga sportivitas dan kesehatan.',
    image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Outbound Leadership',
    desc: 'Melatih jiwa kepemimpinan melalui kegiatan alam terbuka.',
    image: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=600&q=80'
  }
];

const EventsTab = ({ activeTab }) => {
  if (activeTab !== 'events') return null;

  return (
    <section className="py-20 px-5 bg-white">
      <div className="text-center mb-12">
        <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-[var(--color-teks)] mb-4">Keseruan Kami</h2>
        <p className="text-[var(--color-teks-muted)]">Membangun kekeluargaan melalui event dan gathering seru.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
        {eventsData.map((item, idx) => (
          <div key={idx} className="group overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <img src={item.image} alt={item.title} className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="p-6">
              <h3 className="text-xl font-bold text-[var(--color-teks)] mb-3">{item.title}</h3>
              <p className="text-sm text-[var(--color-teks-muted)]">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EventsTab;