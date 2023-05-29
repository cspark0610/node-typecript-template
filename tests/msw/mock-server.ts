import { setupServer } from 'msw/node';
import { rest } from 'msw';
import usersHandler from './handlers/users.handler';

export default {
    Msw: setupServer(...usersHandler),
    rest,
};
