import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Providers from '@/components/trpc/Providers';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import React from 'react';
import { Toaster } from 'sonner';
import './globals.css';

const inter = Poppins({
	subsets: ['devanagari', 'latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700', '900'],
});

export const metadata: Metadata = {
	title: 'Digital Marketplace',
	description: 'Welcome to our store Digital marketplace',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang='en'
			className='h-full'
		>
			<head>
				<link
					rel='icon'
					href='/icon.svg'
					type='image'
					sizes='any'
				/>
			</head>
			<body
				className={cn(
					'relative h-full font-sans antialiased bg-transparent',
					inter.className,
				)}
			>
				<Toaster
					position='top-center'
					richColors
				/>
				<main className='relative flex flex-col min-h-screen '>
					<Providers>
						<Navbar />
						<div className='flex-grow flex-1'>{children}</div>
						<Footer />
					</Providers>
				</main>
			</body>
		</html>
	);
}
