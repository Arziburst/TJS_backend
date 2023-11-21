// Core
import { Request, Response } from 'express';
import dg from 'debug';

// Types
import { Product } from '../types';

// Instruments
import { Products } from '../controller';

const debug = dg('router:products:_id');

interface IRequest extends Request {
    body: Product;
}

export const putOne = async (req: IRequest, res: Response) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const _id = req.params._id;
        const body = req.body;

        const data = await Products.findOneAndUpdate(_id, body);

        res.status(200).json({ data });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
