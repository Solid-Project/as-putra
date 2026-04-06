import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const NineLayout = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // --- 1. LIVE PARALLAX JUDUL (Meluncur Turun Pelan) ---
      gsap.fromTo(titleRef.current, 
        { y: -60 }, 
        { 
          y: 60, 
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        }
      );

      // --- 2. LIVE PARALLAX GAMBAR (Meluncur Naik Cepat) ---
      // Ini menciptakan efek "berpapasan" dengan judul di atasnya
      gsap.fromTo(imageRef.current, 
        { y: 120, scale: 1.05 }, 
        { 
          y: -120, 
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5
          }
        }
      );

      // --- 3. LIVE PARALLAX LIST (Sisi Kanan - Berjenjang) ---
      const listItems = listRef.current.querySelectorAll('.text-reveal');
      listItems.forEach((item, idx) => {
        gsap.fromTo(item, 
          { y: 40 * (idx + 1) }, 
          { 
            y: -40 * (idx + 1),
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2
            }
          }
        );
      });

      // --- 4. INITIAL REVEAL (Animasi Masuk Pertama Kali) ---
      gsap.fromTo(".text-reveal", 
        { opacity: 0, x: -20 },
        { 
          opacity: 1, x: 0, 
          duration: 1, 
          stagger: 0.1, 
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="section min-h-screen flex items-center py-24 bg-white relative overflow-hidden"
      id="nine-layout"
    >
      <div className="container mx-auto px-[6%] relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* SISI KIRI: JUDUL & VISUAL */}
          <div className="lg:col-span-7 relative">
            <div ref={titleRef} className="text-reveal relative z-0">
              <span className="text-[var(--color-utama)] font-black tracking-[0.4em] text-[10px] uppercase mb-6 block">
                Excellence Standard
              </span>
              <h2 className="font-['Playfair_Display'] text-6xl md:text-8xl text-slate-900 font-bold leading-[0.9] mb-12 tracking-tighter">
                Pilar Keunggulan <br/> Sektor Kami.
              </h2>
            </div>
            
            <div 
              ref={imageRef}
              className="relative w-full aspect-video rounded-sm overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] z-10"
            >
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200" 
                alt="Professional Team AS Putra" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-slate-900/5 mix-blend-multiply"></div>
            </div>
          </div>

          {/* SISI KANAN: LIST DESKRIPSI */}
          <div ref={listRef} className="lg:col-span-5 space-y-10 lg:mt-32">
            
            <div className="text-reveal flex gap-6 group">
              <span className="text-2xl font-black text-slate-200 group-hover:text-[var(--color-utama)] transition-colors duration-500 font-['Playfair_Display']">01</span>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">Integritas Operasional</h3>
                <p className="text-slate-500 leading-relaxed font-light text-sm border-l border-slate-100 pl-6 group-hover:border-[var(--color-utama)] transition-all">
                  Setiap langkah bisnis diawasi dengan standar audit internal yang ketat guna menjamin kejujuran dalam setiap transaksi.
                </p>
              </div>
            </div>

            <div className="text-reveal flex gap-6 group border-t border-slate-50 pt-10">
              <span className="text-2xl font-black text-slate-200 group-hover:text-[var(--color-utama)] transition-colors duration-500 font-['Playfair_Display']">02</span>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">Digitalisasi Sektor</h3>
                <p className="text-slate-500 leading-relaxed font-light text-sm border-l border-slate-100 pl-6 group-hover:border-[var(--color-utama)] transition-all">
                  Transformasi data real-time untuk mempercepat pengambilan keputusan strategis di seluruh unit bisnis AS Putra.
                </p>
              </div>
            </div>

            <div className="text-reveal flex gap-6 group border-t border-slate-50 pt-10">
              <span className="text-2xl font-black text-slate-200 group-hover:text-[var(--color-utama)] transition-colors duration-500 font-['Playfair_Display']">03</span>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">Kemandirian Ekonomi</h3>
                <p className="text-slate-500 leading-relaxed font-light text-sm border-l border-slate-100 pl-6 group-hover:border-[var(--color-utama)] transition-all">
                  Membangun ekosistem yang mandiri dari pakan hingga ritel untuk memperkuat ketahanan pangan nasional.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default NineLayout;