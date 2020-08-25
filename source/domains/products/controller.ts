// Core
import { Model } from 'mongoose';

// Instruments
import { productsModel, IProductsModel } from './schema';
import { Product } from './types';

class ProductsController {
    private readonly odm: Model<IProductsModel>;

    constructor() {
        this.odm = productsModel;
    }

    async create(body: Product): Promise<Product> {
        const data = await this.odm.create(body);

        return data;
    }

    async find(): Promise<Product[]> {
        const data = await this.odm.find()
            .select('')
            .sort({ created: -1 })
            .lean({ virtuals: true });

        return data;
    }

    async findByIdsArray(_idArray: Array<string>) {
        const data = await this.odm.find({ _id: { $in: _idArray} })
            .select('')
            .lean();

        return data;
    }

    async findById(_id: string): Promise<Product | null> {
        const data = await this.odm.findById(_id)
            .select('')
            .lean({ virtuals: true });

        return data;
    }

    async findOneAndUpdate(_id: string, body: Product): Promise<Product | null> {
        const data = await this.odm.findOneAndUpdate({ _id }, body, { new: true })
            .select('')
            .lean({ virtuals: true });

        return data;
    }

    async findOneAndRemove(_id: string): Promise<string> {
        await this.odm.findOneAndRemove({ _id });

        return _id;
    }

    async findOneAndUpdateViews(_id: string): Promise<Product | null> {
        const result = await this.odm.findOneAndUpdate({ _id }, { $inc: { views: 1 } }, { new: true })
            .select('')
            .lean({ virtuals: true });

        return result;
    }
}

export const Products = new ProductsController();
