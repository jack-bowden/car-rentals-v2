import CheckoutPageClient from './CheckoutPageClient';
import { auth } from '@clerk/nextjs/server';

const CheckoutPage = ({
	searchParams,
}: {
	searchParams: {
		vehicleId: string;
		startDate: string;
		endDate: string;
	};
}) => {
	const { userId: clerkUserId } = auth();
	const vehicleId = searchParams.vehicleId;
	const startDate = searchParams.startDate?.toString();
	const endDate = searchParams.endDate?.toString();

	return (
		<CheckoutPageClient
			vehicleId={vehicleId}
			startDate={startDate}
			endDate={endDate}
			clerkUserId={clerkUserId || ''}
		/>
	);
};

export default CheckoutPage;
