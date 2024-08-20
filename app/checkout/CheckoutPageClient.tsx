'use client';

import { carsForRent } from '@/data';
import { CheckoutForm } from './_components/CheckoutForm';
import { Car } from '@/types';
import Image from 'next/image';

interface CheckoutPageClientProps {
	vehicleId: string;
	startDate: string;
	endDate: string;
	clerkUserId: string | '';
}

const CheckoutPageClient = ({
	vehicleId,
	startDate,
	endDate,
	clerkUserId,
}: CheckoutPageClientProps) => {
	const car: Car | undefined = carsForRent.find(
		car => car.vehicleId === Number(vehicleId)
	);

	return (
		<main>
			<div className='w-full flex justify-center'>
				<Image
					src={`/${car?.image}`}
					alt='Car image'
					width={300}
					height={300}
				/>
			</div>
			<CheckoutForm
				car={car}
				startDate={startDate}
				endDate={endDate}
				clerkUserId={clerkUserId || ''}
			/>
		</main>
	);
};

export default CheckoutPageClient;
