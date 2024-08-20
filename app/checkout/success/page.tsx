import { Button } from '@/components/ui/button';
import Link from 'next/link';

const CheckoutSuccessPage = () => {
	return (
		<main>
			<div className='flex flex-col w-full h-[80vh] items-center justify-center space-y-5'>
				<div>
					<h1 className='text-2xl md:text-3xl text-center'>
						Booking confirmed
					</h1>
					<p className='text-secondary-foreground text-sm md:text-md'>
						Thank you for booking with us, enjoy your vehicle and drive safe
					</p>
				</div>
				<Button>
					<Link href='/bookings'>View Bookings</Link>
				</Button>
			</div>
		</main>
	);
};

export default CheckoutSuccessPage;
