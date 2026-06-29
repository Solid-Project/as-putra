import React from 'react';

/**
 * Wrapper standar untuk setiap section.
 * Menangani ID, ref, dan padding dasar untuk konsistensi layout.
 */
export const SectionWrapper = ({ id, className = "", children }) => {
  return (
    <section 
      id={id} 
      className={`relative w-full py-24 px-4 sm:px-6 md:px-8 lg:px-[5%] overflow-hidden ${className}`}
      data-theme="dark"
    >
      {children}
    </section>
  );
};
