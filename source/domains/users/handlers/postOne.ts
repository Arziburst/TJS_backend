// Core
import { Request, Response } from 'express';
import dg from 'debug';

// Types
import { User } from '../types';

// Instruments
import { Users } from '../controller';

const debug = dg('router:users:_id');

interface IRequest extends Request {
    body: User;
}

export const postOne = async (req: IRequest, res: Response) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const body = req.body;

        const { _id } = await Users.register(body);

        res.status(201).json({ data: _id });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
