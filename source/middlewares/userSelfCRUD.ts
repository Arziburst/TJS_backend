// Types
import { Response, NextFunction } from 'express';
import { IRequestWithSession } from '../@interfaces';

export const userSelfCRUD = (req: IRequestWithSession, res: Response, next: NextFunction) => {
    if (req.params._id === req.session?.user?._id) {
        next();
    } else {
        res.status(403).json({ message: 'Not permitted' });
    }
};
