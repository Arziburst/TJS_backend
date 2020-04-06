// Core
import { Model } from 'mongoose';

// Instruments
import { viewsModel, IViewsModel } from './schema';
import { ViewsCore, Views as ViewsEntity } from './types';

class ViewsController {
    private readonly odm: Model<IViewsModel>;

    constructor() {
        this.odm = viewsModel;
    }

    async create(body: ViewsCore): Promise<ViewsEntity> {
        const data = await this.odm.create(body);

        return data;
    }

    async findOne(ipAdress: string): Promise<ViewsEntity | null> {
        const data = await this.odm.findOne({ ipAdress })
            .select('-_id -modified -created')
            .lean();

        return data;
    }

    async findOneAndUpdate(ipAdress: string, body: ViewsCore): Promise<ViewsEntity | null> {
        const data = await this.odm.findOneAndUpdate({ ipAdress }, body, { new: true })
            .select('-_id -created -modified')
            .lean();

        return data;
    }
}

export const Views = new ViewsController();