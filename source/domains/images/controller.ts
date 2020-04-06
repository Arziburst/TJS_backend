// Core
import { Model } from 'mongoose';

// Instruments
import { imagesModel, IImagesModel } from './schema';
import { ImageCore, Image } from './types';

class ImagesController {
    private readonly odm: Model<IImagesModel>;

    constructor() {
        this.odm = imagesModel;
    }

    async find(): Promise<Image[]> {
        const data = await this.odm.find()
            .select('-_id')
            .lean();

        return data;
    }

    async insertMany(body: ImageCore[]): Promise<Image[]> {
        const data = await this.odm.insertMany(body);

        return data;
    }

    async findOneAndRemove(public_id: string): Promise<boolean> {
        await this.odm.findOneAndRemove({ public_id });

        return true;
    }
}

export const Images = new ImagesController();