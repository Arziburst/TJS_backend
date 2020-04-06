// Core
import { Request, Response } from 'express';
import dg from 'debug';

// Instruments
import { Products } from '../controller';

const debug = dg('router:products:_id');

export const deleteOne = async (req: Request, res: Response) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const _id = req.params._id;
        await Products.findOneAndRemove(_id);

        res.status(200).json({ data: _id });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
