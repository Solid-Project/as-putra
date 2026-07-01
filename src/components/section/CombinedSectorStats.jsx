import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSectionAnimation } from "@/hooks/useSectionAnimation";
import OptimizedImage from "@/components/ui/OptimizedImage";
import logoIcon from "@/assets/logo.jpg";

gsap.registerPlugin(ScrollTrigger);

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const Counter = ({ target, suffix, label, sectionRef }) => {
  const countRef = useRef({ value: 0 });
  const [count, setCount] = React.useState(0);

  useSectionAnimation(sectionRef, () => {
    if (!target) return;
    gsap.to(countRef.current, {
      value: target, duration: 2, ease: "power2.out", force3D: true,
      scrollTrigger: { trigger: sectionRef.current, start: "top 90%", toggleActions: "play none none none" },
      onUpdate: () => { setCount(Math.floor(countRef.current.value)); },
    });
  }, [target]);

  return (
    <div className="flex flex-col items-center group py-4">
      <h3 className="text-2xl md:text-3xl text-[#FFC700] font-bold">
        {count.toLocaleString("id-ID")}
        <span className="text-white/40 ml-1 font-light text-lg">{suffix}</span>
      </h3>
      <p className="text-blue-100/60 uppercase tracking-[0.2em] text-[9px] mt-2">{label}</p>
    </div>
  );
};

const CombinedSectorStats = ({ data, index }) => {
  const sectionRef = useRef(null);
  const sectors = data?.sectors?.layout_data || [];
  const stats = data?.stats?.layout_data || [];

  return (
    <section ref={sectionRef} className="h-screen w-full flex flex-col bg-[#0F1A3E] relative snap-start" id={`section-${index}`}>
      {/* Sector Strip - Mengambil 70% tinggi */}
      <div className="h-[70%] flex overflow-hidden">
        {sectors.map((item, idx) => (
          <div key={idx} className="relative flex-1 flex flex-col justify-center items-center text-white border-r border-white/10 last:border-none p-6">
            <div className="absolute inset-0 bg-[#0F1A3E] z-0">
               <OptimizedImage src={`${BASE_URL}/storage/${item.image}`} className="w-full h-full object-cover opacity-30" />
               <div className="absolute inset-0 bg-black/40" />
            </div>
            <div className="relative z-10 text-center">
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-xs opacity-80">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Strip - Mengambil 30% tinggi */}
      <div className="h-[30%] bg-[#0F1A3E] border-t border-white/10 flex items-center justify-center">
        <div className="w-full max-w-[1100px] mx-auto flex flex-wrap items-center justify-around">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex-1">
              <Counter target={parseInt(stat.angkaTarget)} suffix={stat.akhiran} label={stat.description} sectionRef={sectionRef} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CombinedSectorStats;
