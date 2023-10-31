// Core
import { Response } from 'express';
import axios from 'axios';
import moment from 'moment';
import dg from 'debug';

// Helpers
import { getTelegramApiUrl, getTelegramGroupId, LiqPay } from '../../../helpers';

// Types
import { IRequestWithSession } from '../../../@interfaces';
import { LiqPayStatusResponse, Order, OrderedProduct } from '../types';

// Instruments
import { Orders } from '../controller';

// Constants
const TELEGRAM_API_URL = getTelegramApiUrl();
const TELEGRAM_GROUP_ID = getTelegramGroupId();

const debug = dg('router:orders/change-status');

interface GetAllOrders extends IRequestWithSession {
    userRole?: string
}

type ReduceResult = {
    total: number,
    orderedProducts: Array<OrderedProduct>;
}


export const changeStatus = async (req: any, res: Response) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const public_key = process.env.PUBLIC_KEY_LIQPAY;
        const private_key = process.env.PRIVATE_KEY_LIQPAY;

        const { id }: {id: string} = req.query;

        if (!public_key || !private_key) {
            throw new Error('LiqPay keys not found');
        }

        const liqPay = new LiqPay({ public_key, private_key });

        await liqPay.api("request", {
            action:   "status",
            version:  "3",
            order_id: id,
        }).then(async (dataThen: LiqPayStatusResponse) => {
            if (dataThen.status === 'success') {
                // data = dataThen;
                const foundOrder = await Orders.findById(id);
                if (foundOrder) {
                    const updatedOrder = await Orders.findOneAndUpdate(foundOrder._id, {
                        ...foundOrder,
                        statusPayment: 'paid',
                    });

                    if (updatedOrder) {
                        const { total, orderedProducts } = updatedOrder.orderedProducts.reduce((
                            acc, orderedProduct,
                        ) => {
                            return {
                                orderedProducts: [
                                    ...acc.orderedProducts,
                                    {
                                        pid:   orderedProduct.pid,
                                        image: orderedProduct.image,
                                        price: orderedProduct.price,
                                    },
                                ],
                                total: acc.total + orderedProduct.price,
                            };
                        }, { total: 0, orderedProducts: [] } as ReduceResult);

                        // Telegram notification
                        const { created, phone, comment, _id } = updatedOrder;
                        const parsedCreated = moment(created).locale('ru')
                            .format('MMMM Do YYYY, h:mm:ss a');

                        await axios.post(`${TELEGRAM_API_URL}/sendMessage`, {
                            chat_id:    TELEGRAM_GROUP_ID,
                            parse_mode: 'HTML',
                            text:       `Заказ: <a href ='http://tjstore.pp.ua/orders/${_id}'>${_id}</a>\nНа сумму: ${total} грн.\nКол-во: ${orderedProducts.length}\nСоздан: ${parsedCreated}\n${comment && `Комментарий: ${comment}\n`}Телефон: <a href='tel:${phone}'>${phone}</a>.`,
                        });

                        res.status(302).redirect(process.env.PUBLIC_URL + '/payment-success' || '');
                    }
                }
            } else {
                await Orders.findOneAndRemove(dataThen.order_id);
                res.status(400).redirect(process.env.PUBLIC_URL + '/payment-fail' || '');
            }

            return dataThen;
        });

        res.status(400).redirect(process.env.PUBLIC_URL + '/payment-fail' || '');
    } catch (error: any) {
        res.status(400).json({ message: error.message })
            .redirect(process.env.PUBLIC_URL + '/payment-fail' || '');
    }
};
