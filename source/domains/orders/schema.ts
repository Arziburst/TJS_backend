// Core
import mongoose, { Document } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

// Types
import { OrderCore } from './types'

export interface IOrdersModel extends Document, OrderCore {}

// Document shape
const schema = new mongoose.Schema({
    orderedProducts: [
        {
            pid: {
                type: String,
                required: true,
            },
            image: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
        },
    ],
    phone: {
        type: String,
        required: true,
    },
    total: {
        type: Number,
        default: 0,
    },
    uid: String,
    email: String,
    comment: String,
    status: {
        type: Number,
        default: 1,
    },
}, {
    timestamps: { createdAt: 'created', updatedAt: false },
    id: false,
    versionKey: false,
});

// Collection
export const ordersModel = mongoose.model<IOrdersModel>('orders', schema);
