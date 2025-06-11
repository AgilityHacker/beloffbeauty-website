import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import FloatingBookingButton from '@/components/FloatingBookingButton';
import Navigation from '@/components/Navigation';

// Import fonts
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

// Metadata for SEO
export const metadata: Metadata = {
  title: {
    default: 'BeloffBeauty - Premium Permanent Makeup & Facial Treatments',
    template: '%s | BeloffBeauty'
  },
  description: 'Expert permanent makeup artist specializing in eyebrows, lips, eyeliner, and advanced facial treatments including microneedling. Licensed, certified, and dedicated to enhancing your natural beauty.',
  keywords: [
    'permanent makeup',
    'microblading',
    'eyebrow tattoo',
    'lip blush',
    'eyeliner tattoo',
    'microneedling',
    'facial treatments',
    'beauty salon',
    'cosmetic tattooing',
    'RF microneedling',
    'PRP treatment',
    'vampire facial'
  ],
  authors: [{ name: 'BeloffBeauty' }],
  creator: 'BeloffBeauty',
  publisher: 'BeloffBeauty',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://beloffbeauty.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'BeloffBeauty - Premium Permanent Makeup & Facial Treatments',
    description: 'Expert permanent makeup artist specializing in eyebrows, lips, eyeliner, and advanced facial treatments. Book your consultation today.',
    siteName: 'BeloffBeauty',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'BeloffBeauty - Premium Permanent Makeup',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BeloffBeauty - Premium Permanent Makeup & Facial Treatments',
    description: 'Expert permanent makeup artist specializing in eyebrows, lips, eyeliner, and advanced facial treatments.',
    images: ['/images/twitter-image.jpg'],
    creator: '@beloffbeauty',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    // Add other verification codes as needed
  },
};

// Schema.org structured data
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'BeautySalon',
  name: 'BeloffBeauty',
  image: '/images/logo.jpg',
  description: 'Expert permanent makeup artist specializing in eyebrows, lips, eyeliner, and advanced facial treatments.',
  url: 'https://beloffbeauty.com',
  telephone: '+1-555-123-4567',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '123 Beauty Lane',
    addressLocality: 'Downtown',
    addressRegion: 'State',
    postalCode: '12345',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '40.7128',
    longitude: '-74.0060',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  priceRange: '$$',
  servedCuisine: undefined, // Not applicable for beauty salon
  hasMenu: undefined, // Not applicable for beauty salon
  acceptsReservations: true,
  paymentAccepted: ['Cash', 'Credit Card', 'Debit Card'],
  currenciesAccepted: 'USD',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '127',
    bestRating: '5',
    worstRating: '1',
  },
  review: [
    {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
      },
      author: {
        '@type': 'Person',
        name: 'Sarah Johnson',
      },
      reviewBody: 'Amazing work on my eyebrows! The microblading looks so natural and the healing process was smooth. Highly recommend!',
    },
  ],
  sameAs: [
    'https://www.facebook.com/beloffbeauty',
    'https://www.instagram.com/beloffbeauty',
    'https://www.twitter.com/beloffbeauty',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#f1845c" />
        <meta name="msapplication-TileColor" content="#f1845c" />
        
        {/* Prevent auto-zoom on mobile inputs */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body className={`font-sans antialiased bg-white text-charcoal-900`}>
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blush-600 text-white px-4 py-2 rounded-lg z-50"
        >
          Skip to main content
        </a>
        
        {/* Main content wrapper */}
        <div className="min-h-screen flex flex-col">
          {/* Header */}
          <Navigation />
          
          {/* Main content */}
          <main id="main-content" className="flex-1">
            {children}
          </main>
          
          {/* Footer will be added here */}
          <footer className="relative z-30">
            {/* Footer component will go here */}
          </footer>
        </div>
        
        {/* Floating Booking Button */}
        <FloatingBookingButton />
        
        {/* Analytics scripts (add in production) */}
        {process.env.NODE_ENV === 'production' && (
          <>
            {/* Google Analytics */}
            {/* Google Tag Manager */}
            {/* Facebook Pixel */}
          </>
        )}
      </body>
    </html>
  );
}