import { hostname } from "os";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["avatars.githubusercontent.com"], // Replace with your allowed image domains
    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [16, 32, 48, 64, 96],
    formats: ["image/avif", "image/webp"]
  }
};

export default nextConfig;
