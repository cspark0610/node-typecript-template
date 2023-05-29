import { Handler } from 'express';

export interface IController {
    [handlerName: string]: Handler;
}
