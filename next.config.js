/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["spoonacular.com", "images.spoonacular.com"],
    unoptimized: true,
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
