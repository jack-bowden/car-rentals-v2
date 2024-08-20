import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';
import { Bookings } from '@/types';
import BookingCard from './_components/BookingCard';

interface BookingPageClientProps {
	bookings: Bookings[] | Bookings | null;
}

const BookingsPageClient = ({ bookings }: BookingPageClientProps) => {
	return (
		<main className='min-h-[88vh] flex flex-col'>
			<SignedOut>
				<RedirectToSignIn />
			</SignedOut>
			<SignedIn>
				<div className='flex-1 mt-6 flex items-center flex-col justify-start'>
					<p className='text-xl sm:text-2xl'>Booking History</p>
					{!bookings ||
						(Array.isArray(bookings) && bookings.length === 0 && (
							<p className='text-secondary-foreground mt-20'>
								No bookings found
							</p>
						))}
					<div className='mt-6 w-full grid grid-cols-1'>
						{Array.isArray(bookings) &&
							bookings?.map(booking => <BookingCard booking={booking} />)}
					</div>
				</div>
			</SignedIn>
		</main>
	);
};

export default BookingsPageClient;
