import BookingsPageClient from './BookingsPageClient';
import { auth } from '@clerk/nextjs/server';
import { getUsersBookings } from '@/hooks/getUsersBookings';

const BookingsPage = async () => {
	const { userId: clerkUserId } = auth();
	const bookings = await getUsersBookings(clerkUserId!);

	return (
		<main>
			<BookingsPageClient bookings={bookings} />
		</main>
	);
};

export default BookingsPage;
