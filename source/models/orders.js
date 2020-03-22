// ODM
import { orders } from '../odm';

export class Orders {
    constructor(data) {
        this.data = data;
    }

    async find() {
        const data = await orders.find()
            .select('-_id -userHash -__v -modified')
            .sort({ created: 1 })
            .lean();

        return data;
    }

    async findByHash() {
        const data = await orders.find({ userHash: this.data })
            .select('-_id -userHash -__v -modified')
            .lean();

        return data;
    }

    async create() {
        const data = await orders.create(this.data);

        return data;
    }

    async findOne() {
        const hash = this.data;
        const data = await orders.findOne({ hash })
            .select('-_id -__v -modified')
            .lean();

        return data;
    }

    async findOneAndUpdate() {
        const { hash, body } = this.data;

        const data = await orders.findOneAndUpdate({ hash }, body, { new: true })
            .select('-_id -userHash -__v -modified')
            .lean();

        return data;
    }

    async findOneAndRemove() {
        const hash = this.data;
        await orders.findOneAndRemove({ hash });

        return true;
    }
}
