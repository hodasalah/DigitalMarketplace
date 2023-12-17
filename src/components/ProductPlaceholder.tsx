import { Skeleton } from './ui/skeleton';

const ProductPlaceholder = () => {
	return (
		<div className='flex flex-col w-full'>
			<div className='relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl'>
				<Skeleton className='w-full h-full' />
			</div>
			<Skeleton className='mt-4 h-4 rounded-lg w-2/3' />
			<Skeleton className='mt-2 h-4 rounded-lg w-16' />
			<Skeleton className='mt-2 h-4 rounded-lg w-12' />
		</div>
	);
};

export default ProductPlaceholder;
