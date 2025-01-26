import { Request } from 'express';
import { Session } from 'express-session';

export interface IRequestWithSession extends Request {
    session: Session & {
        user?: { _id: string };
    };
}
