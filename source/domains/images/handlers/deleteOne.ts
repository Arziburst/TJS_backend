// Core
import { Request, Response } from 'express';
import cloudinary from 'cloudinary';
import dg from 'debug';

// Instruments
import { Images } from '../controller';

const debug = dg('router:images:public_id');

export const deleteOne = async (req: Request, res: Response) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const public_id = req.params.public_id;

        const cloudinaryRes = await cloudinary.v2.api.delete_resources([public_id]);

        if (!cloudinaryRes) {
            throw new Error('Cloudinary Response fail.');
        }

        const isRemoved = await Images.findOneAndRemove(public_id);

        if (!isRemoved) {
            throw new Error('Image collection fail.');
        }

        res.status(200).json({ data: public_id });
    } catch (error) {
        res.send(error);
    }
};
