import React, { memo, Suspense, lazy } from "react";
import HeroCarousel from "@/components/section/HeroCarousel";
import HeroSector from "@/components/section/HeroSector";

const HistorySection = lazy(() => import("@/components/section/HistorySection"));
const CareerSection = lazy(() => import("@/components/section/CareerSection"));
const CardSection = lazy(() => import("@/components/section/CardSection"));
const StatsSection = lazy(() => import("@/components/section/StatsSection"));
const SectorStrip = lazy(() => import("@/components/section/SectorStrip"));
const NewsTeaser = lazy(() => import("@/components/section/NewsTeaser"));
const MilestoneSection = lazy(() => import("@/components/section/MilestoneSection"));
const OurValues = lazy(() => import("@/components/section/OurValues"));
const VissionMission = lazy(() => import("@/components/section/VissionMission"));
const IntroSection = lazy(() => import("@/components/section/IntroSection"));
const Layout1 = lazy(() => import("@/components/section/Layout1"));
const Layout2 = lazy(() => import("@/components/section/Layout2"));
const Layout3 = lazy(() => import("@/components/section/Layout3"));
const Layout4 = lazy(() => import("@/components/section/Layout4"));
const Layout5 = lazy(() => import("@/components/section/Layout5"));
const Layout6 = lazy(() => import("@/components/section/Layout6"));
const Layout7 = lazy(() => import("@/components/section/Layout7"));
const Layout8 = lazy(() => import("@/components/section/Layout8"));
const Layout9 = lazy(() => import("@/components/section/Layout9"));
const Layout10 = lazy(() => import("@/components/section/Layout10"));
const NewsSection = lazy(() => import("@/components/section/NewsSection"));

import CombinedSectorStats from "@/components/section/CombinedSectorStats";

const COMPONENT_MAP = {
  HeroCarousel, HistorySection, CareerSection, CardSection, StatsSection,
  SectorStrip, NewsTeaser, MilestoneSection, OurValues, VissionMission,
  IntroSection, HeroSector, CombinedSectorStats,
  layout1: Layout1, layout2: Layout2, layout3: Layout3, layout4: Layout4, layout5: Layout5,
  layout6: Layout6, layout7: Layout7, layout8: Layout8, layout9: Layout9, layout10: Layout10,
};

const THEME_MAPPING = {
  HeroCarousel: "dark", HeroSector: "dark", IntroSection: "light", HistorySection: "dark",
  CareerSection: "light", CardSection: "dark", StatsSection: "dark", SectorStrip: "dark",
  CombinedSectorStats: "dark",
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

  // Akali penggabungan SectorStrip (index 0) dan StatsSection (index 1)
  const processedSections = [];
  for (let i = 0; i < sections.length; i++) {
    const current = sections[i];
    const next = sections[i + 1];

    if (current.layout_name === "SectorStrip" && next?.layout_name === "StatsSection") {
      processedSections.push({
        id: `combined-${current.id}`,
        layout_name: "CombinedSectorStats",
        content_data: { sectors: current.content_data || current, stats: next.content_data || next }
      });
      i++;
    } else {
      processedSections.push(current);
    }
  }

  return (
    <>
      {processedSections.map((section, index) => {
        const layoutName = section.layout_name;
        const Component = COMPONENT_MAP[layoutName];
        if (!Component) return null;

        // Cek mana komponen bebas (no-snap)
        const isNoSnap = [
          "CardSection", "StatsSection", "NewsTeaser",
          "MilestoneSection", "CareerSection", "SectorStrip", "CombinedSectorStats", "layout7"
        ].includes(layoutName);

        const currentTheme = section.theme || THEME_MAPPING[layoutName] || "dark";

        return (
          <section
            key={section.id || `section-${index}`}
            data-theme={currentTheme}
            data-title={section.section_name}
            data-blur={layoutName === "MilestoneSection" ? "true" : undefined}
            data-hide-nav={(layoutName === "HeroCarousel" || layoutName === "HeroSector") ? "true" : "false"}
            // KELAS WAJIB: Gunakan kombinasi 'section' dan 'no-snap' agar dibaca oleh hitungan GSAP
            className={`section w-full relative ${isNoSnap ? "no-snap h-auto" : "h-screen"}`}
            style={{
              backgroundColor: currentTheme === "dark" ? "#111111" : "#ffffff",
              contentVisibility: "auto",
              containIntrinsicSize: "0 500px"
            }}
          >
            <Suspense fallback={<div className="w-full h-full min-h-[50vh] bg-black/5 animate-pulse" />}>
              <SafeComponentWrapper 
                Component={Component} 
                contentData={section.content_data || section} 
                isActive={activeIndex === index} 
                index={index} 
              />
            </Suspense>
          </section>
        );
      })}
    </>
  );
};

export default memo(SectionRenderer);