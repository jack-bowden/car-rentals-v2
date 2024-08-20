export interface Car {
	vehicleId: number;
	make: string;
	model: string;
	image: string;
	price: number;
	rating: number;
	doors: number;
	transmission: string;
	fuelType: string;
	power: number;
	mpg: number;
}

export interface BookingDetails {
	vehicleId: number;
	price: number;
	duration: number;
	totalPrice: number;
	make: string;
	model: string;
	startDate: string;
	endDate: string;
}

export interface Bookings {
	id: number;
	vehicleId: number;
	make: string;
	model: string;
	startDate: string;
	endDate: string;
	totalPrice: number;
	price: number;
	duration: number;
	createdAt: Date;
	updatedAt: Date;
	userId: number;
}
