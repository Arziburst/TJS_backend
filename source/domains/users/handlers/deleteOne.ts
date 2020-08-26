// Core
import { Request, Response } from 'express';
import dg from 'debug';

// Instruments
import { Users } from '../controller';

const debug = dg('router:users:_id');

export const deleteOne = async (req: Request, res: Response) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const _id = req.params._id;

        const isRemoved = await Users.findOneAndRemove(_id);

        if (!isRemoved) {
            throw new Error('Delete user fail');
        }

        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
