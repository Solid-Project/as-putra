import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EightLayout = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const cardRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animasi Image Utama (Scale & Fade)
      gsap.fromTo(imageRef.current, 
        { scale: 1.2, opacity: 0 }, 
        { 
          scale: 1, 
          opacity: 1, 
          duration: 1.5, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          }
        }
      );

      // Animasi Floating Card (Muncul dari bawah)
      gsap.fromTo(cardRef.current, 
        { y: 100, opacity: 0 }, 
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.2, 
          delay: 0.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          }
        }
      );

      // Animasi Grid Statistik
      gsap.fromTo(statsRef.current.children, 
        { opacity: 0, y: 20 }, 
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.2, 
          duration: 0.8,
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="section min-h-screen bg-[#f4f4f4] flex items-center py-24 relative overflow-hidden"
      id="eight-layout"
    >
      {/* Background Decoration - Garis Halus */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute left-[6%] h-full w-[1px] bg-slate-900"></div>
        <div className="absolute right-[6%] h-full w-[1px] bg-slate-900"></div>
      </div>

      <div className="container mx-auto px-[6%] relative z-10">
        <div className="grid lg:grid-cols-12 gap-0 items-start">
          
          {/* KOLOM KIRI: IMAGE BESAR (6 Kolom) */}
          <div className="lg:col-span-7 relative group">
            <div className="overflow-hidden rounded-sm shadow-2xl aspect-[4/5] lg:aspect-[16/10]">
              <img 
                ref={imageRef}
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200" 
                alt="Corporate" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Label Melayang di Gambar */}
            <div className="absolute -bottom-6 -left-6 bg-[var(--color-utama)] text-white p-8 hidden md:block shadow-xl">
               <p className="text-xs font-bold tracking-[0.3em] uppercase mb-2 opacity-80">Established Since</p>
               <h4 className="text-4xl font-black font-['Playfair_Display']">1988</h4>
            </div>
          </div>

          {/* KOLOM KANAN: CONTENT & GRID (5 Kolom + Offset 1) */}
          <div className="lg:col-span-5 lg:-ml-20 mt-12 lg:mt-32 z-20">
            <div 
              ref={cardRef}
              className="bg-white p-10 md:p-16 shadow-2xl border-t-4 border-[var(--color-utama)]"
            >
              <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl text-slate-900 font-bold mb-8 leading-tight">
                Visi Strategis & <br/> Eksekusi Presisi
              </h2>
              <p className="text-slate-600 leading-relaxed mb-12 text-lg font-light">
                Kami tidak hanya membangun bisnis, kami membangun kepercayaan melalui integrasi teknologi dan sumber daya manusia yang berintegritas tinggi.
              </p>

              {/* Mini Stats Grid di dalam Card */}
              <div ref={statsRef} className="grid grid-cols-2 gap-8 border-t border-slate-100 pt-10">
                <div>
                  <h5 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Projects</h5>
                  <p className="text-3xl font-bold text-slate-900 italic font-['Playfair_Display']">250+</p>
                </div>
                <div>
                  <h5 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Awards</h5>
                  <p className="text-3xl font-bold text-slate-900 italic font-['Playfair_Display']">12</p>
                </div>
                <div>
                  <h5 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Reliability</h5>
                  <p className="text-3xl font-bold text-slate-900 italic font-['Playfair_Display']">99%</p>
                </div>
                <div>
                  <h5 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Partners</h5>
                  <p className="text-3xl font-bold text-slate-900 italic font-['Playfair_Display']">45</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default EightLayout;