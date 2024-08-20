import prisma from '@/lib/prismadb';

export const getUsersBookings = async (clerkUserId: string) => {
	try {
		const user = await prisma.user.findFirst({
			where: {
				clerkUserId,
			},
		});

		if (!user) {
			return null;
		}

		const booking = await prisma.bookings.findMany({
			where: {
				userId: user.id,
			},
			orderBy: {
				createdAt: 'desc',
			},
		});

		return booking;
	} catch (error) {
		throw Error;
	}
};
