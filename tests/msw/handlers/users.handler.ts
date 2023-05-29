import { rest } from 'msw';
import { mockDb } from '../../mocks/db';

export default [
    rest.get('api/v1/users', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(mockDb));
    }),
    rest.get('api/v1/users/1', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(mockDb[0]));
    }),
];
