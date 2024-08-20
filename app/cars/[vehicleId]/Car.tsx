'use client';

import { useState } from 'react';
import { carsForRent } from '@/data';
import Image from 'next/image';
import { useFormatPrice } from '@/lib/useFormatPrice';
import StarRating from '@/components/StarRatings';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Matcher } from 'react-day-picker';

interface CarProps {
	car: any;
	bookedDateRanges: { startDate: string; endDate: string }[] | [];
}

type DateRange = [Date | null, Date | null];

function formatDateRange(dates: DateRange) {
	const [startDate, endDate] = dates;

	if (startDate && endDate) {
		return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
	} else if (startDate) {
		return startDate.toLocaleDateString();
	} else {
		return 'Check Availability';
	}
}

function calculateTotalPrice(dates: DateRange, car: any): number {
	const [startDate, endDate] = dates;

	if (startDate && endDate) {
		const totalDays = Math.ceil(
			(endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
		);
		return totalDays * car.price;
	}

	return 0;
}

function calculateNumberOfDays(dates: DateRange): number {
	const [startDate, endDate] = dates;

	if (startDate && endDate) {
		const totalDays = Math.ceil(
			(endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
		);

		return totalDays;
	}

	return 0;
}

const Car = ({ car, bookedDateRanges }: CarProps) => {
	const [dateRange, setDateRange] = useState<DateRange>([null, null]);
	const [startDate, endDate] = dateRange;

	const handleDateChange = (update: DateRange) => {
		setDateRange(update);
	};

	const formattedDateRange = formatDateRange(dateRange);
	const totalPrice = car ? calculateTotalPrice(dateRange, car) : 0;
	const numberOfDays = calculateNumberOfDays(dateRange);

	const functionMatcher: Matcher = (date: Date) => {
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		if (date < today) return true;

		return bookedDateRanges.some(range => {
			const startDate = new Date(
				range.startDate.split('-').reverse().join('-')
			);
			const endDate = new Date(range.endDate.split('-').reverse().join('-'));

			startDate.setHours(0, 0, 0, 0);
			endDate.setHours(0, 0, 0, 0);

			return date >= startDate && date <= endDate;
		});
	};

	if (!car) {
		return (
			<main className='w-full min-h-[88vh] px-4 sm:px-12 justify-center flex flex-col items-center'>
				<h1 className='text-2xl font-semibold'>Car Not Found</h1>
				<p className='mt-4 text-gray-600'>
					Sorry, the car you're looking for doesn't exist or has been removed.
				</p>
			</main>
		);
	}

	return (
		<main className='w-full min-h-[88vh] px-4 sm:px-12 justify-center flex flex-col'>
			<div className='flex flex-col items-center w-full h-full justify-center'>
				<Image
					src={`/${car.image}`}
					alt={car.model}
					width={550}
					height={550}
				/>
				<div className='w-full flex items-center justify-center'>
					<h1 className='text-xl sm:text-2xl'>
						{car.make} {car.model}
					</h1>
					<div className='flex truncate ml-10'>
						<StarRating rating={car.rating} />
						<p className='ml-2 pt-1 font-semibold'>{car.rating}</p>
					</div>
				</div>
				<div className='grid grid-cols-2 h-full w-full sm:w-4/5 space-y-1 mt-4 truncate gap-x-2'>
					<p className='text-left font-semibold'>
						Price<span className='text-red-500 font-bold'>:</span>{' '}
						<span className='text-secondary-foreground'>
							{useFormatPrice(Number(car.price))} / Day
						</span>
					</p>
					<p className='text-right font-semibold'>
						Doors<span className='text-red-500 font-bold'>:</span>{' '}
						<span className='text-secondary-foreground'>{car.doors}</span>
					</p>
					<p className='text-left font-semibold'>
						Transmission
						<span className='text-red-500 font-bold'>:</span>{' '}
						<span className='text-secondary-foreground'>
							{car.transmission}
						</span>
					</p>
					<p className='text-right font-semibold'>
						Fuel Type
						<span className='text-red-500 font-bold'>:</span>{' '}
						<span className='text-secondary-foreground'>{car.fuelType}</span>
					</p>
					<p className='text-left font-semibold'>
						Power
						<span className='text-red-500 font-bold'>:</span>{' '}
						<span className='text-secondary-foreground'>{car.power}</span>
					</p>
					<p className='text-right font-semibold'>
						MPG
						<span className='text-red-500 font-bold'>:</span>{' '}
						<span className='text-secondary-foreground'>{car.mpg}</span>
					</p>
				</div>
			</div>
			<div className='w-full flex items-center justify-center'>
				<div className='mt-12 w-full sm:w-1/2'>
					<div className='mb-6 flex w-full justify-center'>
						<Popover>
							<PopoverTrigger>
								<span className='w-full truncate'>{formattedDateRange}</span>
							</PopoverTrigger>

							<PopoverContent className='w-auto p-0'>
								<Calendar
									mode='range'
									selected={{
										from: startDate || undefined,
										to: endDate || undefined,
									}}
									onSelect={range => {
										handleDateChange([range?.from || null, range?.to || null]);
									}}
									initialFocus
									disabled={functionMatcher}
								/>
							</PopoverContent>
						</Popover>
					</div>
					{startDate && endDate && (
						<Link
							href={{
								pathname: '/checkout',
								query: {
									vehicleId: car.vehicleId.toString(),
									startDate: `${startDate.toISOString()}`,
									endDate: `${endDate.toISOString()}`,
								},
							}}
							className='mt-6'
						>
							<Button className='w-full'>
								Rent Vehicle - {useFormatPrice(totalPrice) + ' '}
								for {numberOfDays} days
							</Button>
						</Link>
					)}
				</div>
			</div>
		</main>
	);
};

export default Car;
