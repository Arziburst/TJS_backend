// Core
import { Request, Response, NextFunction } from 'express';
import Ajv, { ValidateFunction, SchemaValidateFunction } from 'ajv';

// Instruments
import { ValidationError } from '../helpers';

export const validator = (schema: Object) => (req: Request, res: Response, next: NextFunction) => {
    const ajv = new Ajv({ allErrors: true });
    const validate = ajv.compile(schema);
    const valid = validate(req.body);

    if (valid) {
        next();
    } else {
        const errors = validate?.errors?.map(({ message }) => message).join(', ');
        const body = JSON.stringify(req.body, null, 2);

        next(new ValidationError(`${req.method}: ${req.originalUrl} [ ${errors} ]\n${body}`));
    }
};
