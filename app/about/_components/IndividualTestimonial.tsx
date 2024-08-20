import Image from 'next/image';

interface IndividualTestimonialProps {
	testimonial: string;
	name: string;
	carRented: string;
	image: string;
}

const IndividualTestimonial = ({
	testimonial,
	name,
	carRented,
	image,
}: IndividualTestimonialProps) => {
	return (
		<div className=''>
			<div className='w-full flex justify-center'>
				<div className='flex justify-center mt-2 md:mt-4 lg:mt-6'>
					<Image
						src='/quote-marks.svg'
						alt='testimonials'
						width={100}
						height={100}
					/>
				</div>
			</div>
			<div className='grid grid-cols-1 gap-4 w-full px-16'>
				<div className='flex flex-col items-center justify-center space-y-2'>
					<p className='text-lg sm:text-xl text-center'>{testimonial}</p>
					<Image
						src={image}
						alt='testimonials'
						width={40}
						height={40}
					/>
					<div className='flex flex-col items-center'>
						<p className='text-sm text-secondary-foreground'>{name}</p>
						<p className='text-sm text-secondary-foreground'>{carRented}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default IndividualTestimonial;
