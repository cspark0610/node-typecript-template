import { ApiError } from '../../core/errors';
import logger from '../lib/logger';

export default class UsersRepository {
    private users = [
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' },
        { id: 3, name: 'Jack' },
    ];

    constructor() {
        logger.info('UsersRepository initialized');
    }

    getUsers() {
        return this.users;
    }

    getUsersById(id: number) {
        const user = this.users.find((user) => user.id === id);

        if (!user) {
            throw new ApiError('User not found', 'UE01').serializeError();
        }
        return user;
    }
}
