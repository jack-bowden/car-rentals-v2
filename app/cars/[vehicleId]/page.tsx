import Car from './Car';
import { getBookings } from '@/hooks/getBookings';
import { carsForRent } from '../../../data';
import { Bookings } from '@prisma/client';

const ModelPage = async ({ params }: { params: { vehicleId: number } }) => {
	const vehicleId = Number(params.vehicleId);

	// TODO: get the bookings for the vehicleId. Date ranges?
	// Changed the function to return bookings based on vehicleID, also moved the filtering from here to the function that fetches the data
	const bookings = await getBookings(vehicleId);
	const getBookedDateRanges = (bookings: Bookings[] | []) => {
		if (bookings) {
			return bookings.map(booking => ({
				startDate: booking.startDate,
				endDate: booking.endDate,
			}));
		}

		return [];
	};

	const bookedDateRanges = getBookedDateRanges(bookings);

	// TODO: actually get the car from the vehicleId. What do we do if the car is not found?
	// Filtering car by vehicleId
	const car = carsForRent.find(car => car.vehicleId === vehicleId);

	return (
		<Car
			car={car}
			bookedDateRanges={bookedDateRanges || []}
		/>
	);
};

export default ModelPage;
