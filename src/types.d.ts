declare module '@dudadev/random-img';

type TReview = {
    name: string;
    review: string;
    createdAt: Date;
    stars: number;
    image: string;
    id: number
};

// TypeScript interface for the form data based on the schema
type IFormInput = {
    name: string;
    review: string;
    stars: number;
}

type FormProps = {
    reviews: TReview[];
    setReviews: React.Dispatch<React.SetStateAction<TReview[]>>;
};

type EditFormProps = {
    reviews: TReview[];
    review: TReview;
    setReviews: React.Dispatch<React.SetStateAction<TReview[]>>;
    setEditingReview: React.Dispatch<React.SetStateAction<TReview | null>>;
};