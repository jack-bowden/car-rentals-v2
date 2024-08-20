import { auth, currentUser } from '@clerk/nextjs/server';
import prisma from '@/lib/prismadb';
import { BookingDetails } from '@/types';

export const makeBooking = async (bookingDetails: BookingDetails) => {
	const { userId: clerkUserId } = auth();
	const user = await currentUser();
	const { firstName, lastName, emailAddresses } = user || {};
	const email = emailAddresses?.[0]?.emailAddress;

	try {
		const dbUser = await prisma.user.upsert({
			where: {
				email,
			},
			update: {
				firstName: firstName || undefined,
				lastName: lastName || undefined,
				email: email || undefined,
			},
			create: {
				clerkUserId: clerkUserId || 'anonymous',
				firstName: firstName || '',
				lastName: lastName || '',
				email: email || '',
			},
		});

		const booking = await prisma.bookings.create({
			data: {
				...bookingDetails,
				userId: dbUser.id,
			},
		});

		return { user: dbUser, booking };
	} catch (error) {
		console.error('Error in makeBooking:', error);
		throw error;
	}
};
