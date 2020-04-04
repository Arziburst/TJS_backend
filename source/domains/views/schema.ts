// Core
import mongoose, { Document } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

// Types
import { ViewsCore } from './types'

export interface IViewsModel extends Document, ViewsCore {}

// Document shape
const schema = new mongoose.Schema({
    ipAdress: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
    viewedProducts: [String],
}, {
    timestamps: {
        createdAt: 'created',
        updatedAt: 'modified',
    },
    id: false,
    versionKey: false,
});

schema.plugin(uniqueValidator);

// Collection
export const viewsModel = mongoose.model<IViewsModel>('views', schema);
