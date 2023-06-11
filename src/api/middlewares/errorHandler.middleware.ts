import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../../core/errors';
import logger from '../../infrastructure/lib/winston-logger';

export const errorGlobalHandler = (
    err: ApiError,
    _req: Request,
    res: Response,
    _next: NextFunction,
) => {
    if (err) {
        logger.error('400', err);
        return res.status(400).send(err);
    }
    logger.error('500', err);
    return res.status(500).send('Something went wrong');
};
