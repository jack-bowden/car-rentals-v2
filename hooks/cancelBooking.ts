import prisma from '@/lib/prismadb';
import { revalidatePath } from 'next/cache';

export const cancelBooking = async (bookingId: number) => {
	const deleteBooking = await prisma.bookings.delete({
		where: {
			id: bookingId,
		},
	});

	revalidatePath('/bookings');
	return deleteBooking;
};
