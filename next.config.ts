import type { NextConfig } from "next";

const YEAR = "public, max-age=31536000, immutable";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [390, 640, 768, 1024, 1280, 1536, 1920],
  },
  // One canonical host. The old epicdevsolutions preview subdomain, the
  // *.vercel.app alias and the bare apex all 308 to www.
  async redirects() {
    const to = "https://www.jasonsaquariumservice.com/:path*";
    return ["jasonsaquarium.epicdevsolutions.com", "jasonsaquarium.vercel.app", "jasonsaquariumservice.com"].map((host) => ({
      source: "/:path*",
      has: [{ type: "host", value: host }],
      destination: to,
      permanent: true,
    }));
  },
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|jpeg|png|webp|avif|mp4|woff2|ico)",
        headers: [{ key: "Cache-Control", value: YEAR }],
      },
      {
        source: "/_next/static/:path*",
        headers: [{ key: "Cache-Control", value: YEAR }],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
        ],
      },
    ];
  },
};

export default nextConfig;
