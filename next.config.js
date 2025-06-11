/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  
  // Enable SWC minification for better performance
  swcMinify: true,
  
  // Image optimization configuration
  images: {
    domains: [
      'res.cloudinary.com', // Cloudinary for image storage
      'images.unsplash.com', // Unsplash for placeholder images
      'via.placeholder.com', // Placeholder images during development
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Experimental features
  experimental: {
    // Enable server components
    serverComponentsExternalPackages: [],
  },
  
  // Environment variables available to the client
  env: {
    CUSTOM_APP_NAME: 'BeloffBeauty',
    CUSTOM_APP_VERSION: '1.0.0',
  },
  
  // Webpack configuration
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Add custom webpack plugins or modify existing ones
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    
    return config;
  },
  
  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, must-revalidate',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  
  // Redirects for SEO and user experience
  async redirects() {
    return [
      {
        source: '/services/permanent-makeup',
        destination: '/services/permanent-eyebrows',
        permanent: true,
      },
      {
        source: '/book',
        destination: '/booking',
        permanent: true,
      },
    ];
  },
  
  // Rewrites for clean URLs
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
      {
        source: '/robots.txt',
        destination: '/api/robots',
      },
    ];
  },
  
  // Output configuration for deployment
  output: 'export',
  
  // Compression
  compress: true,
  
  // Production optimizations
  ...(process.env.NODE_ENV === 'production' && {
    // Generate source maps for debugging in production
    productionBrowserSourceMaps: false,
    
    // Optimize bundles
    optimizeFonts: true,
  }),
};

// Bundle analyzer configuration
if (process.env.ANALYZE === 'true') {
  const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: true,
  });
  module.exports = withBundleAnalyzer(nextConfig);
} else {
  module.exports = nextConfig;
}