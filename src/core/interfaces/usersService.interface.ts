import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities';

export interface IUsersService {
    getUsers(): User[];
    getUsersById(id: number): User;
    createUser(user: CreateUserDto): User;
}
