'use client';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import {
	AuthCredentialsValidator,
	TAuthCredentialsValidator,
} from '@/lib/validators/account-credentials-validator';
import { trpc } from '@/trpc/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { ZodError } from 'zod';
import Loading from '../../loading';

const SignUp = () => {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors, isDirty, isValid },
	} = useForm<TAuthCredentialsValidator>({
		resolver: zodResolver(AuthCredentialsValidator),
		mode: 'all',
	});

	const { mutate, isLoading } = trpc.auth.createPayloadUser.useMutation({
		onError: (err) => {
			if (err.data?.code === 'CONFLICT') {
				toast.error('This Email is already in use . Sign in instead?');
				return;
			}
			if (err instanceof ZodError) {
				toast.error(err.issues[0].message);
				return;
			}
			toast.error('Something went wrong . Please try again');
		},
		onSuccess: ({ sentToEmail }) => {
			toast.success(`Verification Email Sent to Email ${sentToEmail}`);
			router.push(`/verify-email?to=${sentToEmail}`);
		},
	});

	const onSubmit: SubmitHandler<TAuthCredentialsValidator> = ({
		email,
		password,
	}) => {
		// TODO send data to our server
		mutate({ email, password });
	};
	if (isLoading) {
		return <Loading />;
	}
	return (
		<div className='container relative flex pt-20 flex-col items-center justify-center lg:px-0'>
			<div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[500px]'>
				<div className='flex flex-col items-center space-y-2 text'>
					<div className='relative mb-4'>
						<Image
							src={'/logo.png'}
							height={50}
							width={165}
							alt='logo'
							className='object-cover'
						/>
					</div>
					<h1 className='text-2xl font-bold'>Create An Account</h1>
					<Link
						href='/sign-in'
						className={buttonVariants({
							variant: 'link',
							className: 'text-muted-foreground gap-1.5',
						})}
					>
						Already Have An Account? Sign In
						<ArrowRight className='w-4 h-4' />
					</Link>
				</div>
				<div className='grid gap-6'>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className='grid gap-2'>
							<div className='grid gap-3 py-2'>
								<Label htmlFor='email'>Email</Label>
								<Input
									type='email'
									placeholder='your-email@company.com'
									{...register('email')}
									className={cn({
										'focus-visible:ring-red-500':
											errors.email,
									})}
								/>
								{errors?.email && (
									<p className='text-sm text-red-500'>
										{errors.email.message}
									</p>
								)}
							</div>

							<div className='grid gap-3 py-2'>
								<Label htmlFor='password'>Password</Label>
								<Input
									type='password'
									{...register('password')}
									placeholder='password'
									className={cn({
										'focus-visible:ring-red-500':
											errors.password,
									})}
								/>
								{errors?.password && (
									<p className='text-sm text-red-500'>
										{errors.password.message}
									</p>
								)}
							</div>

							<Button
								type='submit'
								disabled={!isDirty || !isValid || isLoading}
							>
								Sign Up
							</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
