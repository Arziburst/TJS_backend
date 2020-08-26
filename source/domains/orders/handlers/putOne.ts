// Core
import { Request, Response } from 'express';
import dg from 'debug';

// Types
import { Order } from '../types';

// Instruments
import { Orders } from '../controller';

const debug = dg('router:orders:_id');

interface IRequest extends Request {
    body: Order;
}

export const putOne = async (req: IRequest, res: Response) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const _id = req.params._id;

        if (!_id) {
            throw new Error('Oreder put failed');
        }

        const body = req.body;
        const data = await Orders.findOneAndUpdate(_id, body);

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
