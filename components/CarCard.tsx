import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useFormatPrice } from '@/lib/useFormatPrice';
import { Button } from './ui/button';
import StarRating from './StarRatings';
import Link from 'next/link';

interface CarCardProps {
	image: string;
	make: string;
	model: string;
	price: number;
	doors: number;
	rating: number;
	transmission: string;
	fuelType: string;
	power: number;
	mpg: number;
	className?: string;
	vehicleId?: number;
}

const CarCard = ({
	image,
	className,
	price,
	make,
	model,
	rating,
	doors,
	transmission,
	fuelType,
	power,
	mpg,
	vehicleId,
}: CarCardProps) => {
	return (
		<Card className={cn('overflow-hidden', className)}>
			<CardContent className='p-2 space-y-2'>
				<Link href={`/cars/${vehicleId?.toString()}`}>
					<div className='flex items-center'>
						<StarRating rating={rating} />
						<p className='ml-2 pt-1 font-semibold'>{rating}</p>
					</div>
					<div className='flex justify-center items-center'>
						<Image
							src={`/${image}`}
							alt='Car Image'
							width={400}
							height={400}
							className='w-full min-h-[125px] max-w-[430px] max-h-[250px] sm:max-h-[250px] md:max-h-[220px] md:max-w-[320px] lg:max-h-none h-auto object-contain'
						/>
					</div>
					<div className='flex'>
						<p className='text-sm text-secondary-foreground'>{doors} doors</p>
					</div>

					<p className='font-bold text-sm md:text-md py-1'>
						{make} {model}
					</p>
					<p className='text-sm md:text-md'>
						{useFormatPrice(Number(price))}/Day
					</p>
					<div className='hidden py-6 md:py-4 lg:py-6 sm:grid grid-cols-4 gap-1'>
						<div className='flex flex-col items-center'>
							<img
								src='/icons/gears.svg'
								alt='Gears'
								className='h-5 w-5 md:h-6 md:w-6'
							/>
							<p className='text-sm md:text-xs lg:text-sm text-secondary-foreground'>
								{transmission}
							</p>
						</div>
						<div className='flex flex-col items-center'>
							<img
								src='/icons/fuel.svg'
								alt='Gears'
								className='h-5 w-5 md:h-6 md:w-6'
							/>
							<p className='text-sm md:text-xs lg:text-sm text-secondary-foreground'>
								{fuelType}
							</p>
						</div>
						<div className='flex flex-col items-center'>
							<img
								src='/icons/speed.svg'
								alt='Gears'
								className='h-5 w-5 md:h-6 md:w-6'
							/>
							<p className='text-sm md:text-xs lg:text-sm text-secondary-foreground'>
								{power}BHP
							</p>
						</div>
						<div className='flex flex-col items-center'>
							<img
								src='/icons/mpg.svg'
								alt='Gears'
								className='h-5 w-5 md:h-6 md:w-6'
							/>
							<p className='text-sm md:text-xs lg:text-sm text-secondary-foreground'>
								{mpg}MPG
							</p>
						</div>
					</div>
					<div className='flex'>
						<Button className='w-full mt-4 sm:mt-0'>Rent</Button>
					</div>
				</Link>
			</CardContent>
		</Card>
	);
};

export default CarCard;
