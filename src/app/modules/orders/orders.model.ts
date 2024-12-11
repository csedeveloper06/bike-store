import { Schema, model } from 'mongoose';
import { TOrders } from './orders.interface';

const orderSchema = new Schema<TOrders>({
  email: { type: String, required: true },
  product: { type: Schema.Types.ObjectId, required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
});

const Order = model<TOrders>('Order', orderSchema);
