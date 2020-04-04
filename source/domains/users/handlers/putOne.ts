// Core
import { Request, Response } from 'express';
import dg from 'debug';

// Types
import { User } from '../types'

// Instruments
import { Users } from '../controller';

const debug = dg('router:users:_id');

interface IRequest extends Request {
    body: User;
}

export const putOne = async (req: IRequest, res: Response) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const _id = req.params._id;
        const body = req.body;

        const data = await Users.findOneAndUpdate(_id, body);

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
