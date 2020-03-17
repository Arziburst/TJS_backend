// Core
import mongoose from 'mongoose';

// Plugins
import { hashPlugin } from '../helpers/plugins';

// Document shape
const schema = new mongoose.Schema({
    orderedProducts: [
        {
            hash: {
                type:     String,
                required: true,
            },
            image: {
                type:     String,
                required: true,
            },
            price: {
                type:     Number,
                required: true,
            },
        },
    ],
    phone: {
        type:     String,
        required: true,
    },
    total: {
        type:    Number,
        default: 0,
    },
    userHash: {
        type: String,
    },
    email: {
        type:    String,
        default: '',
    },
    comment: {
        type:    String,
        default: '',
    },
    status: {
        type:    Number,
        default: 1,
    },
},
{
    timestamps: {
        createdAt: 'created',
        updatedAt: 'modified',
    },
});

schema.plugin(hashPlugin, { index: true });

// Collection
export const orders = mongoose.model('orders', schema);
