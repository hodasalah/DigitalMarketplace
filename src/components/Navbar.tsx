import { getServerSideUser } from '@/lib/payload-utils';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import Cart from './Cart';
import MaxWidthWrapper from './MaxWidthWrapper';
import MobileNav from './MobileNav';
import NavItems from './NavItems';
import UserAccountNav from './UserAccountNav';
import { buttonVariants } from './ui/button';

const Navbar = async () => {
	const nextCookies = cookies();
	const { user } = await getServerSideUser(nextCookies);
	return (
		<div className='bg-white sticky z-50 top-0 inset-x-0 '>
			<header className='relative bg-white border-b border-gray-200'>
				<MaxWidthWrapper>
					<div className='relative'>
						<div className='flex w-full  items-center justify-center'>
							{/** TODO mobile Nav */}
							<MobileNav user={user} />
							<div className='flex lg:ml-0 ml-1 py-6 pl-6 pr-8 border-r border-gray-200'>
								<Link href='/'>
									<Image
										src='/logo.png'
										alt='logo'
										width={165}
										height={50}
									/>
								</Link>
							</div>

							<div className='hidden z-50 lg:ml-8 lg:block lg:self-stretch flex-[3_1_0%]'>
								<NavItems />
							</div>

							<div className='ml-auto flex items-center'>
								<div className='hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6'>
									{user ? null : (
										<Link
											href='/sign-in'
											className={buttonVariants({
												variant: 'ghost',
											})}
										>
											Sign in
										</Link>
									)}
									{user ? null : (
										<span
											className='h-6 w-px bg-gray-200'
											aria-hidden='true'
										></span>
									)}
									{user ? (
										//@ts-ignore
										<UserAccountNav user={user} />
									) : (
										<Link
											href='/sign-up'
											className={buttonVariants({
												variant: 'ghost',
											})}
										>
											Create Account
										</Link>
									)}

									{user ? (
										<span
											className='h-6 w-px bg-gray-200'
											aria-hidden='true'
										></span>
									) : null}

									{user ? null : (
										<div className='flex lg:ml-6'>
											<span
												className='h-6 w-px bg-gray-200'
												aria-hidden='true'
											></span>
										</div>
									)}
								</div>
								<div className='ml-4 flow-root lg:ml-6'>
									<Cart />
								</div>
							</div>
						</div>
					</div>
				</MaxWidthWrapper>
			</header>
			
		</div>
	);
};

export default Navbar;
