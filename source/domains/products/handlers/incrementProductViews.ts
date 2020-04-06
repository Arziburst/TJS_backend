// Core
import { Request, Response } from 'express';
import dg from 'debug';

// Instruments
import { Products } from '../controller';
import { Product } from '../types';
import { Views } from '../../views/controller';

const debug = dg('router:products:increment:_id');

export const incrementProductViews = async (req: Request, res: Response) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        let data: Product | null = null;
        const _id = req.params._id;

        if (!_id) {
            throw new Error('Increment product views failed, _id is not valid.')
        }

        const ipAdress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        if (typeof ipAdress !== 'string') {
            res.status(200).json({ data });
            return;
        }

        const foundedIpAdress = await Views.findOne(ipAdress);

        if (foundedIpAdress) {
            const { viewedProducts } = foundedIpAdress;
            const isProductViewed = viewedProducts.includes(_id);

            if (!isProductViewed) {
                const result = await Views.findOneAndUpdate(ipAdress, { viewedProducts: [...viewedProducts, _id] });

                if (!result) {
                    throw new Error(`Cant find Views by ipAdress: ${ipAdress}!`)
                }

                data = await Products.findOneAndUpdateViews(_id);
            }
        } else {
            const result = await Views.create({ ipAdress, viewedProducts: [ _id ] });

            if (!result) {
                throw new Error(`Cant create Views by ipAdress: ${ipAdress}!`)
            }

            data = await Products.findOneAndUpdateViews(_id);
        }

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
