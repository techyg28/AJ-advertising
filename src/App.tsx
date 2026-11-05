import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutUs } from './components/AboutUs';
import { Services } from './components/Services';
import { Team } from './components/Team';
import { ContactUs } from './components/ContactUs';
import { Footer } from './components/Footer';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ContactSubmission } from './types';
import { AGENCY_INFO } from './data/agencyData';

export default function App() {
  const OWNER_EMAIL = AGENCY_INFO.defaultOwnerEmail; // 'owner_email@gmail.com'

  const [submissions, setSubmissions] = useState<ContactSubmission[]>(() => {
    try {
      const saved = localStorage.getItem('aj_agency_submissions');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [preFilledService, setPreFilledService] = useState<string>('');

  const handleNewSubmission = (newSub: ContactSubmission) => {
    setSubmissions((prev) => {
      const updated = [newSub, ...prev];
      try {
        localStorage.setItem('aj_agency_submissions', JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });
  };

  const handlePreFillService = (serviceName: string) => {
    setPreFilledService(serviceName);
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen w-full overflow-x-hidden bg-[#111111] text-white flex flex-col font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#FF3B30] selection:text-white">
        {/* Sticky Navigation Bar */}
        <Navbar />

        {/* Main Content Sections */}
        <main className="flex-grow">
          {/* Hero Section (Dark Theme #111111) */}
          <Hero />

          {/* About Us Section (Clean Light Theme #FFFFFF) */}
          <AboutUs />

          {/* Services Section (Light Theme #F9FAFB / White cards) */}
          <Services onPreFillService={handlePreFillService} />

          {/* Our Team Section (Dark Theme #111111) */}
          <Team />

          {/* Contact Us Section (Dark Theme #111111 with Age Verification & Statutory Consents) */}
          <ContactUs
            ownerEmail={OWNER_EMAIL}
            onNewSubmission={handleNewSubmission}
            preFilledService={preFilledService}
          />
        </main>

        {/* Footer with Bangalore Rural Address & Statutory Disclaimers */}
        <Footer ownerEmail={OWNER_EMAIL} />
      </div>
    </ErrorBoundary>
  );
}
