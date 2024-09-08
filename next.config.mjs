/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // This will allow images from any host
      },

    ],
  },
};

export default nextConfig;
