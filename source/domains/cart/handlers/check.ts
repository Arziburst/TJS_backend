// Core
import { Request, Response } from 'express';
import dg from 'debug';

// Types
import { Cart } from '../types';

// Instruments
import { Products } from '../../products/controller';

const debug = dg('router:cart/check');

interface IRequest extends Request {
    body: Cart;
}

export const check = async (req: IRequest, res: Response) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const ids = req.body;

        const data = (await Products.findByIdsArray(ids)).map((product) => product._id);

        res.status(200).json({ data });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
