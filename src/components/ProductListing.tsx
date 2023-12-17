'use client';
import { PRODUCT_CATEGORIES } from '@/config';
import { cn, formatPrice } from '@/lib/utils';
import { Product } from '@/payload-types';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ImageSlider from './ImageSlider';
import ProductPlaceholder from './ProductPlaceholder';
import { Button } from './ui/button';
interface productListingProps {
	product: Product | null;
	index: number;
}

const ProductListing = ({ product, index }: productListingProps) => {
	//create beautiful loading animation using state and index
	const [isVisible, setIsVisible] = useState<boolean>(true);
	/*
	 * delay visible of products
	 * product[index === 0] appear first then the second product
	 * for this senario we will use  index inside a useEffect
	 */
	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(true);
		}, index * 75);
		return () => clearTimeout(timer);
	}, [index]);
	// loading state if not product
	if (!product || !isVisible) {
		return <ProductPlaceholder />;
	}

	/*
	 * CONSTANTS VARIABLES
	 * GET LABEL
	 * GET VALID IMAGE URL
	 */
	//console.log(product);
	const label = PRODUCT_CATEGORIES.find(
		({ value }) => value === product.category,
	)?.label;

	const validURLs = product?.images
		?.map(({ image }) => (typeof image === 'string' ? image : image.url))
		.filter(Boolean) as string[];

	// if there are products available
	if (isVisible && product) {
		return (
			<Link
				className={cn(
					'block invisible h-full w-full cursor-pointer group border-1 border-zinc-300 rounded-md bg-white shadow-md shadow-black/10 hover:shadow-2xl transition ',
					{ 'visible animate-in fade-in-5': isVisible },
				)}
				href={`/products/${product.id}`}
			>
				<div className='flex flex-col gap-2 w-full h-full'>
					<div className='relative w-full rounded-t-md'>
						<ImageSlider urls={validURLs} />
					</div>
					<div className='p-3 pt-4 '>
						<h5 className='mt-4 font-semibold text-lg text-gray-900 group-hover:text-blue-500'>
							{product?.name}
						</h5>
						<p className='mt-1 text-sm text-gray-500'>{label}</p>
						<span className=' inline-flex mt-1 font-medium text-sm text-gray-500 bg-slate-200 items-center rounded-[3px] h-5 leading-3 px-1 py-3'>
							{formatPrice(product.price)}
						</span>
						<p className='mt-1 text-md text-gray-700 pt-2 leading-[1.6rem]  break-after-column'>
							{product.description}
						</p>
					</div>
					<div className='mt-2 w-full h-full flex flex-col justify-end'>
						<Button
							size='lg'
							className='w-full rounded-t-none'
						>
							Add To Cart
						</Button>
					</div>
				</div>
			</Link>
		);
	}
	return <div>ProductListing</div>;
};

export default ProductListing;
