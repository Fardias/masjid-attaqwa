/** @type {import('next').NextConfig} */
// const nextConfig = {
//     output: "standalone",
//     images:{
//         unoptimized: true,
//     }
// };
const nextConfig = {
    // output: "export",
    // output: "standalone",
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
