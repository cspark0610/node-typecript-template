import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { RequestHandler } from 'express';
import { ApiError } from '../../core/errors';
import logger from '../../infrastructure/lib/logger';
import { validatorOptions } from '../constants';

export const ValidationMiddleware = (classDto: any): RequestHandler => {
    return (req, _res, next) => {
        validate(plainToInstance(classDto, req.body), validatorOptions).then(
            (errors: ValidationError[]) => {
                if (errors.length) {
                    const message = errors
                        .map((error: ValidationError) => Object.values(error.constraints!))
                        .join(', ');

                    logger.error(`Validation failed for ${classDto.name}: ${message}`);
                    next(new ApiError(message, 'VALIDATOR_ERROR', classDto.name).serializeError());
                }
                next();
            },
        );
    };
};