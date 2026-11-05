import { ServiceItem, TeamMember } from '../types';
import teamCreativeLead from '../assets/images/team_creative_lead_1793879738626.jpg';
import teamTechLead from '../assets/images/team_tech_lead_1793879739485.jpg';
import team3dArtist from '../assets/images/team_3d_artist_1793879739340.jpg';
import aboutCreativeStudio from '../assets/images/about_creative_studio_1793879739299.jpg';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    category: 'Growth & Performance',
    isPopular: false,
    shortDesc: 'Data-driven performance campaigns, search engine dominance, and full-funnel customer acquisition designed to maximize return on ad spend (ROAS) for high-growth ventures.',
    detailedOverview: 'Our digital marketing methodology combines rigorous algorithmic optimization with emotive creative messaging. We identify high-intent consumer touchpoints across Google Search, Meta Ads, LinkedIn B2B, and programmatic display to deliver scalable customer acquisition with transparent attribution.',
    deliverables: [
      'Multi-channel Paid Media Campaigns (Google, Meta, LinkedIn)',
      'High-Intent Search Engine Optimization (Technical & Content SEO)',
      'Conversion Rate Optimization (A/B Testing & Heatmap Analysis)',
      'Customer Lifecycle & Automated Email Retention Sequences',
      'Real-Time Attribution Dashboards & Cost-Per-Acquisition Audits'
    ],
    techStack: ['Google Ads 360', 'Meta Business Suite', 'Google Analytics 4', 'Mixpanel', 'Semrush'],
    impactMetric: '+320% average pipeline growth within first 90 days',
    targetAudience: 'Seed-to-Series B startups, emerging D2C brands, and established regional SMBs.'
  },
  {
    id: 'web-development',
    title: 'Web Development',
    category: 'Architecture & Engineering',
    isPopular: true,
    badge: 'MOST POPULAR',
    shortDesc: 'Ultra-fast, responsive web applications, bespoke headless architectures, and high-conversion digital experiences built to captivate modern users and turn traffic into loyal clients.',
    detailedOverview: 'We engineer bespoke web applications with sub-second load times, fluid micro-interactions, and accessible UI/UX. From high-converting startup launchpads to complex SMB customer portals, our builds adhere to modern core web vitals and enterprise-grade security.',
    deliverables: [
      'Custom Responsive Web Applications & High-Conversion Landing Pages',
      'Modern Jamstack & Headless CMS Integration (Next.js, Vite, Tailwind)',
      'API Development, Custom Database Architecture & CRM Integrations',
      'Core Web Vitals Optimization (99+ Performance & Accessibility Scores)',
      'Interactive WebGL & Micro-interaction Engineering'
    ],
    techStack: ['React 19', 'TypeScript', 'Tailwind CSS', 'Vite', 'Node.js', 'PostgreSQL'],
    impactMetric: 'Sub-500ms global latency & 48% higher average session duration',
    targetAudience: 'Startups launching new flagships, SMBs upgrading legacy portals, and ambitious founders.'
  },
  {
    id: 'media-marketing',
    title: 'Media Marketing',
    category: 'Creative & 3D Motion',
    isPopular: false,
    shortDesc: 'Captivating 3D visual storytelling, cinematic motion design, and high-fidelity video production that elevates your brand identity and commands marketplace attention.',
    detailedOverview: 'In an era of hyper-saturated feeds, static graphics fail to move the needle. Our studio produces immersive 3D product visualizations, dynamic kinetic typography, and narrative brand films that spark emotional resonance and establish an unmistakable market signature.',
    deliverables: [
      'Photorealistic 3D Product Renders & Spatial Visualizations',
      'Cinematic Commercial Video Production & Motion Identity Kits',
      'High-Impact Social Video Assets for TikTok, Reels, & YouTube',
      'Comprehensive Brand Guidelines, Typography Systems & Tone of Voice',
      'Omnichannel Asset Localization for International Campaigns'
    ],
    techStack: ['Blender 3D', 'Unreal Engine 5', 'After Effects', 'Cinema 4D', 'DaVinci Resolve'],
    impactMetric: '4.8x higher social engagement and 2.3x brand recall lift',
    targetAudience: 'Brands demanding premium aesthetic positioning, consumer tech, and luxury products.'
  }
];

export const TEAM_DATA: TeamMember[] = [
  {
    id: 'ananya-joshi',
    name: 'Ananya Joshi',
    role: 'Creative Director & Founder',
    specialty: 'Brand Identity & Visual Storytelling',
    bio: 'Former senior creative strategist with 11+ years elevating global consumer brands and high-growth Indian startups. Champions bold, human-centric design that cuts through digital noise.',
    image: teamCreativeLead,
    experienceYears: 11
  },
  {
    id: 'priya-sharma',
    name: 'Priya Sharma',
    role: 'Head of Engineering & UX',
    specialty: 'Full-Stack Architecture & User Experience',
    bio: 'Pioneers scalable web applications and intuitive interfaces. Specializes in performance-first engineering, accessible interaction systems, and high-velocity development pipelines.',
    image: teamTechLead,
    experienceYears: 9
  },
  {
    id: 'maya-lin',
    name: 'Maya Lin',
    role: 'Lead 3D Motion Artist',
    specialty: 'Spatial CGI & Kinetic Art Direction',
    bio: 'Award-winning digital sculptor and motion designer transforming complex technological products into fluid, visually mesmerizing 3D journeys.',
    image: team3dArtist,
    experienceYears: 7
  },
  {
    id: 'rohan-mehta',
    name: 'Rohan Mehta',
    role: 'Head of Performance Growth',
    specialty: 'Omnichannel ROAS & Acquisition',
    bio: 'Data strategist responsible for managing over ₹25Cr in digital ad spend across APAC, delivering disciplined CPA reduction and compounding organic acquisition funnels.',
    image: aboutCreativeStudio,
    experienceYears: 8
  }
];

export const AGENCY_INFO = {
  name: 'AJ Advertising Agency',
  tagline: 'CREATIVITY INNOVATION & USER EXPERIENCE',
  badge: '// WE ARE AJ ADVERTISING AGENCY',
  registeredAddress: 'Bangalore Rural, Karnataka, India',
  contactPhone: '+91 xxxxxxxxxx',
  defaultOwnerEmail: 'owner_email@gmail.com',
  officeHours: 'Monday – Friday, 09:30 AM – 06:30 PM IST',
  legalReg: 'Registered SMB Creative Consultancy under MSME & Indian Companies Act provisions',
  jurisdiction: 'Bangalore, Karnataka, Republic of India'
};
