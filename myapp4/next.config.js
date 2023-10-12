/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    images: {
        remotePatterns: [
            {
            protocol: 'https',
            hostname: 'raw.githubusercontent.com',
            port: '',
            pathname: '/sunse-kwon/Next.js-test-blogposts/master/images/**',
            },
        ],
    },
}

module.exports = nextConfig
