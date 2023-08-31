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

export const getAll = async (req: GetAllOrders, res: Response) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        if (!req.session?.user?._id) {
            throw new Error('session expired');
        }

        let data: Array<Order> = [];
        const { _id: userId } = req.session.user;

        if (req.userRole === 'admin') {
            data = await Orders.find();
        } else {
            data = await Orders.findMany(userId);
        }

        res.status(200).json({ data });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
