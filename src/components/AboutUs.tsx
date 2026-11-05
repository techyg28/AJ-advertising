import React from 'react';
import { ArrowUpRight, Award, Zap, Target, Check } from 'lucide-react';
import aboutCreativeStudio from '../assets/images/about_creative_studio_1793879739299.jpg';

export const AboutUs: React.FC = () => {
  const handleConnectClick = () => {
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="about" className="py-24 sm:py-32 bg-white text-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <span className="text-[#FF3B30] font-bold text-sm uppercase tracking-widest block mb-3">
            About us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-950 leading-tight text-balance">
            Creating a global impact through our new strategies
          </h2>
          <p className="mt-6 text-base sm:text-lg text-neutral-600 leading-relaxed">
            At AJ Advertising Agency, we believe transformative business growth happens at the convergence of bold artistic expression, analytical rigor, and frictionless user experience. We partner with individual founders, disruptive startups, and established SMBs to engineer market-defining brands, scalable ad ecosystems, and robust web applications that consistently outperform the status quo.
          </p>
        </div>

        {/* Left / Right Balanced Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 lg:gap-16 items-center">
          
          {/* Left Column: Imagery & Visual Composition (md: 6 cols, lg: 7 cols) */}
          <div className="md:col-span-6 lg:col-span-7 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-neutral-200 bg-neutral-100 group">
              <img
                src={aboutCreativeStudio}
                alt="Creative collaborative workspace at AJ Advertising Agency"
                className="w-full h-[320px] sm:h-[400px] md:h-[440px] lg:h-[480px] object-cover group-hover:scale-102 transition-transform duration-700"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

              {/* Inset Metric Card */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 md:right-4 lg:right-auto lg:max-w-sm p-4 sm:p-5 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-neutral-100">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#FF3B30] text-white flex items-center justify-center font-bold shrink-0">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs font-bold text-neutral-500 uppercase tracking-wider">
                      Strategic Execution
                    </p>
                    <p className="text-xs sm:text-sm font-extrabold text-neutral-900">
                      Exceptional Solutions & Efficiency
                    </p>
                  </div>
                </div>
                <div className="mt-2.5 pt-2.5 border-t border-neutral-100 flex items-center justify-between text-[11px] sm:text-xs text-neutral-600">
                  <span>Agile Sprints</span>
                  <span>·</span>
                  <span>Accountability</span>
                  <span>·</span>
                  <span>ROI Guarantee</span>
                </div>
              </div>
            </div>

            {/* Overlapping circular accent badge */}
            <div className="hidden sm:flex absolute -top-4 -right-2 sm:-top-5 sm:-right-4 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-neutral-950 text-white p-2 items-center justify-center text-center shadow-xl border-4 border-white animate-spin-slow">
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-tighter leading-tight">
                INNOVATE · SCALE · ELEVATE ·
              </span>
            </div>
          </div>

          {/* Right Column: Narrative, Strategic Pillars & "Let's Connect" Circular Button (md: 6 cols, lg: 5 cols) */}
          <div className="md:col-span-6 lg:col-span-5 space-y-6 lg:space-y-8">
            
            {/* 3 Strategic Pillars */}
            <div className="space-y-3.5 sm:space-y-4">
              <div className="p-4 sm:p-5 rounded-2xl bg-neutral-50 border border-neutral-200/80 hover:border-[#FF3B30]/30 transition-colors">
                <div className="flex items-start gap-3.5 sm:gap-4">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#FF3B30]/10 text-[#FF3B30] flex items-center justify-center shrink-0 mt-0.5">
                    <Target className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-neutral-900">
                      Tailored Problem Solving
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 mt-1 leading-relaxed">
                      No cookie-cutter templates. Every engagement begins with deep unit economics, customer psychographics, and competitor gap mapping.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-neutral-50 border border-neutral-200/80 hover:border-[#FF3B30]/30 transition-colors">
                <div className="flex items-start gap-3.5 sm:gap-4">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#FF3B30]/10 text-[#FF3B30] flex items-center justify-center shrink-0 mt-0.5">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-neutral-900">
                      Uncompromising Quality
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 mt-1 leading-relaxed">
                      From sub-second code delivery to high-fidelity 3D motion assets, we enforce meticulous craftsmanship across every creative asset.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-neutral-50 border border-neutral-200/80 hover:border-[#FF3B30]/30 transition-colors">
                <div className="flex items-start gap-3.5 sm:gap-4">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#FF3B30]/10 text-[#FF3B30] flex items-center justify-center shrink-0 mt-0.5">
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-neutral-900">
                      Compounding Velocity & Efficiency
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 mt-1 leading-relaxed">
                      Leveraging modern development frameworks and automated analytics to eliminate operational drag and accelerate your time-to-market.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* "Let's Connect" Circular Interactive Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
              <button
                onClick={handleConnectClick}
                className="group relative w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full bg-[#111111] hover:bg-[#FF3B30] text-white flex flex-col items-center justify-center p-3 sm:p-4 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#FF3B30]/40 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#FF3B30]/30 shrink-0"
                aria-label="Let's Connect - Redirect to Contact Us"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 group-hover:bg-white text-white group-hover:text-[#FF3B30] flex items-center justify-center mb-1 transition-colors">
                  <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-center leading-tight">
                  Let&apos;s
                  <br />
                  Connect
                </span>
                <span className="sr-only">Redirects to contact us page</span>
              </button>

              <div className="space-y-1">
                <p className="text-sm font-bold text-neutral-900">
                  Ready to transform your vision?
                </p>
                <p className="text-xs text-neutral-500 leading-relaxed max-w-xs">
                  Click the button to discuss your business objectives with our Bangalore leadership team.
                </p>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 pt-0.5">
                  <Check className="w-3.5 h-3.5" />
                  <span>Free Strategy Audit for Startups & SMBs</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
