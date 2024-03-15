import { useEffect } from "react";
import { useState } from "react";
import { Reviews } from "./components/Reviews";
import { AddForm } from "./components/AddForm";

function App() {
	const [reviews, setReviews] = useState<TReview[]>([]);

	// Load reviews from localStorage when the component mounts
	useEffect(() => {
		const storedReviews = localStorage.getItem("reviews");
		if (storedReviews) {
			setReviews(JSON.parse(storedReviews));
		}
	}, []);

	// Save reviews to localStorage whenever they change
	useEffect(() => {
		localStorage.setItem("reviews", JSON.stringify(reviews));
	}, [reviews]);

	return (
		<div className="main-container">
			<p className="title">User Reviews</p>
			<Reviews reviews={reviews} setReviews={setReviews} />
			<AddForm reviews={reviews} setReviews={setReviews} />
		</div>
	);
}

export default App;
