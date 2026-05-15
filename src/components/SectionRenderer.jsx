// src/components/SectionRenderer.jsx
import React from "react";
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

// Mapping Komponen (Case Sensitive sesuai API)
export const COMPONENT_MAP = {
  HeroCarousel,
  HistorySection,
  CareerSection,
  CardSection,
  StatsSection,
  SectorStrip,
  NewsTeaser,
  MilestoneSection,
  OurValues,
  VissionMission,
  IntroSection,
  HeroSector,
  layout1: Layout1,
  layout2: Layout2,
  layout3: Layout3,
  layout4: Layout4,
  layout5: Layout5,
  layout6: Layout6,
  layout7: Layout7,
  layout8: Layout8,
  layout9: Layout9,
  layout10: Layout10,
};

// Mapping Tema Manual sesuai visual komponen
const THEME_MAPPING = {
  HeroCarousel: "dark",
  HeroSector: "dark",
  IntroSection: "light",
  HistorySection: "dark",
  CareerSection: "light",
  CardSection: "dark",
  StatsSection: "dark",
  SectorStrip: "dark",
  NewsTeaser: "dark",
  NewsSection: "light",
  MilestoneSection: "light",
  OurValues: "light",
  VissionMission: "light",
  layout1: "light",
  layout2: "dark",
  layout3: "light",
  layout4: "dark",
  layout5: "light",
  layout6: "dark",
  layout7: "light",
  layout8: "dark",
  layout9: "light",
  layout10: "dark",
};

export const SectionRenderer = ({ sections, activeIndex }) => {
  if (!sections) return null;

  return (
    <>
      {sections.map((section, index) => {
        const layoutName = section.layout_name;
        const Component = COMPONENT_MAP[layoutName];
        
        if (!Component) return null;

        // Tentukan apakah section ini no-snap
        const isNoSnap = [
            "CardSection", 
            "StatsSection", 
            "NewsTeaser",
            "MilestoneSection",
            "CareerSection"
        ].includes(layoutName);

        /**
         * LOGIKA TEMA:
         * Prioritas 1: Ambil dari database jika ada (section.theme).
         * Prioritas 2: Ambil dari THEME_MAPPING manual di atas.
         * Fallback: "dark".
         */
        const currentTheme = section.theme || THEME_MAPPING[layoutName] || "dark";

        return (
          <section
            key={section.id || index}
            // data-theme dipasang di sini agar Navbar bisa mendeteksi lewat Intersection Observer
            data-theme={currentTheme}
            data-title={section.section_name}
            className={`section w-full ${isNoSnap ? "no-snap" : ""}`}
          >
            <Component 
              data={section} 
              isActive={activeIndex === index} 
              index={index} 
            />
          </section>
        );
      })}
    </>
  );
};

export default SectionRenderer;