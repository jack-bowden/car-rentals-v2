'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import CheckoutFormField from './CheckoutFormField';
import { Car } from '@/types';
import { useFormatDate } from '@/lib/useFormatDate';
import { useFormatPrice } from '@/lib/useFormatPrice';
import Link from 'next/link';
import { useMakeBooking } from '@/actions/useMakeBooking';
import { useRouter } from 'next/navigation';
import { SignInButton } from '@clerk/nextjs';

interface CheckoutFormProps {
	startDate: string;
	endDate: string;
	car: Car | undefined;
	clerkUserId: string | '';
}

const formSchema = z.object({
	make: z.string().min(1, {
		message: 'Make must be at least 1 character.',
	}),
	model: z.string().min(1, {
		message: 'Model must be at least 1 character.',
	}),
	price: z.string(),
	duration: z.string(),
	startDate: z.string({
		message: 'Start Date must be a valid date.',
	}),
	endDate: z.string({
		message: 'End Date must be a valid date.',
	}),
	totalPrice: z.string(),
	vehicleId: z.string(),
});

export function CheckoutForm({
	startDate,
	endDate,
	car,
	clerkUserId,
}: CheckoutFormProps) {
	const router = useRouter();
	console.log(clerkUserId);

	const calculateTotalPrice = (
		startDateStr: string,
		endDateStr: string,
		price: number
	) => {
		const startDate = new Date(startDateStr);
		const endDate = new Date(endDateStr);

		if (startDate && endDate) {
			const totalDays = Math.ceil(
				(endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
			);
			return useFormatPrice(Number(totalDays * price));
		}

		return '';
	};

	const calculateNumberOfDays = (startDateStr: string, endDateStr: string) => {
		const startDate = new Date(startDateStr);
		const endDate = new Date(endDateStr);

		if (startDate && endDate) {
			const totalDays = Math.ceil(
				(endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
			);
			return `${totalDays} days`;
		}

		return '0 days';
	};

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			make: car?.make || '',
			model: car?.model || '',
			duration: calculateNumberOfDays(startDate, endDate),
			startDate: useFormatDate(startDate),
			endDate: useFormatDate(endDate),
			price: useFormatPrice(Number(car?.price)),
			totalPrice: calculateTotalPrice(startDate, endDate, Number(car?.price)),
			vehicleId: car?.vehicleId.toString() || '',
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		const parsedValues = {
			...values,
			vehicleId: parseFloat(values.vehicleId),
			price: parseFloat(values.price.replace(/[^0-9.-]+/g, '')),
			duration: parseInt(values.duration),
			totalPrice: parseFloat(values.totalPrice.replace(/[^0-9.-]+/g, '')),
		};
		useMakeBooking(parsedValues);
		router.push('/checkout/success');
		router.refresh();
	}

	return (
		<main>
			<div className='w-full lg:px-28 flex flex-col justify-center items-center'>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='grid grid-cols-2 sm:grid-cols-2 gap-2 mt-6'
					>
						<CheckoutFormField
							form={form}
							name='make'
							formLabel='Make'
							value={car?.make}
							className='text-left'
						/>

						<CheckoutFormField
							form={form}
							name='model'
							formLabel='Model'
							value={car?.model}
							className='text-right'
							classNameFormLabel='justify-end'
						/>

						<CheckoutFormField
							form={form}
							name='duration'
							formLabel='Duration'
							value={calculateNumberOfDays(startDate, endDate)}
							className='text-left'
						/>
						<CheckoutFormField
							form={form}
							name='startDate'
							formLabel='Start Date'
							value={useFormatDate(startDate)}
							className='text-right'
							classNameFormLabel='justify-end'
						/>
						<CheckoutFormField
							form={form}
							name='endDate'
							formLabel='End Date'
							value={useFormatDate(endDate)}
							className='text-left'
						/>
						<CheckoutFormField
							form={form}
							name='price'
							formLabel='Price Per Day'
							value={useFormatPrice(Number(car?.price))}
							className='text-right'
							classNameFormLabel='justify-end'
						/>
						<CheckoutFormField
							form={form}
							name='totalPrice'
							formLabel='Total Price'
							value={calculateTotalPrice(
								startDate,
								endDate,
								Number(car?.price)
							)}
							className='text-left'
						/>
						<div className='col-span-2 sm:col-span-2 flex justify-center mt-6'>
							{clerkUserId && (
								<>
									<Button
										type='submit'
										className='mr-4'
									>
										Confirm Booking
									</Button>
									<Link href={`/cars/${car?.vehicleId}`}>
										<Button variant='outline'>Edit Booking</Button>
									</Link>
								</>
							)}
						</div>
					</form>
				</Form>
				{!clerkUserId && (
					<SignInButton mode='modal'>
						<Button>Please sign in to book</Button>
					</SignInButton>
				)}
			</div>
		</main>
	);
}
