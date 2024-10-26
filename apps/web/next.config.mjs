/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/v1/static/**",
        port: "8082",
      },
    ],
  },
};

export default nextConfig;
