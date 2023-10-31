// Core
import { Response } from 'express';
import dg from 'debug';

// Helpers
import { LiqPay } from '../../../helpers';

// Types
import { IRequestWithSession } from '../../../@interfaces';
import { Order } from '../types';

// Instruments
import { Orders } from '../controller';

const debug = dg('router:orders/lig-pay');

interface GetLiqPay extends IRequestWithSession {}

export const getLiqPay = (req: GetLiqPay, res: Response) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const public_key = process.env.PUBLIC_KEY_LIQPAY;
        const private_key = process.env.PRIVATE_KEY_LIQPAY;

        const body = req.body;

        if (public_key && private_key) {
            const liqPay = new LiqPay({ public_key, private_key });

            const dataLiqPay = liqPay.cnb_form(
                {
                    ...body,
                    action:   'pay',
                    currency: 'UAH',
                    version:  '3',
                },
            );

            res.status(200).json({ data: dataLiqPay });
        } else {
            throw new Error('Server: LiqPay keys are not defined');
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
