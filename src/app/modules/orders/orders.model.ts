import { Schema, model } from 'mongoose';
import { TCustomerAddress, TOrder } from './orders.interface';
import { Product } from '../products/products.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

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

const orderSchema = new Schema<TOrder>(
  {
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
      default: 0,
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
  },
  {
    timestamps: true,
  },
);

orderSchema.pre('save', async function (next) {
  if (!this.isModified('product') && !this.isModified('quantity')) {
    return next();
  }

  const product = await Product.findById(this.product);
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }

  this.totalPrice = product?.price * this.quantity;
  next();
});

export const Order = model<TOrder>('Order', orderSchema);
