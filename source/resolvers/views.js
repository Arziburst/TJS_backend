// ODM
import { views } from '../odm';

export const viewsResolver = {
    create: async (data) => {
        const result = await views.create(data);

        return result;
    },

    findOne: async (ipAdress) => {
        const result = await views.findOne({ ipAdress })
            .select('-_id -__v -modified -created')
            .lean();

        return result;
    },

    findOneAndUpdate: async (ipAdress, body) => {
        const result = await views.findOneAndUpdate({ ipAdress }, body, { new: true })
            .select('-__v -created -modified')
            .lean();

        return result;
    },
};
