import React, { useEffect, useRef, useState } from "react";

// Counter component
const Counter = ({ target, suffix, label, shouldAnimate }) => {
  const [count, setCount] = useState(0);
  const animationRef = useRef(null);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (!shouldAnimate) {
      hasStartedRef.current = false;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      requestAnimationFrame(() => setCount(0));
      return;
    }

    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    let startTime = null;
    const duration = 2000;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(target * easeOut);
      setCount(value);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [shouldAnimate, target]);

  return (
    <div className="text-center">
      <h3 style={{ color: "var(--color-utama)", fontSize: "clamp(1.8rem, 5vw, 3rem)" }}>
        {count.toLocaleString()}{suffix}
      </h3>
      <p style={{ color: "var(--color-teks-muted)", fontSize: "clamp(0.6rem, 1.5vw, 0.75rem)" }}>
        {label}
      </p>
    </div>
  );
};

const AboutSummary = ({ activeIndex, data }) => {
  const sectionRef = useRef(null);
  const SECTION_INDEX = 2;

  // Filter data berdasarkan section_name
  const budayaData = data?.find(item => item.section_name === "Budaya Perusahaan");
  const statsData = data?.find(item => item.section_name === "StatsSection");

  // Ambil data budaya
  const title = budayaData?.title || "";
  const description = budayaData?.description || "";
  const cards = budayaData?.layout_data || [];

  // Ambil data stats
  const stats = statsData?.layout_data || [];

  const isActive = activeIndex === SECTION_INDEX;

  return (
    <section
      ref={sectionRef}
      className="section relative flex flex-col justify-center overflow-hidden"
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--color-bg-light)",
        paddingTop: "clamp(2rem, 5vh, 3.5rem)",
        paddingBottom: "clamp(2rem, 5vh, 3.5rem)",
        paddingLeft: "clamp(1rem, 4vw, 5%)",
        paddingRight: "clamp(1rem, 4vw, 5%)",
      }}
    >
      {/* Decorative Shapes */}
      <div className="absolute pointer-events-none" style={{ top: "-5%", left: "-3%", width: "clamp(200px, 35vw, 450px)", height: "clamp(200px, 35vw, 450px)", borderRadius: "50%", backgroundColor: "var(--color-utama)", opacity: 0.04, zIndex: 0 }} />
      <div className="absolute pointer-events-none" style={{ bottom: "-5%", right: "-3%", width: "clamp(180px, 30vw, 400px)", height: "clamp(180px, 30vw, 400px)", borderRadius: "50%", backgroundColor: "var(--color-aksen)", opacity: 0.05, zIndex: 0 }} />
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.02, zIndex: 0, backgroundImage: `repeating-linear-gradient(45deg, var(--color-utama) 0px, var(--color-utama) 1px, transparent 1px, transparent 20px)` }} />
      <div className="absolute pointer-events-none hidden lg:block" style={{ top: "15%", right: "8%", width: "clamp(60px, 12vw, 120px)", height: "clamp(60px, 12vw, 120px)", border: "2px solid var(--color-utama)", opacity: 0.08, transform: "rotate(15deg)", zIndex: 0 }} />
      <div className="absolute pointer-events-none hidden lg:block" style={{ bottom: "12%", left: "6%", width: "clamp(50px, 10vw, 100px)", height: "clamp(50px, 10vw, 100px)", border: "2px solid var(--color-aksen)", opacity: 0.1, transform: "rotate(25deg)", zIndex: 0 }} />

      <div className="mx-auto w-full flex flex-col h-full relative" style={{ maxWidth: "clamp(300px, 100%, 1200px)", zIndex: 1 }}>
        
        {/* Header */}
        <div
          className="text-center"
          style={{
            transform: isActive ? "translateY(0)" : "translateY(30px)",
            opacity: isActive ? 1 : 0,
            transition: "transform 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1), opacity 0.6s ease",
            marginBottom: "clamp(1.5rem, 4vh, 2.5rem)",
          }}
        >
          <h2 className="font-['Playfair_Display']" style={{ color: "var(--color-teks)", fontSize: "clamp(1.8rem, 5vw, 2.5rem)", marginBottom: "clamp(0.5rem, 1.5vh, 0.75rem)" }}>
            {title}
          </h2>
          <div style={{ backgroundColor: "var(--color-utama)", height: "clamp(1.5px, 0.3vw, 2.5px)", width: "clamp(40px, 10vw, 60px)", margin: "0 auto clamp(0.75rem, 2vh, 1rem)" }} />
          <p className="mx-auto leading-relaxed" style={{ color: "var(--color-teks-muted)", fontSize: "clamp(0.8rem, 2vw, 1rem)", maxWidth: "clamp(280px, 90%, 700px)" }}>
            {description}
          </p>
        </div>

        {/* Cards */}
        {cards.length > 0 && (
          <div className="grid md:grid-cols-3" style={{ gap: "clamp(1rem, 2.5vw, 1.5rem)", marginBottom: "clamp(1.5rem, 4vh, 2.5rem)" }}>
            {cards.map((item, idx) => (
              <div
                key={item.id || idx}
                className="flex flex-col text-center border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                style={{
                  transform: isActive ? "translateY(0)" : "translateY(30px)",
                  opacity: isActive ? 1 : 0,
                  transition: `transform 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1), opacity 0.6s ease`,
                  transitionDelay: isActive ? `${idx * 100}ms` : "0ms",
                  backgroundColor: "var(--color-bg-light)",
                  borderColor: "rgba(0,0,0,0.05)",
                  borderRadius: "clamp(12px, 2.5vw, 16px)",
                  padding: "clamp(1.25rem, 3.5vw, 2rem)",
                }}
              >
                <div style={{ color: "var(--color-utama)", fontSize: "clamp(1.8rem, 4.5vw, 2.5rem)", marginBottom: "clamp(0.75rem, 2vh, 1rem)" }}>
                  {item.simbol}
                </div>
                <h3 className="font-bold" style={{ color: "var(--color-teks)", fontSize: "clamp(1.1rem, 2.5vw, 1.25rem)", marginBottom: "clamp(0.5rem, 1.5vh, 0.75rem)" }}>
                  {item.title}
                </h3>
                <p className="leading-relaxed flex-grow" style={{ color: "var(--color-teks-muted)", fontSize: "clamp(0.75rem, 1.8vw, 0.875rem)" }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Stats Section */}
        {stats.length > 0 && (
          <div
            style={{
              transform: isActive ? "translateY(0)" : "translateY(30px)",
              opacity: isActive ? 1 : 0,
              transition: "transform 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1), opacity 0.6s ease",
              transitionDelay: "300ms",
              borderTopWidth: "clamp(1px, 0.2vw, 1.5px)",
              borderTopStyle: "solid",
              borderTopColor: "rgba(0,0,0,0.05)",
              paddingTop: "clamp(1.5rem, 4vh, 2.5rem)",
            }}
          >
            <div className="flex flex-wrap justify-center items-center" style={{ gap: "clamp(1.5rem, 5vw, 3rem)" }}>
              {stats.map((stat, idx) => (
                <Counter
                  key={stat.item_id || idx}
                  target={stat.angkaTarget}
                  suffix={stat.akhiran || ""}
                  label={stat.description}
                  shouldAnimate={isActive}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AboutSummary;