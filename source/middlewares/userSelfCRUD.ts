import { Request, Response, NextFunction } from 'express'

export const userSelfCRUD = (req: Request, res: Response, next: NextFunction) => {
    if (req.params.hash === req.session.user.hash) {
        next();
    } else {
        res.status(403).json({ message: 'Not permitted' });
    }
};
