import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../../core/errors';

export const errorGlobalHandler = (
    err: ApiError,
    _req: Request,
    res: Response,
    _next: NextFunction,
) => {
    if (err) {
        return res.status(200).send(err);
    }
    return res.status(500).send('Something went wrong');
};
