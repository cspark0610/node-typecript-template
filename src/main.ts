import 'reflect-metadata';
require('express-async-errors');
import express from 'express';
import dotenv from 'dotenv';
import ExpressApplication from './app';
import logger from './infrastructure/lib/logger';
import UsersController from './api/controllers/users.controller';

// Load the envs based on current NODE_ENV
dotenv.config({ path: `${process.cwd()}/.env.${process.env.NODE_ENV}` });

function main() {
    const PORT = process.env.PORT || 5000;
    const app = new ExpressApplication(
        PORT,
        [express.json(), express.urlencoded({ extended: true, limit: '10mb' })],
        [UsersController],
    );

    const server = app.start();
    if (server) {
        app.setupSwaggerDoc();
    }
    //Handle SIGTERM
    process.on('SIGTERM', () => {
        logger.warn('SIGTERM signal received: closing HTTP server');
        server.close(() => {
            logger.info('HTTP server closed');
        });
    });
}
main();
