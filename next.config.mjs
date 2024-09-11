/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cryptologos.cc", "avatars.githubusercontent.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", 
      },
    ],
  },
};

export default nextConfig;
