import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FaRegStar, FaStar } from "react-icons/fa";
import { z } from "zod";
import { getRandomImage } from "../lib/generateImage";

// Define a schema for the form values
export const schema = z.object({
	name: z.string().min(1, "Name is required"),
	review: z.string().min(1, "Review is required"),
	stars: z.number().min(0).max(5),
});

export const EditForm = ({
	reviews,
	review,
	setReviews,
	setEditingReview,
}: EditFormProps) => {
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<IFormInput>({
		resolver: zodResolver(schema),
		defaultValues: {
			name: review.name,
			review: review.review,
			stars: review.stars,
		},
	});

	const onSubmit: SubmitHandler<IFormInput> = async (data) => {
		console.log(data);

		// Generating or fetching the image URL
		let imgUrl = await getRandomImage(); // Default action is to get a new image

		// Check for an existing review other than the current one being edited
		const reviewIndex = reviews.findIndex(
			(r) => r.name === review.name && r.createdAt === review.createdAt
		);

		if (reviewIndex > -1) {
			// Editing existing review: Check if the name has changed and get an image accordingly
			if (data.name !== reviews[reviewIndex].name) {
				const existingReview = reviews.find(
					(review) => review.name === data.name
				);
				imgUrl = existingReview ? existingReview.image : imgUrl;
			} else {
				// If the name hasn't changed, keep the old image URL
				imgUrl = reviews[reviewIndex].image;
			}

			const updatedReview: TReview = {
				...reviews[reviewIndex],
				...data,
				image: imgUrl,
			};

			// Update the review in the array
			const updatedReviews = [...reviews];
			updatedReviews[reviewIndex] = updatedReview;
			setReviews(updatedReviews);
		} else {
			// Adding a new review
			const newReview: TReview = {
				...data,
				image: imgUrl,
				createdAt: new Date(), // Assuming createdAt is a string
			};
			setReviews((prevReviews) => [...prevReviews, newReview]);
		}
		reset(); // Assuming you're using React Hook Form's reset to reset the form fields
		setEditingReview(null);
	};

	const [hoveredStar, setHoveredStar] = useState<number | null>(null);

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="review-form">
			<div className="column">
				<label htmlFor="name" className={`${errors?.name ? "error" : ""}`}>
					Name
				</label>
				<Controller
					name="name"
					control={control}
					defaultValue=""
					render={({ field }) => <input id="name" {...field} />}
				/>
			</div>

			<div className="column">
				<label htmlFor="review" className={`${errors?.review ? "error" : ""}`}>
					Review
				</label>
				<Controller
					name="review"
					control={control}
					defaultValue=""
					render={({ field }) => <textarea id="review" {...field} />}
				/>
			</div>

			<div className="star-rating">
				{[...Array(5).keys()].map((index) => {
					const ratingValue = index + 1;
					return (
						<Controller
							key={ratingValue}
							name="stars"
							control={control}
							defaultValue={0}
							render={({ field }) => (
								<div
									onMouseEnter={() => setHoveredStar(ratingValue)}
									onMouseLeave={() => setHoveredStar(null)}
									onClick={() => field.onChange(ratingValue)}
								>
									{ratingValue <= (hoveredStar || field.value) ? (
										<FaStar className="star" />
									) : (
										<FaRegStar className="star" />
									)}
								</div>
							)}
						/>
					);
				})}
			</div>

			<button type="submit">Edit</button>
		</form>
	);
};
