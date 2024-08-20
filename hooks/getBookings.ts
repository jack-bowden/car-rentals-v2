import prisma from '@/lib/prismadb';
import { Bookings } from '@/types';

export const getBookings = async (vehicleId: number): Promise<Bookings[]> => {
	const bookings = await prisma.bookings.findMany({
		where: {
			vehicleId,
		},
	});

	if (bookings.length > 0) {
		return bookings;
	} else {
		return [];
	}
};
