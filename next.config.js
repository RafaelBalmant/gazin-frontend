/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: [
    {
      source: '/main',
      destination: '/',
      permanent: true,
    },
  ],
}

module.exports = nextConfig
