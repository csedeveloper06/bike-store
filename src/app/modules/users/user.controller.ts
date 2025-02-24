import { NextFunction, Request, RequestHandler, Response } from 'express';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const createUser = catchAsync(async (req, res) => {
  const { password, user: userData } = req.body;
  //    const zodParsedData = userValidationSchema.parse(userData);
  const result = await UserServices.createUserIntoDB(password, userData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is created succesfully',
    data: result,
  });
});
const getSingleUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await UserServices.getSingleUserFromDB(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is retrieved succesfully',
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsersFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users are retrieved succesfully',
    data: result,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await UserServices.deleteUserFromDB(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is deleted succesfully',
    data: result,
  });
});

export const UserControllers = {
  createUser,
  getSingleUser,
  getAllUsers,
  deleteUser,
};
