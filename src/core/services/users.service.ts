import logger from '../../infrastructure/lib/logger';
import UsersRepository from '../../infrastructure/repositories/users.repository';
import { CreateUserDto } from '../dto';
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

    createUser(createUserDto: CreateUserDto) {
        return this.usersRepository.createUser(createUserDto);
    }

    patchUser(patchUserDto: Partial<CreateUserDto>, id: number) {
        return this.usersRepository.patchUser(patchUserDto, id);
    }
}
