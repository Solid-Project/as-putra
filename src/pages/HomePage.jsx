// src/pages/HomePage.jsx
import React from "react";
import HeroCarousel from "@/components/home/HeroCarousel";
import HistorySection from "@/components/home/HistorySection";
import CultureSection from "@/components/home/CultureSection";
import StatsSection from "@/components/home/StatsSection";
import AboutSummary from "@/components/home/AboutSummary";
import SectorStrip from "@/components/home/SectorStrip";
import NewsTeaser from "@/components/home/NewsTeaser";
import useFullpageSnap from "@/hooks/useFullPageSnap";
import { useEffect, useState } from "react";
import Footer from "@/components/layout/Footer";


const API_URL = "http://localhost:8000/"

const HomePage = () => {
  const { activeIndex } = useFullpageSnap({ enabled: true });
  const data = usePageData();

  let el = [];

  if (data && data.data?.length > 0) {
    data.data.forEach((element) => {
      switch (element.layout_name) {
        case "HeroCarousel":
          el.push(
            <HeroCarousel 
            key={element.id}
            activeIndex={element.section_order} data={element}/>
          );
          break;

        default:
          break;
      }
    });
  }
  if (el.length > 0){
    return (
    <main className="relative">
      {el}
      <Footer />
    </main>
    
  );
  } else {
    return <div></div>
  }

  

  
  
  

  // return (
  //   <main className="relative">

  //     {/* <HeroCarousel activeIndex={activeIndex} /> */}
  //     {/* <HistorySection activeIndex={activeIndex} /> */}
  //     {/* <AboutSummary activeIndex={activeIndex} /> */}
  //     {/* <SectorStrip activeIndex={activeIndex} /> */}
  //     {/* <NewsTeaser activeIndex={activeIndex} /> */}
  //   </main>
  // );
};

function usePageData(){
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}api/v1/page/beranda`);
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error("Failed to fetch:", error);
      }
    };

    fetchData();
  }, []);

  return data;
}


export default HomePage;