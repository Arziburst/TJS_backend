// Core
import mongoose, { Document } from 'mongoose';
import leanVirtuals from 'mongoose-lean-virtuals';
import uniqueValidator from 'mongoose-unique-validator';

// Types
import { ProductCore } from './types'

// Constants
const WEEK = 604800000;

export interface IProductsModel extends Document, ProductCore {}

// Document shape
const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'price can not be lower than zero'],
    },
    discount: {
        type: Number,
        required: true,
        min: [0, 'discount can not be lower than zero'],
        max: [50, 'discount can not be grater than 50'],
    },
    weight: {
        type: Number,
        default: 0,
    },
    available: {
        type: Boolean,
        default: true,
    },
    images: {
        type: [String],
        required: true,
    },
    views: {
        type: Number,
        default: 0,
    },
}, { 
    timestamps: { createdAt: 'created', updatedAt: false },
    id: false,
    versionKey: false,
});

schema.virtual('isProductNew').get(function (this: { created: Date }) {
    const { created } = this;
    
    return Date.now() - new Date(created).getTime() < WEEK;
});

schema.plugin(uniqueValidator);
schema.plugin(leanVirtuals);

// Collection
export const productsModel = mongoose.model<IProductsModel>('products', schema);
