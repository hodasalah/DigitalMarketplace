'use client';
import {trpc} from '@/trpc/client';
import Image from 'next/image';
import Link from 'next/link';
import {buttonVariants} from './ui/button';
import { Loader2, XCircle } from 'lucide-react';

interface VerifyEmailProps {
	token: string;
}

const VerifyEmail = ({token}: VerifyEmailProps) => {
	const {data, isError, isLoading} = trpc.auth.verifyEmail.useQuery({
		token: token,
	});
	if (isError) {
		return (
			<>
				<div className='relative h-60 sm:h-80 w-full'>
					<Image src='/error-2.jpg' alt='server error ' fill />
				</div>
				<div className='flex flex-col items-center gap-2 text-center'>
					<XCircle className='h-8 w-8 text-red-600' />
					<h3 className='font-semibold text-xl capitalize'>
						Oh No there is a problem
					</h3>
					<p className='text-muted-foreground text-sm capitalize'>
						This Token is not valid or might be Expired. Please Try Again
					</p>
				</div>
			</>
		);
	}
	if (data?.success) {
		return (
			<div className='flex h-full flex-col items-center justify-center'>
				<div className='relative mb-4 h-[25rem] w-full text-muted-foreground'>
					<Image src='/success-verifying.jpg' alt='email was sent' fill />
				</div>
				<h3 className='font-semibold text-2xl capitalize'>you&apos;re all set</h3>
				<p className='text-muted-foreground capitalize mt-1 text-center'>
					{' '}
					Thank You For Verifying Your Email
				</p>
				<Link href='/sign-in' className={buttonVariants({className: 'mt-4'})}>
					Sign in
				</Link>
			</div>
		);
	}
	if (isLoading) {
		return (
			<>
				<div className='h-full flex flex-col items-center justify-center gap-2 text-center'>
					<Loader2 className='animate-spin h-20 w-20 text-blue-300' />
					<h3 className='font-semibold text-xl capitalize'>Verifying...</h3>
					<p className='text-muted-foreground text-sm capitalize'>
						This won&apos;t take a long
					</p>
				</div>
			</>
		);
	}
	//return <div>VerifyEmail</div>;
};

export default VerifyEmail;
