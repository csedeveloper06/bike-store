import { z } from 'zod';

const createProductValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    brand: z.string(),
    price: z.number(),
    category: z.string(),
    description: z.string(),
    quantity: z.number(),
    inStock: z.boolean(),
  }),
});

const updateProductValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    brand: z.string().optional(),
    price: z.number().optional(),
    category: z.string().optional(),
    description: z.string().optional(),
    quantity: z.number().optional(),
    inStock: z.boolean().optional(),
  }),
});

export const productValidations = {
  createProductValidationSchema,
  updateProductValidationSchema,
};
