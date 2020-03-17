// Core
import dg from 'debug';
import moment from 'moment';
import axios from 'axios';

// Instruments
import { Orders } from '../../controllers';
import { Products } from '../../controllers';
import { Users } from '../../controllers';
import { getTelegramApiUrl, getTelegramGroupId, discountHandler } from '../../helpers';

const debug = dg('router:orders');

// Constants
const TELEGRAM_API_URL = getTelegramApiUrl();
const TELEGRAM_GROUP_ID = getTelegramGroupId();

export const get = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        if (!req.session.user && !req.userRole) {
            throw new Error('session expired');
        }

        let data = [];
        const { hash } = req.session.user;
        const orders = new Orders(hash);

        if (req.userRole === 'admin') {
            data = await orders.find();
        } else {
            data = await orders.findByHash();
        }

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const post = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        let body = req.body;

        const productsByHash = new Products(body.orderedProducts);
        const foundedProductsByHashs = await productsByHash.findByHashArray();

        if (foundedProductsByHashs.length > 0) {
            const { total, orderedProducts } = foundedProductsByHashs.reduce((acc, foundedProductByHash) => {
                const result = discountHandler(foundedProductByHash.price, foundedProductByHash.discount);

                return {
                    orderedProducts: [
                        ...acc.orderedProducts,
                        {
                            hash:  foundedProductByHash.hash,
                            image: foundedProductByHash.images[ 0 ],
                            price: result,
                        },
                    ],
                    total: acc.total + result,
                };
            }, { total: 0, orderedProducts: [] });

            body = {
                ...body,
                total,
                orderedProducts,
            };
        }

        if (req.session.user) {
            const user = new Users(req.session.user.hash);
            const foundedUser = await user.findOne();

            if (foundedUser) {
                body = {
                    ...body,
                    email: foundedUser.email,
                };
            }

            body = {
                ...body,
                userHash: req.session.user.hash,
            };
        }

        const newOrder = new Orders(body);
        const { hash } = await newOrder.create(body);

        const foundedOrder = new Orders(hash);
        const order = await foundedOrder.findOne();

        const { orderedProducts, total, created, phone, comment } = order;
        const parsedCreated = moment(created).locale('ru')
            .format('MMMM Do YYYY, h:mm:ss a');

        await axios.post(`${TELEGRAM_API_URL}/sendMessage`, {
            chat_id:    TELEGRAM_GROUP_ID,
            parse_mode: 'HTML',
            text:       `Заказ: <a href ='http://tjstore.pp.ua/orders/${hash}'>${hash}</a>\nНа сумму: ${total} грн.\nКол-во: ${orderedProducts.length}\nСоздан: ${parsedCreated}\n${comment && `Комментарий: ${comment}\n`}Телефон: <a href='tel:${phone}'>${phone}</a>.`,
        });

        res.status(201).json({ data: order });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
