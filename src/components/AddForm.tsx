import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FaRegStar, FaStar } from "react-icons/fa";
import { getRandomImage } from "../lib/generateImage";
import { schema } from "./EditForm";

export const AddForm = ({ reviews, setReviews }: FormProps) => {
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<IFormInput>({
		resolver: zodResolver(schema),
		defaultValues: {
			stars: 0,
		},
	});

	const onSubmit: SubmitHandler<IFormInput> = async (data) => {
		console.log(data);

		// Check if a review from this user already exists
		const existingReview = reviews.find((review) => review.name === data.name);

		let imgUrl;
		if (existingReview) {
			// Use the existing image URL if the reviewer already submitted before
			imgUrl = existingReview.image;
		} else {
			// Otherwise, generate a new image URL
			imgUrl = await getRandomImage();
		}

		// Create the new review object
		const newReview: TReview = {
			...data,
			image: imgUrl,
			createdAt: new Date(),
			id: reviews.length === 0 ? 1 : reviews.length + 1,
		};

		// Update state to include the new review
		setReviews((prevReviews) => [...prevReviews, newReview]);
		reset();
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

			<button type="submit">Submit Review</button>
		</form>
	);
};
