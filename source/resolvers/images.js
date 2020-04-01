// ODM
import { images } from '../odm';

export const imagesResolver = {
    find: async () => {
        const data = await images.find()
            .select('-_id -__v -created -modified')
            .lean();

        return data;
    },

    insertMany: async (body) => {
        const data = await images.insertMany(body);

        return data;
    },

    findOneAndRemove: async (public_id) => {
        await images.findOneAndRemove({ public_id });

        return true;
    },
};
