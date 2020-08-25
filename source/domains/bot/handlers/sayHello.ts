// Core
import { Request, Response } from 'express';
import axios from 'axios';
import dg from 'debug';

// Helpers
const debug = dg('router:bot');
import { getTelegramApiUrl, getTelegramGroupId } from '../../../helpers';

// Constants
const TELEGRAM_API_URL = getTelegramApiUrl();
const TELEGRAM_GROUP_ID = getTelegramGroupId();

export const sayHello = async (req: Request, res: Response) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        await axios.post(`${TELEGRAM_API_URL}/sendMessage`, {
            chat_id: TELEGRAM_GROUP_ID,
            text:    'Белочка на связи!',
        });

        res.sendStatus(204);
    } catch (error) {
        res.send(error);
    }
};
