import { Loader2 } from 'lucide-react';

const Loading = () => {
	return (
		<div className='absolute inset-0 w-full h-full bg-white z-[100] flex items-center justify-center'>
			<Loader2 className='animate-spin h-20 w-20 text-blue-500' />
		</div>
	);
};

export default Loading;
