// Types
import { Request, Response, NextFunction } from 'express';

export interface IRequest extends Request {
    userRole?: string;
}

export const checkRole = (role: string) => (req: IRequest, res: Response, next: NextFunction) => {
    if (req.userRole === role) {
        next();
    } else {
        res.status(403).json({ message: 'Not permitted' });
    }
};
