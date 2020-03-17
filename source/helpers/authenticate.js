// Instruments
import { NotFoundError } from './';

// Controllers
import { Users } from '../controllers';

export const authenticate = async (req, res, next) => {
    if (!req.session.user) {
        return next(new NotFoundError('cookie not found', 401));
    }

    const { hash } = req.session.user;
    const users = new Users({ hash });
    const userRole = await users.getRole();

    if (userRole) {
        req.userRole = userRole;
        next();
    } else {
        res.status(401).json({ message: 'authentication credentials are not valid' });
    }
};
