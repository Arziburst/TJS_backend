// Core
import { Request, Response } from 'express';
import dg from 'debug';

// Instruments
import { Products } from '../controller';

const debug = dg('router:products');

export const getAll = async (req: Request, res: Response) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const data = await Products.find();

        res.status(200).json({ data });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
