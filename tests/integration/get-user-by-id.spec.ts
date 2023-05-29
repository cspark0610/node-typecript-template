import request from 'supertest';
import mockServer from '../msw/mock-server';
import ExpressApp from '../../src/app';
import UsersController from '../../src/api/controllers/users.controller';
import { Server, IncomingMessage, ServerResponse } from 'http';
import { mockDb } from '../mocks/db';
import { ApiError } from '../../src/core/errors';

describe('GET /api/v1/users/:id endpoint', () => {
    let app: ExpressApp;
    let server: Server<typeof IncomingMessage, typeof ServerResponse>;
    const { Msw } = mockServer;
    beforeAll(() => {
        Msw.listen();
    });
    afterAll(() => {
        Msw.close();
    });

    beforeEach(() => {
        app = new ExpressApp(5000, [], [UsersController]);
        server = app.start();
    });

    afterEach(() => {
        if (server) {
            server.close();
        }
        Msw.resetHandlers();
    });

    describe('when getting user by id', () => {
        beforeEach(() => {});
        it('should return status 200 and a user, happy path', async () => {
            try {
                const response = await request(server)
                    .get('/api/v1/users/1')
                    .set('Accept', 'application/json');

                expect(response.status).toEqual(200);
                expect(response.body).toEqual(mockDb[0]);
            } catch (error) {
                throw error;
            }
        });

        it('should return an ApiError instance, when user is not found', async () => {
            try {
                const response = await request(server)
                    .get('/api/v1/users/77')
                    .set('Accept', 'application/json');
                expect(response.body).toEqual(
                    new ApiError('User not found', 'UE01', 'UsersRepository').serializeError(),
                );
            } catch (error) {
                throw error;
            }
        });
    });
});
