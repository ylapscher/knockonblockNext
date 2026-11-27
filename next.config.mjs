/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // Inlined at build time so server HTML and client hydration agree on the footer year
    NEXT_PUBLIC_BUILD_YEAR: String(new Date().getFullYear()),
  },
};

export default nextConfig;
