import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeroCareer = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);
  const statsRef = useRef([]);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const scrollBtnRef = useRef(null);
  
    const scrollToNext = () => {
      // Mencari section berikutnya setelah hero untuk scroll otomatis
      const nextSection = sectionRef.current?.nextElementSibling;
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" });
      }
    };

  const fullText = "Join Our Team";

  // Typing effect
  useEffect(() => {
    let currentIndex = 0;
    let timeoutId;

    const startTyping = () => {
      currentIndex = 0;
      setDisplayText("");
      setIsTyping(true);

      const typingInterval = setInterval(() => {
        if (currentIndex < fullText.length) {
          setDisplayText(fullText.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);

          timeoutId = setTimeout(() => {
            startTyping();
          }, 2000);
        }
      }, 100);

      return typingInterval;
    };

    const interval = startTyping();

    return () => {
      clearInterval(interval);
      clearTimeout(timeoutId);
    };
  }, []);

  // GSAP animations
  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const description = descriptionRef.current;
    const button = buttonRef.current;
    const stats = statsRef.current;

    const titleAnim = gsap.fromTo(
      title,
      { y: -100, opacity: 0, rotationX: 45 },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 1.5,
        ease: "power3.out",
        paused: true,
      }
    );

    const subtitleAnim = gsap.fromTo(
      subtitle,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        delay: 0.3,
        ease: "back.out(1.2)",
        paused: true,
      }
    );

    const descriptionAnim = gsap.fromTo(
      description,
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        delay: 0.6,
        ease: "power3.out",
        paused: true,
      }
    );

    const buttonAnim = gsap.fromTo(
      button,
      { y: 50, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        delay: 0.9,
        ease: "elastic.out(1, 0.5)",
        paused: true,
      }
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            titleAnim.restart();
            subtitleAnim.restart();
            descriptionAnim.restart();
            buttonAnim.restart();

            stats.forEach((stat, index) => {
              gsap.fromTo(
                stat,
                { y: 30, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.8,
                  delay: 1.2 + index * 0.15,
                  ease: "power3.out",
                }
              );
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      titleAnim.kill();
      subtitleAnim.kill();
      descriptionAnim.kill();
      buttonAnim.kill();
    };
  }, []);

  // Counter animation
  useEffect(() => {
    const counters = document.querySelectorAll(".stat-counter");

    const animateCounter = (counter) => {
      const target = parseInt(counter.getAttribute("data-target"));
      let current = 0;
      const increment = target / 50;

      const updateCounter = () => {
        if (current < target) {
          current += increment;
          counter.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };

      updateCounter();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((counter) => observer.observe(counter));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section hero-section min-h-screen relative flex items-center justify-center py-24 px-5 overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.1), rgba(255,255,255,0.1)), url('/react/img/team.jpeg')",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      data-theme="dark"
      data-title="Banner"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/50" />

      <div className="max-w-[1200px] mx-auto relative z-10 text-center">

        {/* Title */}
        <h1
          ref={titleRef}
          className="font-['Playfair_Display'] text-4xl md:text-6xl lg:text-7xl text-white mb-6"
        >
          Bangun Karir
          <br />
          <span className="text-[var(--color-utama)]">
            Bersama AS PUTRA
          </span>
        </h1>

        {/* Description */}
        <p
          ref={descriptionRef}
          className="text-white/80 max-w-2xl mx-auto mb-8"
        >
          Bergabunglah dengan tim yang berdedikasi untuk menciptakan dampak
          positif melalui inovasi dan kolaborasi.
        </p>

        {/* Buttons */}
        <div ref={buttonRef} className="flex gap-4 justify-center mb-16 flex-wrap">
          <Link
            to="#career-section"
            className="px-8 py-4 bg-[var(--color-utama)] text-white rounded-full hover:shadow-xl hover:shadow-[var(--color-utama)]/30 transition"
          >
            Lihat Lowongan
          </Link>

          <Link
            to="/about"
            className="px-8 py-4 bg-white/20 border border-white/40 text-white rounded-full hover:bg-white/30 transition"
          >
            Tentang Perusahaan
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Karyawan", target: 500 },
            { label: "Tahun", target: 25 },
            { label: "Cabang", target: 15 },
            { label: "Training", target: 100 },
          ].map((stat, index) => (
            <div
              key={stat.label}
              ref={(el) => (statsRef.current[index] = el)}
              className="bg-white/20 border border-white/30 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/30 transition"
            >
              <div className="text-2xl font-bold text-white">
                <span className="stat-counter" data-target={stat.target}>
                  0
                </span>
                +
              </div>
              <div className="text-white/70 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
      <button
        ref={scrollBtnRef}
        onClick={scrollToNext}
        className="absolute bottom-12 right-[10%] z-20 hidden lg:flex flex-col items-center gap-2 group cursor-pointer"
      >
        {/* Teks Scroll yang lebih besar & berjarak */}
        <span className="vertical-text text-[11px] font-black uppercase tracking-[0.5em] text-white/40 group-hover:text-[var(--color-utama)] transition-colors duration-500 mb-4">
          Scroll
        </span>

        {/* Stack Panah (Tanpa Line) */}
        <div className="flex flex-col items-center -space-y-2">
          <svg
            className="w-8 h-8 text-[var(--color-utama)] animate-arrow-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M19 9l-7 7-7-7"
            />
          </svg>
          <svg
            className="w-8 h-8 text-[var(--color-utama)] animate-arrow-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M19 9l-7 7-7-7"
            />
          </svg>
          <svg
            className="w-8 h-8 text-[var(--color-utama)] animate-arrow-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>
    </section>
  );
};

export default HeroCareer;