// Core
import { Request, Response } from 'express';
import dg from 'debug';

// Instruments
import { Products } from '../../products/controller';
import { Images } from '../controller';

const debug = dg('router:images');

export const getAll = async (req: Request, res: Response) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const images = await Images.find();
        const foundedProducts = await Products.find();

        const activeImagesArray = foundedProducts.reduce(
            (acc, product) => [ ...acc, ...product.images ], [] as Array<string>,
        );

        const data = images.filter((image) => {
            if (activeImagesArray.includes(image.imageUrl)) {
                return false;
            }

            return true;
        });

        res.status(200).json({ data });
    } catch (error) {
        res.send(error);
    }
};
