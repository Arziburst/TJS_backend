// Core
import { Request, Response } from 'express';
import dg from 'debug';

// Types
import { Product } from '../types';

// Instruments
import { Products } from '../controller';

const debug = dg('router:products');

interface IRequest extends Request {
    body: Product;
}

export const postOne = async (req: IRequest, res: Response) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const body = req.body;

        const newProduct = await Products.create(body);
        const product = await Products.findById(newProduct._id);

        if (!product) {
            throw Error('postProduct => not found!')
        }

        res.status(201).json({ data: product });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
