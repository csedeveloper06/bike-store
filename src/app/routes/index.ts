import { Router } from 'express';
import { UserRoutes } from '../modules/users/user.route';
import { ProductRoutes } from '../modules/products/product.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/products',
    route: ProductRoutes,
  },
];

moduleRoutes.forEach((item) => router.use(item.path, item.route));

export default router;
