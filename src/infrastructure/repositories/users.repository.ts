import { CreateUserDto } from '../../core/dto';
import { ApiError } from '../../core/errors';
import logger from '../lib/logger';

export default class UsersRepository {
    users = [
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' },
        { id: 3, name: 'Jack' },
    ];

    constructor() {
        logger.info(`${UsersRepository.name} initialized`);
    }

    getUsers() {
        return this.users;
    }

    getUsersById(id: number) {
        const user = this.users.find((user) => user.id === id);

        if (!user) {
            throw new ApiError('User not found', 'UE01', UsersRepository.name).serializeError();
        }
        return user;
    }

    createUser(dto: CreateUserDto) {
        const created = { id: Math.floor(Math.random() * 10), ...dto };
        this.users.push(created);
        return created;
    }
}
