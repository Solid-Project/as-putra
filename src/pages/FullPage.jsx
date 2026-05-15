import React, { useEffect } from "react";
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

const FullPage = ({ defaultSlug = "beranda" }) => {
  const { slug } = useParams();
  const currentSlug = slug || defaultSlug;

  const { data, loading } = usePageData(currentSlug);
  const sections = data?.data || [];

  const { activeIndex } = useFullpageSnap({ 
    enabled: !loading && sections.length > 0,
    config: { 
      sectionSelector: ".fullpage-wrapper > .section" 
    }
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
        <SectionRenderer sections={sections} activeIndex={activeIndex} />
        {currentSlug === "beranda" && (
          <section className="section no-snap" data-title="News Updates">
            <NewsTeaser isActive={activeIndex === sections.length} />
          </section>
        )}

        {currentSlug === "news" && (
          <section className="section no-snap" data-title="Latest News">
            <NewsSection isActive={activeIndex === sections.length} />
          </section>
        )}
        {currentSlug === "karir" && (
          <section className="section no-snap" data-theme="light" data-title="Join Our Team">
            <CareerSection isActive={activeIndex === sections.length} />
          </section>
        )}
        <section className="footer no-snap" data-title="Footer">
          <Footer />
        </section>
      </div>
    </main>
  );
};

export default FullPage;