import { model, Schema } from 'mongoose';
import { TReview } from './review.interface';

const reviewSchema = new Schema<TReview>({
  customerName: { type: String, required: true },
  image: { type: String, required: true },
  jobTitle: { type: String, required: true },
  description: { type: String, required: true },
});

export const Review = model<TReview>('Review', reviewSchema);
