import React from 'react';
import { MapPin, Phone, Mail, Shield, ArrowUp } from 'lucide-react';
import { AGENCY_INFO } from '../data/agencyData';

interface FooterProps {
  ownerEmail?: string;
}

export const Footer: React.FC<FooterProps> = ({ ownerEmail = 'owner_email@gmail.com' }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="bg-[#0D0D0D] text-white border-t border-neutral-800/80 pt-16 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-8 lg:gap-12 pb-16 border-b border-neutral-800/80">
          
          {/* Brand & Mission (md: 1 col, lg: 5 cols) */}
          <div className="md:col-span-1 lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF3B30] to-[#E0261B] flex items-center justify-center font-black text-white text-base tracking-wider shadow-md shadow-[#FF3B30]/30">
                AJ
              </div>
              <span className="font-extrabold text-lg tracking-tight text-white">
                AJ ADVERTISING AGENCY
              </span>
            </div>

            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
              Modern digital advertising agency empowering individuals, high-velocity startups, and growing SMBs with measurable performance marketing, custom web architectures, and cinematic brand identity.
            </p>

            <div className="pt-2 text-xs text-neutral-500 font-mono">
              <span>Jurisdiction: {AGENCY_INFO.jurisdiction}</span>
            </div>
          </div>

          {/* Navigation Links (md: 1 col, lg: 3 cols) */}
          <div className="md:col-span-1 lg:col-span-3 space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-[#FF3B30]">
              Navigation
            </p>
            <ul className="space-y-2 text-sm text-neutral-300">
              <li>
                <a
                  href="#home"
                  onClick={(e) => scrollToSection(e, 'home')}
                  className="hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => scrollToSection(e, 'about')}
                  className="hover:text-white transition-colors"
                >
                  About us
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => scrollToSection(e, 'services')}
                  className="hover:text-white transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#team"
                  onClick={(e) => scrollToSection(e, 'team')}
                  className="hover:text-white transition-colors"
                >
                  Our Team
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, 'contact')}
                  className="hover:text-white transition-colors"
                >
                  Contact us
                </a>
              </li>
            </ul>
          </div>

          {/* Registered Office & Contact Placeholders (md: 2 cols spanning full tablet width, lg: 4 cols) */}
          <div className="md:col-span-2 lg:col-span-4 space-y-4 pt-4 md:pt-0 border-t md:border-t-0 border-neutral-800">
            <p className="text-xs font-bold uppercase tracking-widest text-[#FF3B30]">
              Registered Indian Office
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 text-sm text-neutral-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#FF3B30] shrink-0 mt-1" />
                <div>
                  <p className="text-xs text-neutral-500 uppercase font-semibold">
                    Office Address:
                  </p>
                  <p className="font-medium text-white">{AGENCY_INFO.registeredAddress}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#FF3B30] shrink-0 mt-1" />
                <div>
                  <p className="text-xs text-neutral-500 uppercase font-semibold">
                    Office Contact Number:
                  </p>
                  <a
                    href={`tel:${AGENCY_INFO.contactPhone}`}
                    className="font-mono text-white hover:text-[#FF3B30] transition-colors"
                  >
                    {AGENCY_INFO.contactPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#FF3B30] shrink-0 mt-1" />
                <div>
                  <p className="text-xs text-neutral-500 uppercase font-semibold">
                    Email Address:
                  </p>
                  <a
                    href={`mailto:${ownerEmail}`}
                    className="font-mono text-white hover:text-[#FF3B30] transition-colors break-all"
                  >
                    {ownerEmail}
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Legal Disclaimers & Statutory Declarations */}
        <div className="py-8 border-b border-neutral-800/80 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400">
            <Shield className="w-4 h-4 text-[#FF3B30]" />
            <span>Statutory Disclaimers & Contractual Policy</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-neutral-400 leading-relaxed">
            <p>
              <strong className="text-neutral-300">Indian Contract Act, 1872 Notice:</strong> All digital marketing scopes, development agreements, and retainers are executed strictly with individuals or business authorized representatives aged 18 years and above possessing legal capacity to contract under the laws of the Republic of India.
            </p>
            <p>
              <strong className="text-neutral-300">Data Privacy & Non-Brokerage Guarantee:</strong> Client information and inquiries collected through this platform are utilized exclusively for direct business communication and preliminary proposal scoping. Information is never sold, leased, or disclosed to third-party data brokers or marketing lists.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} AJ Advertising Agency. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors flex items-center gap-1"
              aria-label="Back to top of page"
            >
              <span className="text-[11px] font-semibold">Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
