import catchAsync from '../../utils/catchAsync';
import { OrderServices } from './order.service';

import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createOrder = catchAsync(async (req, res) => {
  console.log('📦 Request Body in Controller:', req.body);
  //   const { payload } = req.body;
  const result = await OrderServices.createOrderIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order is created succesfully',
    data: result,
  });
});

const getAllOrders = catchAsync(async (req, res) => {
  const result = await OrderServices.getAllOrdersFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders are retrieved succesfully',
    data: result,
  });
});
const getTotalRevenue = catchAsync(async (req, res) => {
  const result = await OrderServices.totalRevenueFromOrders();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Revenue calculated succesfully',
    data: result,
  });
});
const getSingleOrder = catchAsync(async (req, res) => {
  const { orderId } = req.params;
  const result = await OrderServices.getSingleOrderFromDB(orderId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order is retrieved succesfully',
    data: result,
  });
});
const updateOrder = catchAsync(async (req, res) => {
  const { orderId } = req.params;
  const updatedData = req.body;
  const result = await OrderServices.updateOrderIntoDB(orderId, updatedData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order is updated succesfully',
    data: result,
  });
});
const deleteOrder = catchAsync(async (req, res) => {
  const { orderId } = req.params;
  const result = await OrderServices.deleteOrderFromDB(orderId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order is deleted succesfully',
    data: result,
  });
});

export const OrderControllers = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
  deleteOrder,
  getTotalRevenue,
};
