import { TypeResponse } from '../emuns';

export type DataResponse = {
    type: TypeResponse;
    data: {
        error: {
            code: string;
            message: string;
        };
    };
};
