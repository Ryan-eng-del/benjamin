/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    minimumCacheTTL: 3600,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.ouorz.com",
        pathname: "/wp-content/**",
        port: "",
      },
    ],
  },
};

export default nextConfig;
