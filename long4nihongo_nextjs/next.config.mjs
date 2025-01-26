/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["img.vietqr.io", "github.com", "cdn.longnihongo.com"],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: `${process.env.API_URL}/:path*`,
  //     },
  //   ];
  // },
};

export default nextConfig;
