// Core
import mongoose, { Document } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

// Types
import { UserCore } from './types';

export interface IUsersModel extends Document, UserCore {}

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
}, {
    timestamps: { createdAt: 'created', updatedAt: false },
    id:         false,
    versionKey: false,
});

schema.index({ email: 'text', phone: 'text' });
schema.plugin(uniqueValidator);

// Collection
export const usersModel = mongoose.model<IUsersModel>('users', schema);
