import { z } from 'zod';

const customerAddressValidationSchema = z.object({
  roadNo: z.string(),
  blockNo: z.string(),
  buildingNo: z.string(),
  area: z.string(),
  city: z.string(),
});

const updateCustomerAddressValidationSchema = z.object({
  roadNo: z.string().optional(),
  blockNo: z.string().optional(),
  buildingNo: z.string().optional(),
  area: z.string().optional(),
  city: z.string().optional(),
});

export const createOrderValidationSchema = z.object({
  body: z.object({
    user: z.string(),
    product: z.string(),
    quantity: z.number(),
    // totalPrice: z.number(),
    orderDate: z.string().date(),
    deliveryDate: z.string().date(),
    orderStatus: z.string(),
    customerAddress: customerAddressValidationSchema,
  }),
});
export const updateOrderValidationSchema = z.object({
  body: z.object({
    user: z.string().optional(),
    product: z.string().optional(),
    quantity: z.number().optional(),
    totalPrice: z.number().optional(),
    orderDate: z.string().date().optional(),
    deliveryDate: z.string().date().optional(),
    orderStatus: z.string().optional(),
    customerAddress: updateCustomerAddressValidationSchema,
  }),
});

export const OrderValidation = {
  createOrderValidationSchema,
  updateCustomerAddressValidationSchema,
};
