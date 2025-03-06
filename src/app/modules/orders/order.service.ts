import { Order } from './orders.model';
import { TOrder } from './orders.interface';
import { Product } from '../products/products.model';
import { TProduct } from '../products/products.interfacfe';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';

const getAllOrdersFromDB = async () => {
  const result = await Order.find();
  return result;
};

const getSingleOrderFromDB = async (id: string) => {
  const result = await Order.findById(id);
  return result;
};

const createOrderIntoDB = async (product: TProduct, payload: TOrder) => {
  const bike = await Product.findById(product);
  if (!bike) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found !');
  }

  if (bike.quantity < payload.quantity) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Insufficient stock. Only ${bike.quantity} bikes left.`,
    );
  }

  bike.quantity -= payload.quantity;
  if (bike.quantity === 0) {
    bike.inStock = false;
  }

  await bike.save();

  const result = await Order.create(payload);
  return result;
};

const updateOrderIntoDB = async (id: string, updatedData: Partial<TOrder>) => {
  const result = await Order.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteOrderFromDB = async (id: string) => {
  const result = await Order.findByIdAndDelete(id);
  return result;
};

const totalRevenueFromOrders = async () => {
  const result = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: { $multiply: ['$totalPrice', '$quantity'] } },
      },
    },
  ]);
  const totalRevenue = result.length > 0 ? result[0].totalRevenue : 0;
  return totalRevenue;
};

export const OrderServices = {
  getAllOrdersFromDB,
  getSingleOrderFromDB,
  createOrderIntoDB,
  updateOrderIntoDB,
  deleteOrderFromDB,
  totalRevenueFromOrders,
};
