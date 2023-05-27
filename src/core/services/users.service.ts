import logger from '../../infrastructure/lib/logger';
import UsersRepository from '../../infrastructure/repositories/users.repository';

export default class UsersService {
    private usersRepository: UsersRepository;

    constructor() {
        logger.info('UsersService initialized');
        this.usersRepository = new UsersRepository();
    }

    getUsers() {
        return this.usersRepository.getUsers();
    }

    getUsersById(id: number) {
        return this.usersRepository.getUsersById(id);
    }
}
