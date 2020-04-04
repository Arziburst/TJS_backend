// Core
import { Response } from 'express';
import dg from 'debug';

// Types
import { IRequestWithSession } from '../../../@interfaces';

// Instruments
import { Users } from '../../users/controller';

const debug = dg('router:profile');

export const authorization = async (req: IRequestWithSession, res: Response) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        if (!req.session?.user) {
            throw new Error('session expired');
        }

        const profile = await Users.findById(req.session.user._id);

        res.status(200).json({ data: profile });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};