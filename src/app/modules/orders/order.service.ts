import { Order } from './orders.model';
import { TOrder } from './orders.interface';

const getAllOrdersFromDB = async () => {
  const result = await Order.find();
  return result;
};

const getSingleOrderFromDB = async (id: string) => {
  const result = await Order.findById(id);
  return result;
};

const createOrderIntoDB = async (payload: TOrder) => {
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

export const OrderServices = {
  getAllOrdersFromDB,
  getSingleOrderFromDB,
  createOrderIntoDB,
  updateOrderIntoDB,
  deleteOrderFromDB,
};
