import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OrderControllers } from './order.controller';
import {
  createOrderValidationSchema,
  OrderValidation,
} from './order.validation';

const router = express.Router();

router.post(
  '/create-order',
  validateRequest(OrderValidation.createOrderValidationSchema),
  OrderControllers.createOrder,
);

router.get('/', OrderControllers.getAllOrders);

router.get('/:orderId', OrderControllers.getSingleOrder);

router.put('/:orderId', OrderControllers.updateOrder);

router.delete('/:orderId', OrderControllers.deleteOrder);

export const OrderRoutes = router;
