// Core
import mongoose from 'mongoose';
import leanVirtuals from 'mongoose-lean-virtuals';

// Plugins
import { hashPlugin } from '../helpers/plugins';

// Constants
const WEEK = 604800000;

// Document shape
const schema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    type: {
        type:     String,
        required: true,
    },
    price: {
        type:     Number,
        required: true,
        min:      [ 0, 'price can not be lower than zero' ],
    },
    discount: {
        type:     Number,
        required: true,
        min:      [ 0, 'discount can not be lower than zero' ],
        max:      [ 50, 'discount can not be grater than 50' ],
    },
    weight: {
        type:    Number,
        default: 0,
    },
    available: {
        type:    Boolean,
        default: true,
    },
    images: {
        type:     [ String ],
        required: true,
    },
    views: {
        type:    Number,
        default: 0,
    },
}, {
    timestamps: {
        createdAt: 'created',
        updatedAt: 'modified',
    },
});

schema.set('id', false);

schema.virtual('isNew').get(function () {
    const { created } = this;

    return Date.now() - new Date(created).getTime() < WEEK;
});

schema.plugin(leanVirtuals);
schema.plugin(hashPlugin, { index: true });

// Collection
export const products = mongoose.model('products', schema);
