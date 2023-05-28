import 'reflect-metadata';
require('express-async-errors');
import dotenv from 'dotenv';
import ExpressApplication from './app';
import logger from './infrastructure/lib/logger';
import UsersController from './api/controllers/users.controller';

// Load the envs based on current NODE_ENV
dotenv.config({ path: `${process.cwd()}/.env.${process.env.NODE_ENV}` });
const PORT = process.env.PORT || 5000;

function main() {
    const app = new ExpressApplication(PORT, [], [UsersController]);

    const server = app.start();
    //Handle SIGTERM
    process.on('SIGTERM', () => {
        logger.warn('SIGTERM signal received: closing HTTP server');
        server.close(() => {
            logger.info('HTTP server closed');
        });
    });
}
main();
