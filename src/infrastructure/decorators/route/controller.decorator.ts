import { MetadataKeys } from '../../utils/metadata.keys';

/**
 * Creates a Controller as a decorator, that will be used in Controller Classes
 */
export const Controller = (basePath: string): ClassDecorator => {
    return (target: any) => {
        return Reflect.defineMetadata(MetadataKeys.BASE_PATH, basePath, target);
    };
};
