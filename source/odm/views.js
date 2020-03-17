// Core
import mongoose from 'mongoose';

// Document shape
const schema = new mongoose.Schema({
    ipAdress: {
        type:     String,
        required: true,
        index:    true,
    },
    viewedProducts: [ String ],
},
{
    timestamps: {
        createdAt: 'created',
        updatedAt: 'modified',
    },
});

// Collection
export const views = mongoose.model('views', schema);
