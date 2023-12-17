'use client';
import { Product } from '@/payload-types';
import { trpc } from '@/trpc/client';
import Link from 'next/link';
import { TQueryValidator } from '../lib/validators/query-validator';
import ProductListing from './ProductListing';

/**
 *
 *_id
 * name
 * description
 * price
 * category
 * product_files
 * approvedForSale
 * images
 * createdAt
 * updatedAt
 */

interface ProductReelProps {
	title: string;
	subTitle?: string;
	href?: string;
	query: TQueryValidator;
}
const FALLBACK_LIMIT = 4;
const ProductReel = (props: ProductReelProps) => {
	const { title, subTitle, href, query } = props;
	const { data, isLoading } =
		trpc.getInfiniteProducts.getProducts.useInfiniteQuery(
			{
				limit: query.limit ?? FALLBACK_LIMIT,
				query,
			},
			{
				getNextPageParam: (lastPage) => lastPage.nextPage,
			},
		);
	//console.log(data);
	const products = data?.pages.flatMap((page) => page.items);
	//console.log(products);

	let mapProducts: (Product | null)[] = [];
	if (products && products.length) {
		mapProducts = products;
	} else if (isLoading) {
		mapProducts = new Array<null>(query.limit ?? FALLBACK_LIMIT).fill(null);
	}

	return (
		<section className='py-12'>
			<div className='md:flex md:items-center md:justify-between mb-4'>
				<div className='max-w-2xl px-4 lg:max-w-4xl lg:px-0'>
					{title ? (
						<h2 className='text-2xl font-bold text-gray-900 sm:text-3xl'>
							{title}
						</h2>
					) : null}
					{subTitle ? (
						<p className='text-sm mt-2 text-muted-foreground'>
							{subTitle}
						</p>
					) : null}
				</div>
				{href ? (
					<Link
						href={href}
						className='hidden font-medium text-sm text-blue-600 hover:text-blue-500 md:block'
					>
						Shop the collection{' '}
						<span aria-hidden='true'>&rarr;</span>
					</Link>
				) : null}
			</div>

			<div className='relative'>
				<div className='mt-6 flex items-center w-full'>
					<div className='w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6  md:grid-cols-3 md:gap-y-10 lg:gap-x-8'>
						{mapProducts.map((product, i) => (
							<ProductListing
								key={i}
								product={product}
								index={i}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default ProductReel;
