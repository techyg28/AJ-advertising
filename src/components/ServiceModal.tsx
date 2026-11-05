import React from 'react';
import { X, Check, ArrowRight, Sparkles } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onSelectServiceForContact: (serviceName: string) => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  service,
  onClose,
  onSelectServiceForContact
}) => {
  if (!service) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white text-neutral-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 relative max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors"
          aria-label="Close service details modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="pr-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF3B30] bg-[#FF3B30]/10 px-2.5 py-1 rounded-full">
              {service.category}
            </span>
            {service.isPopular && (
              <span className="text-xs font-extrabold uppercase tracking-wider text-white bg-[#FF3B30] px-2.5 py-1 rounded-full">
                Featured Specialization
              </span>
            )}
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight">
            {service.title}
          </h3>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 leading-relaxed">
            {service.detailedOverview}
          </p>
        </div>

        {/* Deliverables Section */}
        <div className="mt-6 pt-6 border-t border-neutral-100">
          <h4 className="text-xs font-black uppercase tracking-wider text-neutral-400 mb-3">
            Core Scope of Deliverables
          </h4>
          <ul className="space-y-2.5">
            {service.deliverables.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-sm text-neutral-700">
                <div className="w-5 h-5 rounded-full bg-[#FF3B30]/10 text-[#FF3B30] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Target Audience & Metrics */}
        <div className="mt-6 p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-neutral-500 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#FF3B30]" />
            <span>Proven Benchmark</span>
          </div>
          <p className="text-sm font-semibold text-neutral-900">
            {service.impactMetric}
          </p>
          <p className="text-xs text-neutral-500">
            <strong className="text-neutral-700">Designed for:</strong> {service.targetAudience}
          </p>
        </div>

        {/* Tech Stack Pills */}
        <div className="mt-6">
          <h4 className="text-xs font-black uppercase tracking-wider text-neutral-400 mb-2">
            Tooling & Frameworks
          </h4>
          <div className="flex flex-wrap gap-2">
            {service.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-lg bg-neutral-100 text-neutral-800 text-xs font-medium border border-neutral-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 pt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-neutral-300 text-neutral-700 font-semibold text-sm hover:bg-neutral-100 transition-colors"
          >
            Close Overview
          </button>
          <button
            onClick={() => {
              onSelectServiceForContact(service.title);
              onClose();
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#FF3B30] hover:bg-[#E0261B] text-white font-bold text-sm shadow-lg shadow-[#FF3B30]/30 transition-all flex items-center justify-center gap-2"
          >
            <span>Inquire About {service.title}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
