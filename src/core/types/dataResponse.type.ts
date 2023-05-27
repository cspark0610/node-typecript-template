import { TypeResponse } from '../emuns';

export type DataErrorResponse = {
    type: TypeResponse.ERROR;
    data: {
        error: {
            code: string;
            message: string;
        };
        stack: string;
    };
};
