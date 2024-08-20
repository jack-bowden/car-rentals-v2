import { carBrandLogos } from '@/data';
import Image from 'next/image';

const CarLogoBanner = () => {
	return (
		<div className='w-full grid grid-cols-6 gap-4 items-center opacity-50 mt-12 sm:mt-20 '>
			{carBrandLogos.map(brand => (
				<div
					key={brand.name}
					className='flex justify-center items-center'
				>
					<Image
						src={brand.src}
						width={50}
						height={50}
						alt={brand.name}
						className='h-auto max-w-[40px] max-h-[40px] sm:max-h-none sm:max-w-none'
					/>
				</div>
			))}
		</div>
	);
};

export default CarLogoBanner;
