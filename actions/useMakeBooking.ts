'use server';

import { makeBooking } from '@/hooks/makeBooking';
import { BookingDetails } from '@/types';

export async function useMakeBooking(bookingDetails: BookingDetails) {
	return await makeBooking(bookingDetails);
}
