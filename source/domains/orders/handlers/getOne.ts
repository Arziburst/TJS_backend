// Core
import { Response } from 'express';
import dg from 'debug';

// Types
import { IRequestWithSession } from '../../../@interfaces';
import { Order } from '../types';

// Instruments
import { Orders } from '../controller';

const debug = dg('router:orders');

interface GetAllOrders extends IRequestWithSession {
    userRole?: string
}

export const getOne = async (req: GetAllOrders, res: Response) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        if (!req.session?.user?._id) {
            throw new Error('session expired');
        }
        const _id = req.params._id;

        if (!_id || _id.length < 1) {
            throw new Error('params _id is not valid');
        }

        if (req.userRole !== 'admin') {
            throw new Error('you are not admin');
        }

        const data = await Orders.findById(_id);

        res.status(200).json({ data });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
