import { Router } from 'express';
import { UserRoutes } from '../modules/users/user.route';
import { ProductRoutes } from '../modules/products/product.route';
import { AuthRoutes } from '../modules/Auth/auth.route';

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
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((item) => router.use(item.path, item.route));

export default router;
