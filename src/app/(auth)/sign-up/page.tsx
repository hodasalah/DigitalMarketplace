'use client';
import {Button, buttonVariants} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {cn} from '@/lib/utils';
import {
	AuthCredentialsValidator,
	TAuthCredentialsValidator,
} from '@/lib/validators/account-credentials-validator';
import { trpc } from '@/trpc/client';
import {zodResolver} from '@hookform/resolvers/zod';
import {ArrowRight} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {SubmitHandler, useForm} from 'react-hook-form';

const SignUp = () => {
	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm<TAuthCredentialsValidator>({
		resolver: zodResolver(AuthCredentialsValidator),
	});

	const {mutate, isLoading} = trpc.auth.createPayloadUser.useMutation({});

	const onSubmit: SubmitHandler<TAuthCredentialsValidator> = ({
		email,
		password,
	}) => {
		// TODO send data to our server
		mutate({email, password});
	};

	return (
		<div className='container relative flex pt-20 flex-col items-center justify-center lg:px-0'>
			<div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[500px]'>
				<div className='flex flex-col items-center space-y-2 text'>
					<div className='relative h-40 w-[14rem]'>
						<Image
							src={'/logo.svg'}
							fill
							alt='logo'
							className='object-cover object-left-bottom'
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
									className={cn({'focus-visible:ring-red-500': errors.email})}
								/>
							</div>

							<div className='grid gap-3 py-2'>
								<Label htmlFor='password'>Password</Label>
								<Input
									type='password'
									{...register('password')}
									placeholder='password'
									className={cn({'focus-visible:ring-red-500': errors.password})}
								/>
							</div>

							<Button>Sign Up</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
