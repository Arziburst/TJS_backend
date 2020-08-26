// Core
import { Request, Response } from 'express';
import dg from 'debug';

// Instruments
import { Users } from '../controller';

const debug = dg('router:users:_id');

export const getOne = async (req: Request, res: Response) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const _id = req.params._id;
        const data = await Users.findById(_id);

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
