import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities';

export interface IUsersService {
    getUsers(): User[];
    getUserById(id: number): User;
    createUser(user: CreateUserDto): User;
    patchUser(user: Partial<CreateUserDto>, id: number): User;
}
