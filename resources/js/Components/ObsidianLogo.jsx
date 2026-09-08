import React from 'react';

export default function ObsidianLogo({ className = 'h-10 sm:h-12 lg:h-14' }) {
  return (
    <div className="inline-flex items-center group cursor-pointer">
      <img
        src="/images/logo.jpg"
        alt="Velox Play"
        className={`${className} w-auto object-contain mix-blend-screen group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_0_12px_rgba(6,182,212,0.6)]`}
      />
    </div>
  );
}
