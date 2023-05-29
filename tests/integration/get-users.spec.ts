import request from 'supertest';
import ExpressApp from '../../src/app';
import UsersController from '../../src/api/controllers/users.controller';
import { Server, IncomingMessage, ServerResponse } from 'http';
import { mockDb } from '../mocks/db';

describe('GET /api/v1/users endpoint', () => {
    let app: ExpressApp;
    let server: Server<typeof IncomingMessage, typeof ServerResponse>;
    beforeEach(() => {
        app = new ExpressApp(5000, [], [UsersController]);
        server = app.start();
    });

    afterEach(() => {
        if (server) {
            server.close();
        }
    });

    it('should return status 200 and a list of users, happy path', async () => {
        try {
            const response = await request(server)
                .get('/api/v1/users')
                .set('Accept', 'application/json');

            expect(response.status).toEqual(200);
            expect(response.body).toEqual(mockDb);
        } catch (error) {
            throw error;
        }
    });
});
