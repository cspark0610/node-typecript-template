import logger from '../../infrastructure/lib/logger';
import UsersRepository from '../../infrastructure/repositories/users.repository';
import { IUsersService } from '../interfaces';

export default class UsersService implements IUsersService {
    usersRepository: UsersRepository;

    constructor() {
        logger.info(`${UsersService.name} initialized`);
        this.usersRepository = new UsersRepository();
    }

    getUsers() {
        return this.usersRepository.getUsers();
    }

    getUsersById(id: number) {
        return this.usersRepository.getUsersById(id);
    }
}
