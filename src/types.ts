export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  isPopular?: boolean;
  shortDesc: string;
  badge?: string;
  detailedOverview: string;
  deliverables: string[];
  techStack: string[];
  impactMetric: string;
  targetAudience: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialty: string;
  bio: string;
  image: string;
  experienceYears: number;
}

export interface ContactSubmission {
  id: string;
  timestamp: string;
  name: string;
  email: string;
  message: string;
  ageConsent: boolean;
  dataPrivacyConsent: boolean;
  termsConsent: boolean;
  sentToOwnerEmail: string;
  status: 'delivered' | 'pending';
}

