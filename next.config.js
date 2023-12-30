/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '3000',
			},
			{
				protocol: 'https',
				hostname: 'digitalmarketplace-production-e139.up.railway.app',
				port: '',
			},
		],
	},
};

module.exports = nextConfig;
