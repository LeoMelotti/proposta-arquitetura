/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable image optimization for external domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true, // For PDF generation compatibility
  },
  
  // Experimental features for better serverless support
  experimental: {
    serverComponentsExternalPackages: ['puppeteer-core', '@sparticuz/chromium'],
  },
  
  // Headers for security
  async headers() {
    return [
      {
        source: '/p/:slug*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow', // Prevent indexing of proposals
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
