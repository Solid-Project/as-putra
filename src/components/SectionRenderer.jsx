import React, { memo } from "react";
import HeroCarousel from "@/components/section/HeroCarousel";
import HistorySection from "@/components/section/HistorySection";
import CareerSection from "@/components/section/CareerSection";
import CardSection from "@/components/section/CardSection";
import StatsSection from "@/components/section/StatsSection";
import SectorStrip from "@/components/section/SectorStrip";
import NewsTeaser from "@/components/section/NewsTeaser";
import MilestoneSection from "@/components/section/MilestoneSection";
import OurValues from "@/components/section/OurValues";
import VissionMission from "@/components/section/VissionMission";
import IntroSection from "@/components/section/IntroSection";
import HeroSector from "@/components/section/HeroSector";
import Layout1 from "@/components/section/Layout1";
import Layout2 from "@/components/section/Layout2";
import Layout3 from "@/components/section/Layout3";
import Layout4 from "@/components/section/Layout4";
import Layout5 from "@/components/section/Layout5";
import Layout6 from "@/components/section/Layout6";
import Layout7 from "@/components/section/Layout7";
import Layout8 from "@/components/section/Layout8";
import Layout9 from "@/components/section/Layout9";
import Layout10 from "@/components/section/Layout10";
import NewsSection from "@/components/section/NewsSection";

export const COMPONENT_MAP = {
  HeroCarousel, HistorySection, CareerSection, CardSection, StatsSection,
  SectorStrip, NewsTeaser, MilestoneSection, OurValues, VissionMission,
  IntroSection, HeroSector,
  layout1: Layout1, layout2: Layout2, layout3: Layout3, layout4: Layout4, layout5: Layout5,
  layout6: Layout6, layout7: Layout7, layout8: Layout8, layout9: Layout9, layout10: Layout10,
};

const THEME_MAPPING = {
  HeroCarousel: "dark", HeroSector: "dark", IntroSection: "light", HistorySection: "dark",
  CareerSection: "light", CardSection: "dark", StatsSection: "dark", SectorStrip: "dark",
  NewsTeaser: "dark", NewsSection: "light", MilestoneSection: "light", OurValues: "light",
  VissionMission: "light", layout1: "light", layout2: "dark", layout3: "light", layout4: "dark",
  layout5: "light", layout6: "dark", layout7: "light", layout8: "dark", layout9: "light", layout10: "dark",
};

const SafeComponentWrapper = memo(({ Component, contentData, isActive, index }) => {
  return <Component data={contentData} isActive={isActive} index={index} />;
});
SafeComponentWrapper.displayName = "SafeComponentWrapper";

export const SectionRenderer = ({ sections, activeIndex }) => {
  if (!sections || sections.length === 0) return null;

  return (
    <>
      {sections.map((section, index) => {
        const layoutName = section.layout_name;
        const Component = COMPONENT_MAP[layoutName];
        if (!Component) return null;

        // Cek mana komponen bebas (no-snap)
        const isNoSnap = [
          "CardSection", "StatsSection", "NewsTeaser",
          "MilestoneSection", "CareerSection", "SectorStrip"
        ].includes(layoutName);

        const currentTheme = section.theme || THEME_MAPPING[layoutName] || "dark";

        return (
          <section
            key={section.id || `section-${index}`}
            data-theme={currentTheme}
            data-title={section.section_name}
            // KELAS WAJIB: Gunakan kombinasi 'section' dan 'no-snap' agar dibaca oleh hitungan GSAP
            className={`section w-full relative ${isNoSnap ? "no-snap h-auto" : "h-screen"}`}
            style={{
              backgroundColor: currentTheme === "dark" ? "#111111" : "#ffffff",
              contentVisibility: "auto",
              containIntrinsicSize: "0 500px"
            }}
          >
            <SafeComponentWrapper 
              Component={Component} 
              contentData={section.content_data || section} 
              isActive={activeIndex === index} 
              index={index} 
            />
          </section>
        );
      })}
    </>
  );
};

export default memo(SectionRenderer);