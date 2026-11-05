import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { TEAM_DATA } from '../data/agencyData';

export const Team: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? TEAM_DATA.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === TEAM_DATA.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="team" className="py-24 sm:py-32 bg-[#111111] text-white relative overflow-hidden">
      {/* Decorative ambient gradient */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#FF3B30]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Left/Right Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-neutral-400 uppercase mb-3">
              <span className="text-[#FF3B30]">//</span>
              <span>OUR TEAM</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              An incredible team of great minds
            </h2>
            <p className="mt-4 text-base text-neutral-300/80 leading-relaxed">
              Our multidisciplinary collective unites senior digital product designers, veteran 3D artists, growth engineers, and brand strategists dedicated to architecting high-converting digital legacies.
            </p>
          </div>

          {/* Slider Navigation Arrows (Left / Right) */}
          <div className="flex items-center gap-3 shrink-0 self-start md:self-end">
            <button
              onClick={prevSlide}
              aria-label="Previous team member"
              className="w-12 h-12 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-[#FF3B30] hover:bg-neutral-800 text-white flex items-center justify-center transition-all duration-200 active:scale-95 shadow-lg group focus:outline-none focus:ring-2 focus:ring-[#FF3B30]"
            >
              <ChevronLeft className="w-5 h-5 text-neutral-300 group-hover:text-white transition-colors" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next team member"
              className="w-12 h-12 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-[#FF3B30] hover:bg-neutral-800 text-white flex items-center justify-center transition-all duration-200 active:scale-95 shadow-lg group focus:outline-none focus:ring-2 focus:ring-[#FF3B30]"
            >
              <ChevronRight className="w-5 h-5 text-neutral-300 group-hover:text-white transition-colors" />
            </button>
          </div>
        </div>

        {/* Desktop View (lg+: 3 Cards) */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8 items-stretch">
          {TEAM_DATA.slice(0, 3).map((member) => (
            <div
              key={member.id}
              className="group rounded-3xl overflow-hidden bg-neutral-900/90 border border-neutral-800 hover:border-neutral-700 hover:shadow-2xl hover:shadow-[#FF3B30]/10 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Member Portrait */}
              <div className="relative aspect-[3/4] overflow-hidden bg-neutral-950">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/30 to-transparent opacity-90" />
                
                {/* Years Experience Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#111111]/80 backdrop-blur-md border border-neutral-700/60 text-[11px] font-mono text-neutral-300 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#FF3B30]" />
                  <span>{member.experienceYears}y exp</span>
                </div>

                {/* Overlaid Role */}
                <div className="absolute bottom-4 left-6 right-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#FF3B30] block mb-1">
                    {member.role}
                  </span>
                  <h3 className="text-2xl font-black text-white tracking-tight">
                    {member.name}
                  </h3>
                </div>
              </div>

              {/* Bio & Specialty */}
              <div className="p-6 pt-4 space-y-3 bg-neutral-900">
                <p className="text-xs font-semibold text-neutral-400">
                  <span className="text-neutral-500">Focus:</span> {member.specialty}
                </p>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Tablet View (md to lg: 2 Cards Side-by-Side) */}
        <div className="hidden md:grid lg:hidden grid-cols-2 gap-6 items-stretch">
          {[TEAM_DATA[currentIndex], TEAM_DATA[(currentIndex + 1) % TEAM_DATA.length]].map((member) => (
            <div
              key={member.id}
              className="group rounded-3xl overflow-hidden bg-neutral-900/90 border border-neutral-800 hover:border-neutral-700 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-neutral-950">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent" />
                
                <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full bg-[#111111]/80 backdrop-blur-md border border-neutral-700/60 text-[10px] font-mono text-neutral-300 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#FF3B30]" />
                  <span>{member.experienceYears}y exp</span>
                </div>

                <div className="absolute bottom-3.5 left-4 right-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF3B30] block mb-0.5">
                    {member.role}
                  </span>
                  <h3 className="text-lg font-black text-white tracking-tight">
                    {member.name}
                  </h3>
                </div>
              </div>

              <div className="p-5 space-y-2 bg-neutral-900">
                <p className="text-[11px] font-semibold text-neutral-400">
                  <span className="text-neutral-500">Focus:</span> {member.specialty}
                </p>
                <p className="text-xs text-neutral-300 leading-relaxed line-clamp-3">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View (< md: 1 Card Carousel) */}
        <div className="md:hidden">
          <div className="rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow-2xl">
            <div className="relative aspect-[3/4] max-h-[440px] overflow-hidden bg-neutral-950">
              <img
                src={TEAM_DATA[currentIndex].image}
                alt={TEAM_DATA[currentIndex].name}
                className="w-full h-full object-cover transition-opacity duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent" />
              
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#111111]/80 backdrop-blur-md border border-neutral-700 text-xs font-mono text-neutral-300 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#FF3B30]" />
                <span>{TEAM_DATA[currentIndex].experienceYears}y exp</span>
              </div>

              <div className="absolute bottom-4 left-6 right-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#FF3B30] block mb-1">
                  {TEAM_DATA[currentIndex].role}
                </span>
                <h3 className="text-xl font-black text-white">
                  {TEAM_DATA[currentIndex].name}
                </h3>
              </div>
            </div>

            <div className="p-5 space-y-2.5 bg-neutral-900">
              <p className="text-xs font-semibold text-neutral-400">
                <span className="text-neutral-500">Focus:</span> {TEAM_DATA[currentIndex].specialty}
              </p>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {TEAM_DATA[currentIndex].bio}
              </p>
            </div>
          </div>
        </div>

        {/* Dots Indicator for Mobile & Tablet Slider */}
        <div className="lg:hidden flex items-center justify-center gap-2 mt-6">
          {TEAM_DATA.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === idx
                  ? 'w-8 bg-[#FF3B30]'
                  : 'w-2 bg-neutral-700 hover:bg-neutral-500'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
