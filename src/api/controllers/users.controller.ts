import { Request, Response } from 'express';
import 'reflect-metadata';
import { UserRoles } from '../../core/emuns';
import UsersService from '../../core/services/users.service';
import { Controller } from '../../infrastructure/decorators/route/controller.decorator';
import { Get, Post, Patch } from '../../infrastructure/decorators/route/handlers.decorator';
import logger from '../../infrastructure/lib/winston-logger';
import { ValidationMiddleware } from '../middlewares';
import { Roles } from '../middlewares/roles.middleware';
import { CreateUserDto } from '../../core/dto';
import { IUsersController } from '../../core/interfaces';
import { inject, injectable } from 'inversify';
import { TYPES } from '../config/inversify.types';

@injectable()
@Controller('/api/v1/users')
export default class UsersController implements IUsersController {
    usersService: UsersService;

    constructor(@inject(TYPES.USERS_SERVICE) usersService: UsersService) {
        logger.info(`${UsersController.name} initialized`);
        this.usersService = usersService;
    }

    @Get('')
    getUsers(req: Request, res: Response) {
        const users = this.usersService.getUsers();
        return res.status(200).json(users);
    }

    @Get('/:id', Roles(UserRoles.ADMIN))
    getUserById(req: Request, res: Response) {
        const { id } = req.params;
        const user = this.usersService.getUserById(+id);
        return res.status(200).json(user);
    }

    @Post('', ValidationMiddleware(CreateUserDto))
    createUser(req: Request, res: Response) {
        const user = this.usersService.createUser(req.body);
        return res.status(201).json(user);
    }

    @Patch('/:id', ValidationMiddleware(CreateUserDto, true))
    patchUser(req: Request, res: Response) {
        const { id } = req.params;
        const user = this.usersService.patchUser(req.body, +id);
        return res.status(204).json(user);
    }
}
