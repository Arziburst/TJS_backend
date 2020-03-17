// Core
import mongoose from 'mongoose';

// Plugins
import { hashPlugin } from '../helpers/plugins';

// Document shape
const schema = new mongoose.Schema({
    name:  String,
    phone: {
        type:     String,
        required: true,
        unique:   true,
    },
    email: {
        type:     String,
        required: true,
        unique:   true,
    },
    password: {
        type:     String,
        required: true,
    },
    role: {
        type:    String,
        default: 'customer',
    },
},
{
    timestamps: {
        createdAt: 'created',
        updatedAt: 'modified',
    },
    toObject: { virtuals: true },
    id:       false,
});

schema.plugin(hashPlugin, { index: true });

schema.index({ email: 'text' });

// Collection
export const users = mongoose.model('users', schema);
