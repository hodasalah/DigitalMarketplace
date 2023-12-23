'use client';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useCart } from '@/hooks/use-cart';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '../lib/utils';
import CartItem from './CartItem';
import { buttonVariants } from './ui/button';
import { Separator } from './ui/separator';

import { useEffect, useState } from 'react';
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from './ui/sheet';

const Cart = () => {
	const { items } = useCart();
	const itemCount = items.length;
	const fee = 1;
	const total = items.reduce((total, product) => total + product.price, 0);
	const [isMounted, setIsMounted] = useState<boolean>(false);
	useEffect(() => {
		setIsMounted(true);
	}, []);

	return (
		<Sheet>
			<SheetTrigger className='group -m-2 flex items-center p-2'>
				<ShoppingCart
					aria-hidden='true'
					className='text-gray-400 group-hover:text-gray-500 h-6 w-6 flex-shrink-0'
				/>
				<span className='ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800'>
					{isMounted ? itemCount : 0}
				</span>
			</SheetTrigger>
			<SheetContent className='flex w-full flex-col pr-0 sm:max-w-lg'>
				<SheetHeader className='space-y-2.5 pr-6'>
					<SheetTitle>Cart({itemCount})</SheetTitle>
				</SheetHeader>
				{itemCount > 0 ? (
					<>
						<div className='flex w-full flex-col pr-6'>
							<ScrollArea>
								{/* TODO: Card logic */}
								{items.map((item, i) => (
									<CartItem
										key={i}
										product={item}
									/>
								))}
							</ScrollArea>
						</div>
						<div className='space-y-4 pr-6'>
							<Separator />
							<div className='space-y-1.5 text-sm'>
								<div className='flex'>
									<span className='flex-1'>Shipping</span>
									<span>Free</span>
								</div>

								<div className='flex'>
									<span className='flex-1'>
										Transaction Fee
									</span>
									<span>{formatPrice(fee)}</span>
								</div>

								<div className='flex'>
									<span className='flex-1'>Total</span>
									<span>{formatPrice(total + fee)}</span>
								</div>
							</div>

							<SheetFooter>
								<SheetTrigger asChild>
									<Link
										href='/cart'
										className={buttonVariants({
											className: 'w-full',
										})}
									>
										Continue to checkout
									</Link>
								</SheetTrigger>
							</SheetFooter>
						</div>
					</>
				) : (
					<div className='flex h-full flex-col items-center justify-center space-y-1'>
						<div className='relative mb-4 h-80 w-full  text-muted-foreground'>
							<Image
								fill
								src={'/empty-cart.jpg'}
								className='object-cover'
								alt='Empty cart photo'
							/>
						</div>
						<div className='text-xl font-semibold'>
							Your Cart Is Empty
						</div>
						<SheetTrigger asChild>
							<Link
								href='/products'
								className={buttonVariants({
									variant: 'link',
									size: 'sm',
									className: 'text-sm text-muted-foreground',
								})}
							>
								Add Items to your cart
							</Link>
						</SheetTrigger>
					</div>
				)}
			</SheetContent>
		</Sheet>
	);
};

export default Cart;
