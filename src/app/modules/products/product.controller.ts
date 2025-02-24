import { Request, Response } from 'express';
import { productServices } from './product.service';

const createProduct = async (req: Request, res: Response) => {
  try {
    const { product: productData } = req.body;
    const result = await productServices.createProductIntoDB(productData);

    res.status(200).json({
      success: true,
      message: 'Bike created successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await productServices.getAllProductsFromDB();

    res.status(200).json({
      success: true,
      message: 'Bikes retrieved successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { bikeId } = req.params;
    const result = await productServices.getSingleProductFromDB(bikeId);

    res.status(200).json({
      success: true,
      message: 'Bike retrieved successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
};
