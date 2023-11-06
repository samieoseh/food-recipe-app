/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["spoonacular.com", "images.spoonacular.com"],
    unoptimized: true,
  },
};

module.exports = nextConfig;
