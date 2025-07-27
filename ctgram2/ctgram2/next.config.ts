import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */images: {
    remotePatterns: [
      {
          protocol: 'https',
          hostname: '**',
        },
      {
        protocol: 'https',
        hostname: 'github.com',
      },
      
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'uploads.tenhomaisdiscosqueamigos.com', 
      },
      
    ],
  },

  };


export default nextConfig;
