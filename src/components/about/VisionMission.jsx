// src/components/about/VisionMission.jsx
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VisionMission = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 🔥 ANIMASI CARD UTAMA - DIPERBAIKI
      gsap.fromTo(cardsRef.current,
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',              // DARI "top 80%" JADI "top 85%"
            end: 'bottom 70%',             // TAMBAHKAN end
            toggleActions: 'play none none reverse', // DARI "play reverse play reverse"
            immediateRender: false,
            invalidateOnRefresh: true
          }
        }
      );

      // 🔥 ANIMASI ELEMEN DALAM CARD - DIPERBAIKI
      cardsRef.current.forEach(card => {
        const title = card.querySelector('h3');
        const label = card.querySelector('span');
        const listItems = card.querySelectorAll('li');

        if (title) {
          gsap.from(title, {
            y: 20,
            opacity: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',            // DARI "top 90%" JADI "top 85%"
              end: 'bottom 70%',           // TAMBAHKAN end
              toggleActions: 'play none none reverse',
              immediateRender: false,
              invalidateOnRefresh: true
            }
          });
        }

        if (label) {
          gsap.from(label, {
            y: -10,
            opacity: 0,
            duration: 0.6,
            delay: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'bottom 70%',
              toggleActions: 'play none none reverse',
              immediateRender: false,
              invalidateOnRefresh: true
            }
          });
        }

        if (listItems.length > 0) {
          gsap.from(listItems, {
            y: 20,
            opacity: 0,
            stagger: 0.1,
            duration: 0.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'bottom 70%',
              toggleActions: 'play none none reverse',
              immediateRender: false,
              invalidateOnRefresh: true
            }
          });
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="section no-snap py-20 px-5 bg-white"
      id="vision-mission"
    >
      <div className="text-center mb-12">
        <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-[var(--color-teks)] mb-4">
          Visi & Misi
        </h2>
        <div className="w-16 h-0.5 bg-[var(--color-utama)] mx-auto"></div>
        <p className="text-[var(--color-teks-muted)] mt-4 max-w-[600px] mx-auto">
          Arahan strategis yang menjadi fondasi perjalanan AS PUTRA Group
        </p>
      </div>

      <div className="max-w-[900px] mx-auto flex flex-col gap-8">
        {/* Vision Card */}
        <div
          ref={el => cardsRef.current[0] = el}
          className="relative bg-[var(--color-bg-alt)] border border-gray-100 rounded-2xl p-8 md:p-12 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer"
        >
          <span className="absolute -top-3 left-8 bg-[var(--color-utama)] text-white text-xs font-bold tracking-wider uppercase px-4 py-1.5 rounded-full shadow-md">
            Vision
          </span>
          <h3 className="text-2xl md:text-3xl text-[var(--color-teks)] mb-5 font-['Playfair_Display']">
            Our Vision
          </h3>
          <p className="text-[var(--color-teks-muted)] leading-relaxed text-base md:text-lg">
            Menjadi ekosistem bisnis terkemuka yang berlandaskan tata kelola terbaik dan inovasi berkelanjutan, untuk menghadirkan kemajuan yang berarti bagi Pelanggan, Mitra, Karyawan, Masyarakat, dan Alam.
          </p>
        </div>

        {/* Mission Card */}
        <div
          ref={el => cardsRef.current[1] = el}
          className="relative bg-[var(--color-bg-alt)] border border-gray-100 rounded-2xl p-8 md:p-12 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer"
        >
          <span className="absolute -top-3 left-8 bg-[var(--color-utama)] text-white text-xs font-bold tracking-wider uppercase px-4 py-1.5 rounded-full shadow-md">
            Mission
          </span>
          <h3 className="text-2xl md:text-3xl text-[var(--color-teks)] mb-5 font-['Playfair_Display']">
            Misi Kami
          </h3>
          <ul className="space-y-4">
            <li className="pb-4 border-b border-gray-100 last:border-0">
              <strong className="block text-[var(--color-utama)] mb-1">Saling Terintegrasi</strong>
              <span className="text-[var(--color-teks-muted)] text-sm">Menyatukan beragam keunggulan untuk hasil terbaik.</span>
            </li>
            <li className="pb-4 border-b border-gray-100 last:border-0">
              <strong className="block text-[var(--color-utama)] mb-1">Adaptif & Inovatif</strong>
              <span className="text-[var(--color-teks-muted)] text-sm">Mengadopsi inovasi untuk kemajuan berkelanjutan.</span>
            </li>
            <li className="pb-4 border-b border-gray-100 last:border-0">
              <strong className="block text-[var(--color-utama)] mb-1">Bermitra & Terpercaya</strong>
              <span className="text-[var(--color-teks-muted)] text-sm">Membangun kesuksesan kolaboratif melalui keandalan.</span>
            </li>
            <li className="pb-4 border-b border-gray-100 last:border-0">
              <strong className="block text-[var(--color-utama)] mb-1">Komitmen Bermakna</strong>
              <span className="text-[var(--color-teks-muted)] text-sm">Pertumbuhan yang berdampak dan bertanggung jawab.</span>
            </li>
            <li className="pb-4 border-b border-gray-100 last:border-0">
              <strong className="block text-[var(--color-utama)] mb-1">Berkelanjutan</strong>
              <span className="text-[var(--color-teks-muted)] text-sm">Bermanfaat bagi lingkungan dan masyarakat.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;