const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
module.exports = withBundleAnalyzer({
  // async rewrites() {
  //   return [
  //     {
  //       source: "/admin/:path*", // Any path under /admin
  //       destination: "/src/admin/:path*", // Maps to the src/admin directory
  //     },
  //   ];
  // },
  images: {
    domains: [
      "images.unsplash.com",
      "media.gettyimages.com",
      "bloodyelbow.com",
      "drive.google.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uzhujympazdkcwwgloay.supabase.co",
        pathname: "/storage/v1/object/public/profile-images/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // Increase the limit to 10 MB 
    },
  },
});
