import { ValidationError } from '../errors';

export const getPort = () => {
    const { PORT } = process.env;

    if (!PORT) {
        throw new ValidationError('Environment variable PORT should be specified');
    }

    const isValid = /^[3-9]{1}[0-9]{3}$/.test(PORT);

    if (!isValid) {
        throw new ValidationError(
            'Environment variable PORT should a number and be between 3000 and 9999',
        );
    }

    return PORT;
};
