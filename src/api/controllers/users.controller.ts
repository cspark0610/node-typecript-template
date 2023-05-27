import { Request, Response } from 'express';
import { UserRoles } from '../../core/emuns/userRoles.enum';
import UsersService from '../../core/services/users.service';
import { Controller } from '../../infrastructure/decorators/route/controller.decorator';
import { Get } from '../../infrastructure/decorators/route/handlers.decorator';
import logger from '../../infrastructure/lib/logger';
import { Roles } from '../middlewares/roles.middleware';

@Controller('/api/v1/users')
export default class UsersController {
    usersService: UsersService;

    constructor() {
        logger.info(`${UsersController.name} initialized`);
        this.usersService = new UsersService();
    }

    @Get('')
    async getUsers(req: Request, res: Response) {
        const users = this.usersService.getUsers();
        return res.status(200).json(users);
    }

    @Get('/:id', Roles(UserRoles.ADMIN))
    async getUserById(req: Request, res: Response) {
        const { id } = req.params;
        const user = this.usersService.getUsersById(+id);
        return res.status(200).json(user);
    }
}
