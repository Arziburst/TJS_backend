// Core
import { Response } from 'express';
import axios from 'axios';
import dg from 'debug';
import moment from 'moment';

// Types
import { IRequestWithSession } from '../../../@interfaces';
import { OrderCore, OrderedProduct } from '../types';

// Instruments
import { Orders } from '../controller';
import { Products } from '../../products/controller';

// Helpers
import { getTelegramApiUrl } from '../../../helpers';
import { getTelegramGroupId } from '../../../helpers';

// Constants
const TELEGRAM_API_URL = getTelegramApiUrl();
const TELEGRAM_GROUP_ID = getTelegramGroupId();

const debug = dg('router:orders');

interface IRequest extends IRequestWithSession {
    body: {
        orderedPIDs: Array<string>;
        firstName: string;
        lastName: string;
        phone: string;
        email: string;
        city: string;
        warehouse: string;
        comment?: string;
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
            firstName:       body.firstName,
            phone:           body.phone,
            email:           body.email,
            city:            body.city,
            warehouse:       body.warehouse,
            comment:         body.comment,
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


        // Telegram notification
        const { created, phone, comment, _id } = foundedOrder;

        const parsedCreated = moment(created).locale('ru')
            .format('MMMM Do YYYY, h:mm:ss a');

        await axios.post(`${TELEGRAM_API_URL}/sendMessage`, {
            chat_id:    TELEGRAM_GROUP_ID,
            parse_mode: 'HTML',
            text:       `Заказ: <a href ='http://tjstore.pp.ua/orders/${_id}'>${_id}</a>\nНа сумму: ${total} грн.\nКол-во: ${orderedProducts.length}\nСоздан: ${parsedCreated}\n${comment && `Комментарий: ${comment}\n`}Телефон: <a href='tel:${phone}'>${phone}</a>.`,
        });

        res.status(201).json({ data: foundedOrder });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
