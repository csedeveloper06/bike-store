import { model, Schema } from 'mongoose';
import { TImage, TProduct } from './products.interfacfe';

const imageSchema = new Schema<TImage>({
  src: { type: String, required: true },
  setting: { type: String, required: true },
});

const productSchema = new Schema<TProduct>(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    baseImages: {
      front: { type: String, required: true },
      back: { type: String, required: true },
    },
    images: {
      front: {
        type: [{ src: String, setting: String }],
        required: true,
        default: [],
      },
      back: {
        type: [{ src: String, setting: String }],
        required: true,
        default: [],
      },
    },
    category: {
      type: String,
      enum: ['Mountain', 'Road', 'Hybrid', 'Electric'],
    },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  },
);

productSchema.pre<TProduct>('save', function (next) {
  const resolutions = [500, 779, 1020, 1200, 1426];

  this.images.front = resolutions.map((res) => ({
    src: this.baseImages.front.replace('.jpg', `_${res}.jpg`),
    setting: `${res}w`,
  }));

  this.images.back = resolutions.map((res) => ({
    src: this.baseImages.back.replace('.jpg', `_${res}.jpg`),
    setting: `${res}w`,
  }));

  next();
});

export const Product = model<TProduct>('Product', productSchema);
