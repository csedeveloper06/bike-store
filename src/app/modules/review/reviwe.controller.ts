import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ReviewServices } from './review.servce';
import httpStatus from 'http-status';

const createReview = catchAsync(async (req, res) => {
  const result = await ReviewServices.createReviewIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review is created succesfully',
    data: result,
  });
});

const getAllReviews = catchAsync(async (req, res) => {
  const result = await ReviewServices.getAllReviewsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reviews are retrieved succesfully',
    data: result,
  });
});

export const ReviewControllers = {
  createReview,
  getAllReviews,
};
