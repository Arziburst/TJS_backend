// Types
import { Response, NextFunction } from 'express';
import { IRequestWithSession } from '../@interfaces';

// Instruments
import { NotFoundError } from '../helpers';

// Controllers
import { Users } from '../domains/users/controller';

export interface AuthenticateRequest extends IRequestWithSession {
    userRole?: string;
}

export const authenticate = async (req: AuthenticateRequest, res: Response, next: NextFunction) => {
    if (!req.session?.user) {
        return next(new NotFoundError('cookie not found', 401));
    }

    const { _id } = req.session.user;

    const userRole = await Users.getRole(_id);

    if (userRole) {
        req.userRole = userRole;
        next();
    } else {
        res.status(401).json({ message: 'authentication credentials are not valid' });
    }
};
