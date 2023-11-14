// Core
import { Response } from 'express';
import dg from 'debug';

// Types
import { IRequestWithSession } from '../../../@interfaces';
import { OrderCore, OrderedProduct } from '../types';

// Instruments
import { Orders } from '../controller';
import { Products } from '../../products/controller';
import { Users } from '../../users/controller';

const debug = dg('router:orders');

interface IRequest extends IRequestWithSession {
    body: {
        phone: string;
        comment: string;
        orderedPIDs: Array<string>;
    };
}

type ReduceResult = {
    total: number,
    orderedProducts: Array<OrderedProduct>;
}

export const postOne = async (req: IRequest, res: Response) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const body = req.body;
        let data: OrderCore = {
            orderedProducts: [],
        };
        const sessionUID = req.session?.user?._id;
        const foundedProductsByPIDs = await Products.findByIdsArray(body.orderedPIDs);

        const { total, orderedProducts } = foundedProductsByPIDs.reduce((
            acc, foundedProductByPID,
        ) => {
            return {
                orderedProducts: [
                    ...acc.orderedProducts,
                    {
                        pid:       foundedProductByPID._id,
                        title:     foundedProductByPID.title,
                        available: foundedProductByPID.available,
                        image:     foundedProductByPID.images[ 0 ],
                        price:     foundedProductByPID.price,
                    },
                ],
                total: acc.total + foundedProductByPID.price,
            };
        }, { total: 0, orderedProducts: [] } as ReduceResult);

        data = {
            ...data,
            total,
            orderedProducts,
        };

        if (sessionUID) {
            const foundedUser = await Users.findById(sessionUID);

            if (foundedUser) {
                data = {
                    ...data,
                    email: foundedUser.email,
                };
            }

            data = {
                ...data,
                uid: sessionUID,
            };
        }

        const newOrder = await Orders.create(data);

        if (!newOrder) {
            throw new Error('Order creation failed');
        }

        const foundedOrder = await Orders.findById(newOrder._id);

        if (!foundedOrder) {
            throw new Error('New order find failed');
        }

        res.status(201).json({ data: foundedOrder });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
