'use client';
import { PRODUCT_CATEGORIES } from '@/config';
import { cn, formatPrice } from '@/lib/utils';
import { Product } from '@/payload-types';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ImageSlider from './ImageSlider';
import ProductPlaceholder from './ProductPlaceholder';
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
					'invisible h-full w-full cursor-pointer group/main',
					{
						'visible animate-in fade-in-5': isVisible,
					},
				)}
				href={`/products/${product.id}`}
			>
				<div className='flex flex-col w-full'>
					<ImageSlider urls={validURLs} />

					<h3 className='mt-4 font-medium text-sm text-gray-700'>
						{product.name}
					</h3>
					<p className='mt-1 text-sm text-gray-500'>{label}</p>
					<p className='mt-1 font-medium text-sm text-gray-900'>
						{formatPrice(product.price)}
					</p>
				</div>
			</Link>
		);
	}
};

export default ProductListing;
