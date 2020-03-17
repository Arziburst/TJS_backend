import { ValidationError } from '../errors';

export const getDbUrl = () => {
    const { DB_URL } = process.env;

    if (!DB_URL) {
        throw new ValidationError('Environment variable DB_URL should be specified');
    }

    if (typeof DB_URL !== 'string') {
        throw new ValidationError('Environment variable DB_URL should be a string');
    }

    return DB_URL;
};
