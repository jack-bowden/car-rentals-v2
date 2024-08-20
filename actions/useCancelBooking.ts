'use server';

import { cancelBooking } from '@/hooks/cancelBooking';

export const useCancelBooking = async (bookingId: number) => {
	return await cancelBooking(bookingId);
};
