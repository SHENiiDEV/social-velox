import React from 'react';

export default function ObsidianLogo({ className = 'h-12 sm:h-14 lg:h-16' }) {
  return (
    <div className="inline-flex items-center group cursor-pointer">
      <img
        src="/images/logo.jpg"
        alt="Velox Play"
        className={`${className} w-auto object-contain filter invert contrast-125 brightness-110 mix-blend-screen group-hover:scale-105 transition-transform duration-300`}
      />
    </div>
  );
}
