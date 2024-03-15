import { useState } from "react";
import { FaEdit, FaStar, FaTrash } from "react-icons/fa";
import { formatDate } from "../lib/format";
import { EditForm } from "./EditForm";

type ReviewProps = {
	review: TReview;
	editingReview: TReview | null;
	setEditingReview: React.Dispatch<React.SetStateAction<TReview | null>>;
	reviews: TReview[];
	setReviews: React.Dispatch<React.SetStateAction<TReview[]>>;
};

export const Review = ({
	review,
	reviews,
	setReviews,
	editingReview,
	setEditingReview,
}: ReviewProps) => {
	// Function to generate stars
	const renderStars = (numStars: number) => {
		let stars = [];
		for (let i = 0; i < numStars; i++) {
			// This can be replaced with an <img> tag or an icon component for visual stars
			stars.push(
				<span key={i}>
					<FaStar className="star" />
				</span>
			);
		}
		return stars;
	};

	const handleDelete = () => {
		setReviews((currentReviews) =>
			currentReviews.filter(
				(r) => r.name !== review.name || r.createdAt !== review.createdAt
			)
		);
	};

	return (
		<div className="review">
			<div className="review-header">
				<div className="row gap">
					<img src={review.image} />
					<div className="column center">
						<p className="review-name">{review.name}</p>
						<p className="review-date">{formatDate(review.createdAt)}</p>
					</div>
				</div>
				<div className="review-stars">{renderStars(review.stars)}</div>
			</div>
			<p className="review-review">"{review.review}"</p>
			<div className="review-footer">
				<button className="edit-btn" onClick={() => setEditingReview(review)}>
					<FaEdit />
					Edit
				</button>
				<button className="delete-btn" onClick={handleDelete}>
					<FaTrash />
					Delete
				</button>
			</div>
			{editingReview?.id === review.id && (
				<EditForm
					review={review}
					setReviews={setReviews}
					reviews={reviews}
					setEditingReview={setEditingReview}
				/>
			)}
		</div>
	);
};
