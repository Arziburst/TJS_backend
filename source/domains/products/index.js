// Core
import dg from 'debug';

// Instruments
import { Products } from '../../controllers';

const debug = dg('router:products');

export const get = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const products = new Products();
        const data = await products.find();

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const post = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const newProduct = new Products(req.body);
        const { hash } = await newProduct.create();
        const foundedProduct = new Products(hash);
        const product = await foundedProduct.findOne();

        res.status(201).json({ data: product });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
