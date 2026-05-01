import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { target: 40, suffix: "+", label: "Tahun Pengalaman" },
  { target: 20, suffix: "", label: "Total Unit Usaha" },
  { target: 15000, suffix: "+", label: "Man Power" },
  { target: 200, suffix: "+", label: "CSR Partner" },
];

const cards = [
  {
    icon: "✦",
    title: "Integritas",
    desc: "Kami menjunjung tinggi kejujuran dan standar moral dalam setiap keputusan. Integritas adalah fondasi kepercayaan yang kami bangun bersama mitra dan seluruh pemangku kepentingan untuk menciptakan ekosistem bisnis yang transparan dan akuntabel.",
  },
  {
    icon: "★",
    title: "Keunggulan",
    desc: "Berkomitmen untuk melampaui ekspektasi melalui inovasi berkelanjutan dan dedikasi terhadap kualitas. Kami percaya bahwa kesempurnaan adalah proses, itulah sebabnya kami terus mengasah keahlian dan mengadopsi teknologi mutakhir.",
  },
  {
    icon: "♥",
    title: "Kolaborasi",
    desc: "Kekuatan kami terletak pada sinergi. Kami membina lingkungan kerja yang inklusif di mana setiap ide dihargai dan setiap individu diberdayakan. Melalui kerja sama lintas unit usaha, kami tumbuh bersama sebagai satu kesatuan.",
  },
];

// Sub-komponen Counter
const Counter = ({ target, suffix, label, parentRef }) => {
  const numberRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const obj = { value: 0 };
      gsap.to(obj, {
        value: target,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: parentRef.current,
          start: "top 85%",
          toggleActions: "play reverse play reverse", 
        },
        onUpdate: () => {
          if (numberRef.current) {
            numberRef.current.innerText = Math.floor(obj.value).toLocaleString();
          }
        },
      });
    });
    return () => ctx.revert();
  }, [target, parentRef]);

  return (
    <div className="text-center" style={{ paddingLeft: "clamp(0.5rem, 2vw, 1rem)", paddingRight: "clamp(0.5rem, 2vw, 1rem)" }}>
      <h3 
        className="font-bold"
        style={{ 
          color: "var(--color-utama)",
          fontSize: "clamp(1.8rem, 5vw, 3rem)",
          marginBottom: "clamp(0.15rem, 0.5vh, 0.25rem)",
        }}
      >
        <span ref={numberRef}>0</span>{suffix}
      </h3>
      <p 
        className="font-semibold uppercase tracking-widest"
        style={{ 
          color: "var(--color-teks-muted)",
          fontSize: "clamp(0.6rem, 1.5vw, 0.75rem)",
        }}
      >
        {label}
      </p>
    </div>
  );
};

const AboutSummary = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".reveal-content", 
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.1, 
          duration: 0.8, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section relative flex flex-col justify-center overflow-hidden"
      id="about-summary" 
      data-title="About Summary"
      style={{
        minHeight: "100vh",
        height: "auto",
        backgroundColor: "var(--color-bg-light)",
        paddingTop: "clamp(2rem, 5vh, 3.5rem)",
        paddingBottom: "clamp(2rem, 5vh, 3.5rem)",
        paddingLeft: "clamp(1rem, 4vw, 5%)",
        paddingRight: "clamp(1rem, 4vw, 5%)",
      }}
    >
      {/* SHAPE DEKORATIF - Mengisi ruang kosong */}
      
      {/* Shape 1: Lingkaran besar di pojok kiri atas */}
      <div 
        className="absolute pointer-events-none"
        style={{
          top: "-5%",
          left: "-3%",
          width: "clamp(200px, 35vw, 450px)",
          height: "clamp(200px, 35vw, 450px)",
          borderRadius: "50%",
          backgroundColor: "var(--color-utama)",
          opacity: 0.04,
          zIndex: 0,
        }}
      />

      {/* Shape 2: Lingkaran di pojok kanan bawah */}
      <div 
        className="absolute pointer-events-none"
        style={{
          bottom: "-5%",
          right: "-3%",
          width: "clamp(180px, 30vw, 400px)",
          height: "clamp(180px, 30vw, 400px)",
          borderRadius: "50%",
          backgroundColor: "var(--color-aksen)",
          opacity: 0.05,
          zIndex: 0,
        }}
      />

      {/* Shape 3: Garis-garis diagonal pattern */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.02,
          zIndex: 0,
          backgroundImage: `
            repeating-linear-gradient(45deg, 
              var(--color-utama) 0px, 
              var(--color-utama) 1px, 
              transparent 1px, 
              transparent 20px
            )
          `,
        }}
      />

      {/* Shape 4: Kotak dekoratif di kanan atas */}
      <div 
        className="absolute pointer-events-none hidden lg:block"
        style={{
          top: "15%",
          right: "8%",
          width: "clamp(60px, 12vw, 120px)",
          height: "clamp(60px, 12vw, 120px)",
          border: "2px solid var(--color-utama)",
          opacity: 0.08,
          transform: "rotate(15deg)",
          zIndex: 0,
        }}
      />

      {/* Shape 5: Kotak dekoratif di kiri bawah */}
      <div 
        className="absolute pointer-events-none hidden lg:block"
        style={{
          bottom: "12%",
          left: "6%",
          width: "clamp(50px, 10vw, 100px)",
          height: "clamp(50px, 10vw, 100px)",
          border: "2px solid var(--color-aksen)",
          opacity: 0.1,
          transform: "rotate(25deg)",
          zIndex: 0,
        }}
      />

      {/* Shape 6: Titik-titik dekoratif */}
      <div 
        className="absolute pointer-events-none hidden md:block"
        style={{
          top: "40%",
          left: "3%",
          zIndex: 0,
        }}
      >
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            style={{
              width: "clamp(4px, 1vw, 8px)",
              height: "clamp(4px, 1vw, 8px)",
              borderRadius: "50%",
              backgroundColor: i % 2 === 0 ? "var(--color-utama)" : "var(--color-aksen)",
              opacity: 0.15,
              marginBottom: "clamp(8px, 2vw, 15px)",
            }}
          />
        ))}
      </div>

      {/* Shape 7: Garis horizontal dekoratif */}
      <div 
        className="absolute pointer-events-none hidden xl:block"
        style={{
          bottom: "20%",
          right: "5%",
          width: "clamp(80px, 15vw, 150px)",
          height: "2px",
          backgroundColor: "var(--color-utama)",
          opacity: 0.1,
          zIndex: 0,
        }}
      />

      <div 
        className="mx-auto w-full flex flex-col h-full relative"
        style={{ 
          maxWidth: "clamp(300px, 100%, 1200px)",
          zIndex: 1,
        }}
      >
        
        {/* --- HEADER --- */}
        <div 
          className="reveal-content text-center"
          style={{ 
            willChange: "transform, opacity",
            marginBottom: "clamp(1.5rem, 4vh, 2.5rem)",
          }}
        >
          <h2 
            className="font-['Playfair_Display']"
            style={{ 
              color: "var(--color-teks)",
              fontSize: "clamp(1.8rem, 5vw, 2.5rem)",
              marginBottom: "clamp(0.5rem, 1.5vh, 0.75rem)",
            }}
          >
            Budaya & Nilai Kami
          </h2>
          <div 
            style={{ 
              backgroundColor: "var(--color-utama)",
              height: "clamp(1.5px, 0.3vw, 2.5px)",
              width: "clamp(40px, 10vw, 60px)",
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: "clamp(0.75rem, 2vh, 1rem)",
            }}
          />
          <p 
            className="mx-auto leading-relaxed"
            style={{ 
              color: "var(--color-teks-muted)",
              fontSize: "clamp(0.8rem, 2vw, 1rem)",
              maxWidth: "clamp(280px, 90%, 700px)",
            }}
          >
           Di AS Putra, budaya bukan sekadar prinsip yang tertulis tetapi cara kami berpikir, bekerja, dan berkembang bersama. Nilai-nilai ini menjadi pondasi dalam setiap keputusan, menggerakkan setiap sektor bisnis, dan menjaga arah pertumbuhan kami tetap konsisten. 
          </p>
        </div>

        {/* --- CARDS --- */}
        <div 
          className="grid md:grid-cols-3"
          style={{ 
            gap: "clamp(1rem, 2.5vw, 1.5rem)",
            marginBottom: "clamp(1.5rem, 4vh, 2.5rem)",
          }}
        >
          {cards.map((item, idx) => (
            <div
              key={idx}
              className="reveal-content flex flex-col text-center border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              style={{ 
                willChange: "transform, opacity",
                backgroundColor: "var(--color-bg-light)",
                borderColor: "rgba(0,0,0,0.05)",
                borderRadius: "clamp(12px, 2.5vw, 16px)",
                padding: "clamp(1.25rem, 3.5vw, 2rem)",
              }}
            >
              <div 
                style={{ 
                  color: "var(--color-utama)",
                  fontSize: "clamp(1.8rem, 4.5vw, 2.5rem)",
                  marginBottom: "clamp(0.75rem, 2vh, 1rem)",
                }}
              >
                {item.icon}
              </div>
              <h3 
                className="font-bold"
                style={{ 
                  color: "var(--color-teks)",
                  fontSize: "clamp(1.1rem, 2.5vw, 1.25rem)",
                  marginBottom: "clamp(0.5rem, 1.5vh, 0.75rem)",
                }}
              >
                {item.title}
              </h3>
              <p 
                className="leading-relaxed flex-grow italic"
                style={{ 
                  color: "var(--color-teks-muted)",
                  fontSize: "clamp(0.75rem, 1.8vw, 0.875rem)",
                }}
              >
                "{item.desc}"
              </p>
            </div>
          ))}
        </div>

        {/* --- STATS SECTION --- */}
        <div 
          className="reveal-content"
          style={{ 
            willChange: "transform, opacity",
            borderTopWidth: "clamp(1px, 0.2vw, 1.5px)",
            borderTopStyle: "solid",
            borderTopColor: "rgba(0,0,0,0.05)",
            paddingTop: "clamp(1.5rem, 4vh, 2.5rem)",
          }}
        >
          <div 
            className="flex flex-wrap justify-center items-center"
            style={{ 
              gap: "clamp(1.5rem, 5vw, 3rem)",
            }}
          >
            {stats.map((stat, idx) => (
              <Counter
                key={idx}
                target={stat.target}
                suffix={stat.suffix}
                label={stat.label}
                parentRef={sectionRef}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSummary;