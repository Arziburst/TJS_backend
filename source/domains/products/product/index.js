// Core
import dg from 'debug';

// Instruments
import { Products } from '../../../controllers';
import { viewsResolver } from '../../../resolvers';

const debug = dg('router:products:hash');

export const get = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const product = new Products(req.params.hash);
        const data = await product.findOne();

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const put = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const reqData = {
            hash: req.params.hash,
            body: req.body,
        };
        const product = new Products(reqData);
        const data = await product.findOneAndUpdate();

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const remove = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const product = new Products(req.params.hash);
        await product.findOneAndRemove();

        res.status(200).json({ data: req.params.hash });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const incrementViews = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const ipAdress = req.headers[ 'x-forwarded-for' ] || req.connection.remoteAddress;
        const foundedIpAdress = await viewsResolver.findOne(ipAdress);
        const product = new Products(req.params.hash);
        let data = null;

        if (foundedIpAdress) {
            const { viewedProducts } = foundedIpAdress;
            const isProductViewed = viewedProducts.includes(req.params.hash);

            if (!isProductViewed) {
                await viewsResolver.findOneAndUpdate(ipAdress, {
                    viewedProducts: [ ...viewedProducts, req.params.hash ],
                });

                data = await product.findOneAndUpdateViews();
            }
        } else if (ipAdress) {
            await viewsResolver.create({
                ipAdress,
                viewedProducts: [ req.params.hash ],
            });

            data = await product.findOneAndUpdateViews();
        }

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
