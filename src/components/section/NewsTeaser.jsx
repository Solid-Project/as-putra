import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import logoIcon from "@/assets/logo.jpg";

const NewsTeaser = ({ activeIndex, index }) => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);
  const headerRef = useRef(null);
  const buttonRef = useRef(null);
  
  const isActive = activeIndex === index;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/news/all-news`);
        const json = await response.json();
        if (json.status) setNewsData(json.data.details || []);
      } catch (error) { console.error(error); } finally { setLoading(false); }
    };
    fetchNews();
  }, []);

  const slide = (direction) => {
    // Menghitung lebar kartu + gap secara presisi
    const cardElement = sliderRef.current.children[0];
    const cardWidth = cardElement.offsetWidth + 32; // 32 adalah gap-8
    
    let newIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;
    if (newIndex < 0) newIndex = 0;
    if (newIndex > newsData.length - 3) newIndex = newsData.length - 3;

    setCurrentIndex(newIndex);
    gsap.to(sliderRef.current, {
      x: -newIndex * cardWidth,
      duration: 0.8,
      ease: "power3.inOut"
    });
  };

  const getCategoryInfo = (item) => {
    const label = item.category_name || "Berita";
    return { label, color: label === "Inovasi" ? "#FFC700" : "#00E0FF" };
  };

  return (
    <section
      ref={sectionRef}
      // PADDING DISAMAKAN DENGAN NAVBAR (px-4 sm:px-6 md:px-8 lg:px-[5%])
      className="section relative w-full h-screen flex flex-col justify-center bg-[#0F1A3E] overflow-hidden px-4 sm:px-6 md:px-8 lg:px-[5%]"
      id={`section-${index}`}
    >
      {/* Background Decor */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none -z-0">
        <img src={logoIcon} alt="" className="w-[85%] h-auto rotate-[-12deg]" />
      </div>

      <div className="w-full relative z-10 flex flex-col">
        
        {/* HEADER & NAV - Dibuat lebih rapat (mb-6) agar sisa ruang untuk button lebih banyak */}
        <div ref={headerRef} className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[#FFC700] font-black tracking-[0.4em] uppercase text-[10px] md:text-xs block mb-1">Latest Updates</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-['Playfair_Display'] font-bold text-white leading-tight">
              Berita & <span className="text-[#FFC700] italic">Artikel</span>
            </h2>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={() => slide("prev")}
              disabled={currentIndex === 0}
              className={`w-10 h-10 md:w-12 md:h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${currentIndex === 0 ? "border-white/10 text-white/10" : "border-[#FFC700] text-[#FFC700] hover:bg-[#FFC700] hover:text-[#0F1A3E]"}`}
            >
              ←
            </button>
            <button 
              onClick={() => slide("next")}
              disabled={currentIndex >= newsData.length - 3}
              className={`w-10 h-10 md:w-12 md:h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${currentIndex >= newsData.length - 3 ? "border-white/10 text-white/10" : "border-[#FFC700] text-[#FFC700] hover:bg-[#FFC700] hover:text-[#0F1A3E]"}`}
            >
              →
            </button>
          </div>
        </div>

        {/* SLIDER WINDOW */}
        <div className="relative w-full overflow-hidden">
          <div ref={sliderRef} className="flex gap-6 lg:gap-8 transition-transform">
            {!loading && newsData.map((item, idx) => {
              const category = getCategoryInfo(item);
              return (
                /* Lebar kartu diatur 3 per layar di desktop */
                <div key={idx} className="news-card-item flex-none w-[85%] md:w-[45%] lg:w-[calc((100%/3)-22px)]">
                  <Link
                    to={`/news/${item.slug.split('/').pop()}`}
                    className="group block bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:bg-white/10"
                  >
                    {/* ASPECT RATIO DIKECILKAN (dari 16/10 ke 16/9 atau fixed height) agar tidak terlalu tinggi */}
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F1A3E]/80 via-transparent" />
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[9px] font-black uppercase" style={{ backgroundColor: category.color, color: '#0F1A3E' }}>
                        {category.label}
                      </div>
                    </div>

                    {/* PADDING KONTEN DIRAPATKAN */}
                    <div className="p-5 lg:p-6 flex flex-col justify-between h-[160px] lg:h-[180px]">
                      <div>
                        <h3 className="text-white font-bold text-base lg:text-lg mb-2 line-clamp-2 group-hover:text-[#FFC700] transition-colors leading-tight">
                          {item.title}
                        </h3>
                        <p className="text-gray-400 text-[11px] leading-relaxed line-clamp-2 opacity-70">
                          {item.excerpt}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-[#FFC700] text-[10px] font-black uppercase tracking-widest">
                        <span>Read More</span>
                        <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* EXPLORE ALL BUTTON - Diberi margin-top yang pas agar terlihat di satu layar */}
        <div ref={buttonRef} className="mt-8 lg:mt-10 flex justify-center">
          <Link
            to="/news"
            className="group relative px-8 py-3.5 bg-transparent border border-[#FFC700]/40 text-[#FFC700] font-bold text-[10px] uppercase tracking-[0.3em] rounded-full overflow-hidden transition-all duration-500 hover:border-[#FFC700]"
          >
            <span className="relative z-10 group-hover:text-[#0F1A3E] transition-colors duration-500">
              Explore All News
            </span>
            <div className="absolute inset-0 bg-[#FFC700] translate-y-full group-hover:translate-y-0 transition-transform duration-500 -z-0" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsTeaser;