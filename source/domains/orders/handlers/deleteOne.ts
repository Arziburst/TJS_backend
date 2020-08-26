// Core
import { Request, Response } from 'express';
import dg from 'debug';

// Instruments
import { Orders } from '../controller';

const debug = dg('router:orders:_id');

export const deleteOne = async (req: Request, res: Response) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const _id = req.params._id;

        if (!_id) {
            throw new Error('Oreder delete failed on _id check stage');
        }

        const isDeleted = await Orders.findOneAndRemove(_id);

        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
