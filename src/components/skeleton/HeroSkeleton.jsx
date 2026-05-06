import React from "react";

const HeroSkeleton = () => {
  return (
    <section className="section relative h-screen flex items-center justify-center text-center overflow-hidden bg-black">
      
      {/* Background Skeleton */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Gradient base */}
        <div className="w-full h-full bg-gradient-to-br from-gray-800 via-gray-900 to-black" />

        {/* Shimmer effect */}
        <div className="absolute inset-0 animate-shimmer bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.08),transparent)] bg-[length:200%_100%]" />

        {/* Overlay gelap (biar sama kayak hero asli) */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        
        {/* Title */}
        <div
          className="mx-auto rounded bg-gray-600/70 relative overflow-hidden"
          style={{
            width: "clamp(220px, 60%, 600px)",
            height: "clamp(2rem, 6vw, 5rem)",
            marginBottom: "clamp(0.75rem, 2vw, 1rem)",
          }}
        >
          <div className="absolute inset-0 animate-shimmer bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.15),transparent)] bg-[length:200%_100%]" />
        </div>

        {/* Line */}
        <div
          className="h-0.5 mx-auto bg-gray-600/70 relative overflow-hidden"
          style={{
            width: 80,
            marginBottom: "clamp(1.5rem, 4vw, 2.5rem)",
          }}
        >
          <div className="absolute inset-0 animate-shimmer bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.2),transparent)] bg-[length:200%_100%]" />
        </div>

        {/* Subtitle */}
        <div
          className="mx-auto rounded bg-gray-600/70 relative overflow-hidden"
          style={{
            width: "clamp(280px, 90%, 600px)",
            height: "clamp(0.9rem, 2.5vw, 1.125rem)",
            marginBottom: "clamp(1.5rem, 4vw, 2.5rem)",
          }}
        >
          <div className="absolute inset-0 animate-shimmer bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.15),transparent)] bg-[length:200%_100%]" />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="rounded-full bg-gray-600/70 relative overflow-hidden"
              style={{
                width: 140,
                height: 48,
              }}
            >
              <div className="absolute inset-0 animate-shimmer bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.2),transparent)] bg-[length:200%_100%]" />
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute z-20 hidden md:flex flex-col items-center gap-2"
        style={{
          bottom: "clamp(1rem, 5vh, 3rem)",
          right: "clamp(1rem, 5vw, 10%)",
        }}
      >
        <div className="w-3 h-20 bg-gray-700 rounded overflow-hidden relative">
          <div className="absolute inset-0 animate-shimmer bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.2),transparent)] bg-[length:200%_100%]" />
        </div>
      </div>

      {/* Animation */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite linear;
        }
      `}</style>
    </section>
  );
};

export default HeroSkeleton;