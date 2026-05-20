import React, { useEffect, useState } from "react"; // 1. Tambah useState di sini
import { useParams } from "react-router-dom";
import { usePageData } from "@/hooks/usePageData";
import useFullpageSnap from "@/hooks/useFullPageSnap";
import SectionRenderer from "@/components/SectionRenderer";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import HeroSkeleton from "@/components/skeleton/HeroSkeleton";
import NewsTeaser from "@/components/section/NewsTeaser";
import CareerSection from "@/components/section/CareerSection";
import NewsSection from "@/components/section/NewsSection";

import AutoTranslate from "@/lib/AutoTranslate"; 

import PrivacyPolicySection from "@/components/section/PrivacyPolicy";
import TermsConditionsSection from "@/components/section/TermsConditions";

const FullPage = ({ defaultSlug = "beranda" }) => {
  const { slug } = useParams();
  const currentSlug = slug || defaultSlug;

  const { data, loading } = usePageData(currentSlug);
  const sections = data?.data || [];

  // 2. State untuk mendeteksi apakah device saat ini adalah HP/Mobile (lebar < 768px)
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Fungsi untuk cek ukuran layar
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // 768px adalah breakpoint standard mobile (md di Tailwind)
    };

    // Cek saat pertama kali komponen di-mount
    checkScreenSize();

    // Dengarkan perubahan ukuran layar jika user memutar orientasi HP atau resize browser
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // 3. Tambahkan kondisi !isMobile di properti enabled
  const { activeIndex } = useFullpageSnap({ 
    enabled: !loading && sections.length >= 0 && !isMobile
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 300);
    return () => clearTimeout(timer);
  }, [currentSlug, loading]);

  if (loading) return <HeroSkeleton />;

  return (
    <main className="relative bg-black min-h-screen">
      <Navbar />

      <div className="fullpage-wrapper">
        <AutoTranslate /> 

        <SectionRenderer sections={sections} activeIndex={activeIndex} />
        
        {currentSlug === "beranda" && (
          <section className="section no-snap w-full h-auto" data-title="News Updates">
            <NewsTeaser isActive={activeIndex === sections.length} />
          </section>
        )}

        {currentSlug === "news" && (
          <section className="section no-snap w-full h-auto" data-title="Latest News">
            <NewsSection isActive={activeIndex === sections.length} />
          </section>
        )}

        {currentSlug === "karir" && (
          <section className="section no-snap w-full h-auto" data-theme="light" data-title="Join Our Team">
            <CareerSection isActive={activeIndex === sections.length} />
          </section>
        )}

        {currentSlug === "privacy-policy" && (
          <section className="section no-snap w-full h-auto bg-white text-slate-700 px-6 md:px-10 lg:px-[6%] py-12 md:py-20" data-theme="light" data-title="Privacy Policy">
            <div className="prose prose-slate max-w-4xl mx-auto text-slate-600 text-sm leading-relaxed text-justify">
              <PrivacyPolicySection />
            </div>
          </section>
        )}

        {currentSlug === "terms-conditions" && (
          <section className="section no-snap w-full h-auto bg-white text-slate-700 px-6 md:px-10 lg:px-[6%] py-12 md:py-20" data-theme="light" data-title="Terms & Conditions">
            <div className="prose prose-slate max-w-4xl mx-auto text-slate-600 text-sm leading-relaxed text-justify">
              <TermsConditionsSection />
            </div>
          </section>
        )}

        <section className="footer no-snap w-full h-auto" data-title="Footer">
          <Footer />
        </section>
      </div>
    </main>
  );
};

export default FullPage;