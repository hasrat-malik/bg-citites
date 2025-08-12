import { Response } from 'express';
import { ISuccessResponse } from './interface';
import { HttpStatusCode } from './enum';
import { getCommonErrorResponse } from './common-function';

export const SuccessResponse: ISuccessResponse = (res, data, statusCode = HttpStatusCode.OK) => {
    return res.status(statusCode).json({
        statusCode,
        body: data ?? {},
    });
};

export const ErrorResponse = (
    res: Response,
    error: any
) => {
    const commonErrorResponse = getCommonErrorResponse(error);
    return res.status(commonErrorResponse.statusCode).json(commonErrorResponse);
};
