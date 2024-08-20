import CarLogoBanner from '@/components/CarLogoBanner';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
	return (
		<main className='flex flex-col pt-10 sm:pt-6 lg:pt-10 min-h-[625px] max-h-[650px]'>
			<div className='w-full max-h-[500px] flex flex-col lg:flex-row items-center justify-between flex-grow'>
				<div className='w-full lg:w-auto lg:order-2 overflow-hidden'>
					<Image
						src='/corsa2.png'
						alt='logo'
						width={580}
						height={580}
						className='w-full h-auto max-h-[40vh] lg:max-h-none object-contain'
					/>
				</div>
				<div className='w-full lg:w-1/2 lg:pl-16 flex flex-col items-center lg:items-start space-y-4 order-2 lg:order-1 mt-4 lg:mt-0'>
					<h1 className='text-4xl md:text-5xl lg:text-6xl text-center lg:text-left'>
						Quality cars<span className='text-red-500'>.</span>
					</h1>
					<h1 className='text-4xl md:text-5xl lg:text-6xl text-center lg:text-left'>
						Low prices<span className='text-red-500'>.</span>
					</h1>
					<Link href='/cars'>
						<Button
							className='mt-2 px-4 sm:px-6 md:px-8 lg:px-10'
							size='lg'
						>
							Book today
						</Button>
					</Link>
				</div>
			</div>
			<div className='mt-8 md:mt-auto w-full  lg:mt-24'>
				<CarLogoBanner />
			</div>
		</main>
	);
}
