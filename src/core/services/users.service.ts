import 'reflect-metadata';
import logger from '../../infrastructure/lib/winston-logger';
import UsersRepository from '../../infrastructure/repositories/users.repository';
import { CreateUserDto } from '../dto';
import { IUsersService } from '../interfaces';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../api/config/inversify.types';

@injectable()
export default class UsersService implements IUsersService {
    usersRepository: UsersRepository;

    constructor(@inject(TYPES.USERS_REPOSITORY) usersRepository: UsersRepository) {
        logger.info(`${UsersService.name} initialized`);
        this.usersRepository = usersRepository;
    }

    getUsers() {
        return this.usersRepository.getUsers();
    }

    getUserById(id: number) {
        return this.usersRepository.getUserById(id);
    }

    createUser(createUserDto: CreateUserDto) {
        return this.usersRepository.createUser(createUserDto);
    }

    patchUser(patchUserDto: Partial<CreateUserDto>, id: number) {
        return this.usersRepository.patchUser(patchUserDto, id);
    }
}
