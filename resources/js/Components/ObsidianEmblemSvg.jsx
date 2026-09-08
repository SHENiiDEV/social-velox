import React from 'react';

export default function ObsidianEmblemSvg({ className = 'w-10 h-10' }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Obsidian Gem Gradient */}
        <linearGradient id="obsidianGrad" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2A3E4E" />
          <stop offset="50%" stopColor="#14212D" />
          <stop offset="100%" stopColor="#0B131B" />
        </linearGradient>

        {/* Highlight Facet Gradient */}
        <linearGradient id="facetHighlight" x1="30" y1="20" x2="70" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1475E1" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#00E700" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#1A2C38" stopOpacity="0.2" />
        </linearGradient>

        {/* Glow Filter */}
        <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Wireframe Outer Hex Shield */}
      <polygon
        points="50,5 90,25 90,75 50,95 10,75 10,25"
        stroke="#1475E1"
        strokeWidth="2.5"
        strokeLinejoin="round"
        filter="url(#neonGlow)"
        opacity="0.9"
      />

      {/* Inner Wireframe Shield */}
      <polygon
        points="50,12 83,28 83,72 50,88 17,72 17,28"
        stroke="#00E700"
        strokeWidth="1.2"
        strokeLinejoin="round"
        opacity="0.6"
      />

      {/* Central Faceted Obsidian Gem Stone */}
      <polygon
        points="50,18 78,32 72,76 50,88 28,76 22,32"
        fill="url(#obsidianGrad)"
        stroke="#213743"
        strokeWidth="1"
      />

      {/* Facet Cuts */}
      <polygon points="50,18 78,32 50,50" fill="url(#facetHighlight)" opacity="0.6" />
      <polygon points="50,18 22,32 50,50" fill="#3D566E" opacity="0.4" />
      <polygon points="22,32 28,76 50,50" fill="#1A2C38" opacity="0.7" />
      <polygon points="78,32 72,76 50,50" fill="#0F212E" opacity="0.9" />
      <polygon points="28,76 50,88 50,50" fill="url(#facetHighlight)" opacity="0.4" />
      <polygon points="72,76 50,88 50,50" fill="#0B131B" />

      {/* Center Shine Specular */}
      <circle cx="50" cy="38" r="4" fill="#FFFFFF" opacity="0.4" filter="url(#neonGlow)" />
    </svg>
  );
}
