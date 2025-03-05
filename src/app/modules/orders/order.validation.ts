import { z } from 'zod';

const customerAddressValidationSchema = z.object({
  roadNo: z.string(),
  blockNo: z.string(),
  buildingNo: z.string(),
  area: z.string(),
  city: z.string(),
});

export const createOrderValidationSchema = z.object({
  body: z.object({
    user: z.string(),
    product: z.string(),
    quantity: z.number(),
    totalPrice: z.number(),
    orderDate: z.string().date(),
    deliveryDate: z.string().date(),
    orderStatus: z.string(),
    customerAddress: customerAddressValidationSchema,
  }),
});

export const OrderValidation = {
  createOrderValidationSchema,
};
