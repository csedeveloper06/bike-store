import express from 'express';
import { ProductControllers } from './product.controller';
import validateRequest from '../../middlewares/validateRequest';
import { productValidations } from './product.validation';

const router = express.Router();

router.post(
  '/create-product',
  // validateRequest(productValidations.createProductValidationSchema),
  ProductControllers.createProduct,
);
router.get('/', ProductControllers.getAllProducts);

router.get('/:productId', ProductControllers.getSingleProduct);

router.put('/:productId', ProductControllers.updateProduct);

router.get('/:productId', ProductControllers.deleteProduct);

export const ProductRoutes = router;
