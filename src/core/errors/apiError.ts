import { TypeResponse } from '../emuns';
import { DataErrorResponse } from '../types';

export class ApiError extends Error {
    constructor(message: string, private code: string, private _stack: string) {
        super(message);

        Object.setPrototypeOf(this, ApiError.prototype);
    }

    serializeError(): DataErrorResponse {
        return {
            type: TypeResponse.ERROR,
            data: {
                error: {
                    code: this.code,
                    message: this.message,
                },
                stack: this._stack,
            },
        };
    }
}
