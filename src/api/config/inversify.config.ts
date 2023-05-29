import { Container } from 'inversify';
import { IUsersController, IUsersRepository, IUsersService } from '../../core/interfaces';
import UsersService from '../../core/services/users.service';
import UsersRepository from '../../infrastructure/repositories/users.repository';
import UsersController from '../controllers/users.controller';
import { TYPES } from './inversify.types';

let container = new Container();

container.bind<IUsersController>(TYPES.USERS_CONTROLLER).to(UsersController);
container.bind<IUsersService>(TYPES.USERS_SERVICE).to(UsersService);
container.bind<IUsersRepository>(TYPES.USERS_REPOSITORY).to(UsersRepository);

export default container;
