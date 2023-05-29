import { Handler } from 'express';

export interface IControllerInstance {
    [handlerName: string]: Handler;
}
