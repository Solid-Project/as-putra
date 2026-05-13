// src/components/skeleton/IntroSectionSkeleton.jsx
import React from 'react';

const IntroSectionSkeleton = () => {
  return (
    <section
      className="section relative bg-white overflow-hidden"
      style={{
        height: "100vh",
        minHeight: "600px",
        maxHeight: "1080px",
        paddingLeft: "clamp(1rem, 6%, 6rem)",
        paddingRight: "clamp(1rem, 6%, 6rem)",
      }}
    >
      {/* BACKGROUND SHAPES SKELETON (Static Blur) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute rounded-full blur-3xl bg-gray-100"
          style={{
            width: "min(60vw, 600px)",
            height: "min(60vw, 600px)",
            top: "-15%",
            right: "-10%",
            opacity: 0.5
          }}
        />
        <div
          className="absolute rounded-full blur-2xl bg-gray-50"
          style={{
            width: "min(40vw, 400px)",
            height: "min(40vw, 400px)",
            bottom: "-10%",
            left: "-5%",
            opacity: 0.5
          }}
        />
      </div>

      {/* Label Vertikal Skeleton */}
      <div className="absolute left-[clamp(1rem,3%,3rem)] top-1/2 -translate-y-1/2 -rotate-90 hidden lg:block z-30 opacity-20">
        <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
      </div>

      <div className="relative z-10 w-full h-full flex items-center">
        <div className="w-full grid lg:grid-cols-12 items-center">
          
          {/* KOLOM KIRI: JUDUL SKELETON */}
          <div className="lg:col-span-5 flex flex-col justify-center z-20 space-y-3">
            {/* Baris Pertama Judul */}
            <div className="relative overflow-hidden bg-gray-200 rounded-sm"
              style={{
                height: "clamp(2.5rem, 12vw, 8rem)",
                width: "90%",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-skeleton-shimmer -translate-x-full" />
            </div>
            
            {/* Baris Kedua Judul */}
            <div className="relative overflow-hidden bg-gray-200 rounded-sm"
              style={{
                height: "clamp(2.5rem, 10vw, 7rem)",
                width: "70%",
                marginTop: "clamp(-0.25rem, -1vw, -0.5rem)"
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-skeleton-shimmer -translate-x-full" />
            </div>
          </div>

          {/* KOLOM KANAN: GAMBAR SKELETON */}
          <div 
            className="lg:col-span-7 relative flex items-center justify-end w-full"
            style={{ height: "clamp(300px, 60vh, 85%)" }}
          >
            <div className="w-full h-full bg-gray-200 rounded-sm relative overflow-hidden shadow-sm">
              {/* Kilau Shimmer */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-skeleton-shimmer -translate-x-full" />
              
              {/* Overlay Gradient tiruan agar depth sama */}
              <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-white/40 to-transparent hidden lg:block z-10" />
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes skeleton-shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-skeleton-shimmer {
          animation: skeleton-shimmer 1.8s infinite;
        }
      `}} />
    </section>
  );
};

export default IntroSectionSkeleton;