import { z } from 'zod';

const baseImagesSchema = z.object({
  front: z.string().url({ message: 'Front image must be a valid URL' }),
  back: z.string().url({ message: 'Back image must be a valid URL' }),
});

const createProductValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    }),
    brand: z.string({
      required_error: 'Brand is required',
      invalid_type_error: 'Brand must be a string',
    }),
    price: z.number({
      required_error: 'Price is required',
    }),
    baseImages: baseImagesSchema,
    category: z.string({
      required_error: 'Category is required',
    }),
    description: z.string(),
    quantity: z.number({
      required_error: 'Quantity is required',
    }),
    inStock: z.boolean(),
  }),
});

export const productValidations = {
  createProductValidationSchema,
};
