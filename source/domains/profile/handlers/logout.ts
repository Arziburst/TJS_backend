// Core
import { Response } from 'express';
import dg from 'debug';

// Types
import { IRequestWithSession } from '../../../@interfaces'

const debug = dg('router:profile');

export const logout = async (req: IRequestWithSession, res: Response) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        if (!req.session?.user) {
            throw new Error('session expired');
        }

        if (req.session.user) {
            req.session.destroy((err: Error) => {
                if (err) { throw err; }
                res.clearCookie('user');
                res.status(204).json({ data: 'session closed' });
            });
        } else {
            throw new Error('Something went wrong in logout');
        }

    } catch (error) {
        res.status(422).json({ message: error.message });
    }
};