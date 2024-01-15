/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXTAUTH_SECRET: "cebeciyazilimsecurity",
    GOOGLE_CLIENT_ID: "861992241669-pfc03vd9d5kir55pgkut1hdcqf5ref1v.apps.googleusercontent.com",
    GOOGLE_SECRET: "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"
  },
}

module.exports = nextConfig
