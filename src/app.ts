import path from 'path';
import express, { Application, Handler } from 'express';
import morgan from 'morgan';
import logger from './infrastructure/lib/logger';
import { MetadataKeys } from './infrastructure/utils/metadata.keys';
import { IRouter } from './infrastructure/decorators/route/handlers.decorator';

import swaggerUi from 'swagger-ui-express';
import swaggerParser from '@apidevtools/swagger-parser';
import { options } from './openapi/config-options';
import { errorGlobalHandler } from './api/middlewares';

import { Container } from 'inversify';
import container from './api/config/inversify.config';
import { TYPES } from './api/config/inversify.types';
import { IUsersController } from './core/interfaces';

class ExpressApplication {
    private app: Application;
    private port: string | number;
    private container: Container;

    constructor(port: string | number, middlewares: any[], controllers: any[]) {
        this.app = express();
        this.port = port;
        this.container = container;

        // __init__
        //this.configureAssets();
        this.setupMorganLogger();
        this.setupMiddlewares(middlewares);
        this.setupRoutes(controllers);
        this.useGlobalErrorHandler();
    }

    // configureAssets() {
    //     this.app.use(express.static(path.join(__dirname, '..', 'public')));
    // }

    setupMorganLogger() {
        if (process.env.NODE_ENV === 'development') {
            this.app.use(morgan('dev'));
        }
    }

    setupMiddlewares(middlewaresArr: any[]) {
        middlewaresArr.forEach((middleware) => {
            this.app.use(middleware);
        });
    }

    setupRoutes(controllers: any[]) {
        const info: Array<{ api: string; handler: string }> = [];

        controllers.forEach((Controller) => {
            const controllerInstance = this.container.get<IUsersController>(
                TYPES.USERS_CONTROLLER,
            ) as unknown as { [handlerName: string]: Handler };

            // "/api/v1/users" basePath lo que ponga dentro del decorador Controller()
            const basePath = Reflect.getMetadata(MetadataKeys.BASE_PATH, Controller);

            // de acuerdo a lo hecho en handlers.decorator.ts
            const routers: IRouter[] = Reflect.getMetadata(MetadataKeys.ROUTERS, Controller);

            const expressRouter = express.Router({ mergeParams: true });

            routers.forEach(({ method, handlerPath, middlewares, handlerName }) => {
                if (middlewares.length) {
                    expressRouter[method](
                        handlerPath,
                        ...middlewares,
                        controllerInstance[String(handlerName)].bind(controllerInstance),
                    );
                } else {
                    expressRouter[method](
                        handlerPath,
                        controllerInstance[String(handlerName)].bind(controllerInstance),
                    );
                }
                info.push({
                    api: `${method.toUpperCase()} - ${basePath}${handlerPath}`,
                    handler: `${Controller.name}.${String(handlerName)}`,
                });
            });
            this.app.use(basePath, expressRouter);
        });
        console.table(info);
    }

    useGlobalErrorHandler() {
        this.app.use('*', errorGlobalHandler);
    }

    public async setupSwaggerDoc() {
        if (process.env.NODE_ENV === 'development') {
            return swaggerParser
                .dereference(path.join(__dirname, 'openapi/index.yaml'))
                .then((result) => {
                    this.app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(result, options));
                    logger.info(`Swagger docs on: http://localhost:${this.port}/api-doc`);
                })
                .catch((error) => {
                    logger.error(JSON.stringify(error));
                });
        }
    }

    public start() {
        return this.app.listen(this.port, () => {
            logger.info(`Server is running on port ${this.port}`);
        });
    }
}

export default ExpressApplication;
