// Core
import { Model } from 'mongoose';

// Controllers
import { Products } from '../products/controller';

// Instruments
import { ordersModel, IOrdersModel } from './schema';
import { OrderCore, Order } from './types';

class OrdersController {
    private readonly odm: Model<IOrdersModel>;

    constructor() {
        this.odm = ordersModel;
    }

    async find(): Promise<Order[]> {
        const data = await this.odm.find()
            .select('-uid')
            .sort({ created: 1 })
            .lean();

        return data;
    }

    async findById(_id: string): Promise<Order | null> {
        const data = await this.odm.findById(_id)
            .select('-uid')
            .lean();

        return data;
    }

    async findMany(uid: string): Promise<Order[]> {
        const data = await this.odm.find({ uid })
            .select('-uid')
            .lean();

        if (!data) {
            throw new Error('Orders find many failed by user Id:.')        
        }

        return data;
    }

    async findByIdsArray(_id: string): Promise<Order[] | null> {
        const data = await this.odm.find({ _id })
            .select('-uid')
            .lean();

        return data;
    }

    async create(body: OrderCore): Promise<Order | null> {
        const orderedProductsIds = body.orderedProducts.map(({ pid }) => pid);
        const isProductsExist = await Products.findByIdsArray(orderedProductsIds);

        if (!isProductsExist) {
            throw new Error('some product not exist in DB');
        }

        const data = await this.odm.create(body);

        return data;
    }

    async findOneAndUpdate(_id: string, body: OrderCore): Promise<Order | null> {
        const data = await this.odm.findOneAndUpdate({ _id }, body, { new: true })
            .select('-uid')
            .lean();

        return data;
    }

    async findOneAndRemove(_id: string): Promise<boolean> {
        await this.odm.findOneAndRemove({ _id });

        return true;
    }
}

export const Orders = new OrdersController();