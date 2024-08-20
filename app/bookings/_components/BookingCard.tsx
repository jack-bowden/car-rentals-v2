'use client';

import { Bookings } from '@/types';
import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { useFormatPrice } from '@/lib/useFormatPrice';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { carsForRent } from '@/data';
import { useCancelBooking } from '@/actions/useCancelBooking';
import { toast } from 'react-toastify';
import Link from 'next/link';

interface BookingCardProps {
	booking: Bookings;
}

const BookingCard = ({ booking }: BookingCardProps) => {
	const [loading, setLoading] = useState(false);
	const [shouldCancel, setShouldCancel] = useState(false);

	const isBookingDeletable = useCallback((endDate: string) => {
		const currentDate = new Date();
		const [endDay, endMonth, endYear] = endDate.split('-').map(Number);
		const bookingEndDate = new Date(endYear, endMonth - 1, endDay);
		return bookingEndDate > currentDate;
	}, []);

	const getImage = useCallback(() => {
		const car = carsForRent.find(car => car.vehicleId === booking?.vehicleId);
		return (
			<Link
				href={`/cars/${booking.make.toLowerCase()}-${booking.model
					.toLowerCase()
					.replaceAll(' ', '-')}/${booking.vehicleId?.toString()}`}
			>
				<Image
					key={booking?.id}
					src={`/${car?.image}`}
					alt={`${booking?.make} ${booking?.model}`}
					width={300}
					height={200}
					className='rounded-lg'
				/>
			</Link>
		);
	}, [booking]);

	const handleCancelClick = useCallback(() => {
		setShouldCancel(true);
	}, []);

	useEffect(() => {
		const cancelBooking = async () => {
			if (!shouldCancel) return;

			try {
				setLoading(true);
				const success = await useCancelBooking(booking.id);
				if (success) {
					toast.success('Booking canceled successfully');
				} else {
					toast.error('Failed to cancel booking');
				}
			} catch (error) {
				console.error('Error canceling booking:', error);
				toast.error('An error occurred while canceling the booking');
			} finally {
				setLoading(false);
				setShouldCancel(false);
			}
		};

		cancelBooking();
	}, [shouldCancel, booking.id]);

	return (
		<div className='w-full px-4 sm:px-6 lg:px-8 py-6'>
			<div className='flex flex-col sm:flex-row items-center sm:items-start w-full'>
				{loading && <p>Loading...</p>}
				<div className='w-full sm:w-1/3 mb-4 sm:mb-0 sm:mr-6'>{getImage()}</div>
				<div className='w-full sm:w-2/3'>
					<h1 className='text-lg sm:text-xl font-semibold mb-4'>
						{booking?.make} {booking?.model}
					</h1>
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
						<p className='font-semibold'>
							Total Price<span className='text-red-500'>:</span>{' '}
							<span className='text-secondary-foreground'>
								{useFormatPrice(Number(booking?.totalPrice))}
							</span>
						</p>
						<p className='font-semibold'>
							Start Date<span className='text-red-500'>:</span>{' '}
							<span className='text-secondary-foreground'>
								{booking.startDate}
							</span>
						</p>
						<p className='font-semibold'>
							End Date<span className='text-red-500'>:</span>{' '}
							<span className='text-secondary-foreground'>
								{booking.endDate}
							</span>
						</p>
						<p className='font-semibold'>
							Duration<span className='text-red-500'>:</span>{' '}
							<span className='text-secondary-foreground'>
								{booking.duration} days
							</span>
						</p>
					</div>
					{isBookingDeletable(booking?.endDate) && (
						<Button
							onClick={handleCancelClick}
							className='mt-6 lg:mt-20 bg-red-500 hover:bg-red-600 text-white'
							disabled={loading}
						>
							{loading ? 'Canceling...' : 'Cancel Booking'}
						</Button>
					)}
				</div>
			</div>
			<Separator className='mt-6' />
		</div>
	);
};

export default BookingCard;
