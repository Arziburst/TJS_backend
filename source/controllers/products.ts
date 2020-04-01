import { Products as ProductsModel } from '../models';

export class Products {
    constructor(data) {
        this.models = {
            products: new ProductsModel(data),
        };
    }

    async find() {
        const data = await this.models.products.find();

        return data;
    }

    async create() {
        const data = await this.models.products.create();

        return data;
    }

    async findOne() {
        const data = await this.models.products.findOne();

        return data;
    }

    async findById() {
        const data = await this.models.products.findById();

        return data;
    }

    async findByHashArray() {
        const data = await this.models.products.findByHashArray();

        return data;
    }

    async findOneAndUpdate() {
        const data = await this.models.products.findOneAndUpdate();

        return data;
    }

    async findOneAndUpdateViews() {
        const data = await this.models.products.findOneAndUpdateViews();

        return data;
    }

    async findOneAndRemove() {
        const data = await this.models.products.findOneAndRemove();

        return data;
    }
}
