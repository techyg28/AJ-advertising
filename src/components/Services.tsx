import React, { useState } from 'react';
import { TrendingUp, Code2, Film, ArrowRight, Sparkles } from 'lucide-react';
import { SERVICES_DATA } from '../data/agencyData';
import { ServiceItem } from '../types';
import { ServiceModal } from './ServiceModal';

interface ServicesProps {
  onPreFillService?: (serviceName: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onPreFillService }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'digital-marketing':
        return <TrendingUp className="w-6 h-6" />;
      case 'web-development':
        return <Code2 className="w-6 h-6" />;
      case 'media-marketing':
        return <Film className="w-6 h-6" />;
      default:
        return <Sparkles className="w-6 h-6" />;
    }
  };

  const handleInquiryFromModal = (serviceName: string) => {
    if (onPreFillService) {
      onPreFillService(serviceName);
    }
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="services" className="py-24 sm:py-32 bg-[#F9FAFB] text-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <span className="text-[#FF3B30] font-bold text-xs uppercase tracking-widest block mb-2">
            What We Do Best
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-950">
            Services
          </h2>
          <p className="mt-4 text-base text-neutral-600 leading-relaxed">
            High-caliber digital capabilities built for aggressive market acquisition, brand distinction, and durable technological leverage.
          </p>
        </div>

        {/* 3-Column Grid Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-8 items-stretch">
          {SERVICES_DATA.map((service) => {
            const isHighlight = service.isPopular;

            return (
              <div
                key={service.id}
                className={`flex flex-col justify-between rounded-3xl p-5 sm:p-6 lg:p-8 transition-all duration-300 relative group ${
                  isHighlight
                    ? 'bg-white border-2 border-[#FF3B30] shadow-xl shadow-[#FF3B30]/10 ring-4 ring-[#FF3B30]/5 md:-translate-y-1 lg:-translate-y-2'
                    : 'bg-white border border-neutral-200/90 shadow-sm hover:shadow-xl hover:border-neutral-300 hover:-translate-y-1'
                }`}
              >
                {/* Red Accent Badge for Highlighted Card Variant */}
                {isHighlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-[#FF3B30] text-white text-[10px] sm:text-[11px] font-black uppercase tracking-wider shadow-md whitespace-nowrap">
                    {service.badge || 'FEATURED'}
                  </div>
                )}

                <div>
                  {/* Icon Block */}
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-5 sm:mb-6 transition-colors ${
                      isHighlight
                        ? 'bg-[#FF3B30] text-white shadow-lg shadow-[#FF3B30]/30'
                        : 'bg-neutral-100 text-[#FF3B30] group-hover:bg-[#FF3B30]/10'
                    }`}
                  >
                    {getServiceIcon(service.id)}
                  </div>

                  {/* Category Muted */}
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                    {service.category}
                  </span>

                  {/* Card Title */}
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-neutral-900 tracking-tight mb-2.5">
                    {service.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-5 sm:mb-6">
                    {service.shortDesc}
                  </p>

                  {/* Deliverable preview bullets */}
                  <div className="space-y-2 pt-3.5 border-t border-neutral-100 mb-5 sm:mb-6">
                    {service.deliverables.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-neutral-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B30] shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Button Section */}
                <div className="pt-2">
                  {isHighlight ? (
                    <button
                      onClick={() => setSelectedService(service)}
                      className="w-full py-2.5 sm:py-3 px-4 sm:px-5 rounded-xl bg-[#FF3B30] hover:bg-[#E0261B] text-white font-bold text-xs sm:text-sm transition-all duration-200 shadow-md shadow-[#FF3B30]/30 hover:shadow-lg hover:shadow-[#FF3B30]/40 flex items-center justify-center gap-1.5 sm:gap-2"
                    >
                      <span>Read More & View Tech</span>
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setSelectedService(service)}
                      className="w-full py-2.5 sm:py-3 px-4 sm:px-5 rounded-xl border border-neutral-300 hover:border-[#FF3B30] text-neutral-800 hover:text-[#FF3B30] hover:bg-[#FF3B30]/5 font-semibold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-1.5 sm:gap-2"
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="mt-16 p-6 sm:p-8 rounded-3xl bg-neutral-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#FF3B30] font-bold">
              Custom Engagements
            </p>
            <h3 className="text-lg sm:text-xl font-bold mt-1 text-white">
              Need a blended package tailored specifically to your roadmap?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              We design modular quarterly scopes for fast-growing ventures and SMBs.
            </p>
          </div>
          <a
            href="#contact"
            className="px-6 py-3 rounded-xl bg-white text-neutral-900 hover:bg-neutral-100 font-bold text-xs uppercase tracking-wider transition-colors shrink-0 whitespace-nowrap"
          >
            Request Custom Scope
          </a>
        </div>

      </div>

      {/* Read More Detail Modal */}
      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onSelectServiceForContact={handleInquiryFromModal}
      />
    </section>
  );
};
