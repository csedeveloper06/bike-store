import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createUserValidationSchema } from './user.validation';

const router = express.Router();

router.post(
  '/create-user',
  validateRequest(createUserValidationSchema),
  UserControllers.createUser,
);

router.get('/:userId', UserControllers.getSingleUser);

router.delete('/:userId', UserControllers.deleteUser);

router.get('/', UserControllers.getAllUsers);

export const UserRoutes = router;
