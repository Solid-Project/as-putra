import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { target: 40, suffix: "+", label: "Tahun Pengalaman" },
  { target: 20, suffix: "", label: "Total Unit Usaha" },
  { target: 15000, suffix: "+", label: "Man Power" },
  { target: 200, suffix: "+", label: "CSR Partner" },
];

const Counter = ({ target, suffix, label, sectionRef }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef({ value: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(countRef.current, {
        value: target,
        duration: 2,
        ease: "power1.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
          immediateRender: false,
        },
        onUpdate: () => {
          setCount(Math.floor(countRef.current.value));
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [target, sectionRef]);

  return (
    <div className="text-center">
      <h3 className="text-4xl md:text-5xl text-[var(--color-utama)] font-bold transition-transform duration-300 hover:scale-105">
        {count}
        {suffix}
      </h3>
      <p className="text-[var(--color-teks-muted)] mt-2 font-medium">{label}</p>
    </div>
  );
};

const StatsSection = () => {
  const sectionRef = useRef(null);

  return (
    <section
      ref={sectionRef}
      className="py-12 md:py-16 bg-white px-[5%]"
      id="stats-section" data-title="Statistik Kami"
      data-theme="light"
    >
      <div className="flex flex-wrap justify-center gap-8 md:gap-12 w-full">
        {stats.map((stat, idx) => (
          <Counter
            key={idx}
            target={stat.target}
            suffix={stat.suffix}
            label={stat.label}
            sectionRef={sectionRef}
          />
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
