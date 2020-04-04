// Core
import { Response } from 'express';
import dg from 'debug';

// Types
import { IRequestWithSession } from '../../../@interfaces'

// Instruments
import { Users } from '../../users/controller';

const debug = dg('router:profile');

export const login = async (req: IRequestWithSession, res: Response) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        if (!req.headers.authorization) {
            throw new Error('credentials are not valid');
        }

        const [, credentials] = req.headers.authorization.split(' ');
        const [email, password] = credentials

            // Buffer.from(credentials, 'base64')
            // .toString()
            .split(':');

        const _id = await Users.login({ email, password });

        if (!_id) {
            throw new Error(`Login method do not return valid _id`)
        }

        const profile = await Users.findById(_id);

        if (!profile) {
            throw new Error(`Can't find profile by _id: ${_id}`)
        }

        req.session!.user = { _id };

        res.status(200).json({ data: profile });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};