import { Request, Response } from 'express';
import { productServices } from './product.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createProduct = catchAsync(async (req, res) => {
  // const { product: productData } = req.body;
  const result = await productServices.createProductIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is created succesfully',
    data: result,
  });
});

const getAllProducts = catchAsync(async (req, res) => {
  const result = await productServices.getAllProductsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Products are retrieved succesfully',
    data: result,
  });
});

const getSingleProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await productServices.getSingleProductFromDB(productId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is retrieved succesfully',
    data: result,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const updatedData = req.body;
  const result = await productServices.updateProductIntoDB(
    productId,
    updatedData,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is updated succesfully',
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await productServices.deleteProductFromDB(productId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is deleted succesfully',
    data: result,
  });
});

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
