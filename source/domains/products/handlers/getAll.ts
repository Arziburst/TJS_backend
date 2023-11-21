// Core
import { Request, Response } from 'express';
import dg from 'debug';

// Instruments
import { Products } from '../controller';

const debug = dg('router:products');

// Types
import { Product } from '../types';

type Query = {
    ids: string;
}

export const getAll = async (req: Request<any, any, any, Query>, res: Response) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const ids = JSON.parse(req.query.ids) || null;

        const data = ids ? await Products.findByIdsArray(ids) : await Products.find();

        res.status(200).json({ data });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
