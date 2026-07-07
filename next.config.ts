import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Serve static assets with long-lived cache headers
  async headers() {
    return [
      {
        // Images, fonts, static files — cache 1 year
        source: "/:path(.*\\.(?:jpg|jpeg|png|gif|webp|svg|ico|woff|woff2|ttf|otf))",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // PDFs and downloads — cache 1 day
        source: "/:path(.*\\.(?:pdf|zip|csv|pptx|ppt|ipynb))",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=3600" },
        ],
      },
      {
        // API routes — no cache (dynamic)
        source: "/api/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store" },
        ],
      },
    ];
  },

  // Enable image optimization for all external images
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
    minimumCacheTTL: 3600, // 1 hour minimum image cache
  },

  // Compress responses
  compress: true,
};

export default nextConfig;
