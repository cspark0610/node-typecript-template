import { TypeResponse } from '../emuns';
import { DataResponse } from '../types';

export class ApiError extends Error {
    type = TypeResponse.ERROR;

    constructor(message: string, private code: string) {
        super(message);
        this.code = code;

        Object.setPrototypeOf(this, ApiError.prototype);
    }

    serializeError(): DataResponse {
        return {
            type: this.type,
            data: {
                error: {
                    code: this.code,
                    message: this.message,
                },
            },
        };
    }
}
