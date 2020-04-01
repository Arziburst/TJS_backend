import { Orders as OrdersModel } from '../models';

// Models
import { Products } from '.';

export class Orders {
    constructor(data) {
        this.models = {
            orders: new OrdersModel(data),
        };
    }

    async find() {
        const data = await this.models.orders.find();

        return data;
    }

    async create(body) {
        const result = body.orderedProducts.map(({ hash }) => hash);

        const product = new Products(result);

        const productResult = await product.findByHashArray();

        if (!productResult) {
            throw new Error('some product not exist in DB');
        }

        const data = await this.models.orders.create();

        return data;
    }

    async findOne() {
        const data = await this.models.orders.findOne();

        return data;
    }

    async findByHash() {
        const data = await this.models.orders.findByHash();

        return data;
    }

    async findOneAndUpdate() {
        const data = await this.models.orders.findOneAndUpdate();

        return data;
    }

    async findOneAndRemove() {
        const data = await this.models.orders.findOneAndRemove();

        return data;
    }
}
