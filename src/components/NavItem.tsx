'use client';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { PRODUCT_CATEGORIES } from '../config/index';

type Category = (typeof PRODUCT_CATEGORIES)[number];
interface NavItemProps {
	category: Category;
	handleOpen: () => void;
	isOpen: boolean;
	isAnyOpen: boolean;
}

const NavItem = ({ category, handleOpen, isOpen, isAnyOpen }: NavItemProps) => {
	let ref = useRef<HTMLDivElement | undefined>();
	const [ele, setEle] = useState<number>(0);
	//let ele = ref?.current?.offsetLeft;
	return (
		<li className={cn('block')}>
			<div
			//@ts-ignore
				ref={ref}
				className={cn(`
					flex items-center py-4 mr-4 relative group  text-[#6b6e8a] transition  duration-300 ease before:absolute before:content-[""] before:w-full before:h-[5px] before:-bottom-[12px] before:left-[0] before:transition before:duration-[.3s] before:ease before:opacity-0 before:scale-x-0
					${
						isOpen &&
						`before:bg-blue-500 before:opacity-100 before:left-[${ele}px] before:scale-x-100`
					}`)}
				onClick={() => {
					setEle(ref?.current?.offsetLeft ?? 0);
					handleOpen();
				}}
			>
				<Link
					href='#'
					className={cn(
						'gap-1.5 font-medium px-3 text-[1rem] leading-10 group-hover:text-blue-500',
						{
							'text-blue-500': isOpen,
						},
					)}
				>
					{category.label}
					<ChevronDown
						className={cn(
							'h-4 w-4 transition-all  inline-block ml-2 group-hover:text-blue-500',
							{
								'-rotate-180 text-blue-500': isOpen,
							},
						)}
					/>
				</Link>
			</div>

			{isOpen ? (
				<div
					className={cn(
						'absolute inset-x-0 top-full text-sm text-muted-foreground mt-2 ',
						{
							'animate-in fade-in-10 slide-in-from-top-5':
								!isAnyOpen,
						},
					)}
				>
					<div
						className='absolute inset-0 top-1/2 bg-white shadow '
						aria-hidden='true'
					/>
					<div className='relative bg-white '>
						<div className='mx-auto max-w-7xl px-8'>
							<div className='grid  grid-cols-4 gap-x-8 gap-y-10 py-16'>
								<div className='col-span-4  col-start-1 grid grid-cols-3 gap-x-8'>
									{category.featured.map((item) => (
										<div
											key={item.name}
											className='group relative text-base sm:text-sm'
										>
											<div className='relative aspect-video overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75'>
												<Image
													src={item.imageSrc}
													alt='product category image'
													fill
													className='object-cover object-center'
													sizes='(min-width:)400 (max-width:1199)300'
												/>
											</div>
											<Link
												href={item.href}
												className='mt-6 block font-medium text-gray-900'
											>
												{item.name}
											</Link>
											<p
												className='mt-1 cursor-pointer'
												aria-hidden='true'
											>
												Shop Now
											</p>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			) : null}
		</li>
	);
};

export default NavItem;
