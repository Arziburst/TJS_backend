import { Request } from 'express';

export interface IRequestWithSession extends Request {
    session?: Express.Session & {
        user?: { _id: string };
    };
}
