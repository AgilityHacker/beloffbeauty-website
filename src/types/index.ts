// Business Information Types
export interface BusinessInfo {
  name: string;
  tagline: string;
  description: string;
  logo?: string;
  email: string;
  phone: string;
  address: Address;
  hours: BusinessHours[];
  social: SocialMedia;
  certifications: Certification[];
  insurance: Insurance;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface BusinessHours {
  day: string;
  open: string;
  close: string;
  closed?: boolean;
}

export interface SocialMedia {
  instagram?: string;
  facebook?: string;
  twitter?: string;
  youtube?: string;
  tiktok?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  image?: string;
}

export interface Insurance {
  provider: string;
  policyNumber: string;
  coverage: string;
}

// Service Types
export interface Service {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  duration: number; // in minutes
  price: ServicePrice;
  images: ServiceImage[];
  benefits: string[];
  process: string[];
  aftercare: string[];
  contraindications: string[];
  faqs: FAQ[];
  popular?: boolean;
  featured?: boolean;
}

export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  image?: string;
  services: string[]; // Service IDs
}

export interface ServicePrice {
  amount: number;
  currency: string;
  discountedAmount?: number;
  touchUpPrice?: number;
  packagePrice?: PackagePrice;
}

export interface PackagePrice {
  sessions: number;
  amount: number;
  savings: number;
}

export interface ServiceImage {
  url: string;
  alt: string;
  type: 'main' | 'before' | 'after' | 'process';
}

export interface FAQ {
  question: string;
  answer: string;
}

// Gallery Types
export interface GalleryItem {
  id: string;
  serviceId: string;
  title: string;
  description?: string;
  technique: string;
  beforeImage: GalleryImage;
  afterImage: GalleryImage;
  healingImages?: GalleryImage[];
  testimonialId?: string;
  featured?: boolean;
  tags: string[];
  date: string;
}

export interface GalleryImage {
  url: string;
  alt: string;
  width: number;
  height: number;
  thumbnail?: string;
}

// Testimonial Types
export interface Testimonial {
  id: string;
  clientName: string;
  clientImage?: string;
  service: string;
  serviceId?: string;
  rating: number;
  title?: string;
  review: string;
  date: string;
  verified: boolean;
  featured?: boolean;
  galleryItemId?: string;
  videoUrl?: string;
}

// About/Team Types
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  certifications: Certification[];
  specialties: string[];
  experience: number; // years
  languages: string[];
  social?: SocialMedia;
}

export interface AboutContent {
  story: string;
  mission: string;
  vision: string;
  values: string[];
  whyChooseUs: WhyChooseItem[];
  achievements: Achievement[];
}

export interface WhyChooseItem {
  title: string;
  description: string;
  icon: string;
}

export interface Achievement {
  year: string;
  title: string;
  description: string;
}

// Booking Types
export interface Booking {
  id: string;
  clientId: string;
  serviceId: string;
  date: string;
  time: string;
  duration: number;
  status: BookingStatus;
  notes?: string;
  price: number;
  deposit?: number;
  reminderSent?: boolean;
  createdAt: string;
  updatedAt: string;
}

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no-show';

export interface TimeSlot {
  time: string;
  available: boolean;
  serviceId?: string;
}

export interface Availability {
  date: string;
  slots: TimeSlot[];
}

// Client Types
export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  address?: Address;
  medicalHistory?: MedicalHistory;
  preferences?: ClientPreferences;
  notes?: string;
  source?: string;
  createdAt: string;
  lastVisit?: string;
  totalSpent: number;
  visitCount: number;
}

export interface MedicalHistory {
  allergies: string[];
  medications: string[];
  conditions: string[];
  skinType?: string;
  previousTreatments: string[];
}

export interface ClientPreferences {
  preferredTimes: string[];
  communicationMethod: 'email' | 'phone' | 'sms';
  reminders: boolean;
  marketing: boolean;
}

// Blog/Content Types
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  featuredImage: string;
  publishedAt: string;
  updatedAt: string;
  readTime: number;
  seo: SEOData;
}

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
}

// Promotion Types
export interface Promotion {
  id: string;
  title: string;
  description: string;
  code?: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  validFrom: string;
  validUntil: string;
  conditions?: string[];
  serviceIds?: string[];
  maxUses?: number;
  currentUses: number;
  active: boolean;
}

// Analytics Types
export interface Analytics {
  period: string;
  revenue: number;
  bookings: number;
  newClients: number;
  returningClients: number;
  averageBookingValue: number;
  popularServices: PopularService[];
  clientRetention: number;
  conversionRate: number;
}

export interface PopularService {
  serviceId: string;
  name: string;
  bookings: number;
  revenue: number;
}