/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    emotion: true,
  },
  images: {
    domains: ['picsum.photos', 'contents.lotteon.com', 'images.footlocker.com'],
  },
};

module.exports = nextConfig;
