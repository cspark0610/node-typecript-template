import { MetadataKeys } from '../../utils/metadata.keys';

export enum HTTPMethods {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete',
    PATCH = 'patch',
    OPTIONS = 'options',
}

export interface IRouter {
    method: HTTPMethods;
    middlewares: any[];
    handlerPath: string;
    handlerName: string | symbol;
}

/**
 * Creates a handler as a factory decorator, that will be used to decorate methods inside controller
 */
const decoratorFactory =
    (method: HTTPMethods) =>
    (path: string, ...middlewares: any[]): MethodDecorator => {
        return (target: any, propertyKey: string | symbol, _descriptor: PropertyDescriptor) => {
            const controllerClass = target.constructor;

            const routers: IRouter[] = Reflect.hasMetadata(MetadataKeys.ROUTERS, controllerClass)
                ? Reflect.getMetadata(MetadataKeys.ROUTERS, controllerClass)
                : [];

            const router: IRouter = {
                method,
                middlewares,
                handlerPath: path,
                handlerName: propertyKey,
            };

            routers.push(router);
            Reflect.defineMetadata(MetadataKeys.ROUTERS, routers, controllerClass);
        };
    };

// here we use decorator Factory to create decorators for each HTTP method
export const Get = decoratorFactory(HTTPMethods.GET);
export const Post = decoratorFactory(HTTPMethods.POST);
export const Put = decoratorFactory(HTTPMethods.PUT);
export const Patch = decoratorFactory(HTTPMethods.PATCH);
export const Delete = decoratorFactory(HTTPMethods.DELETE);
