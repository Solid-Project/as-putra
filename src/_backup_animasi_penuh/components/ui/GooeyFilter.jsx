// src/components/ui/GooeyFilter.jsx
import React from 'react';

const GooeyFilter = () => (
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{ display: 'none' }}>
    <defs>
      <filter id="goo">
        <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" result="goo" />
        <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
      </filter>
    </defs>
  </svg>
);

export default GooeyFilter;