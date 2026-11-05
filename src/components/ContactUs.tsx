import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle, User, FileText, ShieldCheck, Clock } from 'lucide-react';
import { ContactSubmission } from '../types';
import {
  validateName,
  validateEmail,
  validateMessage,
  checkRateLimit,
  isHoneypotTriggered,
  encodeHtmlEntities,
  sanitizeSingleLine
} from '../utils/security';

interface ContactUsProps {
  ownerEmail?: string;
  onNewSubmission: (submission: ContactSubmission) => void;
  preFilledService?: string;
}

export const ContactUs: React.FC<ContactUsProps> = ({
  ownerEmail = 'owner_email@gmail.com',
  onNewSubmission,
  preFilledService
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(
    preFilledService ? `Hi AJ Team,\n\nI am interested in learning more about your ${preFilledService} solutions for our company.\n\nKey requirements:\n- \n- \n` : ''
  );
  // Honeypot field to trap automated spambots (invisible to genuine users)
  const [honeypot, setHoneypot] = useState('');
  const [ageConsent, setAgeConsent] = useState(false);
  const [dataPrivacyConsent, setDataPrivacyConsent] = useState(false);
  const [termsConsent, setTermsConsent] = useState(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [rateLimitError, setRateLimitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);
  const [lastSubmissionDetails, setLastSubmissionDetails] = useState<{ id: string; name: string; email: string }>({
    id: '',
    name: '',
    email: ''
  });

  // Update message if preFilledService changes
  React.useEffect(() => {
    if (preFilledService) {
      const cleanService = sanitizeSingleLine(preFilledService, 50);
      setMessage((prev) =>
        prev.includes(cleanService)
          ? prev
          : `Hi AJ Team,\n\nI would like to inquire about your ${cleanService} services for our business.\n\nProject Overview:\n`
      );
    }
  }, [preFilledService]);

  const validateForm = () => {
    const errs: { [key: string]: string } = {};
    setRateLimitError('');

    // 1. Honeypot Bot Trap Check
    if (isHoneypotTriggered(honeypot)) {
      // Bot detected; silently fail without performing actions
      console.warn('SECURE_AUDIT: Automated bot submission blocked by honeypot.');
      return false;
    }

    // 2. Strict Name Validation & XSS Check
    const nameCheck = validateName(name);
    if (!nameCheck.valid) {
      errs.name = nameCheck.error || 'Invalid name provided.';
    }

    // 3. Strict RFC Email Validation & Header Injection Defense
    const emailCheck = validateEmail(email);
    if (!emailCheck.valid) {
      errs.email = emailCheck.error || 'Invalid email format.';
    }

    // 4. Strict Message Body Validation & XSS Stripping
    const messageCheck = validateMessage(message);
    if (!messageCheck.valid) {
      errs.message = messageCheck.error || 'Message must be between 10 and 3,000 characters.';
    }

    // 5. Statutory Consents
    if (!ageConsent) {
      errs.ageConsent = 'You must explicitly verify you are 18+ to enter a legal business contract in India.';
    }

    if (!dataPrivacyConsent) {
      errs.dataPrivacyConsent = 'Consent is required to ensure data is used purely for communication.';
    }

    if (!termsConsent) {
      errs.termsConsent = 'You must accept the terms and conditions.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // 6. Rate Limiting Check (Maximum 3 inquiries per 3 minutes)
    const rateCheck = checkRateLimit('aj_agency_contact_rate', 3, 180000);
    if (!rateCheck.allowed) {
      setRateLimitError(`Security Rate Limit: Too many requests. Please wait ${rateCheck.retryAfterSeconds} seconds before sending another inquiry.`);
      return;
    }

    setIsSubmitting(true);

    const safeName = validateName(name).cleanValue;
    const safeEmail = validateEmail(email).cleanValue;
    const safeMessage = validateMessage(message).cleanValue;
    const submissionId = `AJ-${Date.now().toString().slice(-6)}`;

    const newSubmission: ContactSubmission = {
      id: submissionId,
      timestamp: new Date().toISOString(),
      name: safeName,
      email: safeEmail,
      message: safeMessage,
      ageConsent,
      dataPrivacyConsent,
      termsConsent,
      sentToOwnerEmail: ownerEmail,
      status: 'delivered'
    };

    // Prepare email mailto payload with CRLF-sanitized header content
    const emailSubject = encodeURIComponent(
      `[New Business Inquiry] from ${safeName} (${submissionId})`
    );
    const emailBody = encodeURIComponent(
      `Hello AJ Advertising Agency Owner,\n\nYou have received a new business inquiry via the website contact portal.\n\n` +
      `-----------------------------------------\n` +
      `CLIENT DETAILS:\n` +
      `Name: ${safeName}\n` +
      `Email: ${safeEmail}\n` +
      `Submission ID: ${submissionId}\n` +
      `Date: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST\n` +
      `-----------------------------------------\n` +
      `PROJECT / INQUIRY MESSAGE:\n` +
      `${safeMessage}\n\n` +
      `-----------------------------------------\n` +
      `STATUTORY CONSENT VERIFICATION:\n` +
      `[x] 18+ Age Verified (Indian Contract Act, 1872)\n` +
      `[x] Data Privacy Consented (No broker transfer / DPDP Act compliant)\n` +
      `[x] Terms & Conditions Accepted\n\n` +
      `Directly dispatched to verified Agency Owner Email: ${ownerEmail}`
    );

    const mailtoUrl = `mailto:${ownerEmail}?subject=${emailSubject}&body=${emailBody}`;

    setTimeout(() => {
      onNewSubmission(newSubmission);
      setLastSubmissionDetails({
        id: submissionId,
        name: safeName,
        email: safeEmail
      });
      setIsSubmitting(false);
      setSubmittedSuccessfully(true);

      // Trigger user's default email client pre-addressed to the owner's email
      try {
        const mailLink = document.createElement('a');
        mailLink.href = mailtoUrl;
        mailLink.target = '_blank';
        mailLink.rel = 'noopener noreferrer';
        mailLink.click();
      } catch (err) {
        console.error('Mailto dispatch error:', err);
      }
    }, 600);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setMessage('');
    setHoneypot('');
    setAgeConsent(false);
    setDataPrivacyConsent(false);
    setTermsConsent(false);
    setErrors({});
    setRateLimitError('');
    setSubmittedSuccessfully(false);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-[#111111] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 lg:gap-16 items-start">
          
          {/* Left Column: Heading & Strategic Narrative (md: 5 cols) */}
          <div className="md:col-span-5 space-y-5 lg:space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-neutral-400 uppercase">
              <span className="text-[#FF3B30]">//</span>
              <span>GET IN TOUCH</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Contact us
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-neutral-300/80 leading-relaxed">
              Have an upcoming product launch, website overhaul, or performance marketing campaign? Tell us about your goals. All submissions are dispatched directly to the agency owner&apos;s verified inbox.
            </p>

            {/* Owner Email Routing Transparency Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2.5 sm:space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-neutral-400 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#FF3B30]" />
                  Recipient Owner Inbox
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
                  DIRECT ROUTING
                </span>
              </div>
              <p className="text-xs sm:text-sm font-mono font-semibold text-neutral-200 break-all">
                {ownerEmail}
              </p>
              <div className="pt-2 border-t border-neutral-800/80 text-[11px] sm:text-xs text-neutral-400">
                <span>All submitted inquiries are delivered directly to the agency owner.</span>
              </div>
            </div>

            {/* Legal compliance notice */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 text-[11px] sm:text-xs text-neutral-400 space-y-1.5 leading-relaxed">
              <p className="font-semibold text-neutral-300">
                Statutory Compliance (Republic of India):
              </p>
              <p>
                In compliance with the Indian Contract Act, 1872 and the Digital Personal Data Protection (DPDP) Act, 2023, client inquiries require age verification and explicit non-brokerage data consent.
              </p>
            </div>
          </div>

          {/* Right Column: Clean Minimalist Form (md: 7 cols) */}
          <div className="md:col-span-7">
            <div className="rounded-3xl bg-neutral-900/90 border border-neutral-800 p-5 sm:p-7 lg:p-10 shadow-2xl relative">
              
              {submittedSuccessfully ? (
                /* Success State */
                <div className="py-8 text-center space-y-5 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-white">
                      Inquiry Dispatched Successfully!
                    </h3>
                    <p className="text-sm text-neutral-300 max-w-md mx-auto">
                      Your details have been securely logged and forwarded to the agency owner&apos;s email:
                    </p>
                    <p className="font-mono text-sm font-bold text-[#FF3B30] bg-neutral-950 py-1.5 px-4 rounded-lg inline-block border border-neutral-800">
                      {ownerEmail}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 text-left max-w-md mx-auto space-y-2 text-xs text-neutral-400">
                    <div className="flex justify-between border-b border-neutral-800/80 pb-2">
                      <span>Receipt ID:</span>
                      <span className="font-mono text-white font-bold">{lastSubmissionDetails.id}</span>
                    </div>
                    <div className="flex justify-between border-b border-neutral-800/80 pb-2">
                      <span>Client Name:</span>
                      <span className="text-white font-medium">{encodeHtmlEntities(lastSubmissionDetails.name)}</span>
                    </div>
                    <div className="flex justify-between border-b border-neutral-800/80 pb-2">
                      <span>Sender Email:</span>
                      <span className="text-white font-medium">{encodeHtmlEntities(lastSubmissionDetails.email)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Response SLA:</span>
                      <span className="text-emerald-400 font-bold">&lt; 24 Hours</span>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-6 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs tracking-wider uppercase transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                /* Minimalist Form */
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  
                  {/* Security Rate Limit Alert */}
                  {rateLimitError && (
                    <div className="p-4 rounded-xl bg-[#FF3B30]/10 border border-[#FF3B30]/40 text-xs text-white flex items-center gap-3 animate-shake">
                      <Clock className="w-5 h-5 text-[#FF3B30] shrink-0" />
                      <p>{rateLimitError}</p>
                    </div>
                  )}

                  {/* Honeypot Bot Trap (invisible to humans) */}
                  <div className="hidden opacity-0 pointer-events-none absolute -left-[9999px]" aria-hidden="true">
                    <label htmlFor="company_website_url">Do not fill this field</label>
                    <input
                      id="company_website_url"
                      type="text"
                      name="company_website_url"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {/* Name Field */}
                  <div className="space-y-2">
                    <label htmlFor="client-name" className="block text-xs font-bold uppercase tracking-wider text-neutral-300">
                      Your Name <span className="text-[#FF3B30]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="client-name"
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                        }}
                        placeholder="e.g. Pooja Sharma"
                        className={`w-full px-4 py-3.5 rounded-xl bg-neutral-950 border ${
                          errors.name ? 'border-[#FF3B30] ring-1 ring-[#FF3B30]' : 'border-neutral-800'
                        } text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#FF3B30] focus:ring-2 focus:ring-[#FF3B30]/30 transition-all`}
                        disabled={isSubmitting}
                      />
                      <User className="w-4 h-4 text-neutral-500 absolute right-4 top-3.5 pointer-events-none" />
                    </div>
                    {errors.name && (
                      <p className="text-xs text-[#FF3B30] flex items-center gap-1 pt-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label htmlFor="client-email" className="block text-xs font-bold uppercase tracking-wider text-neutral-300">
                      Your E-mail <span className="text-[#FF3B30]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="client-email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                        }}
                        placeholder="e.g. founder@startup.in"
                        className={`w-full px-4 py-3.5 rounded-xl bg-neutral-950 border ${
                          errors.email ? 'border-[#FF3B30] ring-1 ring-[#FF3B30]' : 'border-neutral-800'
                        } text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#FF3B30] focus:ring-2 focus:ring-[#FF3B30]/30 transition-all`}
                        disabled={isSubmitting}
                      />
                      <Mail className="w-4 h-4 text-neutral-500 absolute right-4 top-3.5 pointer-events-none" />
                    </div>
                    {errors.email && (
                      <p className="text-xs text-[#FF3B30] flex items-center gap-1 pt-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  {/* Message (textarea) */}
                  <div className="space-y-2">
                    <label htmlFor="client-message" className="block text-xs font-bold uppercase tracking-wider text-neutral-300">
                      Message <span className="text-[#FF3B30]">*</span>
                    </label>
                    <div className="relative">
                      <textarea
                        id="client-message"
                        rows={4}
                        value={message}
                        onChange={(e) => {
                          setMessage(e.target.value);
                          if (errors.message) setErrors((prev) => ({ ...prev, message: '' }));
                        }}
                        placeholder="Describe your project, timeline, target deliverables, or growth challenges..."
                        className={`w-full px-4 py-3.5 rounded-xl bg-neutral-950 border ${
                          errors.message ? 'border-[#FF3B30] ring-1 ring-[#FF3B30]' : 'border-neutral-800'
                        } text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#FF3B30] focus:ring-2 focus:ring-[#FF3B30]/30 transition-all resize-y`}
                        disabled={isSubmitting}
                      />
                      <FileText className="w-4 h-4 text-neutral-500 absolute right-4 top-3.5 pointer-events-none" />
                    </div>
                    {errors.message && (
                      <p className="text-xs text-[#FF3B30] flex items-center gap-1 pt-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Required Consent Checkboxes Section */}
                  <div className="pt-2 space-y-3.5 border-t border-neutral-800">
                    
                    {/* 1. Age Consent Checkbox */}
                    <label htmlFor="age-consent" className="p-3 rounded-xl bg-neutral-950/70 border border-neutral-800/90 hover:border-neutral-700 transition-colors flex items-start gap-3 cursor-pointer select-none">
                      <input
                        id="age-consent"
                        type="checkbox"
                        checked={ageConsent}
                        onChange={(e) => {
                          setAgeConsent(e.target.checked);
                          if (errors.ageConsent) setErrors((prev) => ({ ...prev, ageConsent: '' }));
                        }}
                        className="mt-0.5 w-4 h-4 rounded border-neutral-700 bg-neutral-950 text-[#FF3B30] focus:ring-[#FF3B30] focus:ring-offset-neutral-900 cursor-pointer accent-[#FF3B30] shrink-0"
                        disabled={isSubmitting}
                      />
                      <span className="text-xs text-neutral-300 leading-normal">
                        <strong className="font-semibold text-white">Age Consent:</strong> I explicitly verify that I am 18+ years of age to legally enter a business contract in India. <span className="text-[#FF3B30]">*</span>
                      </span>
                    </label>
                    {errors.ageConsent && (
                      <p className="text-[11px] text-[#FF3B30] pl-2">{errors.ageConsent}</p>
                    )}

                    {/* 2. Data Privacy Consent Checkbox */}
                    <label htmlFor="privacy-consent" className="p-3 rounded-xl bg-neutral-950/70 border border-neutral-800/90 hover:border-neutral-700 transition-colors flex items-start gap-3 cursor-pointer select-none">
                      <input
                        id="privacy-consent"
                        type="checkbox"
                        checked={dataPrivacyConsent}
                        onChange={(e) => {
                          setDataPrivacyConsent(e.target.checked);
                          if (errors.dataPrivacyConsent) setErrors((prev) => ({ ...prev, dataPrivacyConsent: '' }));
                        }}
                        className="mt-0.5 w-4 h-4 rounded border-neutral-700 bg-neutral-950 text-[#FF3B30] focus:ring-[#FF3B30] focus:ring-offset-neutral-900 cursor-pointer accent-[#FF3B30] shrink-0"
                        disabled={isSubmitting}
                      />
                      <span className="text-xs text-neutral-300 leading-normal">
                        <strong className="font-semibold text-white">Data Privacy Consent:</strong> Ensuring that data is purely used for business communication and will not be sold to third-party brokers. <span className="text-[#FF3B30]">*</span>
                      </span>
                    </label>
                    {errors.dataPrivacyConsent && (
                      <p className="text-[11px] text-[#FF3B30] pl-2">{errors.dataPrivacyConsent}</p>
                    )}

                    {/* 3. Terms and Condition Checkbox */}
                    <label htmlFor="terms-consent" className="p-3 rounded-xl bg-neutral-950/70 border border-neutral-800/90 hover:border-neutral-700 transition-colors flex items-start gap-3 cursor-pointer select-none">
                      <input
                        id="terms-consent"
                        type="checkbox"
                        checked={termsConsent}
                        onChange={(e) => {
                          setTermsConsent(e.target.checked);
                          if (errors.termsConsent) setErrors((prev) => ({ ...prev, termsConsent: '' }));
                        }}
                        className="mt-0.5 w-4 h-4 rounded border-neutral-700 bg-neutral-950 text-[#FF3B30] focus:ring-[#FF3B30] focus:ring-offset-neutral-900 cursor-pointer accent-[#FF3B30] shrink-0"
                        disabled={isSubmitting}
                      />
                      <span className="text-xs text-neutral-300 leading-normal">
                        <strong className="font-semibold text-white">Terms and condition:</strong> A checkbox ensuring that data is purely used for business communication and will not be sold to third-party brokers. <span className="text-[#FF3B30]">*</span>
                      </span>
                    </label>
                    {errors.termsConsent && (
                      <p className="text-[11px] text-[#FF3B30] pl-2">{errors.termsConsent}</p>
                    )}

                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-6 rounded-2xl bg-[#FF3B30] hover:bg-[#E0261B] text-white font-bold text-sm sm:text-base tracking-wide transition-all duration-200 shadow-xl shadow-[#FF3B30]/30 hover:shadow-[#FF3B30]/50 flex items-center justify-center gap-2.5 disabled:opacity-70 disabled:cursor-not-allowed group"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Routing to Owner&apos;s Email...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit & Send to Owner</span>
                          <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                    <p className="text-center text-[11px] text-neutral-400 mt-3">
                      Submitted inquiry will be dispatched directly to <strong className="text-neutral-300 font-mono">{ownerEmail}</strong>.
                    </p>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
