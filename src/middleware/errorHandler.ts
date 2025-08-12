import { Request, Response, NextFunction } from 'express';
import { ErrorResponse } from '../helper/common-response';

export function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  ErrorResponse(res, error);
}
