// Core
import mongoose from 'mongoose';

// Document shape
const schema = new mongoose.Schema({
    imageUrl: {
        type:     String,
        required: true,
    },
    public_id: {
        type:     String,
        required: true,
    },
}, {
    timestamps: {
        createdAt: 'created',
        updatedAt: 'modified',
    },
});

// Collection
export const images = mongoose.model('images', schema);
