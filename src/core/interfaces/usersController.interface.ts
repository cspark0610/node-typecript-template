import { Request, Response } from 'express';

export interface IUsersController {
    getUsers(req: Request, res: Response): Response<any, Record<string, any>>;
    getUserById(req: Request, res: Response): Response<any, Record<string, any>>;
    createUser(req: Request, res: Response): Response<any, Record<string, any>>;
    patchUser(req: Request, res: Response): Response<any, Record<string, any>>;
}
