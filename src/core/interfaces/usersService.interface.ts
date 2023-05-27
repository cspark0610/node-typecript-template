import { User } from '../entities';

export interface IUsersService {
    getUsers(): User[];
    getUsersById(id: number): User;
}
