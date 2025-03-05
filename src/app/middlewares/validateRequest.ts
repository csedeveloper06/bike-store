import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import catchAsync from '../utils/catchAsync';

const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await schema.parseAsync({
      body: req.body,
      cookies: req.cookies,
    });
    next();
  });
};

// const validateRequest =
//   (schema: AnyZodObject) =>
//   (req: Request, res: Response, next: NextFunction) => {
//     try {
//       console.log('🚀 Incoming Request Body:', req.body); // ✅ Log the request body

//       schema.parse(req.body); // Validate using Zod
//       next(); // If valid, proceed to the next middleware/controller
//     } catch (error) {
//       return res.status(400).json({
//         success: false,
//         message: 'Validation Error',
//         errors: error.errors,
//       });
//     }
//   };

export default validateRequest;
