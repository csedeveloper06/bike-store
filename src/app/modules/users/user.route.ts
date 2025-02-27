import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createUserValidationSchema } from './user.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

router.post(
  '/create-user',
  auth(USER_ROLE.admin),
  validateRequest(createUserValidationSchema),
  UserControllers.createUser,
);

router.get('/:userId', UserControllers.getSingleUser);

router.delete('/:userId', UserControllers.deleteUser);

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.customer),
  UserControllers.getAllUsers,
);

export const UserRoutes = router;
