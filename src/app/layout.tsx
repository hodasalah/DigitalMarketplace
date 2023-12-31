import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Providers from '@/components/trpc/Providers';
import { cn, constructMetadata } from '@/lib/utils';
import { Work_Sans } from 'next/font/google';
import React, { Suspense } from 'react';
import { Toaster } from 'sonner';
import './globals.css';
import Loading from './loading';

const inter = Work_Sans({
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700', '900'],
});

export const metadata = constructMetadata();

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
				<Suspense fallback={<Loading />}>
					<main className='relative flex flex-col min-h-screen '>
						<Providers>
							<Navbar />
							<div className='flex-grow flex-1'>{children}</div>
							<Footer />
						</Providers>
					</main>
				</Suspense>
			</body>
		</html>
	);
}
