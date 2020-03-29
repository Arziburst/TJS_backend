// Core
import dg from 'debug';
import cloudinary from 'cloudinary';

// Controlers
import { Products } from '../../controllers';

// Resolvers
import { imagesResolver } from '../../resolvers';

// Helpers
const debug = dg('router:images');

export const get = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const images = await imagesResolver.find();
        const products = new Products();
        const foundedProducts = await products.find();
        const activeImagesArray = foundedProducts.reduce((acc, product) => [ ...acc, ...product.images ], []);

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

export const post = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const values = Object.values(req.files);
        const promises = values.map((image) => cloudinary.uploader.upload(image.path));
        const response = await Promise.all(promises);

        const imagesUrlsArray = response.map(({ url, public_id }) => ({ imageUrl: url, public_id }));
        const data = await imagesResolver.insertMany(imagesUrlsArray);
        const mappedData = data.map(({ imageUrl, public_id }) => ({ imageUrl, public_id }));

        res.status(200).json({ data: mappedData });
    } catch (error) {
        res.send(error);
    }
};

export const remove = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const public_id = req.params.public_id;

        const isRemoved = await imagesResolver.findOneAndRemove(public_id);

        cloudinary.v2.api.delete_resources([ public_id ]);

        if (!isRemoved) {
            throw new Error('Iamge remove fail.');
        }

        res.status(200).json({ data: public_id });
    } catch (error) {
        res.send(error);
    }
};
