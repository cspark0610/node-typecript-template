interface ValidatorOptions {
    skipMissingProperties?: boolean;
    whitelist?: boolean;
    forbidNonWhitelisted?: boolean;
    groups?: string[];
    dismissDefaultMessages?: boolean;
    validationError?: {
        target?: boolean;
        value?: boolean;
    };

    forbidUnknownValues?: boolean;
    stopAtFirstError?: boolean;
}

export const validatorOptions: ValidatorOptions = {
    whitelist: false,
    forbidNonWhitelisted: true,
    validationError: {
        target: false,
        value: true,
    },
};
