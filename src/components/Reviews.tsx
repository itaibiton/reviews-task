import React, { useState } from "react";
import { Review } from "./Review";

type ReviewsProps = {
	reviews: TReview[];
	setReviews: React.Dispatch<React.SetStateAction<TReview[]>>;
};

export const Reviews = ({ reviews, setReviews }: ReviewsProps) => {
	const [editingReview, setEditingReview] = useState<TReview | null>(null);

	return (
		<ul className="reviews-container">
			{Array.isArray(reviews) &&
				reviews.length > 0 &&
				reviews.map((review, index) => (
					<Review
						review={review}
						reviews={reviews}
						key={`${review.name}_${index}`}
						setReviews={setReviews}
						editingReview={editingReview}
						setEditingReview={setEditingReview}
					/>
				))}
		</ul>
	);
};
