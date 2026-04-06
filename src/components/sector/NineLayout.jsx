import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const NineLayout = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animasi Gambar masuk dari bawah
      gsap.fromTo(imageRef.current, 
        { y: 100, opacity: 0 },
        { 
          y: 0, opacity: 1, duration: 1.2, ease: "power4.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" }
        }
      );

      // Animasi Text Stagger
      gsap.fromTo(".text-reveal", 
        { y: 30, opacity: 0 },
        { 
          y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="section min-h-screen flex items-center py-24 bg-white relative"
      id="nine-layout"
    >
      <div className="container mx-auto px-[6%]">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* SISI KIRI: JUDUL BESAR & VISUAL (7 KOLOM) */}
          <div className="lg:col-span-7 relative">
            <div className="text-reveal">
              <span className="text-[var(--color-utama)] font-black tracking-[0.4em] text-[10px] uppercase mb-6 block">
                Excellence Standard
              </span>
              <h2 className="font-['Playfair_Display'] text-6xl md:text-8xl text-slate-900 font-bold leading-[0.9] mb-12">
                Pilar Keunggulan <br/> Sektor Kami.
              </h2>
            </div>
            
            {/* Image Box yang menjorok keluar sedikit untuk memutus monoton */}
            <div 
              ref={imageRef}
              className="relative w-full aspect-video rounded-sm overflow-hidden shadow-2xl z-10"
            >
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200" 
                alt="Professional Team" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-slate-900/10 mix-blend-multiply"></div>
            </div>
          </div>

          {/* SISI KANAN: LIST DESKRIPSI YANG RAPI (5 KOLOM) */}
          <div className="lg:col-span-5 space-y-12 lg:mt-20">
            
            <div className="text-reveal flex gap-6 group">
              <span className="text-2xl font-bold text-slate-200 group-hover:text-[var(--color-utama)] transition-colors">01</span>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">Integritas Operasional</h3>
                <p className="text-slate-500 leading-relaxed font-light">
                  Setiap langkah bisnis diawasi dengan standar audit internal yang ketat guna menjamin kejujuran dalam setiap transaksi.
                </p>
              </div>
            </div>

            <div className="text-reveal flex gap-6 group border-t border-slate-100 pt-10">
              <span className="text-2xl font-bold text-slate-200 group-hover:text-[var(--color-utama)] transition-colors">02</span>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">Digitalisasi Sektor</h3>
                <p className="text-slate-500 leading-relaxed font-light">
                  Transformasi data real-time untuk mempercepat pengambilan keputusan strategis di seluruh unit bisnis AS Putra.
                </p>
              </div>
            </div>

            <div className="text-reveal flex gap-6 group border-t border-slate-100 pt-10">
              <span className="text-2xl font-bold text-slate-200 group-hover:text-[var(--color-utama)] transition-colors">03</span>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">Kemandirian Ekonomi</h3>
                <p className="text-slate-500 leading-relaxed font-light">
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