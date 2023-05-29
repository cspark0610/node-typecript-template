import { Handler, Request, Response } from 'express';
import UsersService from '../services/users.service';

export interface IUsersController {
    getUsers(req: Request, res: Response): Response<any, Record<string, any>>;
    getUserById(req: Request, res: Response): Response<any, Record<string, any>>;
    createUser(req: Request, res: Response): Response<any, Record<string, any>>;
    patchUser(req: Request, res: Response): Response<any, Record<string, any>>;
}

// export interface IUsersController {
//     [handlerName: string]: Handler | UsersService;
// }

// export type HandlerFunction = (req: Request, res: Response) => Response<any, Record<string, any>>;
