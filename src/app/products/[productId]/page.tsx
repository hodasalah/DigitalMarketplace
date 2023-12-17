'use client';
import ImageSlider from '@/components/ImageSlider';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { buttonVariants } from '@/components/ui/button';
import { PRODUCT_CATEGORIES } from '@/config';
import { formatPrice } from '@/lib/utils';
import { trpc } from '@/trpc/client';
import { Check, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface ProductDetailsProps {
	params: {
		productId: string;
	};
}

const BREADCRUMBS = [
	{ id: 1, name: 'Home', href: '/' },
	{ id: 2, name: 'Products', href: '/products' },
];
const ProductDetails = ({ params }: ProductDetailsProps) => {
	const { productId } = params;
	const { data, isLoading, isSuccess, isError } =
		trpc.getProductById.getProductById.useQuery({
			id: productId,
		});
	const [product] = data?.products || [{ name: 'hoda' }];
	const validUrls = product?.images
		?.map(({ image }) => (typeof image === 'string' ? image : image.url))
		.filter(Boolean) as string[];

	console.log(data);
	// const payload = await getPayloadClient();
	// const { docs: products } = await payload.find({
	// 	collection: 'products',
	// 	limit: 1,
	// 	where: {
	// 		id: {
	// 			equals: productId,
	// 		},
	// 		approvedForSale: {
	// 			equals: 'approved',
	// 		},
	// 	},
	// });
	// const [product] = products;
	const label = PRODUCT_CATEGORIES.find(
		(cat) => cat.value === product?.category,
	)?.label;

	if (isLoading) {
		return (
			<div className='flex items-center justify-center w-full h-[calc(100vh-4rem)]'>
				<Loader2 className='animate-spin text-blue-500 w-16 h-16' />
			</div>
		);
	}
	if (isError) {
		return (
			<div className='flex flex-col items-center justify-center h-[calc(100vh-4rem)]  mx-auto'>
				<div className='relative w-full  h-[340px] md:px-0 px-10'>
					<Image
						src='/error-2.jpg'
						alt='Not found'
						className='object-fit object-center max-w-[500px] max-h-[400px] mx-auto'
						fill
					/>
				</div>

				<p className='font-semibold text-md px-2  text-gray-900 leading-3 text-center'>
					OOPS SOMETHING WENT WRONG .
				</p>
				<p className='mt-1 text-sm px-2 text-muted-foreground text-center'>
					Please try again later
				</p>

				<Link
					href='/products'
					className={buttonVariants({
						variant: 'link',
						className: 'mt-1',
					})}
				>
					Back to our Shop
				</Link>
			</div>
		);
	}
	return data?.products?.length && product && isSuccess ? (
		<MaxWidthWrapper className='bg-white'>
			<div className='bg-white'>
				<div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8'>
					{/* product details */}
					<div className='lg:max-w-lg lg:self-end'>
						<ol className='flex items-center space-x-2'>
							{BREADCRUMBS.map((item, i) => (
								<li key={item.id}>
									<div className='flex items-center text-sm'>
										<Link
											href={item.href}
											className='font-medium text-sm text-muted-foreground hover:text-gray-900'
										>
											{item.name}
										</Link>
										{i !== BREADCRUMBS.length - 1 ? (
											<svg
												viewBox='0 0 20 20'
												fill='currentColor'
												aria-hidden='true'
												className='ml-2 h-5 w-5 flex-shrink-0 text-gray-300'
											>
												<path d='M5.555 17.776l8-16 .894.448-8 16-.894-.448z' />
											</svg>
										) : null}
									</div>
								</li>
							))}
						</ol>
						<div className='mt-4'>
							<h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
								{product.name}
							</h1>
						</div>
						<section className='mt-4'>
							<div className='flex items-center'>
								<p className='font-medium text-gray-900'>
									{formatPrice(product?.price)}
								</p>
								<div className='ml-4 border-1 text-muted-foreground border-gray-300 pl-4'>
									{label}
								</div>
							</div>

							<div className='mt-4 span-y-6'>
								<p>{product?.description}</p>
							</div>
							<div className='mt-6 flex items-center'>
								<Check
									aria-hidden='true'
									className='h-5 w-5 flex-shrink-0 text-green-500'
								/>
								<p className='ml-2 text-sm text-muted-foreground'>
									Eligible for instant delivery
								</p>
							</div>
						</section>
					</div>
					{/* Display Product Image */}
					<div className='mt-10 lg:col-start-2 lg:row-start-2 lg:mt-0 lg:self-center'>
						<div className='aspect-square rounded-lg relative overflow-hidden w-full border-2 border-gray-100'>
							<ImageSlider urls={validUrls} />
						</div>
					</div>
					{/* DISPLAY ADD TO CART  */}
				</div>
			</div>
		</MaxWidthWrapper>
	) : null;
};

export default ProductDetails;
