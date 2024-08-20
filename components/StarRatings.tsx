'use client';

import StarRatings from 'react-star-ratings';

export interface StarRatingsProps {
	rating?: number;
}

export default function StarRating({ rating }: StarRatingsProps) {
	return (
		<div>
			<StarRatings
				rating={rating}
				numberOfStars={5}
				name='rating'
				starSpacing={'2px'}
				starDimension={'20px'}
				starRatedColor='#e14747'
				starEmptyColor='#999999'
			/>
		</div>
	);
}
