import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/users/user.interface';
import { User } from '../modules/users/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    // if the token is sent from the client
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'you are not authorized');
    }

    // check if the token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { role, email, iat } = decoded;

    const user = await User.isUserExistsByEmail(email);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
    }

    // checking if the user is deleted
    const isDeleted = user?.isDeleted;
    if (isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted');
    }

    // if the user is blocked
    const userStatus = user?.status;
    if (userStatus === 'blocked') {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked');
    }

    if (
      user.passwordChangedAt &&
      User.isJwtIssuedBeforePasswordChanged(
        user.passwordChangedAt,
        iat as number,
      )
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized  hi!',
      );
    }

    req.user = decoded as JwtPayload;

    next();
  });
};

export default auth;
