import { TReview } from './review.interface';
import { Review } from './review.model';

const createReviewIntoDB = async (reviewData: TReview) => {
  const result = await Review.create(reviewData);
  return result;
};
const getAllReviewsFromDB = async () => {
  const result = await Review.find();
  return result;
};

export const ReviewServices = {
  createReviewIntoDB,
  getAllReviewsFromDB,
};
