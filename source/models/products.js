// ODM
import { products } from '../odm';

export class Products {
    constructor(data) {
        this.data = data;
    }

    async find() {
        const data = await products.find()
            .select('-_id -__v -modified')
            .sort({ created: -1 })
            .lean({ virtuals: true });

        return data;
    }

    async findByHashArray() {
        const data = await products.find({ hash: this.data })
            .select('-_id -__v -modified')
            .lean({ virtuals: true });

        return data;
    }

    async create() {
        const data = await products.create(this.data);

        return data;
    }

    async findOne() {
        const hash = this.data;
        const data = await products.findOne({ hash })
            .select('-_id -__v -modified')
            .lean({ virtuals: true });

        return data;
    }

    async findById() {
        const data = await products.findById(this.data, { _id: true })
            .lean({ virtuals: true });

        return data;
    }

    async findOneAndUpdate() {
        const { hash, body } = this.data;

        const data = await products.findOneAndUpdate({ hash }, body, { new: true })
            .select('-_id -__v -modified')
            .lean({ virtuals: true });

        return data;
    }

    async findOneAndUpdateViews() {
        const hash = this.data;
        const result = await products.findOneAndUpdate(
            { hash }, { $inc: { views: 1 } }, { new: true },
        )
            .select('-_id -__v -modified')
            .lean({ virtuals: true });

        return result;
    }

    async findOneAndRemove() {
        const hash = this.data;
        await products.findOneAndRemove({ hash });

        return true;
    }
}
