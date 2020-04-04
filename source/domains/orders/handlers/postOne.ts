// Core
import { Response } from 'express';
import moment from 'moment';
import axios from 'axios';
import dg from 'debug';

// Types
import { IRequestWithSession } from '../../../@interfaces';
import { OrderCore, OrderedProduct } from '../types';

// Helpers
import { getTelegramApiUrl, getTelegramGroupId, discountHandler } from '../../../helpers';

// Instruments
import { Orders } from '../controller';
import { Products } from '../../products/controller';
import { Users } from '../../users/controller';

const debug = dg('router:orders');

// Constants
const TELEGRAM_API_URL = getTelegramApiUrl();
const TELEGRAM_GROUP_ID = getTelegramGroupId();

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
            comment: body.comment,
            phone: body.phone,
            orderedProducts: [],
        };
        const sessionUID = req.session?.user?._id;
        const foundedProductsByPIDs = await Products.findByIdsArray(body.orderedPIDs);
        
        const { total, orderedProducts } = foundedProductsByPIDs.reduce((acc, foundedProductByPID) => {
            const result = discountHandler(foundedProductByPID.price, foundedProductByPID.discount);

            return {
                orderedProducts: [
                    ...acc.orderedProducts,
                    {
                        pid: foundedProductByPID._id,
                        image: foundedProductByPID.images[0],
                        price: result,
                    },
                ],
                total: acc.total + result,
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
            throw new Error('Order creation failed')
        }

        const foundedOrder = await Orders.findById(newOrder._id);

        if (!foundedOrder) {
            throw new Error('New order find failed')
        }

        const { created, phone, comment, _id } = foundedOrder;
        const parsedCreated = moment(created).locale('ru')
            .format('MMMM Do YYYY, h:mm:ss a');

        await axios.post(`${TELEGRAM_API_URL}/sendMessage`, {
            chat_id: TELEGRAM_GROUP_ID,
            parse_mode: 'HTML',
            text: `Заказ: <a href ='http://tjstore.pp.ua/orders/${_id}'>${_id}</a>\nНа сумму: ${total} грн.\nКол-во: ${orderedProducts.length}\nСоздан: ${parsedCreated}\n${comment && `Комментарий: ${comment}\n`}Телефон: <a href='tel:${phone}'>${phone}</a>.`,
        });

        res.status(201).json({ data: foundedOrder });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
