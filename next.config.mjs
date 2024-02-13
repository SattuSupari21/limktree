/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        DATABASE_URL: process.env.DATABASE_URL,
        CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
        CLOUDINARY_KEY: process.env.CLOUDINARY_KEY,
        CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET
  },
};

export default nextConfig;
