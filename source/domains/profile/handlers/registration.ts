// Core
import { Response } from 'express';
import dg from 'debug';

// Types
import { IRequestWithSession } from '../../../@interfaces';
import { UserCore } from '../../users/types';

// Instruments
import { Users } from '../../users/controller';

const debug = dg('router:profile');

interface RegistrationRequest extends IRequestWithSession {
    body: UserCore;
}

export const registration = async (req: RegistrationRequest, res: Response) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const body = req.body;
        const { _id } = await Users.register(body);
        const profile = await Users.findById(_id);

        req.session!.user = { _id };
        res.status(200).json({ data: profile });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
