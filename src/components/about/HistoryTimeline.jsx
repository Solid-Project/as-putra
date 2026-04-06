// src/components/about/HistoryTimeline.jsx
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const timelineData = [
  { year: '1984', title: 'Awal Mula', desc: 'Dimulainya proyek perintis oleh H. Dudung Dulajid. Dengan visi yang kuat, fondasi bisnis mulai diletakkan di Kuningan, berfokus pada pengembangan ekonomi pedesaan.', position: 'left' },
  { year: '1990', title: 'Fokus Peternakan', desc: 'Mulai merambah ke penyebaran dan memperluas sektor ayam ras petelur dan pedaging. Periode ini menandai pertumbuhan signifikan dalam kapasitas produksi dan kemitraan dengan peternak lokal.', position: 'right' },
  { year: '2000', title: 'Diversifikasi Bisnis', desc: 'Memasuki milenium baru, AS PUTRA mulai berekspansi ke sektor lain di luar agribisnis. Konstruksi dan infrastruktur mulai menjadi pilar baru pertumbuhan perusahaan.', position: 'left' },
  { year: '2010', title: 'Inovasi & Pelayanan', desc: 'Memperkuat divisi logistik dan transportasi (PT Andeff) serta mulai memasuki industri perhotelan untuk mendukung pariwisata daerah. Teknologi mulai diintegrasikan ke dalam operasional.', position: 'right' },
  { year: '2020', title: 'Visi Global & Berkelanjutan', desc: 'Di bawah kepemimpinan Aif Arifin Sidhik, grup bertransformasi menjadi konglomerasi modern. Fokus pada keberlanjutan, energi terbarukan, dan ekspansi pasar yang lebih luas.', position: 'left' }
];

const HistoryTimeline = () => {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 🔥 ANIMASI GARIS TIMELINE - DIPERBAIKI
      // Hapus scrub, ganti dengan toggleActions biasa
      gsap.fromTo(lineRef.current,
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 95%',        // DARI "top 80%" JADI "top 85%"
            end: 'bottom 70%',       // TAMBAHKAN end
            toggleActions: 'play none none reverse', // DARI scrub: true
            immediateRender: false,
            invalidateOnRefresh: true,
          }
        }
      );

      // 🔥 ANIMASI CARD - DIPERBAIKI
      cardsRef.current.forEach((card, i) => {
        const circle = card.querySelector('.timeline-circle');
        const content = card.querySelector('.timeline-content');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 95%',       // DARI "top 85%" TETAP
            end: 'bottom 70%',       // TAMBAHKAN end
            toggleActions: 'play none none reverse', // DARI "play reverse play reverse"
            immediateRender: false,
            invalidateOnRefresh: true
          }
        });

        // Bulatan pop
        tl.from(circle, {
          scale: 0,
          opacity: 0,
          duration: 0.5,
          ease: 'back.out(1.5)'
        })

        // Konten slide dari kiri/kanan
        .from(content, {
          x: card.dataset.position === 'left' ? -40 : 40,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out'
        }, '-=0.3');
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="section no-snap py-20 px-5 bg-white"
      id="history-timeline"
      data-title="Sejarah Perusahaan"
      data-bg="light"
    >
      <div className="text-center mb-12">
        <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-[var(--color-teks)] mb-4">
          Perjalanan Kami
        </h2>
        <div className="w-16 h-0.5 bg-[var(--color-utama)] mx-auto mb-4"></div>
        <p className="text-[var(--color-teks-muted)] max-w-[600px] mx-auto">
          Jejak langkah AS PUTRA dari masa ke masa.
        </p>
      </div>

      <div className="relative max-w-[1000px] mx-auto">
        {/* Garis tengah */}
        <div 
          ref={lineRef} 
          className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-[var(--color-utama)] top-0 bottom-0 hidden md:block"
          style={{ transformOrigin: 'top center' }}
        ></div>

        {timelineData.map((item, idx) => (
          <div 
            key={idx}
            data-position={item.position}
            ref={el => cardsRef.current[idx] = el}
            className={`relative md:w-1/2 px-6 md:px-10 mb-12 ${item.position === 'left' ? 'md:left-0 md:text-right' : 'md:left-1/2 md:text-left'}`}
          >
            {/* Bulatan */}
            <div className={`timeline-circle hidden md:block absolute top-4 w-5 h-5 bg-white border-4 border-[var(--color-utama)] rounded-full z-10 ${item.position === 'left' ? 'right-[-10px]' : 'left-[-10px]'}`}></div>
            
            {/* Konten */}
            <div className="timeline-content bg-[var(--color-bg-alt)] rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <span className="text-[var(--color-utama)] font-bold text-lg">{item.year}</span>
              <h3 className="text-xl font-bold text-[var(--color-teks)] mt-2 mb-3">{item.title}</h3>
              <p className="text-[var(--color-teks-muted)] text-sm leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HistoryTimeline;