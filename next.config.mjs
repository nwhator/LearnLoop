/** @type {import('next').NextConfig} */
const nextConfig = {
    // Already has built-in support for Tailwind, but good to have the file
    reactStrictMode: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
