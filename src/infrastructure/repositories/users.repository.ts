import 'reflect-metadata';
import logger from '../lib/winston-logger';
import { CreateUserDto } from '../../core/dto';
import { ApiError } from '../../core/errors';
import { IUsersRepository } from '../../core/interfaces';
import { injectable } from 'inversify';
import { mockDb } from '../datasources';

@injectable()
export default class UsersRepository implements IUsersRepository {
    constructor() {
        logger.info(`${UsersRepository.name} initialized`);
    }

    getUsers() {
        return mockDb;
    }

    getUserById(id: number) {
        const users = mockDb;
        const user = users.find((user) => user.id === id);

        if (!user) {
            throw new ApiError('User not found', 'UE01', UsersRepository.name).serializeError();
        }
        return user;
    }

    createUser(dto: CreateUserDto) {
        const users = mockDb;
        const created = { id: Math.floor(Math.random() * 10), ...dto };
        users.push(created);
        return created;
    }

    patchUser(dto: Partial<CreateUserDto>, id: number) {
        let users = mockDb;
        const user = this.getUserById(id);
        const updated = { ...user, ...dto };
        users = users.map((user) => (user.id === id ? updated : user));
        return updated;
    }
}
