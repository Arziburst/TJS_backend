// Core
import { Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import dg from 'debug';

// Instruments
import { Images } from '../controller';

const debug = dg('router:images');

interface IRequest extends Request {
    files?: Array<File & { path: string; }>
}

export const postMany = async (req: IRequest, res: Response) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        if (!req.files) {
            throw new Error('Files do not exist or broken');
        }

        const values = Object.values(req.files);
        const promises = values.map((image) => cloudinary.uploader.upload(image.path));

        const response: Array<{ url: string, public_id: string }> = await Promise.all(promises);
        const imagesUrlsArray = response.map(({ url, public_id }) => ({
            imageUrl: url, public_id,
        }));

        const data = await Images.insertMany(imagesUrlsArray);
        const mappedData = data.map(({ imageUrl, public_id }) => ({ imageUrl, public_id }));

        res.status(200).json({ data: mappedData });
    } catch (error) {
        res.send(error);
    }
};
