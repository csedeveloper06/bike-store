import { Schema, model } from 'mongoose';
import { TCustomerAddress, TOrder } from './orders.interface';

const customerAddressSchema = new Schema<TCustomerAddress>({
  roadNo: {
    type: String,
    required: true,
  },
  blockNo: {
    type: String,
    required: true,
  },
  buildingNo: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
});

const orderSchema = new Schema<TOrder>({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  product: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Product',
  },
  quantity: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now(),
  },
  deliveryDate: {
    type: Date,
    default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  },
  orderStatus: {
    type: String,
    enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending',
  },
  customerAddress: customerAddressSchema,
});

export const Order = model<TOrder>('Order', orderSchema);
