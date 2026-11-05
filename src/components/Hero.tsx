import React from 'react';
import { ArrowDownRight, Sparkles, TrendingUp, CheckCircle2 } from 'lucide-react';
import heroDigitalShowcase from '../assets/images/hero_digital_showcase_1793879736627.jpg';

export const Hero: React.FC = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="home" className="relative min-h-[92vh] pt-28 pb-20 bg-[#111111] text-white flex items-center overflow-hidden">
      {/* Subtle atmospheric ambient glow */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#FF3B30]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full overflow-hidden sm:overflow-visible">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Typography & CTAs (md: 7 cols) */}
          <div className="md:col-span-7 space-y-5 lg:space-y-6">
            
            {/* Small Top Subheadline */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 text-[11px] sm:text-xs font-semibold text-neutral-300 tracking-wider">
              <span className="text-[#FF3B30] font-mono">//</span>
              <span>WE ARE AJ ADVERTISING AGENCY</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-[2.6rem] lg:text-[4rem] font-black tracking-tight leading-[1.08] text-white uppercase text-balance">
              CREATIVITY <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-400">
                INNOVATION
              </span>{' '}
              <span className="text-[#FF3B30]">&</span> <br />
              <span className="relative inline-block">
                USER EXPERIENCE
                <span className="absolute -bottom-1.5 left-0 right-0 h-1 bg-gradient-to-r from-[#FF3B30] to-transparent rounded-full" />
              </span>
            </h1>

            {/* Supporting Description Paragraph */}
            <p className="text-sm sm:text-base lg:text-lg text-neutral-300/90 max-w-2xl leading-relaxed">
              We empower ambitious individual creators, high-velocity startups, and forward-thinking small-to-medium businesses (SMBs) with cutting-edge digital advertising, high-conversion web development, and immersive brand storytelling that scales sustainable revenue.
            </p>

            {/* Action Row & Diagonal Arrow Explore Button */}
            <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-4 sm:gap-5">
              
              {/* Primary Contact CTA */}
              <button
                onClick={scrollToContact}
                className="px-5 sm:px-7 py-3 sm:py-3.5 rounded-2xl bg-[#FF3B30] hover:bg-[#E0261B] text-white font-bold text-xs sm:text-sm lg:text-base tracking-wide transition-all duration-200 shadow-xl shadow-[#FF3B30]/30 hover:shadow-[#FF3B30]/50 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
              >
                <span>Launch Your Campaign</span>
                <Sparkles className="w-4 h-4" />
              </button>

              {/* Diagonal Arrow / Explore Button */}
              <button
                onClick={scrollToAbout}
                aria-label="Explore our work and agency strategies"
                className="group flex items-center gap-2.5 sm:gap-3 text-neutral-300 hover:text-white transition-colors"
              >
                <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-neutral-900 border border-neutral-800 group-hover:border-[#FF3B30] group-hover:bg-[#1f1615] flex items-center justify-center transition-all duration-300 shadow-lg group-hover:scale-105">
                  <ArrowDownRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF3B30] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform duration-300" />
                </div>
                <div className="text-left">
                  <span className="block text-[10px] sm:text-xs uppercase font-bold tracking-wider text-neutral-400 group-hover:text-neutral-200">
                    Explore
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-white">
                    Our Impact & Philosophy
                  </span>
                </div>
              </button>
            </div>

            {/* Trust Badges Bar */}
            <div className="pt-4 sm:pt-6 grid grid-cols-3 gap-2 sm:gap-4 border-t border-neutral-800/80 max-w-xl">
              <div>
                <p className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight tabular-nums">
                  +280%
                </p>
                <p className="text-[10px] sm:text-xs text-neutral-400 font-medium mt-0.5">
                  Avg. Client Growth
                </p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight tabular-nums">
                  99.4%
                </p>
                <p className="text-[10px] sm:text-xs text-neutral-400 font-medium mt-0.5">
                  Satisfaction Rate
                </p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight tabular-nums">
                  120+
                </p>
                <p className="text-[10px] sm:text-xs text-neutral-400 font-medium mt-0.5">
                  Startups & SMBs Scaled
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Styled Composition with Floating Cards (md: 5 cols) */}
          <div className="md:col-span-5 relative mt-4 md:mt-0">
            <div className="relative mx-auto max-w-sm md:max-w-none">
              
              {/* Backing Ambient Frame */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#FF3B30]/40 to-neutral-700/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition duration-1000"></div>

              {/* Main Visual Card */}
              <div className="relative rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-900/90 shadow-2xl">
                <img
                  src={heroDigitalShowcase}
                  alt="Modern digital products, tablets and creative campaigns over warm architectural horizon"
                  className="w-full h-auto object-cover transform hover:scale-102 transition-transform duration-700 aspect-[16/11]"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />

                {/* Overlaid Gradient Sheen */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/90 via-[#111111]/20 to-transparent pointer-events-none" />

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-3 sm:p-4 rounded-2xl bg-[#111111]/90 backdrop-blur-md border border-neutral-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#FF3B30]/20 border border-[#FF3B30]/40 flex items-center justify-center text-[#FF3B30] shrink-0">
                      <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] sm:text-xs uppercase font-bold tracking-wider text-[#FF3B30]">
                        Omnichannel Strategy
                      </p>
                      <p className="text-xs sm:text-sm font-semibold text-white">
                        Performance & Brand Synergy
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] sm:text-xs font-mono bg-neutral-800 text-neutral-300 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg border border-neutral-700">
                    High ROI
                  </span>
                </div>
              </div>

              {/* Floating Badge 1 (Top Right) */}
              <div className="absolute -top-3 right-2 sm:-top-5 sm:-right-2 md:-right-3 bg-[#161616]/95 backdrop-blur-md border border-neutral-700/80 rounded-2xl p-2.5 sm:p-3.5 shadow-2xl flex items-center gap-2 sm:gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div>
                  <p className="text-[9px] sm:text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                    Client Conversion
                  </p>
                  <p className="text-[11px] sm:text-xs font-bold text-white tabular-nums">
                    +4.6x Pipeline Velocity
                  </p>
                </div>
              </div>

              {/* Floating Badge 2 (Bottom Left) */}
              <div className="absolute -bottom-4 left-2 sm:-bottom-5 sm:-left-2 md:-left-3 bg-[#161616]/95 backdrop-blur-md border border-neutral-700/80 rounded-2xl p-2.5 sm:p-3.5 shadow-2xl flex items-center gap-2 sm:gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#FF3B30]/20 text-[#FF3B30] flex items-center justify-center font-black text-xs shrink-0">
                  AJ
                </div>
                <div>
                  <p className="text-[9px] sm:text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                    Serving Worldwide
                  </p>
                  <p className="text-[11px] sm:text-xs font-bold text-white">
                    HQ: Bangalore Rural, India
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
