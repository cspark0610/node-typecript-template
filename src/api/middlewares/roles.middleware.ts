import { Request, Response, NextFunction } from 'express';
import { UserRoles } from '../../core/emuns/userRoles.enum';
import logger from '../../infrastructure/lib/logger';

export const Roles = (roles: UserRoles) => {
    return (_req: Request, res: Response, next: NextFunction) => {
        logger.info(`Rol pasado ${roles}`);
        next();
    };
};
