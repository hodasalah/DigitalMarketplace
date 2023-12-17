// using swiper slider
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import type SwiperType from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface ImageProps {
	urls: string[];
}
const ImageSlider = ({ urls }: ImageProps) => {
	const [swiper, setSwiper] = useState<null | SwiperType>(null);
	const [activeIndex, setActiveIndex] = useState(0);
	const [slideConfig, setSlideConfig] = useState({
		isBeginning: true,
		isEnd: activeIndex === (urls.length ?? 0) - 1,
	});

	useEffect(() => {
		swiper?.on('slideChange', ({ activeIndex }) => {
			setActiveIndex(activeIndex);
			setSlideConfig({
				isBeginning: activeIndex == 0,
				isEnd: activeIndex === (urls.length ?? 0) - 1,
			});
		});
	}, [swiper, urls]);

	const activeStyles =
		'active:scale-[0.97] grid opacity-100 hover:scale-105 absolute top-1/2 -translate-y-1/2 aspect-square h-8 w-8 z-50 place-items-center rounded-full border-2 bg-white border-zinc-300';

	const inActiveStyles = 'hidden text-gray-400';

	return (
		<div className='group  bg-zinc-100 aspect-square w-full  rounded-t-lg h-full'>
			<div className='absolute z-10 inset-0 opacity-0 group-hover:opacity-100 transition'>
				<button
					className={cn(activeStyles, 'right-2 transition', {
						[inActiveStyles]: slideConfig.isEnd,
						'hover:bg-primary-300 text-primary-800 opacity-100':
							!slideConfig.isEnd,
					})}
					aria-label='next-image'
					onClick={(e) => {
						e.preventDefault();
						swiper?.slideNext();
					}}
				>
					<ChevronRight className='h-4 w-4 text-zinc-700' />
				</button>

				<button
					className={cn(activeStyles, 'left-2 transition', {
						[inActiveStyles]: slideConfig.isBeginning,
						'hover:bg-primary-300 text-primary-800 opacity-100':
							!slideConfig.isBeginning,
					})}
					aria-label='previous-image'
					onClick={(e) => {
						e.preventDefault();
						swiper?.slidePrev();
					}}
				>
					<ChevronLeft className='h-4 w-4 text-zinc-700' />
				</button>
			</div>
			<Swiper
				pagination={{
					renderBullet: (_, className) => {
						return `<span class="rounded-lg transition ${className}"></span>`;
					},
				}}
				onSwiper={(swiper) => setSwiper(swiper)}
				spaceBetween={50}
				slidesPerView={1}
				modules={[Pagination]}
				className='h-full w-full'
			>
				{urls?.map((url, i) => (
					<SwiperSlide
						key={i}
						className='-z-10 relative h-full w-full'
					>
						<Image
							src={url}
							fill
							loading='eager'
							className='z-10 w-full h-full object-cover object-center'
							alt='product image'
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default ImageSlider;
