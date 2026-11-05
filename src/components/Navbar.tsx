import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#111111]/95 backdrop-blur-md border-b border-neutral-800/80 shadow-xl py-3.5'
          : 'bg-[#111111]/60 backdrop-blur-sm border-b border-white/5 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 lg:gap-8">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, 'home')}
            className="flex items-center gap-2.5 group whitespace-nowrap shrink-0 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3B30] rounded-lg"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#FF3B30] to-[#E0261B] flex items-center justify-center font-black text-white text-base sm:text-lg tracking-wider shadow-lg shadow-[#FF3B30]/30 group-hover:scale-105 transition-transform duration-200">
              AJ
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-white leading-tight">
                AJ ADVERTISING
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-neutral-400 font-semibold">
                Creative Agency
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links (Responsive Tablet to Desktop) */}
          <nav className="hidden md:flex items-center md:gap-5 lg:gap-8 text-xs lg:text-sm font-medium text-neutral-300">
            <a
              href="#home"
              onClick={(e) => scrollToSection(e, 'home')}
              className="hover:text-white transition-colors duration-200 whitespace-nowrap shrink-0 relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#FF3B30] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              Home
            </a>
            <a
              href="#about"
              onClick={(e) => scrollToSection(e, 'about')}
              className="hover:text-white transition-colors duration-200 whitespace-nowrap shrink-0 relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#FF3B30] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              About us
            </a>
            <a
              href="#services"
              onClick={(e) => scrollToSection(e, 'services')}
              className="hover:text-white transition-colors duration-200 whitespace-nowrap shrink-0 relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#FF3B30] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              Services
            </a>
            <a
              href="#team"
              onClick={(e) => scrollToSection(e, 'team')}
              className="hover:text-white transition-colors duration-200 whitespace-nowrap shrink-0 relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#FF3B30] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              Our Team
            </a>
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, 'contact')}
              className="hover:text-white transition-colors duration-200 whitespace-nowrap shrink-0 relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#FF3B30] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              Contact us
            </a>
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, 'contact')}
              className="inline-flex items-center gap-1.5 md:gap-2 px-4 py-2 lg:px-5 lg:py-2.5 rounded-xl bg-[#FF3B30] hover:bg-[#E0261B] text-white font-semibold text-xs lg:text-sm transition-all duration-200 shadow-md shadow-[#FF3B30]/25 hover:shadow-lg hover:shadow-[#FF3B30]/40 group whitespace-nowrap shrink-0"
            >
              <span>Start Project</span>
              <ArrowUpRight className="w-3.5 h-3.5 lg:w-4 lg:h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-neutral-300 hover:text-white hover:bg-neutral-800/80 rounded-xl transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#161616] border-b border-neutral-800 px-6 py-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3 text-base font-medium text-neutral-200">
            <a
              href="#home"
              onClick={(e) => scrollToSection(e, 'home')}
              className="py-2 hover:text-[#FF3B30] transition-colors"
            >
              Home
            </a>
            <a
              href="#about"
              onClick={(e) => scrollToSection(e, 'about')}
              className="py-2 hover:text-[#FF3B30] transition-colors"
            >
              About us
            </a>
            <a
              href="#services"
              onClick={(e) => scrollToSection(e, 'services')}
              className="py-2 hover:text-[#FF3B30] transition-colors"
            >
              Services
            </a>
            <a
              href="#team"
              onClick={(e) => scrollToSection(e, 'team')}
              className="py-2 hover:text-[#FF3B30] transition-colors"
            >
              Our Team
            </a>
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, 'contact')}
              className="py-2 hover:text-[#FF3B30] transition-colors"
            >
              Contact us
            </a>
          </nav>
          <div className="pt-4 border-t border-neutral-800 flex flex-col gap-3">
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, 'contact')}
              className="w-full text-center py-3 rounded-xl bg-[#FF3B30] hover:bg-[#E0261B] text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
            >
              <span>Start Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
